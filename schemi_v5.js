// ==========================================
// SCHEMI & LAVAGNA TATTICA LOGIC
// ==========================================

let schemi = JSON.parse(localStorage.getItem('futsal_portal_schemi')) || [];
let currentSchemaId = null;
let currentFrames = [];
let currentFrameIndex = 0;
let animationInterval = null;
let isAnimating = false;
let currentMediaBase64 = null;
let selectedCategory = "Tutti";

const defaultPositions = [
    // Home (Blue)
    { id: 'h1', x: 50, y: 90, type: 'blue', label: '1' },
    { id: 'h2', x: 20, y: 70, type: 'blue', label: '2' },
    { id: 'h3', x: 50, y: 60, type: 'blue', label: '3' },
    { id: 'h4', x: 80, y: 70, type: 'blue', label: '4' },
    { id: 'h5', x: 50, y: 30, type: 'blue', label: '5' },
    // Away (Red)
    { id: 'a1', x: 50, y: 10, type: 'red', label: '1' },
    { id: 'a2', x: 20, y: 30, type: 'red', label: '2' },
    { id: 'a3', x: 50, y: 40, type: 'red', label: '3' },
    { id: 'a4', x: 80, y: 30, type: 'red', label: '4' },
    { id: 'a5', x: 50, y: 70, type: 'red', label: '5' },
    // Ball
    { id: 'ball', x: 50, y: 50, type: 'ball', label: '' }
];

document.addEventListener('DOMContentLoaded', () => {
    initCategories();
    renderSchemiGrid();
    document.getElementById('schema-category').addEventListener('change', updatePitchView);
    document.getElementById('schema-title').addEventListener('input', updatePitchView);
    setInterval(updatePitchView, 500); // FORCE UPDATE EVERY 500ms
});

function updatePitchView() {
    const categoryEl = document.getElementById('schema-category');
    if (!categoryEl) return;
    const category = categoryEl.value;
    const board = document.getElementById('tactical-board');
    if (!board) return;

    const titleInput = document.getElementById('schema-title');
    const titleVal = titleInput ? titleInput.value : "";
    
    const combinedText = category + " " + titleVal;
    
    let isHalfPitch = false;
    const pitchTypeInputs = document.getElementsByName('schema-pitch-type');
    if (pitchTypeInputs && pitchTypeInputs.length > 0) {
        for (let i = 0; i < pitchTypeInputs.length; i++) {
            if (pitchTypeInputs[i].checked && pitchTypeInputs[i].value === 'half') {
                isHalfPitch = true;
                break;
            }
        }
    } else {
        // Fallback for older code before radio buttons were initialized properly
        if (combinedText.includes("Angolo") || combinedText.includes("Laterali") || combinedText.includes("Punizioni")) {
            isHalfPitch = true;
        }
    }
    
    if (isHalfPitch) {
        // Orizzontale originale 3/2, ma ruotato -90 diventa verticale.
        // Lo vogliamo alto 75vh e largo 50vh visivamente.
        board.style.width = "75vh";
        board.style.height = "50vh";
        board.style.aspectRatio = "3 / 2";
        board.style.background = "url('futsal_pitch.svg') top center / 100% 200% no-repeat";
        board.style.border = "2px solid var(--border-color)";
        board.style.transform = "rotate(-90deg)";
        board.classList.add("rotated-board");
        
        const wrapper = document.getElementById("tactical-board-wrapper");
        if (wrapper) {
            wrapper.style.width = "50vh";
            wrapper.style.height = "75vh";
        }
    } else {
        board.style.width = "auto";
        board.style.height = "75vh";
        board.style.aspectRatio = "3 / 4";
        board.style.background = "url('futsal_pitch.svg') center / 100% 100% no-repeat";
        board.style.border = "2px solid var(--border-color)";
        board.style.transform = "none";
        board.classList.remove("rotated-board");
        
        const wrapper = document.getElementById("tactical-board-wrapper");
        if (wrapper) {
            wrapper.style.width = "auto";
            wrapper.style.height = "75vh";
        }
    }
}

