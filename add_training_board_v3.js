// ==========================================
// INLINE TRAINING BOARDS LOGIC
// ==========================================

window.trainingBoardsState = {
    'board-warmup-full': [],
    'board-warmup-half': [],
    'board-mainPhase-full': [],
    'board-mainPhase-half': [],
    'board-finalPhase-full': [],
    'board-finalPhase-half': []
};

let activeBoardId = null;
let activeDragPiece = null;
let dragStartX = 0, dragStartY = 0;
let pieceStartX = 0, pieceStartY = 0;

window.toolsPopupHovering = false;
let popupHideTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    const boards = document.querySelectorAll('.inline-board');
    boards.forEach(board => {
        board.addEventListener('click', (e) => {
            // Prevent if clicking on a piece
            if (e.target.closest('.board-piece')) return;
            
            // Remove highlight from all boards
            document.querySelectorAll('.inline-board').forEach(b => {
                b.style.borderColor = 'var(--border-color)';
                b.style.boxShadow = 'none';
            });
            
            // Set active board and highlight it
            activeBoardId = board.id;
            board.style.borderColor = '#3b82f6';
            board.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
        });


        // Eventi drag and drop e contextmenu per eliminare
        board.addEventListener('mousedown', startInlineBoardDrag);
        board.addEventListener('mousemove', dragInlineBoardPiece);
        board.addEventListener('mouseup', endInlineBoardDrag);
        board.addEventListener('mouseleave', endInlineBoardDrag);
        board.addEventListener('contextmenu', e => e.preventDefault());
    });

    const popup = document.getElementById('board-tools-popup');
    // Popup is now fixed, no hover events needed
});



window.addTrainingBoardPiece = function(type) {
    if (!activeBoardId) {
        if(window.showToast) window.showToast("Clicca su una lavagna per selezionarla prima di aggiungere elementi.", "error");
        return;
    }
    if (window.trainingBoardsState[activeBoardId].length >= 50) {
        alert("Limite massimo raggiunto per questa lavagna!");
        return;
    }
    const newPiece = {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        type: type,
        x: 50,
        y: 50,
        rotation: 0
    };
    window.trainingBoardsState[activeBoardId].push(newPiece);
    renderInlineBoard(activeBoardId);
};

window.clearActiveBoard = function() {
    if (!activeBoardId) {
        if(window.showToast) window.showToast("Seleziona prima una lavagna cliccandoci sopra.", "error");
        else alert("Seleziona prima una lavagna cliccandoci sopra.");
        return;
    }
    if (confirm("Vuoi davvero svuotare tutti gli elementi dalla lavagna selezionata?")) {
        window.trainingBoardsState[activeBoardId] = [];
        window.renderInlineBoard(activeBoardId);
    }
};

