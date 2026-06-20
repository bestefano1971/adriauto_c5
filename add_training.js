
// ==========================================
// PROGRAMMA DI ALLENAMENTO (SCHEDA)
// ==========================================

function renderTrainingProgramList() {
    const listContainer = document.getElementById('training-sessions-list');
    if (!listContainer) return;
    
    // Mostriamo i training, ordinati dal piÃ¹ recente al piÃ¹ vecchio
    const sortedTrainings = [...trainings].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (sortedTrainings.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Nessuna seduta di allenamento registrata. Clicca su "+ Nuova Seduta" per iniziare.</p>';
        return;
    }
    
    let html = '';
    sortedTrainings.forEach(t => {
        const typeStr = t.type || 'Allenamento';
        let dateStr = 'Data ignota';
        if (t.date) {
            const parts = t.date.split('-');
            if (parts.length === 3) {
                dateStr = `${parts[2]}/${parts[1]}/${parts[0]}`;
            } else {
                dateStr = t.date;
            }
        }
        
        let preview = '';
        if (t.warmup && t.warmup.desc) preview += `<span style="margin-right:1rem;">ðŸ”¥ Risc: ${t.warmup.mins || '?'}m</span>`;
        if (t.mainPhase && t.mainPhase.desc) preview += `<span style="margin-right:1rem;">âš½ Cent: ${t.mainPhase.mins || '?'}m</span>`;
        if (t.finalPhase && t.finalPhase.desc) preview += `<span>ðŸƒ Defat: ${t.finalPhase.mins || '?'}m</span>`;
        
        html += `
            <div class="glass-panel" style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'" onclick="openTrainingForm('${t.date}')">
                <div style="flex: 1;">
                    <div style="font-size: 0.8rem; color: var(--color-coach); margin-bottom: 0.3rem; font-weight: bold;">${dateStr}</div>
                    <h4 style="margin: 0; font-size: 1.2rem; color: #fff;">${typeStr}</h4>
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">${preview || 'Nessun dettaglio inserito'}</div>
                    ${t.notes ? `<div style="font-size: 0.8rem; color: var(--color-tatt); margin-top: 0.3rem;">ðŸ“ Note: ${t.notes.substring(0, 40)}${t.notes.length > 40 ? '...' : ''}</div>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 1.5rem;">
                    ${t.rpe ? `
                    <div style="text-align: center;">
                        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Carico RPE</div>
                        <div style="font-size: 1.4rem; font-weight: bold; color: ${t.rpe >= 8 ? '#ef4444' : t.rpe >= 5 ? '#f59e0b' : '#10b981'};">${t.rpe}</div>
                    </div>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); openTrainingForm('${t.date}')">Apri Scheda</button>
                </div>
            </div>
        `;
    });
    
    listContainer.innerHTML = html;
}

function openTrainingForm(dateStr = '') {
    document.getElementById('training-sessions-list').style.display = 'none';
    const formContainer = document.getElementById('training-session-form-container');
    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    const popup = document.getElementById('board-tools-popup');
    if (popup) popup.style.display = 'block';
    
    const formTitle = document.getElementById('training-form-title');
    const dateInput = document.getElementById('training-date');
    
    if (dateStr) {
        formTitle.textContent = 'Modifica Scheda Allenamento';
        dateInput.value = dateStr;
        dateInput.readOnly = true; 
        
        const t = trainings.find(tr => tr.date === dateStr);
        if (t) {
            document.getElementById('training-id').value = t.id || '';
            document.getElementById('training-type').value = t.type || '';
            document.getElementById('training-warmup').value = (t.warmup && t.warmup.desc) || '';
            document.getElementById('training-warmup-mins').value = (t.warmup && t.warmup.mins) || '';
            document.getElementById('training-main').value = (t.mainPhase && t.mainPhase.desc) || '';
            document.getElementById('training-main-mins').value = (t.mainPhase && t.mainPhase.mins) || '';
            document.getElementById('training-final').value = (t.finalPhase && t.finalPhase.desc) || '';
            document.getElementById('training-final-mins').value = (t.finalPhase && t.finalPhase.mins) || '';
            document.getElementById('training-notes').value = t.notes || '';
            document.getElementById('training-rpe').value = t.rpe || '';
            
            if (t.image) {
                document.getElementById('training-image-preview').src = t.image;
                document.getElementById('training-image-preview-container').style.display = 'block';
            } else {
                clearTrainingImage();
            }
            
            if (!window.trainingBoardsState) window.trainingBoardsState = {};
            window.trainingBoardsState['board-warmup-full'] = t.warmup && t.warmup.boardFull ? JSON.parse(JSON.stringify(t.warmup.boardFull)) : [];
            window.trainingBoardsState['board-warmup-half'] = t.warmup && t.warmup.boardHalf ? JSON.parse(JSON.stringify(t.warmup.boardHalf)) : [];
            window.trainingBoardsState['board-mainPhase-full'] = t.mainPhase && t.mainPhase.boardFull ? JSON.parse(JSON.stringify(t.mainPhase.boardFull)) : [];
            window.trainingBoardsState['board-mainPhase-half'] = t.mainPhase && t.mainPhase.boardHalf ? JSON.parse(JSON.stringify(t.mainPhase.boardHalf)) : [];
            window.trainingBoardsState['board-finalPhase-full'] = t.finalPhase && t.finalPhase.boardFull ? JSON.parse(JSON.stringify(t.finalPhase.boardFull)) : [];
            window.trainingBoardsState['board-finalPhase-half'] = t.finalPhase && t.finalPhase.boardHalf ? JSON.parse(JSON.stringify(t.finalPhase.boardHalf)) : [];
            
            if(window.renderInlineBoard) {
                window.renderInlineBoard('board-warmup-full');
                window.renderInlineBoard('board-warmup-half');
                window.renderInlineBoard('board-mainPhase-full');
                window.renderInlineBoard('board-mainPhase-half');
                window.renderInlineBoard('board-finalPhase-full');
                window.renderInlineBoard('board-finalPhase-half');
            }
        }
    } else {
        formTitle.textContent = 'Nuova Scheda Allenamento';
        dateInput.value = '';
        dateInput.readOnly = false;
        document.getElementById('training-id').value = '';
        document.getElementById('training-type').value = '';
        document.getElementById('training-warmup').value = '';
        document.getElementById('training-warmup-mins').value = '';
        document.getElementById('training-main').value = '';
        document.getElementById('training-main-mins').value = '';
        document.getElementById('training-final').value = '';
        document.getElementById('training-final-mins').value = '';
        document.getElementById('training-notes').value = '';
        document.getElementById('training-rpe').value = '';
        clearTrainingImage();
        
        if (!window.trainingBoardsState) window.trainingBoardsState = {};
        window.trainingBoardsState['board-warmup-full'] = [];
        window.trainingBoardsState['board-warmup-half'] = [];
        window.trainingBoardsState['board-mainPhase-full'] = [];
        window.trainingBoardsState['board-mainPhase-half'] = [];
        window.trainingBoardsState['board-finalPhase-full'] = [];
        window.trainingBoardsState['board-finalPhase-half'] = [];
        
        if(window.renderInlineBoard) {
            window.renderInlineBoard('board-warmup-full');
            window.renderInlineBoard('board-warmup-half');
            window.renderInlineBoard('board-mainPhase-full');
            window.renderInlineBoard('board-mainPhase-half');
            window.renderInlineBoard('board-finalPhase-full');
            window.renderInlineBoard('board-finalPhase-half');
        }
    }
}

function closeTrainingForm() {
    document.getElementById('training-session-form-container').style.display = 'none';
    document.getElementById('training-sessions-list').style.display = 'grid';
    const popup = document.getElementById('board-tools-popup');
    if (popup) popup.style.display = 'none';
}

function previewTrainingImage(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            if(window.showToast) window.showToast("L'immagine Ã¨ troppo grande. Max 2MB.", "error");
            event.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('training-image-preview').src = e.target.result;
            document.getElementById('training-image-preview-container').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

function clearTrainingImage() {
    document.getElementById('training-image-input').value = '';
    document.getElementById('training-image-preview').src = '';
    document.getElementById('training-image-preview-container').style.display = 'none';
}

function saveTrainingSession() {
    const dateStr = document.getElementById('training-date').value;
    if (!dateStr) {
        if(window.showToast) window.showToast("Inserire una data valida.", "error");
        return;
    }
    
    const type = document.getElementById('training-type').value.trim();
    const warmupDesc = document.getElementById('training-warmup').value.trim();
    const warmupMins = document.getElementById('training-warmup-mins').value;
    const mainDesc = document.getElementById('training-main').value.trim();
    const mainMins = document.getElementById('training-main-mins').value;
    const finalDesc = document.getElementById('training-final').value.trim();
    const finalMins = document.getElementById('training-final-mins').value;
    const rpe = document.getElementById('training-rpe').value;
    const notes = document.getElementById('training-notes').value.trim();
    const imgPreviewContainer = document.getElementById('training-image-preview-container');
    const image = imgPreviewContainer.style.display !== 'none' ? document.getElementById('training-image-preview').src : null;
    
    let tIndex = trainings.findIndex(tr => tr.date === dateStr);
    
    // Raccogli i board state
    const warmupBoardFull = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-warmup-full'] || [])) : [];
    const warmupBoardHalf = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-warmup-half'] || [])) : [];
    
    const mainBoardFull = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-mainPhase-full'] || [])) : [];
    const mainBoardHalf = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-mainPhase-half'] || [])) : [];
    
    const finalBoardFull = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-finalPhase-full'] || [])) : [];
    const finalBoardHalf = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-finalPhase-half'] || [])) : [];

    if (tIndex !== -1) {
        trainings[tIndex].type = type;
        trainings[tIndex].warmup = { desc: warmupDesc, mins: warmupMins, boardFull: warmupBoardFull, boardHalf: warmupBoardHalf };
        trainings[tIndex].mainPhase = { desc: mainDesc, mins: mainMins, boardFull: mainBoardFull, boardHalf: mainBoardHalf };
        trainings[tIndex].finalPhase = { desc: finalDesc, mins: finalMins, boardFull: finalBoardFull, boardHalf: finalBoardHalf };
        trainings[tIndex].notes = notes;
        trainings[tIndex].rpe = rpe;
        trainings[tIndex].image = image;
    } else {
        const newSession = {
            id: Date.now(),
            date: dateStr,
            type: type || 'Allenamento',
            roster: {}, 
            warmup: { desc: warmupDesc, mins: warmupMins, boardFull: warmupBoardFull, boardHalf: warmupBoardHalf },
            mainPhase: { desc: mainDesc, mins: mainMins, boardFull: mainBoardFull, boardHalf: mainBoardHalf },
            finalPhase: { desc: finalDesc, mins: finalMins, boardFull: finalBoardFull, boardHalf: finalBoardHalf },
            notes: notes,
            rpe: rpe,
            image: image
        };
        trainings.push(newSession);
        trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
    
    if(window.showToast) window.showToast("Scheda allenamento salvata con successo!", "success");
    closeTrainingForm();
    renderTrainingProgramList();
    if(window.renderTrainingHistory) renderTrainingHistory();
    if(window.renderAttendanceBoard) renderAttendanceBoard(); 
}

document.addEventListener('DOMContentLoaded', () => {
    const trainingTabBtn = document.querySelector('[data-tab="tab-training-program"]');
    if(trainingTabBtn) {
        trainingTabBtn.addEventListener('click', () => {
            renderTrainingProgramList();
            closeTrainingForm();
        });
    }
});

function exportTrainingToPDF() {
    const element = document.getElementById('training-session-form-container');
    const opt = {
        margin:       10,
        filename:     'Scheda_Allenamento.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}