function initCategories() {
    const btns = document.querySelectorAll('.category-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active', 'btn-primary'));
            btns.forEach(b => b.classList.add('btn-secondary'));
            btn.classList.remove('btn-secondary');
            btn.classList.add('active', 'btn-primary');
            selectedCategory = btn.getAttribute('data-category');
            renderSchemiGrid();
        });
    });
}

function renderSchemiGrid() {
    const grid = document.getElementById('schemi-grid');
    if (!grid) return;
    grid.innerHTML = '';
    document.getElementById('schemi-list-title').textContent = selectedCategory === 'Tutti' ? 'Tutti gli Schemi' : `Schemi: ${selectedCategory}`;

    const filtered = selectedCategory === 'Tutti' ? schemi : schemi.filter(s => s.category === selectedCategory);

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="color:var(--text-muted);">Nessuno schema trovato in questa categoria.</p>`;
        return;
    }

    filtered.forEach(schema => {
        const card = document.createElement('div');
        card.className = 'schema-card';
        card.dataset.id = schema.id;
        card.draggable = true;
        
        card.onclick = (e) => {
            // Prevent click if we are just dragging
            if (!card.classList.contains('dragging')) {
                openSchemaEditor(schema.id);
            }
        };
        
        // Drag and Drop Events
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
        card.addEventListener('dragend', handleDragEnd);
        card.innerHTML = `
            <h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.1rem; color: var(--color-tecn);">${escapeHTML(schema.title)}</h3>
            <span style="font-size: 0.8rem; color: var(--text-muted); background: rgba(255,255,255,0.1); padding: 0.2rem 0.5rem; border-radius: 4px; align-self: flex-start;">${escapeHTML(schema.category)}</span>
            <div style="font-size: 0.8rem; margin-top: 0.5rem; color: var(--text-secondary); display:flex; gap:0.5rem; align-items:center;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Animazione: ${schema.frames ? schema.frames.length : 1} Step
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================
// DRAG AND DROP REORDER LOGIC
// ==========================================
function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.id);
    this.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.stopPropagation();
    this.classList.remove('drag-over');
    
    const sourceId = e.dataTransfer.getData('text/plain');
    const targetId = this.dataset.id;
    
    if (sourceId && sourceId !== targetId) {
        reorderSchemi(sourceId, targetId);
    }
    return false;
}

function handleDragEnd(e) {
    document.querySelectorAll('.schema-card').forEach(c => {
        c.classList.remove('dragging');
        c.classList.remove('drag-over');
    });
}

function reorderSchemi(sourceId, targetId) {
    const sourceIndex = schemi.findIndex(s => s.id === sourceId);
    const targetIndex = schemi.findIndex(s => s.id === targetId);
    
    if (sourceIndex > -1 && targetIndex > -1) {
        const [movedItem] = schemi.splice(sourceIndex, 1);
        schemi.splice(targetIndex, 0, movedItem);
        
        localStorage.setItem('futsal_portal_schemi', JSON.stringify(schemi));
        renderSchemiGrid();
    }
}

function openNewSchemaEditor() {
    currentSchemaId = 'schema_' + Date.now();
    document.getElementById('schema-title').value = '';
    
    // Se l'utente ha filtrato una categoria, usa quella come default per il nuovo schema, altrimenti "Calcio d'inizio"
    let cat = "Calcio d'inizio";
    if (selectedCategory && selectedCategory !== 'Tutti') {
        cat = selectedCategory;
    }
    document.getElementById('schema-category').value = cat;
    
    let defaultPitch = 'full';
    if (cat.includes("Angolo") || cat.includes("Laterali") || cat.includes("Punizioni")) {
        defaultPitch = 'half';
    }
    
    const pitchTypeInputs = document.getElementsByName('schema-pitch-type');
    if (pitchTypeInputs) {
        for (let i = 0; i < pitchTypeInputs.length; i++) {
            if (pitchTypeInputs[i].value === defaultPitch) {
                pitchTypeInputs[i].checked = true;
            }
        }
    }
    
    document.getElementById('schema-notes').value = '';
    currentMediaBase64 = null;
    
    document.getElementById('schema-editor-title').textContent = "Nuovo Schema";
    document.getElementById('btn-delete-schema').style.display = 'none';
    document.getElementById('btn-duplicate-schema').style.display = 'none';

    // Inizializza Lavagna con posizioni di default (1 solo frame)
    currentFrames = [JSON.parse(JSON.stringify(defaultPositions))];
    currentFrameIndex = 0;
    
    switchView('schemi-editor-view');
    updatePitchView();
    renderBoard();
    updateTimelineStatus();
}