window.renderInlineBoard = function(boardId) {
    const board = document.getElementById(boardId);
    if (!board) return;

    const pieces = board.querySelectorAll('.board-piece');
    pieces.forEach(p => p.remove());

    const state = window.trainingBoardsState[boardId];
    if (!state) return;

    state.forEach(p => {
        const piece = document.createElement('div');
        piece.className = 'board-piece';
        piece.dataset.id = p.id;
        piece.style.display = 'flex';
        piece.style.alignItems = 'center';
        piece.style.justifyContent = 'center';
        piece.style.outline = 'none';
        piece.style.border = 'none';
        piece.style.boxShadow = 'none';
        piece.style.background = 'transparent';

        if (p.type === 'ball') {
            piece.innerHTML = `âš½`;
            piece.style.fontSize = '18px';
            piece.style.filter = 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))';
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type.startsWith('cone-')) {
            let color = '#ef4444';
            if (p.type === 'cone-yellow') color = '#eab308';
            if (p.type === 'cone-blue') color = '#3b82f6';
            piece.style.width = '0';
            piece.style.height = '0';
            piece.style.borderLeft = '10px solid transparent';
            piece.style.borderRight = '10px solid transparent';
            piece.style.borderBottom = `20px solid ${color}`;
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type === 'pole') {
            piece.innerHTML = `<div style="width: 40px; height: 4px; background: yellow; border-radius: 2px;"></div>`;
            piece.style.filter = 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))';
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type === 'big-goal') {
            piece.innerHTML = `<div style="width: 45px; height: 10px; background: rgba(255,255,255,0.8); border-radius: 2px;"></div>`;
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type === 'obstacle') {
            piece.innerHTML = `<div style="width: 30px; height: 12px; background: rgba(255,255,0,0.8); border-radius: 3px;"></div>`;
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type === 'arrow-v') {
            piece.innerHTML = `<svg width="20" height="80" viewBox="0 0 20 80">
               <line x1="10" y1="80" x2="10" y2="10" stroke="yellow" stroke-width="3" />
               <polygon points="2,15 18,15 10,0" fill="yellow" />
            </svg>`;
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type === 'arrow-h') {
            piece.innerHTML = `<svg width="80" height="20" viewBox="0 0 80 20">
               <line x1="0" y1="10" x2="70" y2="10" stroke="yellow" stroke-width="3" />
               <polygon points="65,2 65,18 80,10" fill="yellow" />
            </svg>`;
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type === 'arrow-curve') {
            piece.innerHTML = `<svg width="80" height="80" viewBox="0 0 80 80">
               <path d="M 10 80 A 60 60 0 0 1 70 20" fill="none" stroke="yellow" stroke-width="3" />
               <polygon points="65,12 65,28 80,20" fill="yellow" />
            </svg>`;
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type === 'arrow-u') {
            piece.innerHTML = `<svg width="80" height="80" viewBox="0 0 80 80">
               <path d="M 20 80 L 20 40 A 20 20 0 0 1 60 40 L 60 80" fill="none" stroke="yellow" stroke-width="3" />
               <polygon points="55,70 65,70 60,80" fill="yellow" />
            </svg>`;
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        } else if (p.type === 'blue' || p.type === 'red' || p.type === 'blue-gk' || p.type === 'red-gk') {
            piece.style.width = '24px';
            piece.style.height = '24px';
            piece.style.borderRadius = '50%';
            piece.style.border = 'none';
            piece.style.boxShadow = '0 2px 4px rgba(0,0,0,0.4)';
            if (p.type === 'blue') piece.style.background = '#3b82f6';
            if (p.type === 'red') piece.style.background = '#ef4444';
            if (p.type === 'blue-gk') piece.style.background = '#f59e0b';
            if (p.type === 'red-gk') piece.style.background = '#10b981';
            piece.style.transform = `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`;
        }
        
        piece.style.position = 'absolute';
        piece.style.left = `${p.x}%`;
        piece.style.top = `${p.y}%`;
        piece.style.cursor = 'grab';
        piece.style.userSelect = 'none';
        
        piece.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            p.rotation = ((p.rotation || 0) + 45) % 360;
            renderInlineBoard(boardId);
        });

        piece.addEventListener('wheel', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const direction = Math.sign(e.deltaY);
            p.rotation = ((p.rotation || 0) + direction * 15 + 360) % 360;
            renderInlineBoard(boardId);
        }, { passive: false });
        
        piece.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.trainingBoardsState[boardId] = window.trainingBoardsState[boardId].filter(item => item.id !== p.id);
            renderInlineBoard(boardId);
        });

        let pressTimer;
        piece.addEventListener('touchstart', (e) => {
            pressTimer = window.setTimeout(() => {
                window.trainingBoardsState[boardId] = window.trainingBoardsState[boardId].filter(item => item.id !== p.id);
                renderInlineBoard(boardId);
            }, 800);
        });
        piece.addEventListener('touchend', () => clearTimeout(pressTimer));
        piece.addEventListener('touchmove', () => clearTimeout(pressTimer));

        board.appendChild(piece);
    });
};

function startInlineBoardDrag(e) {
    if (e.button !== 0 && !e.touches) return;
    const piece = e.target.closest('.board-piece');
    if (!piece) return;
    e.preventDefault();
    const board = piece.closest('.inline-board');
    if(!board) return;
    activeBoardId = board.id;
    const pId = piece.dataset.id;
    activeDragPiece = window.trainingBoardsState[activeBoardId].find(p => p.id === pId);
    if (activeDragPiece) {
        piece.style.cursor = 'grabbing';
        dragStartX = e.clientX || e.touches?.[0].clientX;
        dragStartY = e.clientY || e.touches?.[0].clientY;
        pieceStartX = activeDragPiece.x;
        pieceStartY = activeDragPiece.y;
    }
}

function dragInlineBoardPiece(e) {
    if (!activeDragPiece || !activeBoardId) return;
    e.preventDefault();
    const board = document.getElementById(activeBoardId);
    const rect = board.getBoundingClientRect();
    const clientX = e.clientX || e.touches?.[0].clientX;
    const clientY = e.clientY || e.touches?.[0].clientY;
    const dx = clientX - dragStartX;
    const dy = clientY - dragStartY;
    const percentX = (dx / rect.width) * 100;
    const percentY = (dy / rect.height) * 100;
    let newX = pieceStartX + percentX;
    let newY = pieceStartY + percentY;
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));
    activeDragPiece.x = newX;
    activeDragPiece.y = newY;
    renderInlineBoard(activeBoardId);
}

function endInlineBoardDrag() {
    if (activeDragPiece && activeBoardId) {
        renderInlineBoard(activeBoardId);
    }
    activeDragPiece = null;
}