function openSchemaEditor(id) {
    const schema = schemi.find(s => s.id === id);
    if (!schema) return;

    currentSchemaId = schema.id;
    document.getElementById('schema-title').value = schema.title || '';
    document.getElementById('schema-category').value = schema.category || "Altro";
    
    let pType = schema.pitchType;
    if (!pType) {
        const cText = (schema.category||"") + " " + (schema.title||"");
        if (cText.includes("Angolo") || cText.includes("Laterali") || cText.includes("Punizioni")) {
            pType = 'half';
        } else {
            pType = 'full';
        }
    }
    const pitchTypeInputs = document.getElementsByName('schema-pitch-type');
    if (pitchTypeInputs) {
        for (let i = 0; i < pitchTypeInputs.length; i++) {
            if (pitchTypeInputs[i].value === pType) {
                pitchTypeInputs[i].checked = true;
            }
        }
    }
    
    document.getElementById('schema-notes').value = schema.notes || '';
    
    if (schema.media) {
        currentMediaBase64 = schema.media;
    } else {
        currentMediaBase64 = null;
    }

    document.getElementById('schema-editor-title').textContent = "Modifica Schema";
    document.getElementById('btn-delete-schema').style.display = 'block';
    document.getElementById('btn-duplicate-schema').style.display = 'block';

    currentFrames = schema.frames && schema.frames.length > 0 ? JSON.parse(JSON.stringify(schema.frames)) : [JSON.parse(JSON.stringify(defaultPositions))];
    currentFrameIndex = 0;

    switchView('schemi-editor-view');
    updatePitchView();
    renderBoard();
    updateTimelineStatus();
}

function closeSchemaEditor() {
    stopSchemaAnimation();
    switchView('schemi-list-view');
    renderSchemiGrid();
}

function switchView(viewId) {
    if (viewId === 'schemi-editor-view') {
        document.getElementById('schemi-editor-view').style.display = 'flex';
    } else {
        document.getElementById('schemi-editor-view').style.display = 'none';
    }
}

async function generatePreviewSVG(frame) {
    try {
        let svgText = `<svg viewBox="0 0 270 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="270" height="360" fill="#1b5e20"/>
  <rect x="5" y="5" width="260" height="350" fill="none" stroke="white" stroke-width="2"/>
  <line x1="5" y1="180" x2="265" y2="180" stroke="white" stroke-width="2"/>
  <circle cx="135" cy="180" r="45" fill="none" stroke="white" stroke-width="2"/>
  <circle cx="135" cy="180" r="3" fill="white"/>
  <path d="M 22.5 5 A 90 90 0 0 0 112.5 95 L 157.5 95 A 90 90 0 0 0 247.5 5" fill="none" stroke="white" stroke-width="2"/>
  <circle cx="135" cy="95" r="3" fill="white"/>
  <circle cx="135" cy="155" r="3" fill="white"/>
  <rect x="112.5" y="1" width="45" height="4" fill="none" stroke="white" stroke-width="2"/>
  <path d="M 22.5 355 A 90 90 0 0 1 112.5 265 L 157.5 265 A 90 90 0 0 1 247.5 355" fill="none" stroke="white" stroke-width="2"/>
  <circle cx="135" cy="265" r="3" fill="white"/>
  <circle cx="135" cy="205" r="3" fill="white"/>
  <rect x="112.5" y="355" width="45" height="4" fill="none" stroke="white" stroke-width="2"/>
  <path d="M 5 12.5 A 7.5 7.5 0 0 0 12.5 5" fill="none" stroke="white" stroke-width="2"/>
  <path d="M 257.5 5 A 7.5 7.5 0 0 0 265 12.5" fill="none" stroke="white" stroke-width="2"/>
  <path d="M 5 347.5 A 7.5 7.5 0 0 1 12.5 355" fill="none" stroke="white" stroke-width="2"/>
  <path d="M 257.5 355 A 7.5 7.5 0 0 1 265 347.5" fill="none" stroke="white" stroke-width="2"/>
</svg>`;
        
        const category = document.getElementById('schema-category').value;
        const isHalfPitch = (category === "Calci d'Angolo" || category === "Rimesse Laterali" || category === "Punizioni");
        
        let applyRotation = false;

        if (isHalfPitch) {
            svgText = svgText.replace('viewBox="0 0 270 360"', 'viewBox="0 0 270 180"');
            // Nessuna rotazione per mezzo campo
        } else {
            svgText = svgText.replace('viewBox="0 0 270 360"', 'viewBox="0 0 360 270"');
            svgText = svgText.replace('xmlns="http://www.w3.org/2000/svg">', 'xmlns="http://www.w3.org/2000/svg"><g transform="translate(0, 270) rotate(-90)">');
            applyRotation = true;
        }
        
        let piecesSVG = '';
        const boardWidth = 270;
        const boardHeight = 360;
        
        frame.forEach(piece => {
            const cx = (parseFloat(piece.x) / 100) * boardWidth;
            const cy = (parseFloat(piece.y) / 100) * boardHeight;
            
            let fill = '#ffffff';
            let r = 5;
            
            let pType = piece.type;
            if ((piece.id === 'h1' || piece.label === '1') && piece.type === 'blue') pType = 'blue-gk';
            if ((piece.id === 'a1' || piece.label === '1') && piece.type === 'red') pType = 'red-gk';
            
            if (pType === 'blue') {
                fill = '#00e5ff'; // Cyan
                r = 8;
            } else if (pType === 'blue-gk') {
                fill = '#ff9800'; // Orange
                r = 8;
            } else if (pType === 'red') {
                fill = '#ffeb3b'; // Yellow
                r = 8;
            } else if (pType === 'red-gk') {
                fill = '#e91e63'; // Pink
                r = 8;
            } else if (pType === 'ball' || piece.id === 'ball') {
                fill = '#ffffff';
                r = 4;
            }
            
            piecesSVG += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="#000" stroke-width="1.5"/>`;
            
            if (pType !== 'ball') {
                let rot = piece.rotation || 0;
                let rad = rot * Math.PI / 180;
                let dx = r * Math.sin(rad);
                let dy = -r * Math.cos(rad);
                piecesSVG += `<line x1="${cx}" y1="${cy}" x2="${cx + dx}" y2="${cy + dy}" stroke="#000" stroke-width="2"/>`;
            }
        });
        
        if (applyRotation) {
            svgText = svgText.replace('</svg>', piecesSVG + '</g></svg>');
        } else {
            svgText = svgText.replace('</svg>', piecesSVG + '</svg>');
        }
        
        const base64 = btoa(unescape(encodeURIComponent(svgText)));
        return 'data:image/svg+xml;base64,' + base64;
    } catch(e) {
        console.error("Errore generazione SVG", e);
        return null;
    }
}

async function saveCurrentSchema() {
    const title = document.getElementById('schema-title').value.trim() || 'Schema Senza Titolo';
    const category = document.getElementById('schema-category').value;
    const notes = document.getElementById('schema-notes').value;
    
    // Aggiorna il frame corrente con le posizioni attuali sulla board prima di salvare
    saveCurrentBoardStateToFrame();

    let pitchType = 'full';
    const pitchTypeInputs = document.getElementsByName('schema-pitch-type');
    if (pitchTypeInputs) {
        for (let i = 0; i < pitchTypeInputs.length; i++) {
            if (pitchTypeInputs[i].checked) {
                pitchType = pitchTypeInputs[i].value;
                break;
            }
        }
    }

    const schemaData = {
        id: currentSchemaId,
        title: title,
        category: category,
        pitchType: pitchType,
        notes: notes,
        media: currentMediaBase64,
        previewImage: null,
        frames: currentFrames
    };

    const index = schemi.findIndex(s => s.id === currentSchemaId);
    if (index >= 0) {
        schemi[index] = schemaData;
    } else {
        schemi.push(schemaData);
    }

    localStorage.setItem('futsal_portal_schemi', JSON.stringify(schemi));
    if (typeof showToast === 'function') showToast("Schema salvato con successo!", "success");
    closeSchemaEditor();
}

function deleteCurrentSchema() {
    if (!confirm("Sei sicuro di voler eliminare questo schema? L'azione è irreversibile.")) return;
    schemi = schemi.filter(s => s.id !== currentSchemaId);
    localStorage.setItem('futsal_portal_schemi', JSON.stringify(schemi));
    if (typeof showToast === 'function') showToast("Schema eliminato.", "info");
    closeSchemaEditor();
}

function duplicateCurrentSchema() {
    if (isAnimating) stopSchemaAnimation();
    
    currentSchemaId = 'schema_' + Date.now();
    
    const titleInput = document.getElementById('schema-title');
    if (titleInput.value) {
        titleInput.value = titleInput.value + " (Copia)";
    } else {
        titleInput.value = "Schema Copiato";
    }
    
    document.getElementById('schema-editor-title').textContent = "Nuovo Schema (Duplicato)";
    
    document.getElementById('btn-delete-schema').style.display = 'none';
    document.getElementById('btn-duplicate-schema').style.display = 'none';
    
    if (typeof showToast === 'function') {
        showToast("Schema duplicato! Clicca 'Salva Schema' per confermare.", "info");
    }
}

// ==========================================
// TACTICAL BOARD ENGINE (ANIMATION & DRAG)
// ==========================================

function renderBoard() {
    const board = document.getElementById('tactical-board');
    board.innerHTML = '';
    
    const frame = currentFrames[currentFrameIndex];
    if (!frame) return;

    frame.forEach(p => {
        const piece = document.createElement('div');
        
        // Identifica se è un portiere retroattivamente in base all'ID o Label
        let typeClass = p.type;
        if ((p.id === 'h1' || p.label === '1') && p.type === 'blue') typeClass = 'blue-gk';
        if ((p.id === 'a1' || p.label === '1') && p.type === 'red') typeClass = 'red-gk';
        
        piece.className = `board-piece piece-${typeClass}`;
        piece.id = `piece-${p.id}`;
        
        if (p.type === 'ball') {
            // Pallone da calcio vettoriale sopra lo sfondo 3D del CSS
            piece.innerHTML = `
            <svg viewBox="0 0 512 512" width="100%" height="100%" style="pointer-events: none; transform: scale(1.1);">
                <path d="M256,128 L374,213 L329,353 L183,353 L138,213 Z" fill="#222"/>
                <path d="M256,128 L256,0" fill="none" stroke="#222" stroke-width="24"/>
                <path d="M374,213 L512,160" fill="none" stroke="#222" stroke-width="24"/>
                <path d="M329,353 L420,512" fill="none" stroke="#222" stroke-width="24"/>
                <path d="M183,353 L92,512" fill="none" stroke="#222" stroke-width="24"/>
                <path d="M138,213 L0,160" fill="none" stroke="#222" stroke-width="24"/>
            </svg>`;
        } else {
            // Logo vettoriale persona dall'alto
            piece.innerHTML = `
            <svg viewBox="0 0 100 100" width="100%" height="100%" style="pointer-events: none;">
                <!-- Spalle -->
                <rect x="5" y="35" width="90" height="45" rx="22.5" fill="currentColor" opacity="0.4"/>
                <!-- Testa -->
                <circle cx="50" cy="45" r="24" fill="currentColor"/>
            </svg>`;
        }
        
        // Applica rotazione se presente
        let pRotation = parseFloat(p.rotation || 0);
        piece.dataset.rotation = pRotation;
        piece.style.transform = `translate(-50%, -50%) rotate(${pRotation}deg)`;
        
        // Rotazione tramite rotellina/touchpad (scorrevole)
        piece.addEventListener('wheel', (e) => {
            if (isAnimating) return;
            e.preventDefault(); // Previene lo scroll della pagina
            let currentRotation = parseFloat(piece.dataset.rotation || 0);
            
            // Moltiplicatore 0.2: un normale scatto di mouse (100) = 20 gradi
            // Movimenti morbidi di touchpad = rotazione millimetrica
            currentRotation -= e.deltaY * 0.2; 
            
            piece.dataset.rotation = currentRotation;
            piece.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
            saveCurrentBoardStateToFrame();
        }, { passive: false });

        // Rotazione a scatti tramite Tasto Destro (o tocco a due dita sul touchpad)
        piece.addEventListener('contextmenu', (e) => {
            if (isAnimating) return;
            e.preventDefault(); // Evita il menu contestuale di Windows
            let currentRotation = parseFloat(piece.dataset.rotation || 0);
            currentRotation += 45; // Ruota di 45 gradi a ogni click destro
            piece.dataset.rotation = currentRotation;
            piece.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
            saveCurrentBoardStateToFrame();
        });
        
        piece.style.left = `${p.x}%`;
        piece.style.top = `${p.y}%`;
        
        // Pointer events for Drag & Drop
        piece.addEventListener('pointerdown', startDrag);
        board.appendChild(piece);
    });
}

let draggedPiece = null;
let boardRect = null;

function startDrag(e) {
    if (isAnimating) return; // Disabilita drag durante il playback
    
    draggedPiece = e.target;
    boardRect = document.getElementById('tactical-board').getBoundingClientRect();
    
    // Set pointer capture per non perdere il track se esce fuori velocemente
    draggedPiece.setPointerCapture(e.pointerId);
    
    draggedPiece.addEventListener('pointermove', onDrag);
    draggedPiece.addEventListener('pointerup', endDrag);
    draggedPiece.addEventListener('pointercancel', endDrag);
}

function onDrag(e) {
    if (!draggedPiece || !boardRect) return;
    e.preventDefault();

    let x = e.clientX - boardRect.left;
    let y = e.clientY - boardRect.top;

    const board = document.getElementById('tactical-board');
    if (board && board.classList.contains('rotated-board')) {
        let w_orig = boardRect.height; 
        let h_orig = boardRect.width;
        
        let x_orig = w_orig - y;
        let y_orig = x;
        
        let px = (x_orig / w_orig) * 100;
        let py = (y_orig / h_orig) * 100;
        
        if (px < 0) px = 0;
        if (py < 0) py = 0;
        if (px > 100) px = 100;
        if (py > 100) py = 100;
        
        draggedPiece.style.left = `${px}%`;
        draggedPiece.style.top = `${py}%`;
    } else {
        // Bounds
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > boardRect.width) x = boardRect.width;
        if (y > boardRect.height) y = boardRect.height;

        // Convert to %
        const px = (x / boardRect.width) * 100;
        const py = (y / boardRect.height) * 100;

        draggedPiece.style.left = `${px}%`;
        draggedPiece.style.top = `${py}%`;
    }
}

function endDrag(e) {
    if (!draggedPiece) return;
    draggedPiece.releasePointerCapture(e.pointerId);
    draggedPiece.removeEventListener('pointermove', onDrag);
    draggedPiece.removeEventListener('pointerup', endDrag);
    draggedPiece.removeEventListener('pointercancel', endDrag);
    
    saveCurrentBoardStateToFrame();
    draggedPiece = null;
}

function saveCurrentBoardStateToFrame() {
    if (isAnimating) return;
    const board = document.getElementById('tactical-board');
    const newFrameState = [];
    
    // Copia template dal default per avere id e type
    defaultPositions.forEach(dp => {
        const piece = board.querySelector(`#piece-${dp.id}`);
        if (piece) {
            newFrameState.push({
                id: dp.id,
                type: dp.type,
                label: dp.label,
                x: parseFloat(piece.style.left),
                y: parseFloat(piece.style.top),
                rotation: parseInt(piece.dataset.rotation || 0)
            });
        }
    });
    
    currentFrames[currentFrameIndex] = newFrameState;
}

function addSchemaStep() {
    if (isAnimating) return;
    saveCurrentBoardStateToFrame();
    // Clona lo stato corrente e aggiungilo come nuovo frame
    const nextFrame = JSON.parse(JSON.stringify(currentFrames[currentFrameIndex]));
    currentFrames.push(nextFrame);
    currentFrameIndex = currentFrames.length - 1;
    updateTimelineStatus();
    if (typeof showToast === 'function') showToast("Step " + currentFrames.length + " registrato. Ora sposta i giocatori per il prossimo frame.", "info");
}

function removeLastSchemaStep() {
    if (isAnimating) return;
    if (currentFrames.length <= 1) {
        if (typeof showToast === 'function') showToast("Non puoi rimuovere l'unico step rimanente.", "warning");
        return;
    }
    currentFrames.pop();
    currentFrameIndex = currentFrames.length - 1;
    renderBoard();
    updateTimelineStatus();
}

function resetSchemaBoard() {
    if (isAnimating) return;
    if (confirm("Vuoi resettare tutti i movimenti? Tornerai alla posizione di base e tutti gli step successivi verranno eliminati.")) {
        currentFrames = [JSON.parse(JSON.stringify(defaultPositions))];
        currentFrameIndex = 0;
        renderBoard();
        updateTimelineStatus();
    }
}

function updateTimelineStatus() {
    document.getElementById('schema-timeline-status').textContent = `Step ${currentFrameIndex + 1} / ${currentFrames.length}`;
}

function playSchemaAnimation() {
    if (isAnimating || currentFrames.length <= 1) return;
    
    // Se siamo all'ultimo frame, ricomincia da zero. Altrimenti riprendi da dove eravamo.
    if (currentFrameIndex >= currentFrames.length - 1) {
        currentFrameIndex = 0;
    }
    renderBoard();
    updateTimelineStatus();
    
    isAnimating = true;
    
    const pieces = document.querySelectorAll('.board-piece');
    void document.getElementById('tactical-board').offsetWidth;
    pieces.forEach(p => p.classList.add('animating'));

    let step = currentFrameIndex + 1;
    animationInterval = setInterval(() => {
        if (step >= currentFrames.length) {
            stopSchemaAnimation(true); // true = finito
            return;
        }
        
        currentFrameIndex = step;
        const frame = currentFrames[step];
        
        frame.forEach(p => {
            const piece = document.getElementById(`piece-${p.id}`);
            if (piece) {
                piece.style.left = `${p.x}%`;
                piece.style.top = `${p.y}%`;
                let pRot = parseFloat(p.rotation || 0);
                piece.dataset.rotation = pRot;
                piece.style.transform = `translate(-50%, -50%) rotate(${pRot}deg)`;
            }
        });
        
        updateTimelineStatus();
        step++;
    }, 1500);
}

function stopSchemaAnimation(finished = false) {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    isAnimating = false;
    const pieces = document.querySelectorAll('.board-piece');
    pieces.forEach(p => p.classList.remove('animating'));
    
    // Se ha finito l'animazione da solo, torna all'ultimo frame
    if (finished) {
        currentFrameIndex = currentFrames.length - 1;
    }
    // Altrimenti resta nel frame in cui è stata messa in pausa
    
    renderBoard();
    updateTimelineStatus();
}

// Utility HTML escape se non globale
if (typeof escapeHTML !== 'function') {
    window.escapeHTML = function(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }
}
