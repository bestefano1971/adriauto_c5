/* ==========================================================================
   CONSTANTS & METRICS MAP
   ========================================================================== */
const paramInfo = {
    'psic-focus': { label: 'Focus', cat: 'Stato Psicologico' },
    'psic-stress': { label: 'Stress', cat: 'Stato Psicologico' },
    'psic-grinta': { label: 'Grinta', cat: 'Stato Psicologico' },
    'psic-team': { label: 'Team', cat: 'Stato Psicologico' },
    
    'tecn-control': { label: 'Controllo', cat: 'Tecnica Individuale' },
    'tecn-pass': { label: 'Passaggio', cat: 'Tecnica Individuale' },
    'tecn-shot': { label: 'Tiro', cat: 'Tecnica Individuale' },
    'tecn-dribble': { label: 'Dribbling', cat: 'Tecnica Individuale' },
    
    'fisi-speed': { label: 'Velocità', cat: 'Condizione Fisica' },
    'fisi-stamina': { label: 'Resistenza', cat: 'Condizione Fisica' },
    'fisi-strength': { label: 'Forza', cat: 'Condizione Fisica' },
    'fisi-agility': { label: 'Agilità', cat: 'Condizione Fisica' },
    
    'tatt-movement': { label: 'Movimento', cat: 'Tattica' },
    'tatt-defense': { label: 'Difesa', cat: 'Tattica' },
    'tatt-transition': { label: 'Transizioni', cat: 'Tattica' },
    'tatt-reading': { label: 'Lettura', cat: 'Tattica' }
};

// Default expert futsal suggestions for Strength/Weakness (in Italian)
const defaultPlans = {
    'psic-focus': {
        strength: "Mantenere la focalizzazione mentale per guidare la squadra nelle fasi critiche del match.",
        weaknessGoal: "Eliminare le pause di concentrazione durante le rotazioni e le transizioni veloci.",
        action: "Esercizi di respirazione diaframmatica durante le pause e ancoraggio su parole chiave tattiche."
    },
    'psic-stress': {
        strength: "Mantenere freddezza nei momenti di massima pressione difensiva avversaria.",
        weaknessGoal: "Controllare l'emotivitÃƒÂ  ed evitare falli di frustrazione nei minuti finali.",
        action: "Simulazioni in allenamento di situazioni di svantaggio e raddoppi di marcatura aggressivi."
    },
    'psic-grinta': {
        strength: "Sfruttare l'intensitÃƒÂ  agonistica per vincere i duelli individuali e guidare il pressing alto.",
        weaknessGoal: "Canalizzare la grinta agonistica evitando sanzioni disciplinari o interventi irruenti.",
        action: "Esercitazioni specifiche sull'intercettazione palla basate sul tempo di reazione anzichÃƒÂ© sul contrasto fisico."
    },
    'psic-team': {
        strength: "Svolgere un ruolo di leader verbale in campo, ordinando le marcature e sostenendo i compagni.",
        weaknessGoal: "Migliorare la comunicazione costruttiva nei momenti di difficoltÃƒÂ  collettiva.",
        action: "Prendere l'impegno di incitare i compagni e chiamare preventivamente i tagli degli avversari."
    },
    'tecn-control': {
        strength: "Ricevere palla di suola proteggendola efficacemente per far salire la squadra.",
        weaknessGoal: "Ridurre le imperfezioni nel controllo orientato di suola sotto pressione intensa.",
        action: "Esercitazioni a inizio seduta: ricezione con la suola e scarico rapido con traiettorie da diverse direzioni."
    },
    'tecn-pass': {
        strength: "Cercare imbucate precise e tagli filtranti per innescare il pivot di ruolo.",
        weaknessGoal: "Incrementare la velocitÃƒÂ  di trasmissione palla ed evitare passaggi intercettabili orizzontali.",
        action: "Lavoro a coppie sui passaggi di prima intenzione a diverse intensitÃƒÂ  e distanze."
    },
    'tecn-shot': {
        strength: "Prendere l'iniziativa del tiro dal limite o inserimento dal secondo palo.",
        weaknessGoal: "Migliorare la rapiditÃƒÂ  di caricamento del tiro e la precisione a rete con entrambi i piedi.",
        action: "15 tiri in porta di prima intenzione su scarico laterale o del pivot a fine allenamento."
    },
    'tecn-dribble': {
        strength: "Isolare il marcatore sulle bande laterali per creare superioritÃƒÂ  numerica.",
        weaknessGoal: "Evitare dribbling rischiosi in zona centrale (fase di impostazione dell'ultimo).",
        action: "Esercitazioni di 1vs1 in spazi molto stretti (es. corridoi di 3 metri) incentrati sulla finta di corpo."
    },
    'fisi-speed': {
        strength: "Sfruttare lo sprint breve per ribaltare l'azione in transizione attiva o recuperare l'uomo.",
        weaknessGoal: "Migliorare la reattivitÃƒÂ  nei primi 3 metri per anticipare il movimento avversario.",
        action: "Lavoro di scatti brevi con cambi di direzione e balzi esplosivi (3 serie da 6 ripetizioni)."
    },
    'fisi-stamina': {
        strength: "Garantire un'intensitÃƒÂ  costante di pressing e ripiegamenti anche ad alto ritmo.",
        weaknessGoal: "Evitare cali atletici nella seconda parte di ciascun tempo di gioco.",
        action: "Programma HIIT specifico per il futsal: scatti sui 15 metri alternati a recuperi attivi."
    },
    'fisi-strength': {
        strength: "Proteggere la palla col corpo fungendo da pivot boa ed eccellere nei contrasti.",
        weaknessGoal: "Aumentare la forza negli scontri spalla a spalla e nella difesa della posizione.",
        action: "Lavoro di potenziamento muscolare della parte inferiore (squat/affondi) associato a core-stability."
    },
    'fisi-agility': {
        strength: "Eseguire cambi di direzione rapidi per smarcarsi o chiudere le diagonali.",
        weaknessGoal: "Migliorare la coordinazione e la rapiditÃƒÂ  motoria nei cambi di direzione repentini.",
        action: "Esercizi con scaletta coordinativa rapida seguiti da scatto con arresto e ripartenza."
    },
    'tatt-movement': {
        strength: "Dettare il passaggio con tagli continui, parallele e blocchi intelligenti.",
        weaknessGoal: "Migliorare i tempi di smarcamento ed evitare stazionamenti passivi senza palla.",
        action: "Analisi lavagna tattica sulle rotazioni (3-1 o 4-0) ed esercitazioni a secco sui movimenti coordinati."
    },
    'tatt-defense': {
        strength: "Coprire le diagonali, gestire le marcature a uomo o zona e raddoppiare con efficacia.",
        weaknessGoal: "Mantenere la postura difensiva corretta per evitare di essere superati sul lato forte.",
        action: "Esercitazioni situazionali difensive (2vs2 e 3vs3) focalizzate sulla distanza di marcamento."
    },
    'tatt-transition': {
        strength: "Aggredire immediatamente alla perdita della palla o scattare in ripartenza rapida.",
        weaknessGoal: "Migliorare la velocitÃƒÂ  di ripiegamento difensivo sotto la linea della palla.",
        action: "Partite condizionate: obbligo di posizionamento difensivo entro 4 secondi dalla perdita del possesso."
    },
    'tatt-reading': {
        strength: "Prendere scelte tattiche ottimali riducendo i tempi decisionali sotto pressione.",
        weaknessGoal: "Riconoscere rapidamente quando verticalizzare e quando mantenere il possesso palla.",
        action: "Partite a tema a tocchi limitati (1 o 2 tocchi) per costringere a leggere il gioco in anticipo."
    }
};

// ==========================================================================
// UTILITY FUNCTIONS (PHOTO COMPRESSION & INITIALS)
// ==========================================================================
function compressPlayerPhoto(file, callback) {
    if (!file) {
        callback(null);
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Quadratic resize to 150x150
            canvas.width = 150;
            canvas.height = 150;
            
            let srcX = 0;
            let srcY = 0;
            let srcWidth = img.width;
            let srcHeight = img.height;
            
            if (img.width > img.height) {
                srcWidth = img.height;
                srcX = (img.width - img.height) / 2;
            } else if (img.height > img.width) {
                srcHeight = img.width;
                srcY = (img.height - img.width) / 2;
            }
            
            ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, 150, 150);
            
            // Compress to JPEG with 0.7 quality to stay well within localStorage limits
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            callback(compressedBase64);
        };
        img.onerror = function() {
            callback(null);
        };
        img.src = e.target.result;
    };
    reader.onerror = function() {
        callback(null);
    };
    reader.readAsDataURL(file);
}

function getInitials(name) {
    if (!name) return 'GP';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

window.togglePlayerBio = function(event, btn) {
    event.stopPropagation();
    const card = btn.closest('.player-card');
    if (card) {
        card.classList.toggle('bio-expanded');
        const span = btn.querySelector('span');
        if (card.classList.contains('bio-expanded')) {
            span.textContent = "Nascondi Esperienze";
        } else {
            span.textContent = "Vedi Esperienze";
        }
    }
};

function updateAthleteProfileCard(player) {
    const profileCard = document.getElementById('athlete-profile-card');
    if (!profileCard) return;

    if (!player) {
        profileCard.classList.add('hidden');
        if (athleteAttendanceChartInstance) {
            athleteAttendanceChartInstance.destroy();
            athleteAttendanceChartInstance = null;
        }
        return;
    }

    profileCard.classList.remove('hidden');
    
    // Avatar
    const avatarContainer = document.getElementById('profile-card-avatar-container');
    if (avatarContainer) {
        const initials = getInitials(player.name);
        avatarContainer.innerHTML = player.photo 
            ? `<img src="${player.photo}" alt="${escapeHTML(player.name)}" class="player-avatar-img">`
            : `<span class="profile-avatar-initials">${initials}</span>`;
    }
    
    // Name, Number, Role, Foot
    const nameEl = document.getElementById('profile-card-name');
    const numberEl = document.getElementById('profile-card-number');
    const roleEl = document.getElementById('profile-card-role');
    const footEl = document.getElementById('profile-card-foot');
    
    if (nameEl) nameEl.textContent = player.name;
    if (numberEl) numberEl.textContent = player.number;
    if (roleEl) roleEl.textContent = player.role ? player.role : '--';
    if (footEl) footEl.textContent = player.foot ? player.foot : '--';
    
    // Birth Year, Weight, Height, Job, Experience
    const birthYearEl = document.getElementById('profile-card-birth-year');
    const weightEl = document.getElementById('profile-card-weight');
    const heightEl = document.getElementById('profile-card-height');
    const jobEl = document.getElementById('profile-card-job');
    const expEl = document.getElementById('profile-card-experience');
    
    if (birthYearEl) birthYearEl.textContent = player.birthYear ? player.birthYear : '--';
    if (weightEl) weightEl.textContent = player.weight ? player.weight : '--';
    if (heightEl) heightEl.textContent = player.height ? player.height : '--';
    if (jobEl) jobEl.textContent = player.job ? player.job : '--';
    if (expEl) expEl.textContent = player.experience ? player.experience : '--';
}

function renderAthleteAttendanceChart(present, absent, injured, justified, convocationsCount = 0, test = 0) {
    const canvas = document.getElementById('athlete-attendance-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (athleteAttendanceChartInstance) {
        athleteAttendanceChartInstance.destroy();
    }
    
    const total = present + absent + injured + justified + convocationsCount + test;
    if (total === 0) {
        athleteAttendanceChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Nessun dato'],
                datasets: [{
                    data: [1],
                    backgroundColor: ['rgba(255, 255, 255, 0.08)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                cutout: '75%'
            }
        });
        return;
    }
    
    athleteAttendanceChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Presenze', 'Assenze', 'Infortuni', 'Giustificati', 'Convocazioni', 'Test'],
            datasets: [{
                data: [present, absent, injured, justified, convocationsCount, test],
                backgroundColor: [
                    'hsla(145, 80%, 45%, 0.85)', // Presente (Verde)
                    'hsla(355, 75%, 55%, 0.85)', // Assente (Rosso)
                    'hsla(35, 95%, 55%, 0.85)',  // Infortunato (Arancio)
                    'hsla(210, 90%, 55%, 0.85)',  // Giustificato (Blu)
                    'hsla(185, 90%, 50%, 0.85)',  // Convocato (Ciano)
                    'hsla(270, 85%, 65%, 0.85)'   // Test (Viola)
                ],
                borderColor: 'rgba(3, 6, 15, 0.5)',
                borderWidth: 1,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const val = context.raw || 0;
                            const pct = ((val / total) * 100).toFixed(0);
                            return `${label}: ${val} (${pct}%)`;
                        }
                    },
                    titleFont: { family: 'Outfit' },
                    bodyFont: { family: 'Outfit' }
                }
            },
            cutout: '70%'
        }
    });
}

// ==========================================================================
// STATE MANAGEMENT
// ==========================================================================
let players = [];
try { 
    players = JSON.parse(localStorage.getItem('futsal_portal_players')) || []; 
    let migrated = false;
    players.forEach(p => {
        if(p.role === 'Ultimo') {
            p.role = 'Back';
            migrated = true;
        }
    });
    if(migrated) localStorage.setItem('futsal_portal_players', JSON.stringify(players));
} catch(e) { console.error("Error loading players:", e); }

let assessments = [];
try { assessments = JSON.parse(localStorage.getItem('futsal_portal_assessments')) || []; } catch(e) { console.error("Error loading assessments:", e); }

let trainings = [];
try { trainings = JSON.parse(localStorage.getItem('futsal_portal_trainings')) || []; } catch(e) { console.error("Error loading trainings:", e); }

let convocations = [];
try { convocations = JSON.parse(localStorage.getItem('futsal_portal_convocations')) || []; } catch(e) { console.error("Error loading convocations:", e); }

let athleticTests = [];
try { athleticTests = JSON.parse(localStorage.getItem('futsal_portal_athletic_tests')) || []; } catch(e) { console.error("Error loading athletic_tests:", e); }

let tempPlayerScores = {};
let tempCoachScores = {};
let activeAssessmentId = null; // Stored if loading an existing assessment to edit/update
let editingPlayerId = null; // Stored when editing a player profile details
let editingAthleticSession = null; // Stored when editing an athletic session: { playerId, date }

// Textarea modification trackers to prevent overwriting user-edited content
let userEditedFields = {
    strengthPlan: false,
    weaknessGoal: false,
    weaknessAction: false
};

// Chart instances
let radarChartInstance = null;
let trendChartInstance = null;
let athleteAttendanceChartInstance = null;
let trainingsAttendanceChartInstance = null;
let yoyoChartInstance = null;
let cmjChartInstance = null;
let sprintChartInstance = null;
let agilityChartInstance = null;

// ==========================================================================
// DOM ELEMENTS & INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // 1. Navigation setup
    setupTabs();
    setupDashboardCards();

    // 2. Roster Management Setup
    setupRosterForm();
    renderRoster();
    initPreparationTab();

    // 3. Evaluation Setup
    setupEvaluationForm();
    populatePlayerDropdowns();
    setupTrendsUI();

    // 4. Default scores object initialization
    resetTemporaryScores();
    syncSlidersUI();

    // 5. Setup Action buttons
    document.getElementById('btn-save').addEventListener('click', saveAssessment);
    document.getElementById('btn-reset').addEventListener('click', () => {
        if(confirm("Sei sicuro di voler resettare tutti i parametri di questa scheda?")) {
            resetAssessmentForm();
            showToast("Parametri resettati", "info");
        }
    });
    document.getElementById('btn-print').addEventListener('click', handlePrint);

    const cancelEditBtn = document.getElementById('btn-cancel-edit');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', cancelEdit);
    }

    // Setup Attendance & Convocations Tab
    setupAttendanceSubTabs();
    setupAttendanceForms();

    // Setup Profile Tab Subtabs
    setupProfileSubTabs();

    // Setup Roster Tab Subtabs
    setupRosterSubTabs();

    // Setup Athletic Tab
    setupAthleticSubTabs();
    setupAthleticCalculator();
    populateAthleticDropdowns();
    renderAthleticTestsTable();
    
    // Setup event delegation for athletic buttons
    const athleticTbody = document.getElementById('athletic-tests-table-body');
    if (athleticTbody) {
        athleticTbody.addEventListener('click', function(e) {
            const btnEdit = e.target.closest('.btn-edit-session');
            if (btnEdit) {
                const playerId = parseInt(btnEdit.getAttribute('data-player-id'), 10);
                const date = btnEdit.getAttribute('data-date');
                window.editAthleticSession(playerId, date);
                return;
            }
            const btnDelete = e.target.closest('.btn-delete-session');
            if (btnDelete) {
                const playerId = parseInt(btnDelete.getAttribute('data-player-id'), 10);
                const date = btnDelete.getAttribute('data-date');
                window.deleteAthleticSession(playerId, date);
                return;
            }
            const btnAdd = e.target.closest('.btn-add-session');
            if (btnAdd) {
                const playerId = parseInt(btnAdd.getAttribute('data-player-id'), 10);
                window.openAthleticTestForPlayer(playerId);
                return;
            }
        });
    }
    
    const monthFilter = document.getElementById('board-month-filter');
    if (monthFilter) {
        monthFilter.addEventListener('change', renderAttendanceBoard);
    }
    
    // Close modal when clicking outside
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Submit handler for Match Planning Popup
    const popupAddMatchForm = document.getElementById('form-popup-add-match');
    if (popupAddMatchForm) {
        popupAddMatchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = document.getElementById('popup-match-date').value;
            const eventType = document.getElementById('popup-match-event-type').value;
            const location = document.getElementById('popup-match-location').value;
            const opponent = document.getElementById('popup-match-opponent').value.trim();
            const notes = document.getElementById('popup-match-notes').value.trim();
            const sessionType = document.getElementById('popup-match-type').value.trim();
            
            if (eventType === 'match' || eventType === 'friendly') {
                const exists = convocations.some(c => c.date === date);
                if (exists) {
                    showToast("È già programmata una partita/amichevole per questa data!", "error");
                    return;
                }
                
                let locationPrefix = location === 'C' ? '(C)' : '(T)';
                let finalOpponent = opponent || (eventType === 'friendly' ? 'Amichevole' : 'Gara');
                if (!finalOpponent.includes('(C)') && !finalOpponent.includes('(T)')) {
                    finalOpponent = `${finalOpponent} ${locationPrefix}`;
                }
                
                const newMatch = {
                    id: Date.now(),
                    date: date,
                    type: eventType,
                    opponent: finalOpponent,
                    notes: notes,
                    selectedIds: []
                };
                
                convocations.push(newMatch);
                convocations.sort((a, b) => new Date(b.date) - new Date(a.date));
                localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                showToast(`Evento pianificato con successo!`, "success");
            } else {
                const exists = trainings.some(t => t.date === date);
                if (exists) {
                    showToast("È già programmato un allenamento per questa data!", "error");
                    return;
                }
                
                const newTraining = {
                    id: Date.now(),
                    date: date,
                    type: sessionType || 'Allenamento'
                };
                
                trainings.push(newTraining);
                trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
                localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                showToast(`Allenamento pianificato con successo!`, "success");
            }
            
            closeModal();
            renderConvocationsHistory();
            renderAttendanceBoard();
        });
    }

    // Event type change inside add column popup
    const addColEventType = document.getElementById('popup-match-event-type');
    if (addColEventType) {
        addColEventType.addEventListener('change', () => {
            const val = addColEventType.value;
            const matchFields = document.getElementById('popup-add-match-fields');
            const trainingFields = document.getElementById('popup-add-training-fields');
            const titleEl = document.querySelector('#popup-add-match .modal-header h3');
            
            if (val === 'match' || val === 'friendly') {
                matchFields.classList.remove('hidden');
                trainingFields.classList.add('hidden');
                if (titleEl) titleEl.textContent = val === 'friendly' ? 'Pianifica Amichevole' : 'Pianifica Gara';
            } else {
                matchFields.classList.add('hidden');
                trainingFields.classList.remove('hidden');
                if (titleEl) titleEl.textContent = 'Pianifica Allenamento';
            }
        });
    }

    // Event type change inside edit column popup
    const editColEventType = document.getElementById('edit-col-event-type');
    if (editColEventType) {
        editColEventType.addEventListener('change', () => {
            const val = editColEventType.value;
            const matchFields = document.getElementById('edit-col-match-fields');
            const trainingFields = document.getElementById('edit-col-training-fields');
            const titleEl = document.getElementById('edit-column-title');
            
            if (val === 'match' || val === 'friendly') {
                matchFields.classList.remove('hidden');
                trainingFields.classList.add('hidden');
                titleEl.textContent = val === 'friendly' ? 'Modifica Amichevole' : 'Modifica Gara';
            } else {
                matchFields.classList.add('hidden');
                trainingFields.classList.remove('hidden');
                titleEl.textContent = 'Modifica Allenamento';
            }
        });
    }

    // Submit handler for Column Modification Popup (both Match and Training)
    const popupEditColumnForm = document.getElementById('form-popup-edit-column');
    if (popupEditColumnForm) {
        popupEditColumnForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const originalDate = document.getElementById('edit-col-original-date').value;
            const targetType = document.getElementById('edit-col-event-type').value; // 'training' | 'match' | 'friendly'
            const newDate = document.getElementById('edit-col-date').value;
            
            const wasMatch = convocations.some(c => c.date === originalDate);
            const isNowMatch = targetType === 'match' || targetType === 'friendly';
            
            // Check duplicates if date changed
            if (newDate !== originalDate) {
                if (isNowMatch) {
                    const exists = convocations.some(c => c.date === newDate);
                    if (exists) {
                        showToast("Esiste giÃƒÂ  una partita/amichevole pianificata in questa data!", "error");
                        return;
                    }
                } else {
                    const exists = trainings.some(t => t.date === newDate);
                    if (exists) {
                        showToast("Esiste giÃƒÂ  un allenamento registrato in questa data!", "error");
                        return;
                    }
                }
            }
            
            if (wasMatch) {
                // Was a match before
                const matchIndex = convocations.findIndex(c => c.date === originalDate);
                if (matchIndex !== -1) {
                    if (isNowMatch) {
                        // Keep as match/friendly, just update
                        const opponent = document.getElementById('edit-col-opponent').value.trim();
                        const notes = document.getElementById('edit-col-notes').value.trim();
                        const location = document.getElementById('edit-col-location').value;
                        
                        let locationPrefix = location === 'C' ? '(C)' : '(T)';
                        let finalOpponent = opponent || (targetType === 'friendly' ? 'Amichevole' : 'Gara');
                        
                        // Rimuovi eventuali (C) o (T) preesistenti alla fine
                        finalOpponent = finalOpponent.replace(/\s*\([CT]\)$/, '');
                        finalOpponent = `${finalOpponent} ${locationPrefix}`;
                        
                        convocations[matchIndex].date = newDate;
                        convocations[matchIndex].opponent = finalOpponent;
                        convocations[matchIndex].notes = notes;
                        convocations[matchIndex].type = targetType;
                        
                        convocations.sort((a, b) => new Date(b.date) - new Date(a.date));
                        localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                        showToast("Gara/Amichevole modificata con successo!", "success");
                    } else {
                        // Converted from Match/Friendly to Training
                        // 1. Remove from convocations
                        convocations.splice(matchIndex, 1);
                        localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                        
                        // 2. Create in trainings
                        const type = document.getElementById('edit-col-type').value.trim();
                        const newSession = {
                            id: Date.now(),
                            date: newDate,
                            type: type || 'Allenamento Tabellone',
                            roster: {}
                        };
                        trainings.push(newSession);
                        trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
                        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                        
                        showToast("Convertito in Allenamento con successo!", "success");
                    }
                }
            } else {
                // Was a training before
                const sessionIndex = trainings.findIndex(t => t.date === originalDate);
                if (isNowMatch) {
                    // Converted from Training to Match/Friendly
                    // 1. Remove from trainings (if it existed in storage)
                    if (sessionIndex !== -1) {
                        trainings.splice(sessionIndex, 1);
                        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                    }
                    
                    // 2. Create in convocations
                    const opponent = document.getElementById('edit-col-opponent').value.trim();
                    const notes = document.getElementById('edit-col-notes').value.trim();
                    const location = document.getElementById('edit-col-location').value;
                    
                    let locationPrefix = location === 'C' ? '(C)' : '(T)';
                    let finalOpponent = opponent || (targetType === 'friendly' ? 'Amichevole' : 'Gara');
                    
                    finalOpponent = finalOpponent.replace(/\s*\([CT]\)$/, '');
                    finalOpponent = `${finalOpponent} ${locationPrefix}`;
                    
                    const newMatch = {
                        id: Date.now(),
                        date: newDate,
                        opponent: finalOpponent,
                        notes: notes,
                        selectedIds: [],
                        type: targetType
                    };
                    convocations.push(newMatch);
                    convocations.sort((a, b) => new Date(b.date) - new Date(a.date));
                    localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                    
                    showToast("Convertito in Gara/Amichevole con successo!", "success");
                } else {
                    // Keep as training, just update
                    const type = document.getElementById('edit-col-type').value.trim();
                    if (sessionIndex !== -1) {
                        trainings[sessionIndex].date = newDate;
                        trainings[sessionIndex].type = type || 'Allenamento Tabellone';
                        
                        trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
                        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                        showToast("Allenamento modificato con successo!", "success");
                    } else {
                        // Create in trainings
                        const newSession = {
                            id: Date.now(),
                            date: newDate,
                            type: type || 'Allenamento Tabellone',
                            roster: {}
                        };
                        trainings.push(newSession);
                        trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
                        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                        showToast("Allenamento salvato con successo!", "success");
                    }
                }
            }
            
            closeModal();
            renderTrainingHistory();
            renderConvocationsHistory();
            renderAttendanceBoard();
            renderRoster(); // Update percentages
        });
    }

    // Click handler for Delete button inside popup
    const deleteColumnBtn = document.getElementById('btn-delete-column');
    if (deleteColumnBtn) {
        deleteColumnBtn.addEventListener('click', () => {
            const originalDate = document.getElementById('edit-col-original-date').value;
            const wasMatch = convocations.some(c => c.date === originalDate);
            
            if (wasMatch) {
                if (confirm("Sei sicuro di voler eliminare questa partita/amichevole? Verranno eliminate anche le relative convocazioni.")) {
                    convocations = convocations.filter(c => c.date !== originalDate);
                    localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                    
                    showToast("Gara/Amichevole eliminata con successo!", "success");
                    closeModal();
                    renderConvocationsHistory();
                    renderAttendanceBoard();
                    renderRoster(); // Update stats
                }
            } else {
                const exists = trainings.some(t => t.date === originalDate);
                if (exists) {
                    if (confirm("Sei sicuro di voler eliminare questo allenamento? Verranno eliminate anche le relative presenze.")) {
                        trainings = trainings.filter(t => t.date !== originalDate);
                        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                        
                        showToast("Allenamento eliminato con successo!", "success");
                        closeModal();
                        renderTrainingHistory();
                        renderAttendanceBoard();
                        renderRoster(); // Update stats
                    }
                } else {
                    showToast("Impossibile eliminare uno slot pre-generato non memorizzato.", "error");
                }
            }
        });
    }
    
    const printDistintaBtn = document.getElementById('btn-print-distinta');
    if (printDistintaBtn) {
        printDistintaBtn.addEventListener('click', () => {
            document.body.classList.add('print-distinta');
            document.body.classList.remove('print-evaluation');
            window.print();
        });
    }
    
    const closeDistintaBtn = document.getElementById('btn-close-distinta');
    if (closeDistintaBtn) {
        closeDistintaBtn.addEventListener('click', () => {
            document.getElementById('distinta-container').classList.add('hidden');
        });
    }

    window.addEventListener('beforeprint', () => {
        // Adapt charts colors dynamically for printer friendly colors
        adaptChartsForPrint(true);
    });

    window.addEventListener('afterprint', () => {
        document.body.classList.remove('print-evaluation', 'print-distinta');
        adaptChartsForPrint(false);
    });

    // 6. Track textarea manual edits
    const strengthPlanTxt = document.getElementById('strength-plan');
    const weaknessGoalTxt = document.getElementById('weakness-goal');
    const weaknessActionTxt = document.getElementById('weakness-action');

    strengthPlanTxt.addEventListener('input', () => userEditedFields.strengthPlan = true);
    weaknessGoalTxt.addEventListener('input', () => userEditedFields.weaknessGoal = true);
    weaknessActionTxt.addEventListener('input', () => userEditedFields.weaknessAction = true);

    // Initial calculations
    updateCalculations();
}

// ==========================================================================
// TAB ROUTING LOGIC
// ==========================================================================
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-navigation .tab-btn, .sidebar-nav .nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Toggle Active class on buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle Active class on panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });

            // Tab-specific trigger actions
            if (targetTab === 'tab-profile') {
                const activeSubTab = document.querySelector('.profile-sub-tab-btn.active');
                const targetSub = activeSubTab ? activeSubTab.getAttribute('data-subtab') : 'subtab-roster-list';
                if (targetSub === 'subtab-roster-list') {
                    renderRoster();
                }
            } else if (targetTab === 'tab-roster') {
                const activeSubTab = document.querySelector('.roster-sub-tab-btn.active');
                const targetSub = activeSubTab ? activeSubTab.getAttribute('data-subtab') : 'subtab-evaluation';
                
                if (targetSub === 'subtab-evaluation') {
                    populatePlayerDropdowns();
                    checkRosterAvailability();
                    setTimeout(() => {
                        if (radarChartInstance) {
                            radarChartInstance.resize();
                            radarChartInstance.update();
                        } else {
                            initRadarChart();
                        }
                    }, 50);
                } else if (targetSub === 'subtab-trends') {
                    populatePlayerDropdowns();
                    handleTrendPlayerChange();
                }
            } else if (targetTab === 'tab-attendance') {
                initAttendanceTab();
            } else if (targetTab === 'tab-athletic') {
                populateAthleticDropdowns();
                const activeSubTab = document.querySelector('.athletic-sub-tab-btn.active');
                const targetSub = activeSubTab ? activeSubTab.getAttribute('data-subtab') : 'subtab-athletic-history';
                if (targetSub === 'subtab-athletic-analysis') {
                    handleAthleticAnalysisPlayerChange();
                } else if (targetSub === 'subtab-athletic-history') {
                    renderAthleticTestsTable();
                } else if (targetSub === 'subtab-athletic-team-fitness') {
                    renderTeamFitnessDashboard();
                }
            }
        });
    });
}

// Check if roster has players before showing form
function checkRosterAvailability() {
    const evalWarning = document.getElementById('evaluation-warning');
    const evalContainer = document.getElementById('evaluation-core-container');
    const selectPlayer = document.getElementById('select-player');

    if (players.length === 0) {
        evalWarning.classList.remove('hidden');
        evalContainer.classList.add('hidden');
        selectPlayer.disabled = true;
    } else {
        evalWarning.classList.add('hidden');
        evalContainer.classList.remove('hidden');
        selectPlayer.disabled = false;
    }
}

// ==========================================================================
// TAB 1: SQUAD ROSTER MANAGEMENT
// ==========================================================================
function setupRosterForm() {
    const form = document.getElementById('form-add-player');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('new-player-name').value.trim();
        const role = document.getElementById('new-player-role').value;
        const number = parseInt(document.getElementById('new-player-number').value, 10);
        const foot = document.getElementById('new-player-foot').value;

        // Check if player name or number already exists on another player
        const exists = players.some(p => p.id !== editingPlayerId && (p.name.toLowerCase() === name.toLowerCase() || p.number === number));
        if (exists) {
            showToast("Giocatore o Numero di Maglia giÃƒÂ  presente in rosa!", "error");
            return;
        }

        const birthYearVal = document.getElementById('new-player-birth-year').value;
        const weightVal = document.getElementById('new-player-weight').value;
        const heightVal = document.getElementById('new-player-height').value;
        const job = document.getElementById('new-player-job').value.trim();
        const experience = document.getElementById('new-player-experience').value.trim();
        const photoFile = document.getElementById('new-player-photo').files[0];

        const birthYear = birthYearVal ? parseInt(birthYearVal, 10) : null;
        const weight = weightVal ? parseInt(weightVal, 10) : null;
        const height = heightVal ? parseInt(heightVal, 10) : null;

        const savePlayer = (photoBase64) => {
            if (editingPlayerId) {
                // Find existing player
                const playerIndex = players.findIndex(p => String(p.id) === String(editingPlayerId));
                if (playerIndex !== -1) {
                    const existingPlayer = players[playerIndex];
                    // Keep old photo if new photo is null/empty
                    const finalPhoto = photoBase64 ? photoBase64 : existingPlayer.photo;

                    players[playerIndex] = {
                        ...existingPlayer,
                        name,
                        role,
                        number,
                        foot,
                        photo: finalPhoto,
                        birthYear,
                        weight,
                        height,
                        job,
                        experience
                    };
                    localStorage.setItem('futsal_portal_players', JSON.stringify(players));
                    showToast(`Giocatore ${name} modificato con successo!`, "success");
                    cancelEdit();
                    closeModal();
                    renderRoster();
                }
            } else {
                const newPlayer = {
                    id: Date.now(),
                    name,
                    role,
                    number,
                    foot,
                    photo: photoBase64,
                    birthYear,
                    weight,
                    height,
                    job,
                    experience
                };
                players.push(newPlayer);
                localStorage.setItem('futsal_portal_players', JSON.stringify(players));
                showToast(`Giocatore ${name} aggiunto con successo!`, "success");
            }

            closeModal();
            renderRoster();
            populatePlayerDropdowns();
            populateAthleticDropdowns();
        };

        if (photoFile) {
            compressPlayerPhoto(photoFile, (compressedBase64) => {
                savePlayer(compressedBase64);
            });
        } else {
            savePlayer(null);
        }
    });
}

function initCardCharts(playerId, catAverages, attStats) {
    // 1. Radar Chart
    const radarCanvas = document.getElementById(`card-radar-${playerId}`);
    if (radarCanvas) {
        const ctx = radarCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['', '', '', ''], // Rimosse le etichette testuali/emoji esterne
                datasets: [
                    {
                        label: 'Giocatore',
                        data: catAverages.player,
                        backgroundColor: 'hsla(185, 90%, 50%, 0.12)',
                        borderColor: 'hsla(185, 90%, 50%, 0.85)',
                        borderWidth: 1.5,
                        pointRadius: 3.5,
                        pointHoverRadius: 5
                    },
                    {
                        label: 'Mister',
                        data: catAverages.coach,
                        backgroundColor: 'hsla(335, 90%, 60%, 0.12)',
                        borderColor: 'hsla(335, 90%, 60%, 0.85)',
                        borderWidth: 1.5,
                        pointRadius: 3.5,
                        pointHoverRadius: 5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 4
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            title: function(context) {
                                const index = context[0].dataIndex;
                                const categories = ['Stato Psicologico', 'Tecnica Individuale', 'Condizione Fisica', 'Tattica'];
                                return categories[index];
                            },
                            label: function(context) {
                                const datasetLabel = context.dataset.label || '';
                                const score = context.raw || 0;
                                return `${datasetLabel}: ${score.toFixed(1)}/10`;
                            }
                        },
                        titleFont: { family: 'Outfit', size: 10, weight: '700' },
                        bodyFont: { family: 'Outfit', size: 9.5 }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 10,
                        ticks: { display: false },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                        pointLabels: {
                            display: false // Disabilitato per una pulizia visiva del grafico
                        }
                    }
                }
            }
        });
    }

    // 2. Attendance Doughnut Chart
    const attCanvas = document.getElementById(`card-attendance-${playerId}`);
    if (attCanvas) {
        const ctx = attCanvas.getContext('2d');
        const total = attStats.present + attStats.absent + attStats.injured + attStats.justified + attStats.convsCount + attStats.test;
        
        if (total === 0) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Nessun dato'],
                    datasets: [{
                        data: [1],
                        backgroundColor: ['rgba(255, 255, 255, 0.08)'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: 4
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    cutout: '75%'
                }
            });
        } else {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Presenze', 'Assenze', 'Infortuni', 'Giustificati', 'Convocazioni', 'Test'],
                    datasets: [{
                        data: [attStats.present, attStats.absent, attStats.injured, attStats.justified, attStats.convsCount, attStats.test],
                        backgroundColor: [
                            'hsla(145, 80%, 45%, 0.85)', // Presente (Verde)
                            'hsla(355, 75%, 55%, 0.85)', // Assente (Rosso)
                            'hsla(35, 95%, 55%, 0.85)',  // Infortunato (Arancio)
                            'hsla(210, 90%, 55%, 0.85)',  // Giustificato (Blu)
                            'hsla(185, 90%, 50%, 0.85)',  // Convocato (Ciano)
                            'hsla(270, 85%, 65%, 0.85)'   // Test (Viola)
                        ],
                        borderColor: 'rgba(3, 6, 15, 0.5)',
                        borderWidth: 0.5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: 4
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const val = context.raw || 0;
                                    const pct = ((val / total) * 100).toFixed(0);
                                    return `${label}: ${val} (${pct}%)`;
                                }
                            },
                            titleFont: { family: 'Outfit', size: 9 },
                            bodyFont: { family: 'Outfit', size: 9 }
                        }
                    },
                    cutout: '70%'
                }
            });
        }
    }
}

function renderRoster() {
    const container = document.getElementById('roster-grid');
    if (!container) return;
    
    // Se ÃƒÂ¨ stato cambiato in roster-container, lo recuperiamo cosÃƒÂ¬, altrimenti se ÃƒÂ¨ ancora roster-grid:
    // UserÃƒÂ² il container originario che ÃƒÂ¨ id="roster-grid" ma ne cambierÃƒÂ² il display block.
    
    if (players.length === 0) {
        container.innerHTML = `
            <div class="empty-roster-msg">
                <p>Nessun giocatore registrato.</p>
                <span class="subtext">Compila il modulo a sinistra per inserire i tuoi atleti nella rosa.</span>
            </div>
        `;
        // Ripristina classe se necessario
        container.className = 'roster-grid';
        return;
    }

    container.innerHTML = '';
    container.className = ''; // Rimuoviamo il display grid originale per usare sezioni in blocco
    
    const sortSelect = document.getElementById('roster-sort-select');
    const sortOrder = sortSelect ? sortSelect.value : 'role';

    if (!window.getInvertedName) {
        window.getInvertedName = (name) => {
            if (!name) return "";
            const parts = name.trim().split(/\s+/);
            if (parts.length < 2) return name;
            const first = parts.shift();
            return parts.join(' ') + ' ' + first;
        };
    }

    const createPlayerCard = (player) => {
        const displayName = window.getInvertedName(player.name);
        const initials = getInitials(player.name);
        const avatarHTML = player.photo 
            ? `<img src="${player.photo}" alt="${escapeHTML(displayName)}" class="player-avatar-img">`
            : `<span class="player-avatar-initials">${initials}</span>`;

        const card = document.createElement('div');
        card.className = 'player-card glass-panel clickable-card';
        card.style.cursor = 'pointer';
        
        const limitYearStr = localStorage.getItem('futsal_under_derogation') || '2004';
        const limitYear = parseInt(limitYearStr, 10);
        if (player.birthYear && parseInt(player.birthYear, 10) >= limitYear) {
            card.style.background = 'rgba(220, 38, 38, 0.6)';
            card.style.border = '1px solid #ef4444';
            card.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.3)';
            card.title = "Giocatore Under";
        }
        card.onclick = (e) => {
            if (e.target.closest('button')) return; // ignora click sui pulsanti azione
            openPlayerSummaryModal(player.id);
        };
        card.innerHTML = `
            <div class="player-card-header">
                <div class="player-card-avatar">
                    <div class="player-avatar-wrapper">
                        ${avatarHTML}
                    </div>
                    <div>
                        <div class="player-card-name">${escapeHTML(displayName)}</div>
                        <div class="player-card-role-row">
                            <span class="player-card-role">${player.role}</span>
                            <span class="player-card-number">#${player.number}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="player-card-actions" style="margin-top: auto;">
                <button class="btn btn-primary btn-mini" onclick="openPlayerSummaryModal('${player.id}')" title="Apri Profilo Completo" style="flex:1;">
                    Apri Profilo
                </button>
            </div>
        `;
        return card;
    };

    if (sortOrder === 'alpha') {
        const sortedPlayers = [...players].sort((a, b) => window.getInvertedName(a.name).localeCompare(window.getInvertedName(b.name)));
        const grid = document.createElement('div');
        grid.className = 'roster-grid';
        grid.style.marginTop = '1.5rem';
        sortedPlayers.forEach(player => {
            grid.appendChild(createPlayerCard(player));
        });
        container.appendChild(grid);
    } else {
        // Group players by role
        const rolesOrder = ['Portiere', 'Centrale', 'Laterale', 'Pivot', 'Universale'];
        const grouped = {};
        players.forEach(p => {
            const r = p.role || 'Altro';
            if(!grouped[r]) grouped[r] = [];
            grouped[r].push(p);
        });
        
        // Sort roles based on order
        const roles = Object.keys(grouped).sort((a, b) => {
            const ia = rolesOrder.indexOf(a);
            const ib = rolesOrder.indexOf(b);
            if (ia === -1 && ib === -1) return a.localeCompare(b);
            if (ia === -1) return 1;
            if (ib === -1) return -1;
            return ia - ib;
        });

        roles.forEach(role => {
            const roleSection = document.createElement('div');
            roleSection.className = 'role-section';
            roleSection.style.marginBottom = '2rem';
            
            roleSection.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
                    <h4 style="color: var(--color-player); margin: 0; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">${role}</h4>
                    <span class="badge" style="background: rgba(255,255,255,0.1); padding: 0.15rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">${grouped[role].length}</span>
                </div>
            `;
            
            const grid = document.createElement('div');
            grid.className = 'roster-grid';
            
            grouped[role].forEach(player => {
                grid.appendChild(createPlayerCard(player));
            });
            
            roleSection.appendChild(grid);
            container.appendChild(roleSection);
        });
    }

    if (typeof renderQuartets === 'function') {
        renderQuartets();
    }
}

window.openPlayerSummaryModal = function(id) {
    const player = players.find(p => String(p.id) === String(id));
    if (!player) return;
    
    // Aggrega i dati
    // 1. Dati anagrafici (giÃƒÂ  in player)
    
    // 2. Ultimi test fisici
    const pTests = typeof athleticTests !== 'undefined' ? athleticTests.filter(t => t.playerId === id).sort((a,b) => new Date(b.date) - new Date(a.date)) : [];
    const latestYoyo = pTests.find(t => t.type === 'yoyo');
    const latestSprint = pTests.find(t => t.type === 'sprint');
    const latestCmj = pTests.find(t => t.type === 'cmj');
    const latestAgility = pTests.find(t => t.type === 'agility');
    const validEvals = typeof assessments !== 'undefined' ? assessments.filter(e => e.playerId === id && (e.coachScores || e.playerScores)) : [];
    
    let coachAvgTech=0, coachAvgTac=0, coachAvgPhy=0, coachAvgPsy=0, coachAvgOverall=0;
    let coachActualLen = 0;
    let coachSubSkillTotals = {};
    
    let playerAvgTech=0, playerAvgTac=0, playerAvgPhy=0, playerAvgPsy=0, playerAvgOverall=0;
    let playerActualLen = 0;
    let playerSubSkillTotals = {};
    
    const keysPsy = ['psic-focus', 'psic-stress', 'psic-grinta', 'psic-team'];
    const keysTech = ['tecn-control', 'tecn-pass', 'tecn-shot', 'tecn-dribble'];
    const keysPhy = ['fisi-speed', 'fisi-stamina', 'fisi-strength', 'fisi-agility'];
    const keysTac = ['tatt-movement', 'tatt-defense', 'tatt-transition', 'tatt-reading'];
    const allSubKeys = [...keysTech, ...keysTac, ...keysPhy, ...keysPsy];
    
    allSubKeys.forEach(k => {
        coachSubSkillTotals[k] = 0;
        playerSubSkillTotals[k] = 0;
    });

    if(validEvals.length > 0) {
        validEvals.forEach(e => {
            const processScores = (scores, isCoach) => {
                if (!scores || Object.keys(scores).length === 0) return;
                
                let isAllFives = true;
                allSubKeys.forEach(k => {
                    if (scores[k] !== undefined && parseInt(scores[k]) !== 5) isAllFives = false;
                });
                
                // If it's the only evaluation, we count it even if it's all 5s. If there are >1, we skip default 5s.
                if (isAllFives && validEvals.length > 1) return;
                
                if (isCoach) coachActualLen++;
                else playerActualLen++;
                
                const getAvg = (keys) => {
                    let s = 0; let count = 0;
                    keys.forEach(k => {
                        let val = 5;
                        if (scores[k] !== undefined && !isNaN(parseInt(scores[k]))) val = parseInt(scores[k]);
                        s += val;
                        if (isCoach) coachSubSkillTotals[k] += val;
                        else playerSubSkillTotals[k] += val;
                        count++;
                    });
                    return count > 0 ? s / count : 5;
                };

                const psy = getAvg(keysPsy);
                const tech = getAvg(keysTech);
                const phy = getAvg(keysPhy);
                const tac = getAvg(keysTac);
                
                if (isCoach) {
                    coachAvgPsy += psy; coachAvgTech += tech; coachAvgPhy += phy; coachAvgTac += tac;
                    coachAvgOverall += parseFloat(e.overallCoach) || ((psy + tech + phy + tac) / 4);
                } else {
                    playerAvgPsy += psy; playerAvgTech += tech; playerAvgPhy += phy; playerAvgTac += tac;
                    playerAvgOverall += parseFloat(e.overallPlayer) || ((psy + tech + phy + tac) / 4);
                }
            };
            
            processScores(e.coachScores, true);
            processScores(e.playerScores, false);
        });
        
        const finalizeAverages = (actualLen, avgPsy, avgTech, avgPhy, avgTac, avgOverall, subSkillTotals) => {
            if (actualLen > 0) {
                avgPsy = (avgPsy/actualLen).toFixed(1);
                avgTech = (avgTech/actualLen).toFixed(1);
                avgPhy = (avgPhy/actualLen).toFixed(1);
                avgTac = (avgTac/actualLen).toFixed(1);
                avgOverall = (avgOverall/actualLen).toFixed(1);
                allSubKeys.forEach(k => subSkillTotals[k] = (subSkillTotals[k] / actualLen).toFixed(1));
            } else {
                avgPsy = '-'; avgTech = '-'; avgPhy = '-'; avgTac = '-'; avgOverall = '-';
                allSubKeys.forEach(k => subSkillTotals[k] = '-');
            }
            return { avgPsy, avgTech, avgPhy, avgTac, avgOverall, subSkillTotals };
        };
        
        const coachRes = finalizeAverages(coachActualLen, coachAvgPsy, coachAvgTech, coachAvgPhy, coachAvgTac, coachAvgOverall, coachSubSkillTotals);
        coachAvgPsy = coachRes.avgPsy; coachAvgTech = coachRes.avgTech; coachAvgPhy = coachRes.avgPhy; coachAvgTac = coachRes.avgTac; coachAvgOverall = coachRes.avgOverall;
        
        const playerRes = finalizeAverages(playerActualLen, playerAvgPsy, playerAvgTech, playerAvgPhy, playerAvgTac, playerAvgOverall, playerSubSkillTotals);
        playerAvgPsy = playerRes.avgPsy; playerAvgTech = playerRes.avgTech; playerAvgPhy = playerRes.avgPhy; playerAvgTac = playerRes.avgTac; playerAvgOverall = playerRes.avgOverall;
    } else {
        coachAvgPsy='-'; coachAvgTech='-'; coachAvgPhy='-'; coachAvgTac='-'; coachAvgOverall='-';
        playerAvgPsy='-'; playerAvgTech='-'; playerAvgPhy='-'; playerAvgTac='-'; playerAvgOverall='-';
        allSubKeys.forEach(k => { coachSubSkillTotals[k] = '-'; playerSubSkillTotals[k] = '-'; });
    }
    
    // 4. Presenze e Convocazioni
    let presentCount = 0;
    let totalAtt = 0;
    const allActivities = [];
    if (typeof trainings !== 'undefined') {
        trainings.forEach(t => {
            if(t.roster && t.roster[id] !== undefined && t.roster[id] !== '-') {
                totalAtt++;
                if(t.roster[id] === 'P') presentCount++;
                allActivities.push({ date: t.date, type: t.type, status: t.roster[id], isMatch: false });
            }
        });
    }
    const attPerc = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 0;
    const convocationsCount = typeof convocations !== 'undefined' ? convocations.filter(c => c.selectedIds && c.selectedIds.includes(id)).length : 0;
    
    if (typeof convocations !== 'undefined') {
        convocations.forEach(c => {
            const isCalled = c.selectedIds && c.selectedIds.includes(id);
            allActivities.push({ date: c.date, type: c.type === 'friendly' ? 'Amichevole' : 'Gara', status: isCalled ? 'C' : '-', isMatch: true, opponent: c.opponent });
        });
    }
    
    allActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentActivities = allActivities.slice(0, 8);
    
    let recentPresenzeHTML = '';
    if (recentActivities.length > 0) {
        recentPresenzeHTML = `
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
            <thead>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:var(--text-muted);">
                    <th style="padding:0.4rem;">Data</th>
                    <th style="padding:0.4rem;">Tipo</th>
                    <th style="padding:0.4rem;">Esito</th>
                </tr>
            </thead>
            <tbody>
                ${recentActivities.map(act => {
                    let statusLabel = act.status;
                    let color = '#fff';
                    if(act.status === 'P') { statusLabel = 'Presente'; color = 'var(--color-tatt)'; }
                    else if(act.status === 'A') { statusLabel = 'Assente'; color = 'var(--color-danger)'; }
                    else if(act.status === 'I') { statusLabel = 'Infortunato'; color = 'var(--color-fisi)'; }
                    else if(act.status === 'G') { statusLabel = 'Giustificato'; color = 'var(--color-primary)'; }
                    else if(act.status === 'T') { statusLabel = 'Test'; color = 'var(--color-psic)'; }
                    else if(act.status === 'C') { statusLabel = 'Convocato'; color = 'var(--color-player)'; }
                    else if(act.status === '-') { statusLabel = 'Non conv.'; color = 'var(--text-muted)'; }
                    
                    const typeLabel = act.isMatch ? `${act.type} vs ${act.opponent}` : act.type;
                    
                    return `
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                            <td style="padding:0.4rem;">${formatDate(act.date)}</td>
                            <td style="padding:0.4rem;">${escapeHTML(typeLabel)}</td>
                            <td style="padding:0.4rem; color:${color}; font-weight:bold;">${statusLabel}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>`;
    } else {
        recentPresenzeHTML = `<div style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:1rem;">Nessuna attività registrata</div>`;
    }

    const modalBody = document.getElementById('player-summary-body');
    
    const initials = getInitials(player.name);
    const avatarHTML = player.photo 
        ? `<img src="${player.photo}" alt="${escapeHTML(player.name)}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid var(--color-player);">`
        : `<div style="width:100px; height:100px; border-radius:50%; background:var(--color-player); display:flex; align-items:center; justify-content:center; font-size:2.5rem; font-weight:bold; color:#0f172a;">${initials}</div>`;

    // Helper to determine the displayed value and the average fallback
    const pTechVal = validEvals.length > 0 ? playerAvgTech : '-';
    const pTacVal = validEvals.length > 0 ? playerAvgTac : '-';
    const pPhyVal = validEvals.length > 0 ? playerAvgPhy : '-';
    const pPsyVal = validEvals.length > 0 ? playerAvgPsy : '-';
    
    const techVal = validEvals.length > 0 ? coachAvgTech : '-';
    const tacVal = validEvals.length > 0 ? coachAvgTac : '-';
    const phyVal = validEvals.length > 0 ? coachAvgPhy : '-';
    const psyVal = validEvals.length > 0 ? coachAvgPsy : '-';
    const coachVal = validEvals.length > 0 ? coachAvgOverall : '-';
    
    const yoyoVal = latestYoyo ? latestYoyo.value : '-';
    const sprintVal = latestSprint ? latestSprint.value : '-';
    const cmjVal = latestCmj ? latestCmj.value : '-';
    const ttestVal = latestAgility ? latestAgility.value : '-';

    modalBody.innerHTML = `
        <!-- Header Info (EDITABLE) -->
        <div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap; background:rgba(255,255,255,0.03); padding:1rem; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">
            <div style="transform: scale(0.8); transform-origin: left center;">${avatarHTML}</div>
            <div style="flex:1; min-width:200px; display:flex; flex-direction:column; gap:0.25rem;">
                <input type="text" id="edit-dossier-name" value="${escapeHTML(window.getInvertedName(player.name))}" style="font-size:1.4rem; font-weight:bold; color:var(--text-main); background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:0.2rem 0.5rem; width:100%; font-family:inherit;" />
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
                    <select id="edit-dossier-role" style="background:var(--color-player); color:#000; font-size:0.8rem; padding:0.2rem 0.5rem; border-radius:20px; border:none; font-weight:bold; cursor:pointer;">
                        <option value="Universale" ${player.role==='Universale'?'selected':''}>Universale</option>
                        <option value="Laterale" ${player.role==='Laterale'?'selected':''}>Laterale</option>
                        <option value="Pivot" ${player.role==='Pivot'?'selected':''}>Pivot</option>
                        <option value="Back" ${player.role==='Back'?'selected':''}>Back</option>
                        <option value="Portiere" ${player.role==='Portiere'?'selected':''}>Portiere</option>
                    </select>
                    <div style="display:flex; align-items:center; gap:0.25rem; background:rgba(255,255,255,0.1); padding:0.1rem 0.5rem; border-radius:20px;">
                        <span style="font-size:0.8rem;">#</span>
                        <input type="number" id="edit-dossier-number" value="${player.number || ''}" style="width:30px; background:transparent; border:none; color:#fff; font-weight:bold; font-size:0.8rem; text-align:center;" />
                    </div>
                    <div style="display:flex; align-items:center; gap:0.25rem; background:rgba(255,255,255,0.1); padding:0.1rem 0.5rem; border-radius:20px;">
                        <span style="font-size:0.8rem;">Classe</span>
                        <input type="number" id="edit-dossier-birth" value="${player.birthYear || ''}" style="width:40px; background:transparent; border:none; color:#fff; font-weight:bold; font-size:0.8rem; text-align:center;" />
                    </div>
                </div>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:0.25rem; text-align:right; font-size:0.8rem;">
                <div style="display:flex; justify-content:flex-end; align-items:center; gap:0.25rem; color:var(--text-muted);">
                    Alt: <input type="number" id="edit-dossier-height" value="${player.height || ''}" style="width:45px; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.1rem; color:#fff; text-align:center;" />
                    Peso: <input type="number" id="edit-dossier-weight" value="${player.weight || ''}" style="width:45px; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.1rem; color:#fff; text-align:center;" />
                </div>
                <div style="display:flex; justify-content:flex-end; align-items:center; gap:0.25rem; color:var(--text-muted);">
                    Piede: 
                    <select id="edit-dossier-foot" style="background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.1rem; color:#fff;">
                        <option value="Destro" ${player.foot==='Destro'?'selected':''}>Destro</option>
                        <option value="Mancino" ${player.foot==='Mancino'?'selected':''}>Mancino</option>
                        <option value="Ambidestro" ${player.foot==='Ambidestro'?'selected':''}>Ambidestro</option>
                    </select>
                </div>
            </div>
            
            <div style="flex-basis: 100%; display:flex; gap:0.5rem; margin-top:0.25rem; padding-top:0.5rem; border-top:1px dashed rgba(255,255,255,0.1);">
                <input type="text" id="edit-dossier-job" value="${escapeHTML(player.job || '')}" placeholder="Lavoro/Studio" style="flex:1; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.25rem; color:#fff; font-size:0.8rem;" />
                <input type="text" id="edit-dossier-notes" value="${escapeHTML(player.notes || '')}" placeholder="Note Profilo..." style="flex:2; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.25rem; color:#fff; font-size:0.8rem;" />
            </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem; margin-top:0.75rem;">
            
            <!-- Performance -->
            <div class="glass-panel" style="padding:0.75rem; grid-column: 1 / -1;">
                <h4 style="margin-top:0; margin-bottom:0.25rem; color:var(--color-tech); border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.25rem; font-size:0.95rem;">Performance & Autovalutazione</h4>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem; overflow:hidden;">
                    <div style="flex:1; min-width:0; position:relative; min-height: 200px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                        <canvas id="dossier-radar-chart"></canvas>
                    </div>
                    <div style="flex:1; min-width:0; position:relative; min-height: 200px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                        <canvas id="dossier-specific-chart"></canvas>
                    </div>
                </div>
                <div style="display:flex; justify-content:space-around; align-items:center; margin-top:0.5rem; text-align:center; background:rgba(0,0,0,0.2); padding:0.5rem; border-radius:6px;">
                    <div><div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Tecnica</div><div style="font-size:1.1rem; font-weight:bold; color:#4ade80;">${techVal}</div><div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">Auto-val: <span style="color:#fff;">${pTechVal}</span></div></div>
                    <div><div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Tattica</div><div style="font-size:1.1rem; font-weight:bold; color:#facc15;">${tacVal}</div><div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">Auto-val: <span style="color:#fff;">${pTacVal}</span></div></div>
                    <div><div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Fisica</div><div style="font-size:1.1rem; font-weight:bold; color:#f87171;">${phyVal}</div><div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">Auto-val: <span style="color:#fff;">${pPhyVal}</span></div></div>
                    <div><div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Psicologia</div><div style="font-size:1.1rem; font-weight:bold; color:#c084fc;">${psyVal}</div><div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">Auto-val: <span style="color:#fff;">${pPsyVal}</span></div></div>
                </div>
            </div>

            <!-- Test Atletici -->
            <div class="glass-panel" style="padding:0.75rem;">
                <h4 style="margin-top:0; margin-bottom:0.5rem; color:var(--color-tatt); border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.25rem; font-size:0.95rem;">Test Atletici</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; text-align:center;">
                    <div><div style="font-size:0.7rem; color:var(--text-muted);">Yo-Yo (m)</div><div style="font-size:1rem; font-weight:bold; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:0.1rem;">${yoyoVal}</div></div>
                    <div><div style="font-size:0.7rem; color:var(--text-muted);">Sprint (s)</div><div style="font-size:1rem; font-weight:bold; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:0.1rem;">${sprintVal}</div></div>
                    <div><div style="font-size:0.7rem; color:var(--text-muted);">CMJ (cm)</div><div style="font-size:1rem; font-weight:bold; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:0.1rem;">${cmjVal}</div></div>
                    <div><div style="font-size:0.7rem; color:var(--text-muted);">T-Test (s)</div><div style="font-size:1rem; font-weight:bold; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:0.1rem;">${ttestVal}</div></div>
                </div>
            </div>

            <!-- Presenze -->
            <div class="glass-panel" style="padding:0.75rem;">
                <h4 style="margin-top:0; margin-bottom:0.5rem; color:var(--color-psy); border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.25rem; font-size:0.95rem;">Presenze</h4>
                <div style="display:flex; justify-content:space-around; align-items:center; text-align:center;">
                    <div><div style="font-size:0.7rem; color:var(--text-muted);">Allenamenti</div><div style="font-size:1.4rem; font-weight:bold; color:${attPerc > 75 ? 'var(--color-phy)' : (attPerc > 50 ? 'var(--color-coach)' : 'var(--color-psy)')};">${attPerc}%</div><div style="font-size:0.65rem; color:var(--text-muted);">${presentCount}/${totalAtt}</div></div>
                    <div><div style="font-size:0.7rem; color:var(--text-muted);">Convocazioni</div><div style="font-size:1.4rem; font-weight:bold; color:var(--color-tecn);">${convocationsCount}</div><div style="font-size:0.65rem; color:var(--text-muted);">Gare</div></div>
                </div>
            </div>

            <!-- Ruoli & Adattabilità -->
            <div class="glass-panel" style="padding:0.75rem; grid-column: 1 / -1; display:flex; gap:0.75rem; flex-wrap:wrap; align-items:center;">
                <div style="flex:1; min-width:140px;">
                    <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:0.2rem;">Adattabilità</div>
                    <select id="edit-dossier-sec-roles" style="background:#1e293b; border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.3rem; color:#fff; width:100%; font-size:0.8rem; cursor:pointer;">
                        <option value="" ${!player.secondaryRoles ? 'selected' : ''}>Nessuna</option>
                        <option value="Laterale Destro" ${player.secondaryRoles==='Laterale Destro'?'selected':''}>Laterale Destro</option>
                        <option value="Laterale Sinistro" ${player.secondaryRoles==='Laterale Sinistro'?'selected':''}>Laterale Sinistro</option>
                        <option value="Pivot di Manovra" ${player.secondaryRoles==='Pivot di Manovra'?'selected':''}>Pivot di Manovra</option>
                        <option value="Pivot di Profondità" ${player.secondaryRoles==='Pivot di Profondità'?'selected':''}>Pivot di Profondità</option>
                        <option value="Difensore d'Impostazione" ${player.secondaryRoles==="Difensore d'Impostazione"?'selected':''}>Difensore d'Impostazione</option>
                        <option value="Difensore Marcatore" ${player.secondaryRoles==='Difensore Marcatore'?'selected':''}>Difensore Marcatore</option>
                        <option value="Portiere Volante" ${player.secondaryRoles==='Portiere Volante'?'selected':''}>Portiere Volante</option>
                        <option value="Universale a tutto campo" ${player.secondaryRoles==='Universale a tutto campo'?'selected':''}>Universale a tutto campo</option>
                    </select>
                </div>
                <div style="flex:1; min-width:140px;">
                    <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:0.2rem;">Quartetto</div>
                    <select id="edit-dossier-quartets" style="background:#1e293b; border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.3rem; color:#fff; width:100%; font-size:0.8rem; cursor:pointer;">
                        <option value="" ${!player.quartets ? 'selected' : ''}>Nessuno</option>
                        <option value="1° Quartetto (Titolari)" ${player.quartets==='1° Quartetto (Titolari)'?'selected':''}>1° Quartetto (Titolari)</option>
                        <option value="2° Quartetto (Prime Rotazioni)" ${player.quartets==='2° Quartetto (Prime Rotazioni)'?'selected':''}>2° Quartetto (Prime Rotazioni)</option>
                        <option value="3° Quartetto (Seconde Rotazioni)" ${player.quartets==='3° Quartetto (Seconde Rotazioni)'?'selected':''}>3° Quartetto (Seconde Rotazioni)</option>
                        <option value="Rotazione Libera" ${player.quartets==='Rotazione Libera'?'selected':''}>Rotazione Libera</option>
                    </select>
                </div>
                <div style="flex:1; min-width:140px;">
                    <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:0.2rem;">Pt. di Movimento</div>
                    <select id="edit-dossier-quinto" style="background:#1e293b; border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.3rem; color:#fff; width:100%; font-size:0.8rem; cursor:pointer;">
                        <option value="" ${!player.quinto ? 'selected' : ''}>No</option>
                        <option value="Portiere di Movimento" ${player.quinto==='Portiere di Movimento'?'selected':''}>Portiere di Movimento</option>
                        <option value="Intermedio SX" ${player.quinto==='Intermedio SX'?'selected':''}>Intermedio SX</option>
                        <option value="Intermedio DX" ${player.quinto==='Intermedio DX'?'selected':''}>Intermedio DX</option>
                        <option value="Finalizzatore SX" ${player.quinto==='Finalizzatore SX'?'selected':''}>Finalizzatore SX</option>
                        <option value="Finalizzatore DX" ${player.quinto==='Finalizzatore DX'?'selected':''}>Finalizzatore DX</option>
                    </select>
                </div>
            </div>
            
            <div style="grid-column: 1 / -1; display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.25rem;">
                <button class="btn btn-danger" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="if(confirm('Sei sicuro di voler eliminare questo giocatore?')) { deletePlayer('${player.id}'); closePlayerSummaryModal(); }">Cancella</button>
                <button class="btn btn-primary" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="savePlayerFromDossier('${player.id}')">Salva Modifiche</button>
            </div>
        </div>
    `;
    // Assicuriamoci che tutti gli altri popup siano nascosti
    document.querySelectorAll('.modal-overlay .modal-content').forEach(m => m.classList.add('hidden'));

    document.getElementById('modal-overlay').classList.remove('hidden');
    document.getElementById('popup-player-summary').classList.remove('hidden');

    // Render Radar Charts
    setTimeout(() => {
        // Chart 1: Macro
        const ctx1 = document.getElementById('dossier-radar-chart');
        if (ctx1) {
            const cTech = coachAvgTech !== '-' ? coachAvgTech : 0;
            const cTac = coachAvgTac !== '-' ? coachAvgTac : 0;
            const cPhy = coachAvgPhy !== '-' ? coachAvgPhy : 0;
            const cPsy = coachAvgPsy !== '-' ? coachAvgPsy : 0;
            const cCoach = coachAvgOverall !== '-' ? coachAvgOverall : 0;
            
            const pTech = playerAvgTech !== '-' ? playerAvgTech : 0;
            const pTac = playerAvgTac !== '-' ? playerAvgTac : 0;
            const pPhy = playerAvgPhy !== '-' ? playerAvgPhy : 0;
            const pPsy = playerAvgPsy !== '-' ? playerAvgPsy : 0;
            const pCoach = playerAvgOverall !== '-' ? playerAvgOverall : 0;

            if (window.dossierChart) window.dossierChart.destroy();
            
            const macroDatasets = [];
            if (playerAvgOverall !== '-') {
                macroDatasets.push({
                    label: 'Giocatore (Autovalutazione)',
                    data: [pPsy, pTech, pPhy, pTac],
                    backgroundColor: 'hsla(185, 90%, 50%, 0.15)',
                    borderColor: 'hsla(185, 90%, 50%, 0.9)',
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: 'hsla(185, 90%, 50%, 1)',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: 'hsla(185, 90%, 50%, 1)',
                    borderWidth: 2,
                });
            }
            if (coachAvgOverall !== '-') {
                macroDatasets.push({
                    label: 'Mister (Valutazione)',
                    data: [cPsy, cTech, cPhy, cTac],
                    backgroundColor: 'hsla(335, 90%, 60%, 0.15)',
                    borderColor: 'hsla(335, 90%, 60%, 0.9)',
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: 'hsla(335, 90%, 60%, 1)',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: 'hsla(335, 90%, 60%, 1)',
                    borderWidth: 2,
                });
            }

            window.dossierChart = new Chart(ctx1, {
                type: 'radar',
                data: {
                    labels: ['Stato Psicologico', 'Tecnica Individuale', 'Condizione Fisica', 'Tattica'],
                    datasets: macroDatasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            pointLabels: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 11, family: 'Outfit', weight: 'bold' } },
                            ticks: { display: false, min: 0, max: 10, stepSize: 2 }
                        }
                    },
                    plugins: {
                        legend: { display: true, position: 'bottom', labels: { color: 'rgba(255, 255, 255, 0.8)' } },
                        tooltip: { backgroundColor: 'rgba(0,0,0,0.8)' }
                    }
                }
            });
        }

        // Chart 2: Specific Skills
        const ctx2 = document.getElementById('dossier-specific-chart');
        if (ctx2) {
            // Mapping keys to friendly labels
            const specificLabels = [
                'Controllo', 'Passaggio', 'Tiro', 'Dribbling',
                'Movimento', 'Difesa', 'Transizioni', 'Lettura',
                'Velocità', 'Resistenza', 'Forza', 'Agilità',
                'Focus', 'Stress', 'Grinta', 'Team'
            ];
            
            const sc = coachSubSkillTotals;
            const sp = playerSubSkillTotals;
            
            const safeNum = (v) => {
                const parsed = parseFloat(v);
                return (!isNaN(parsed) && v !== '-') ? parsed : 0;
            };
            
            const coachSpecificData = [
                safeNum(sc['tecn-control']), safeNum(sc['tecn-pass']), safeNum(sc['tecn-shot']), safeNum(sc['tecn-dribble']),
                safeNum(sc['tatt-movement']), safeNum(sc['tatt-defense']), safeNum(sc['tatt-transition']), safeNum(sc['tatt-reading']),
                safeNum(sc['fisi-speed']), safeNum(sc['fisi-stamina']), safeNum(sc['fisi-strength']), safeNum(sc['fisi-agility']),
                safeNum(sc['psic-focus']), safeNum(sc['psic-stress']), safeNum(sc['psic-grinta']), safeNum(sc['psic-team'])
            ];

            const playerSpecificData = [
                safeNum(sp['tecn-control']), safeNum(sp['tecn-pass']), safeNum(sp['tecn-shot']), safeNum(sp['tecn-dribble']),
                safeNum(sp['tatt-movement']), safeNum(sp['tatt-defense']), safeNum(sp['tatt-transition']), safeNum(sp['tatt-reading']),
                safeNum(sp['fisi-speed']), safeNum(sp['fisi-stamina']), safeNum(sp['fisi-strength']), safeNum(sp['fisi-agility']),
                safeNum(sp['psic-focus']), safeNum(sp['psic-stress']), safeNum(sp['psic-grinta']), safeNum(sp['psic-team'])
            ];

            if (window.dossierSpecificChart) window.dossierSpecificChart.destroy();
            
            const specificDatasets = [];
            if (coachAvgOverall !== '-') {
                specificDatasets.push({
                    label: 'Valutazione Mister',
                    data: coachSpecificData,
                    backgroundColor: 'rgba(20, 184, 166, 0.25)', // Teal
                    borderColor: 'rgba(20, 184, 166, 1)',
                    pointBackgroundColor: 'rgba(20, 184, 166, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(20, 184, 166, 1)',
                    borderWidth: 2,
                });
            }
            if (playerAvgOverall !== '-') {
                specificDatasets.push({
                    label: 'Autovalutazione Giocatore',
                    data: playerSpecificData,
                    backgroundColor: 'rgba(234, 179, 8, 0.25)', // Yellow
                    borderColor: 'rgba(234, 179, 8, 1)',
                    pointBackgroundColor: 'rgba(234, 179, 8, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(234, 179, 8, 1)',
                    borderWidth: 2,
                });
            }

            window.dossierSpecificChart = new Chart(ctx2, {
                type: 'radar',
                data: {
                    labels: specificLabels,
                    datasets: specificDatasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            pointLabels: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 10, family: 'Outfit', weight: 'normal' } },
                            ticks: { display: false, min: 0, max: 10, stepSize: 2 }
                        }
                    },
                    plugins: {
                        legend: { display: true, position: 'bottom', labels: { color: 'rgba(255, 255, 255, 0.8)' } },
                        tooltip: { backgroundColor: 'rgba(0,0,0,0.8)' }
                    }
                }
            });
        }
    }, 150);
};

window.closePlayerSummaryModal = function() {
    document.getElementById('popup-player-summary').classList.add('hidden');
    // Nascondi overlay solo se non ci sono altri modal aperti (in questo caso ÃƒÂ¨ semplice)
    document.getElementById('modal-overlay').classList.add('hidden');
};

window.savePlayerFromDossier = function(id) {
    const playerIndex = players.findIndex(p => String(p.id) === String(id));
    if (playerIndex === -1) return;

    players[playerIndex].name = window.getInvertedName(document.getElementById('edit-dossier-name').value);
    players[playerIndex].role = document.getElementById('edit-dossier-role').value;
    players[playerIndex].number = document.getElementById('edit-dossier-number').value;
    players[playerIndex].birthYear = document.getElementById('edit-dossier-birth').value;
    players[playerIndex].height = document.getElementById('edit-dossier-height').value;
    players[playerIndex].weight = document.getElementById('edit-dossier-weight').value;
    players[playerIndex].foot = document.getElementById('edit-dossier-foot').value;
    players[playerIndex].job = document.getElementById('edit-dossier-job').value.trim();
    players[playerIndex].notes = document.getElementById('edit-dossier-notes').value.trim();
    players[playerIndex].secondaryRoles = document.getElementById('edit-dossier-sec-roles').value.trim();
    players[playerIndex].quartets = document.getElementById('edit-dossier-quartets').value.trim();
    players[playerIndex].quinto = document.getElementById('edit-dossier-quinto').value.trim();
    localStorage.setItem('futsal_portal_players', JSON.stringify(players));
    
    showToast("Profilo aggiornato!", "success");
    closePlayerSummaryModal();
    if(typeof renderRoster === 'function') renderRoster();
};

window.deletePlayer = function(id) {
    const player = players.find(p => String(p.id) === String(id));
    if (!player) return;

    if (confirm(`Sei sicuro di voler rimuovere ${player.name} dalla rosa? Verranno eliminate anche tutte le sue valutazioni storiche.`)) {
        players = players.filter(p => p.id !== id);
        assessments = assessments.filter(a => a.playerId !== id);
        athleticTests = athleticTests.filter(t => t.playerId !== id);

        localStorage.setItem('futsal_portal_players', JSON.stringify(players));
        localStorage.setItem('futsal_portal_assessments', JSON.stringify(assessments));
        localStorage.setItem('futsal_portal_athletic_tests', JSON.stringify(athleticTests));

        showToast(`Giocatore ${player.name} rimosso.`, "info");
        renderRoster();
        populatePlayerDropdowns();
        populateAthleticDropdowns();
    }
};

window.initNewValForPlayer = function(playerId) {
    // Switch to Tab 1 (tab-roster)
    document.querySelector('.tab-btn[data-tab="tab-roster"]').click();
    // Switch to sub-tab "Nuova Valutazione"
    document.querySelector('.roster-sub-tab-btn[data-subtab="subtab-evaluation"]').click();
    document.getElementById('select-player').value = playerId;
    // Trigger change event to load last assessment or reset
    handlePlayerChange();
};

window.viewTrendForPlayer = function(playerId) {
    // Switch to Tab 1 (tab-roster)
    document.querySelector('.tab-btn[data-tab="tab-roster"]').click();
    // Switch to sub-tab "Storico & Trend"
    document.querySelector('.roster-sub-tab-btn[data-subtab="subtab-trends"]').click();
    document.getElementById('select-trend-player').value = playerId;
    // Trigger change event to load trend graphs
    handleTrendPlayerChange();
};

// ==========================================================================
// POPULATE DROPDOWNS
// ==========================================================================
function populatePlayerDropdowns() {
    const selectPlayer = document.getElementById('select-player');
    const selectTrendPlayer = document.getElementById('select-trend-player');

    // Save current selections
    const prevSelectVal = selectPlayer.value;
    const prevTrendVal = selectTrendPlayer.value;

    const optionsHTML = `
        <option value="">-- Seleziona Giocatore --</option>
        ${players.map(p => `<option value="${p.id}">${escapeHTML(p.name)} (#${p.number})</option>`).join('')}
    `;

    selectPlayer.innerHTML = optionsHTML;
    selectTrendPlayer.innerHTML = optionsHTML;

    // Restore selections if player still exists
    if (players.some(p => p.id == prevSelectVal)) selectPlayer.value = prevSelectVal;
    if (players.some(p => p.id == prevTrendVal)) selectTrendPlayer.value = prevTrendVal;
}

// ==========================================================================
// TAB 2: EVALUATIONS & CALCULATIONS
// ==========================================================================
function setupEvaluationForm() {
    const dateInput = document.getElementById('assessment-date');
    const selectPlayer = document.getElementById('select-player');

    // Set today
    dateInput.value = new Date().toISOString().split('T')[0];

    // Player Selection Change
    selectPlayer.addEventListener('change', handlePlayerChange);

    // Range Sliders Input hook
    const sliders = document.querySelectorAll('.slider-input');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            
            // 1. Update text label
            document.getElementById(`val-${e.target.id}`).textContent = val;

            // 2. Parse ID and save in temporary state arrays
            const idParts = e.target.id.split('-');
            const param = idParts[0] + '-' + idParts[1];
            const role = idParts[2]; // 'player' | 'coach'

            if (role === 'player') {
                tempPlayerScores[param] = val;
            } else {
                tempCoachScores[param] = val;
            }

            // 3. Update scores and graphics
            updateCalculations();
        });
    });

    initRadarChart();
}

function syncSlidersUI() {
    const sliders = document.querySelectorAll('.slider-input');
    sliders.forEach(slider => {
        const idParts = slider.id.split('-');
        const param = idParts[0] + '-' + idParts[1];
        const role = idParts[2];

        const score = role === 'player' ? tempPlayerScores[param] : tempCoachScores[param];
        slider.value = score || 5;

        const valSpan = document.getElementById(`val-${slider.id}`);
        if (valSpan) {
            valSpan.textContent = slider.value;
        }
    });
}

function handlePlayerChange() {
    const playerId = parseInt(document.getElementById('select-player').value, 10);
    
    if (!playerId) {
        resetAssessmentForm();
        return;
    }

    const player = players.find(p => p.id === playerId);
    updateAthleteProfileCard(player);

    // Check if there is an existing assessment for this player to load as base
    const playerSheets = assessments.filter(a => a.playerId === playerId);
    
    if (playerSheets.length > 0) {
        // Load the most recent evaluation as a template
        playerSheets.sort((a, b) => b.id - a.id); // descending (newest first)
        const latest = playerSheets[0];

        tempPlayerScores = { ...latest.playerScores };
        tempCoachScores = { ...latest.coachScores };
        
        // Fill textareas
        document.getElementById('strength-plan').value = latest.strengthPlan || '';
        document.getElementById('weakness-goal').value = latest.weaknessGoal || '';
        document.getElementById('weakness-action').value = latest.actionPlan || '';

        // Reset trackers
        userEditedFields = {
            strengthPlan: !!latest.strengthPlan,
            weaknessGoal: !!latest.weaknessGoal,
            weaknessAction: !!latest.actionPlan
        };

        activeAssessmentId = null; // Treat as a new entry by default, unless loaded from Tab 3 history list

        // Set date to today instead of old date to prevent accidental overwrites of history
        document.getElementById('assessment-date').value = new Date().toISOString().split('T')[0];

        showToast("Caricate valutazioni precedenti come base di compilazione.", "info");
    } else {
        // Brand new player, reset completely
        resetTemporaryScores();
        clearGrowthPlanFields();
    }

    // Sync sliders UI with states
    syncSlidersUI();

    // Update averages
    updateCalculations();
}

function resetTemporaryScores() {
    tempPlayerScores = {};
    tempCoachScores = {};
    Object.keys(paramInfo).forEach(key => {
        tempPlayerScores[key] = 5;
        tempCoachScores[key] = 5;
    });
}

function clearGrowthPlanFields() {
    document.getElementById('strength-plan').value = '';
    document.getElementById('weakness-goal').value = '';
    document.getElementById('weakness-action').value = '';
    userEditedFields = {
        strengthPlan: false,
        weaknessGoal: false,
        weaknessAction: false
    };
    activeAssessmentId = null;
}

function resetAssessmentForm() {
    document.getElementById('select-player').value = '';
    document.getElementById('assessment-date').value = new Date().toISOString().split('T')[0];
    resetTemporaryScores();
    clearGrowthPlanFields();
    syncSlidersUI();
    updateCalculations();
    updateAthleteProfileCard(null);
}

// ==========================================================================
// MATH ENGINE & INSIGHT AUTO-PLAN GENERATOR
// ==========================================================================
function updateCalculations() {
    // 1. Category averages (Player vs Coach)
    const catKeys = {
        psicologia: ['psic-focus', 'psic-stress', 'psic-grinta', 'psic-team'],
        tecnica: ['tecn-control', 'tecn-pass', 'tecn-shot', 'tecn-dribble'],
        fisica: ['fisi-speed', 'fisi-stamina', 'fisi-strength', 'fisi-agility'],
        tattica: ['tatt-movement', 'tatt-defense', 'tatt-transition', 'tatt-reading']
    };

    const avgScores = { player: {}, coach: {} };

    Object.keys(catKeys).forEach(cat => {
        const keys = catKeys[cat];
        avgScores.player[cat] = calculateAverage(keys, tempPlayerScores);
        avgScores.coach[cat] = calculateAverage(keys, tempCoachScores);
    });

    // 2. Set Category UI averages
    Object.keys(catKeys).forEach(cat => {
        const playerAvgEl = document.getElementById(`avg-${cat}-player`);
        const coachAvgEl = document.getElementById(`avg-${cat}-coach`);
        
        if (playerAvgEl) playerAvgEl.textContent = avgScores.player[cat].toFixed(1);
        if (coachAvgEl) coachAvgEl.textContent = avgScores.coach[cat].toFixed(1);
    });

    // 3. Overall scores
    const allKeys = Object.keys(paramInfo);
    const overallPlayer = calculateAverage(allKeys, tempPlayerScores);
    const overallCoach = calculateAverage(allKeys, tempCoachScores);
    
    // Set Sidebar scores
    document.getElementById('player-overall-score').textContent = overallPlayer.toFixed(1);
    document.getElementById('coach-overall-score').textContent = overallCoach.toFixed(1);

    // Perception Gap calculation
    const absoluteGap = Math.abs(overallPlayer - overallCoach);
    document.getElementById('gap-overall-score').textContent = absoluteGap.toFixed(1);

    // Set Perception gap textual assessment
    const gapAnalysisEl = document.getElementById('gap-analysis-text');
    if (absoluteGap <= 0.8) {
        gapAnalysisEl.textContent = "Allineamento Elevato (Mister e Giocatore concordano)";
        gapAnalysisEl.style.color = "var(--color-tatt)";
    } else if (overallPlayer > overallCoach) {
        gapAnalysisEl.textContent = "Sopravvalutazione (Il giocatore si valuta piÃƒÂ¹ alto del Mister)";
        gapAnalysisEl.style.color = "var(--color-fisi)";
    } else {
        gapAnalysisEl.textContent = "Sottovalutazione (Il mister valuta il giocatore piÃƒÂ¹ alto)";
        gapAnalysisEl.style.color = "var(--color-player)";
    }

    // 4. Update Radar Graph
    updateRadarChart([
        avgScores.player.psicologia,
        avgScores.player.tecnica,
        avgScores.player.fisica,
        avgScores.player.tattica
    ], [
        avgScores.coach.psicologia,
        avgScores.coach.tecnica,
        avgScores.coach.fisica,
        avgScores.coach.tattica
    ]);

    // 5. Strengths & Weaknesses auto detection
    // Detect based on Coach (Mister) scores if they differ from default (5), otherwise fallback to Player
    let activeScoreSource = tempCoachScores;
    const isCoachActiveTemplate = Object.values(tempCoachScores).some(v => v !== 5);
    if (!isCoachActiveTemplate) {
        activeScoreSource = tempPlayerScores;
    }

    updateDetectedStrengthsAndWeaknesses(activeScoreSource);
}

function calculateAverage(keys, scores) {
    const sum = keys.reduce((acc, key) => acc + (scores[key] || 5), 0);
    return sum / keys.length;
}

// Auto-fill Goal/Action Plan based on values
function updateDetectedStrengthsAndWeaknesses(scores) {
    let maxVal = -1;
    let minVal = 11;
    let maxKeys = [];
    let minKeys = [];

    Object.keys(scores).forEach(key => {
        const val = scores[key];
        // Strengths
        if (val > maxVal) {
            maxVal = val;
            maxKeys = [key];
        } else if (val === maxVal) {
            maxKeys.push(key);
        }
        // Weaknesses
        if (val < minVal) {
            minVal = val;
            minKeys = [key];
        } else if (val === minVal) {
            minKeys.push(key);
        }
    });

    const strengthKey = maxKeys[0];
    const weaknessKey = minKeys[0];

    const strengthLabelEl = document.getElementById('detected-strength');
    const weaknessLabelEl = document.getElementById('detected-weakness');

    const strengthInfo = paramInfo[strengthKey];
    const weaknessInfo = paramInfo[weaknessKey];

    strengthLabelEl.textContent = `${strengthInfo.label} (${maxVal}/10)`;
    weaknessLabelEl.textContent = `${weaknessInfo.label} (${minVal}/10)`;

    // Auto populate textareas if they have NOT been modified by the user
    const strengthPlanTxt = document.getElementById('strength-plan');
    const weaknessGoalTxt = document.getElementById('weakness-goal');
    const weaknessActionTxt = document.getElementById('weakness-action');

    // Helper checking if a textarea contains default text of ANY key
    const isDefaultStrengthText = (text) => Object.values(defaultPlans).some(p => p.strength === text);
    const isDefaultGoalText = (text) => Object.values(defaultPlans).some(p => p.weaknessGoal === text);
    const isDefaultActionText = (text) => Object.values(defaultPlans).some(p => p.action === text);

    if (!userEditedFields.strengthPlan || strengthPlanTxt.value.trim() === '' || isDefaultStrengthText(strengthPlanTxt.value.trim())) {
        strengthPlanTxt.value = defaultPlans[strengthKey].strength;
    }

    if (!userEditedFields.weaknessGoal || weaknessGoalTxt.value.trim() === '' || isDefaultGoalText(weaknessGoalTxt.value.trim())) {
        weaknessGoalTxt.value = defaultPlans[weaknessKey].weaknessGoal;
    }

    if (!userEditedFields.weaknessAction || weaknessActionTxt.value.trim() === '' || isDefaultActionText(weaknessActionTxt.value.trim())) {
        weaknessActionTxt.value = defaultPlans[weaknessKey].action;
    }
}

// ==========================================================================
// CHARTJS RADAR SETUP
// ==========================================================================
function initRadarChart() {
    const canvas = document.getElementById('performance-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const fontColor = 'rgba(255, 255, 255, 0.7)';
    const gridColor = 'rgba(255, 255, 255, 0.08)';

    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Stato Psicologico', 'Tecnica Individuale', 'Condizione Fisica', 'Tattica'],
            datasets: [
                {
                    label: 'Giocatore (Autovalutazione)',
                    data: [5, 5, 5, 5],
                    backgroundColor: 'hsla(185, 90%, 50%, 0.15)', // var(--color-player-bg)
                    borderColor: 'hsla(185, 90%, 50%, 0.9)', // var(--color-player)
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: 'hsla(185, 90%, 50%, 1)',
                    pointRadius: 4
                },
                {
                    label: 'Mister (Valutazione)',
                    data: [5, 5, 5, 5],
                    backgroundColor: 'hsla(335, 90%, 60%, 0.15)', // var(--color-coach-bg)
                    borderColor: 'hsla(335, 90%, 60%, 0.9)', // var(--color-coach)
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: 'hsla(335, 90%, 60%, 1)',
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Display overall metrics box instead of legends
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                        display: true,
                        color: fontColor,
                        backdropColor: 'transparent',
                        font: { family: 'Outfit', size: 9 }
                    },
                    grid: { color: gridColor },
                    angleLines: { color: gridColor },
                    pointLabels: {
                        color: fontColor,
                        font: { family: 'Outfit', size: 10, weight: '600' }
                    }
                }
            }
        }
    });
}

function updateRadarChart(playerData, coachData) {
    if (radarChartInstance) {
        radarChartInstance.data.datasets[0].data = playerData;
        radarChartInstance.data.datasets[1].data = coachData;
        radarChartInstance.update();
    }
}

// ==========================================================================
// CRUDS FOR EVALUATIONS (SAVE / LOAD / DELETE)
// ==========================================================================
function saveAssessment() {
    const playerId = parseInt(document.getElementById('select-player').value, 10);
    if (!playerId) {
        showToast("Seleziona prima un giocatore da valutare!", "error");
        document.getElementById('select-player').focus();
        return;
    }

    const date = document.getElementById('assessment-date').value;
    if (!date) {
        showToast("Inserisci la data della valutazione!", "error");
        return;
    }

    const strengthPlan = document.getElementById('strength-plan').value.trim();
    const weaknessGoal = document.getElementById('weakness-goal').value.trim();
    const actionPlan = document.getElementById('weakness-action').value.trim();

    const overallPlayer = parseFloat(document.getElementById('player-overall-score').textContent);
    const overallCoach = parseFloat(document.getElementById('coach-overall-score').textContent);

    const record = {
        id: activeAssessmentId || Date.now(),
        playerId: playerId,
        date: date,
        playerScores: { ...tempPlayerScores },
        coachScores: { ...tempCoachScores },
        overallPlayer: overallPlayer,
        overallCoach: overallCoach,
        strengthPlan: strengthPlan,
        weaknessGoal: weaknessGoal,
        actionPlan: actionPlan
    };

    if (activeAssessmentId) {
        // Update existing record
        assessments = assessments.map(a => a.id === activeAssessmentId ? record : a);
        showToast("Valutazione aggiornata correttamente!", "success");
    } else {
        // Check if there is already an evaluation on the same day for this player
        const duplicateIdx = assessments.findIndex(a => a.playerId === playerId && a.date === date);
        if (duplicateIdx !== -1) {
            if (confirm("ÃƒÂˆ giÃƒÂ  presente una valutazione per questo giocatore in questa data. Vuoi sovrascriverla?")) {
                record.id = assessments[duplicateIdx].id; // Keep original ID
                assessments[duplicateIdx] = record;
                showToast("Valutazione sovrascritta correttamente!", "success");
            } else {
                return;
            }
        } else {
            // Push new
            assessments.unshift(record);
            showToast("Autovalutazione salvata correttamente!", "success");
        }
    }

    localStorage.setItem('futsal_portal_assessments', JSON.stringify(assessments));
    activeAssessmentId = record.id; // Mark current as saved

    // Refresh roster averages
    renderRoster();
}

// ==========================================================================
// TAB 3: HISTORICAL TRENDS & LINE CHARTS
// ==========================================================================
function setupTrendsUI() {
    const selectTrendPlayer = document.getElementById('select-trend-player');
    selectTrendPlayer.addEventListener('change', handleTrendPlayerChange);
}

function handleTrendPlayerChange() {
    const playerId = parseInt(document.getElementById('select-trend-player').value, 10);
    const warning = document.getElementById('trends-warning');
    const container = document.getElementById('trends-core-container');

    if (!playerId) {
        warning.classList.remove('hidden');
        container.classList.add('hidden');
        return;
    }

    warning.classList.add('hidden');
    container.classList.remove('hidden');

    const player = players.find(p => p.id === playerId);
    const playerSheets = assessments.filter(a => a.playerId === playerId);
    
    // Sort assessments chronologically (oldest first for line chart timeline)
    playerSheets.sort((a, b) => new Date(a.date) - new Date(b.date));

    // 1. Update statistic bubbles
    document.getElementById('stat-sheets-count').textContent = playerSheets.length;
    
    let bestPlayer = 0.0;
    let bestCoach = 0.0;
    
    playerSheets.forEach(s => {
        if (s.overallPlayer > bestPlayer) bestPlayer = s.overallPlayer;
        if (s.overallCoach > bestCoach) bestCoach = s.overallCoach;
    });

    document.getElementById('stat-player-best').textContent = bestPlayer.toFixed(1);
    document.getElementById('stat-coach-best').textContent = bestCoach.toFixed(1);

    // 2. Render Trend Line Graph
    renderTrendLineChart(playerSheets);

    // 3. Render Historical Table Cards (newest first for reading)
    const listContainer = document.getElementById('player-history-list');
    const historyDescSheets = [...playerSheets].reverse();

    if (historyDescSheets.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align:center; padding: 2rem; color:var(--text-muted)">
                Nessuna valutazione salvata per questo giocatore.
            </div>
        `;
        return;
    }

    listContainer.innerHTML = '';
    historyDescSheets.forEach(sheet => {
        const item = document.createElement('div');
        item.className = 'historical-record-card';
        item.innerHTML = `
            <div class="record-card-top">
                <span class="record-date">${formatDate(sheet.date)}</span>
                <div class="record-badge-scores">
                    <span class="record-mini-badge player">G: ${sheet.overallPlayer.toFixed(1)}</span>
                    <span class="record-mini-badge coach">M: ${sheet.overallCoach.toFixed(1)}</span>
                </div>
            </div>
            <div class="record-insights-text">
                <strong>Forza:</strong> ${sheet.strengthPlan ? sheet.strengthPlan.substring(0, 50) + '...' : 'Non specificato'} <br>
                <strong>Obiettivo Debolezza:</strong> ${sheet.weaknessGoal ? sheet.weaknessGoal.substring(0, 50) + '...' : 'Non specificato'}
            </div>
            <div class="record-actions">
                <button class="btn btn-secondary btn-mini" onclick="loadAssessmentToForm(${sheet.id})">Carica</button>
                <button class="btn btn-secondary btn-mini" onclick="printAssessmentDirectly(${sheet.id})">Stampa</button>
                <button class="btn-history-delete" onclick="deleteAssessment(${sheet.id})" title="Elimina scheda">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7L18.1327 19.1422C18.051 20.1859 17.1882 21 16.1402 21H7.85978C6.81175 21 5.94899 20.1859 5.86732 19.1422L5 7M4 7H20" stroke="currentColor" stroke-width="1.8"/>
                    </svg>
                </button>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

function renderTrendLineChart(sheets) {
    const canvas = document.getElementById('trend-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Destroy existing trend chart if there is one to prevent layering bugs
    if (trendChartInstance) {
        trendChartInstance.destroy();
    }

    const labels = sheets.map(s => formatDate(s.date));
    const playerData = sheets.map(s => s.overallPlayer);
    const coachData = sheets.map(s => s.overallCoach);

    const fontColor = 'rgba(255, 255, 255, 0.7)';
    const gridColor = 'rgba(255, 255, 255, 0.08)';

    trendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Indice Giocatore',
                    data: playerData,
                    borderColor: 'hsla(185, 90%, 50%, 0.95)',
                    backgroundColor: 'hsla(185, 90%, 50%, 0.15)',
                    borderWidth: 3,
                    tension: 0.25,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Indice Mister',
                    data: coachData,
                    borderColor: 'hsla(335, 90%, 60%, 0.95)',
                    backgroundColor: 'hsla(335, 90%, 60%, 0.15)',
                    borderWidth: 3,
                    tension: 0.25,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: fontColor, font: { family: 'Outfit', size: 10, weight: '600' } }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: fontColor, font: { family: 'Outfit' } }
                },
                y: {
                    min: 0,
                    max: 10,
                    grid: { color: gridColor },
                    ticks: { stepSize: 1, color: fontColor, font: { family: 'Outfit' } }
                }
            }
        }
    });
}

// Load historical sheet to Form
window.loadAssessmentToForm = function(id) {
    const sheet = assessments.find(a => a.id === id);
    if (!sheet) return;

    // Switch tab
    document.querySelector('.tab-btn[data-tab="tab-roster"]').click();
    document.querySelector('.roster-sub-tab-btn[data-subtab="subtab-evaluation"]').click();

    // Populate selects
    document.getElementById('select-player').value = sheet.playerId;
    document.getElementById('assessment-date').value = sheet.date;

    // Render profile card
    const player = players.find(p => p.id === sheet.playerId);
    updateAthleteProfileCard(player);

    // Populate scores
    tempPlayerScores = { ...sheet.playerScores };
    tempCoachScores = { ...sheet.coachScores };

    // Fill Growth Plans
    document.getElementById('strength-plan').value = sheet.strengthPlan || '';
    document.getElementById('weakness-goal').value = sheet.weaknessGoal || '';
    document.getElementById('weakness-action').value = sheet.actionPlan || '';

    // Mark fields edited based on presence
    userEditedFields = {
        strengthPlan: !!sheet.strengthPlan,
        weaknessGoal: !!sheet.weaknessGoal,
        weaknessAction: !!sheet.actionPlan
    };

    activeAssessmentId = sheet.id; // Enable updating this sheet

    // Sync sliders UI with newly loaded states
    syncSlidersUI();

    // Refresh UI averages and chart
    updateCalculations();
    showToast("Scheda storica caricata nel modulo di modifica.", "success");
};

window.printAssessmentDirectly = function(id) {
    loadAssessmentToForm(id);
    document.body.classList.add('print-evaluation');
    document.body.classList.remove('print-distinta');
    setTimeout(() => {
        window.print();
    }, 300);
};

window.deleteAssessment = function(id) {
    const sheet = assessments.find(a => a.id === id);
    if (!sheet) return;

    if (confirm("Sei sicuro di voler eliminare questa scheda di valutazione dallo storico?")) {
        assessments = assessments.filter(a => a.id !== id);
        localStorage.setItem('futsal_portal_assessments', JSON.stringify(assessments));
        showToast("Valutazione rimossa.", "info");
        handleTrendPlayerChange(); // refresh history list
        renderRoster(); // refresh roster avgs
    }
};

// Trends setup bound via initApp

// ==========================================================================
// PRINTING ENGINE
// ==========================================================================
function handlePrint() {
    const playerId = document.getElementById('select-player').value;
    if (!playerId) {
        showToast("Seleziona il giocatore che vuoi stampare!", "error");
        return;
    }
    document.body.classList.add('print-evaluation');
    document.body.classList.remove('print-distinta');
    window.print();
}

// Dynamically adapts Chart.js styles for print vs screen display
function adaptChartsForPrint(isPrint) {
    const fontColor = isPrint ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.7)';
    const gridColor = isPrint ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.08)';

    if (radarChartInstance) {
        // Adapt scales colors
        if (radarChartInstance.options.scales && radarChartInstance.options.scales.r) {
            const rScale = radarChartInstance.options.scales.r;
            if (rScale.ticks) rScale.ticks.color = fontColor;
            if (rScale.grid) rScale.grid.color = gridColor;
            if (rScale.angleLines) rScale.angleLines.color = gridColor;
            if (rScale.pointLabels) rScale.pointLabels.color = fontColor;
        }

        // Adapt dataset borders for higher contrast on light background
        if (radarChartInstance.data && radarChartInstance.data.datasets) {
            if (isPrint) {
                radarChartInstance.data.datasets[0].borderColor = 'hsla(185, 90%, 35%, 1)'; // Darker player cyan
                radarChartInstance.data.datasets[1].borderColor = 'hsla(335, 90%, 45%, 1)'; // Darker coach pink/magenta
            } else {
                radarChartInstance.data.datasets[0].borderColor = 'hsla(185, 90%, 50%, 0.9)';
                radarChartInstance.data.datasets[1].borderColor = 'hsla(335, 90%, 60%, 0.9)';
            }
        }
        
        radarChartInstance.update('none'); // Update without animation
    }

    if (trainingsAttendanceChartInstance) {
        if (trainingsAttendanceChartInstance.options.scales) {
            const x = trainingsAttendanceChartInstance.options.scales.x;
            const y = trainingsAttendanceChartInstance.options.scales.y;
            if (x) {
                if (x.grid) x.grid.color = gridColor;
                if (x.ticks) x.ticks.color = fontColor;
            }
            if (y) {
                if (y.grid) y.grid.color = gridColor;
                if (y.ticks) y.ticks.color = fontColor;
            }
        }
        if (trainingsAttendanceChartInstance.options.plugins && trainingsAttendanceChartInstance.options.plugins.legend) {
            const legend = trainingsAttendanceChartInstance.options.plugins.legend;
            if (legend.labels) legend.labels.color = fontColor;
        }
        trainingsAttendanceChartInstance.update('none');
    }
}

// ==========================================================================
// TOAST ALERTS & FORMATTING HELPERS
// ==========================================================================
function showToast(message, type = "info") {
    const toastEl = document.getElementById('toast');
    const toastMessageEl = document.getElementById('toast-message');
    if (!toastEl || !toastMessageEl) return;
    
    toastMessageEl.textContent = message;
    
    toastEl.style.borderColor = 'var(--border-color-focus)';
    if (type === 'success') {
        toastEl.style.borderColor = 'var(--color-tatt)';
    } else if (type === 'error') {
        toastEl.style.borderColor = 'var(--color-danger)';
    } else if (type === 'warning') {
        toastEl.style.borderColor = 'var(--color-fisi)';
    }

    toastEl.classList.add('show');
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

window.editPlayer = function(id) {
    const player = players.find(p => String(p.id) === String(id));
    if (!player) return;

    editingPlayerId = id;

    // Popola campi form
    document.getElementById('new-player-name').value = player.name;
    document.getElementById('new-player-role').value = player.role;
    document.getElementById('new-player-number').value = player.number;
    document.getElementById('new-player-foot').value = player.foot;
    document.getElementById('new-player-birth-year').value = player.birthYear || '';
    document.getElementById('new-player-weight').value = player.weight || '';
    document.getElementById('new-player-height').value = player.height || '';
    document.getElementById('new-player-job').value = player.job || '';
    document.getElementById('new-player-experience').value = player.experience || '';

    // Pulisci l'input file per evitare caricamenti indesiderati
    document.getElementById('new-player-photo').value = '';

    // Cambia interfaccia in modalitÃƒÂ  modifica
    const formTitle = document.getElementById('form-player-title');
    const submitBtn = document.getElementById('btn-submit-player');

    if (formTitle) formTitle.textContent = `Modifica Giocatore: ${player.name}`;
    if (submitBtn) {
        submitBtn.querySelector('span').textContent = "Salva Modifiche";
    }

    // Mostra modal
    const overlay = document.getElementById('modal-overlay');
    const popup = document.getElementById('popup-add-player');
    if (overlay && popup) {
        overlay.classList.remove('hidden');
        popup.classList.remove('hidden');

        // Nascondi gli altri popup
        const popupAdd = document.getElementById('popup-add-match');
        if (popupAdd) popupAdd.classList.add('hidden');
        const popupEdit = document.getElementById('popup-edit-column');
        if (popupEdit) popupEdit.classList.add('hidden');
    }
};

function cancelEdit() {
    editingPlayerId = null;
    const form = document.getElementById('form-add-player');
    if (form) form.reset();

    const formTitle = document.getElementById('form-player-title');
    const submitBtn = document.getElementById('btn-submit-player');

    if (formTitle) formTitle.textContent = "Aggiungi Giocatore alla Rosa";
    if (submitBtn) {
        submitBtn.querySelector('span').textContent = "Salva";
    }
}

// ==========================================================================
// TAB 4 LOGIC: ATTENDANCE & CONVOCATIONS ENGINE
// ==========================================================================
function setupAttendanceSubTabs() {
    const subTabBtns = document.querySelectorAll('.sub-tab-btn');
    const subTabPanels = document.querySelectorAll('.subtab-panel-content');
    
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSub = btn.getAttribute('data-subtab');
            
            subTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            subTabPanels.forEach(panel => {
                if (panel.id === targetSub) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
            
            if (targetSub === 'subtab-board') {
                renderAttendanceBoard();
            } else if (targetSub === 'subtab-trainings') {
                renderTrainingHistory();
            } else if (targetSub === 'subtab-matches') {
                renderConvocationsHistory();
            }
        });
    });
}

function initAttendanceTab() {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const boardMatchDateInput = document.getElementById('board-match-date');
    if (boardMatchDateInput) boardMatchDateInput.value = today;
    
    // Render logs
    renderTrainingHistory();
    renderConvocationsHistory();
    renderAttendanceBoard();
    
    // Hide details preview area by default
    const distintaContainer = document.getElementById('distinta-container');
    if (distintaContainer) distintaContainer.classList.add('hidden');
}

function renderTrainingRosterList() {
    const list = document.getElementById('training-roster-list');
    if (!list) return;
    
    if (players.length === 0) {
        list.innerHTML = `<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;padding:1rem;">Nessun giocatore registrato.</p>`;
        return;
    }
    
    list.innerHTML = '';
    players.forEach(player => {
        const row = document.createElement('div');
        row.className = 'attendance-row';
        row.innerHTML = `
            <div class="player-info">
                <span class="player-number">#${player.number}</span>
                <span class="player-name">${escapeHTML(player.name)}</span>
            </div>
            <div class="attendance-toggles" data-player-id="${player.id}">
                <button type="button" class="toggle-btn active" data-status="P" onclick="setPlayerAttendance('${player.id}', 'P')">P</button>
                <button type="button" class="toggle-btn" data-status="A" onclick="setPlayerAttendance('${player.id}', 'A')">A</button>
                <button type="button" class="toggle-btn" data-status="I" onclick="setPlayerAttendance('${player.id}', 'I')">I</button>
                <button type="button" class="toggle-btn" data-status="G" onclick="setPlayerAttendance('${player.id}', 'G')">G</button>
            </div>
        `;
        list.appendChild(row);
    });
}

window.setPlayerAttendance = function(playerId, status) {
    const group = document.querySelector(`.attendance-toggles[data-player-id="${playerId}"]`);
    if (!group) return;
    
    const buttons = group.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-status') === status) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

function renderConvocationRosterList() {
    const list = document.getElementById('convocation-roster-list');
    if (!list) return;
    
    if (players.length === 0) {
        list.innerHTML = `<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;padding:1rem;">Nessun giocatore in rosa.</p>`;
        return;
    }
    
    list.innerHTML = '';
    players.forEach(player => {
        const row = document.createElement('div');
        row.className = 'convocation-player-row';
        row.innerHTML = `
            <label for="conv-check-${player.id}">
                <span style="color:var(--color-player);font-weight:bold;margin-right:0.5rem;">#${player.number}</span>
                <span>${escapeHTML(player.name)} (${player.role})</span>
            </label>
            <input type="checkbox" id="conv-check-${player.id}" class="conv-checkbox" value="${player.id}">
        `;
        list.appendChild(row);
    });
}

function setupAttendanceForms() {
    const formTraining = document.getElementById('form-add-training');
    if (formTraining) {
        formTraining.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = document.getElementById('training-date').value;
            const type = document.getElementById('training-type').value.trim();
            
            const roster = {};
            players.forEach(player => {
                const group = document.querySelector(`.attendance-toggles[data-player-id="${player.id}"]`);
                let status = 'P'; // Default is Presente
                if (group) {
                    const activeBtn = group.querySelector('.toggle-btn.active');
                    if (activeBtn) {
                        status = activeBtn.getAttribute('data-status');
                    }
                }
                roster[player.id] = status;
            });
            
            const newTraining = {
                id: Date.now(),
                date,
                type,
                roster
            };
            
            trainings.unshift(newTraining);
            localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
            
            document.getElementById('training-type').value = '';
            showToast("Allenamento registrato con successo!", "success");
            
            renderTrainingHistory();
            renderRoster(); // Update player card percentages
        });
    }

    const formConvocation = document.getElementById('form-add-convocation');
    if (formConvocation) {
        formConvocation.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = document.getElementById('match-date').value;
            const opponent = document.getElementById('match-opponent').value.trim();
            const notes = document.getElementById('match-notes').value.trim();
            
            const selectedIds = [];
            const checkboxes = document.querySelectorAll('.conv-checkbox:checked');
            checkboxes.forEach(cb => {
                selectedIds.push(parseInt(cb.value, 10));
            });
            
            if (selectedIds.length === 0) {
                showToast("Seleziona almeno un convocato per la distinta!", "error");
                return;
            }
            
            const newConvocation = {
                id: Date.now(),
                date,
                opponent,
                notes,
                selectedIds
            };
            
            convocations.unshift(newConvocation);
            localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
            
            document.getElementById('match-opponent').value = '';
            document.getElementById('match-notes').value = '';
            
            const allCbs = document.querySelectorAll('.conv-checkbox');
            allCbs.forEach(cb => cb.checked = false);
            
            showToast("Convocazione salvata con successo!", "success");
            
            renderConvocationsHistory();
            renderRoster(); // Update player card stats
        });
    }
}

function renderTrainingHistory() {
    const grid = document.getElementById('training-history-grid');
    const countBadge = document.getElementById('training-count');
    if (!grid) return;
    
    if (countBadge) {
        countBadge.textContent = `${trainings.length} Session${trainings.length === 1 ? 'e' : 'i'}`;
    }
    
    if (trainings.length === 0) {
        grid.innerHTML = `
            <div class="empty-roster-msg">
                <p>Nessun allenamento registrato.</p>
                <span class="subtext">Compila il modulo a sinistra per registrare una sessione.</span>
            </div>
        `;
        const chartContainer = document.getElementById('training-chart-container');
        if (chartContainer) chartContainer.style.display = 'none';
        return;
    }
    
    grid.innerHTML = '';
    trainings.forEach(t => {
        let present = 0;
        let absent = 0;
        let injured = 0;
        let justified = 0;
        
        Object.values(t.roster).forEach(status => {
            if (status === 'P') present++;
            else if (status === 'A') absent++;
            else if (status === 'I') injured++;
            else if (status === 'G') justified++;
        });
        
        const activeTotal = present + absent;
        const rate = activeTotal > 0 ? ((present / activeTotal) * 100).toFixed(0) : '0';
        
        const card = document.createElement('div');
        card.className = 'attendance-history-card glass-panel';
        card.innerHTML = `
            <div class="attendance-card-header">
                <span class="attendance-card-date">${formatDate(t.date)}</span>
                <button class="card-btn-icon delete" onclick="deleteTraining(${t.id})" title="Elimina sessione" style="padding:0.2rem;">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:1rem;height:1rem;">
                        <path d="M19 7L18.1327 19.1422C18.051 20.1859 17.1882 21 16.1402 21H7.85978C6.81175 21 5.94899 20.1859 5.86732 19.1422L5 7M4 7H20" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
            <div class="attendance-card-type">${escapeHTML(t.type)}</div>
            <div class="attendance-card-stats">
                <span>Presenti: <strong>${present}</strong></span>
                <span style="color:var(--border-color-focus);">|</span>
                <span>Affluenza: <strong>${rate}%</strong></span>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Render trainings attendance trend chart
    renderTrainingsAttendanceChart();
}

function renderTrainingsAttendanceChart() {
    const container = document.getElementById('training-chart-container');
    const canvas = document.getElementById('trainings-attendance-chart');
    if (!container || !canvas) return;
    
    if (trainings.length === 0 || players.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    
    // Sort players by number ascending
    const sortedPlayers = [...players].sort((a, b) => a.number - b.number);
    const labels = sortedPlayers.map(p => `#${p.number} ${p.name.split(' ')[0]}`);
    
    const attendanceCounts = sortedPlayers.map(p => {
        let count = 0;
        trainings.forEach(t => {
            if (t.roster && (t.roster[p.id] === 'P' || t.roster[p.id] === 'T')) {
                count++;
            }
        });
        return count;
    });
    
    if (trainingsAttendanceChartInstance) {
        trainingsAttendanceChartInstance.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    trainingsAttendanceChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Presenze Totali',
                    data: attendanceCounts,
                    backgroundColor: 'rgba(0, 242, 254, 0.4)',
                    borderColor: 'rgba(0, 242, 254, 1)',
                    borderWidth: 1.5,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Presenze: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'hsla(0, 0%, 70%, 0.8)',
                        font: {
                            family: 'Outfit',
                            size: 10
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'hsla(224, 30%, 20%, 0.3)'
                    },
                    ticks: {
                        color: 'hsla(0, 0%, 70%, 0.8)',
                        stepSize: 1,
                        precision: 0,
                        font: {
                            family: 'Outfit',
                            size: 10
                        }
                    },
                    min: 0
                }
            }
        }
    });
}

window.deleteTraining = function(id) {
    if (confirm("Sei sicuro di voler eliminare questo allenamento? Le statistiche dei giocatori verranno aggiornate.")) {
        trainings = trainings.filter(t => t.id !== id);
        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
        showToast("Allenamento rimosso dallo storico.", "info");
        renderTrainingHistory();
        renderRoster();
    }
};

function renderConvocationsHistory() {
    const grid = document.getElementById('convocation-history-grid');
    const countBadge = document.getElementById('convocation-count');
    if (!grid) return;
    
    if (countBadge) {
        countBadge.textContent = `${convocations.length} Partit${convocations.length === 1 ? 'a' : 'e'}`;
    }
    
    if (convocations.length === 0) {
        grid.innerHTML = `
            <div class="empty-roster-msg">
                <p>Nessuna convocazione registrata.</p>
                <span class="subtext">Compila il modulo a sinistra per creare una convocazione.</span>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = '';
    convocations.forEach(c => {
        const card = document.createElement('div');
        card.className = 'attendance-history-card glass-panel';
        card.innerHTML = `
            <div class="attendance-card-header">
                <span class="attendance-card-date">${formatDate(c.date)}</span>
                <button class="card-btn-icon delete" onclick="deleteConvocation(${c.id})" title="Elimina convocazione" style="padding:0.2rem;">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:1rem;height:1rem;">
                        <path d="M19 7L18.1327 19.1422C18.051 20.1859 17.1882 21 16.1402 21H7.85978C6.81175 21 5.94899 20.1859 5.86732 19.1422L5 7M4 7H20" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
            <div class="attendance-card-type" style="font-weight:700;color:var(--color-player);">${c.type === 'friendly' ? 'Ã°ÂŸÂ¤Â  Amichevole' : 'Ã¢ÂšÂ½ Gara'}: ${escapeHTML(c.opponent)}</div>
            <div class="attendance-card-stats" style="margin-bottom:0.25rem;">
                <span>Convocati: <strong>${c.selectedIds.length}</strong></span>
            </div>
            <button class="btn btn-secondary btn-mini btn-full-width" onclick="viewDistinta(${c.id})">
                Vedi Distinta
            </button>
        `;
        grid.appendChild(card);
    });
}

window.deleteConvocation = function(id) {
    if (confirm("Sei sicuro di voler eliminare questa convocazione?")) {
        convocations = convocations.filter(c => c.id !== id);
        localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
        showToast("Convocazione rimossa dallo storico.", "info");
        renderConvocationsHistory();
        renderRoster();
        
        const distintaContainer = document.getElementById('distinta-container');
        if (distintaContainer && !distintaContainer.classList.contains('hidden')) {
            distintaContainer.classList.add('hidden');
        }
    }
};

window.viewDistinta = function(id) {
    const conv = convocations.find(c => c.id === id);
    if (!conv) return;
    
    const container = document.getElementById('distinta-container');
    if (!container) return;
    
    container.classList.remove('hidden');
    
    document.getElementById('distinta-match-title').textContent = conv.opponent;
    document.getElementById('distinta-match-details').textContent = `Data: ${formatDate(conv.date)} | Indicazioni: ${conv.notes || 'Nessuna nota aggiuntiva'}`;
    document.getElementById('distinta-notes-text').textContent = conv.notes || 'Nessuna nota inserita per questa partita.';
    
    const calledList = document.getElementById('distinta-called-list');
    const uncalledList = document.getElementById('distinta-uncalled-list');
    
    calledList.innerHTML = '';
    uncalledList.innerHTML = '';
    
    const calledPlayers = [];
    const uncalledPlayers = [];
    
    players.forEach(player => {
        if (conv.selectedIds.includes(player.id)) {
            calledPlayers.push(player);
        } else {
            uncalledPlayers.push(player);
        }
    });
    
    calledPlayers.sort((a, b) => a.number - b.number);
    uncalledPlayers.sort((a, b) => a.number - b.number);
    
    calledPlayers.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>#${p.number}</strong> ${escapeHTML(p.name)} (${p.role}) - ${p.foot}`;
        calledList.appendChild(li);
    });
    
    if (uncalledPlayers.length === 0) {
        uncalledList.innerHTML = `<li style="list-style:none;color:var(--text-muted);">Tutti convocati.</li>`;
    } else {
        uncalledPlayers.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>#${p.number}</strong> ${escapeHTML(p.name)} (${p.role})`;
            uncalledList.appendChild(li);
        });
    }
    
    container.scrollIntoView({ behavior: 'smooth' });
};

function getPlayerAttendanceStats(playerId) {
    let present = 0;
    let absent = 0;
    let injured = 0;
    let justified = 0;
    let test = 0;
    
    trainings.forEach(t => {
        if (t.roster && t.roster[playerId]) {
            const status = t.roster[playerId];
            if (status === 'P') present++;
            else if (status === 'A') absent++;
            else if (status === 'I') injured++;
            else if (status === 'G') justified++;
            else if (status === 'T') test++;
        }
    });
    
    const sessionsActive = present + absent + test;
    const rate = sessionsActive > 0 ? `${(((present + test) / sessionsActive) * 100).toFixed(0)}%` : 'N/D';
    
    let convsCount = 0;
    convocations.forEach(c => {
        if (c.selectedIds && c.selectedIds.includes(playerId)) {
            convsCount++;
        }
    });
    
    return {
        rate,
        convsCount,
        present,
        absent,
        injured,
        justified,
        test,
        summary: `Presenze: ${present}/${sessionsActive} (${rate}) [${present}P, ${absent}A, ${injured}I, ${justified}G, ${test}T] | Convocato: ${convsCount} volt${convsCount === 1 ? 'a' : 'e'}`
    };
}

// ==========================================================================
// SEASONAL ATTENDANCE BOARD GENERATOR & HANDLERS
// ==========================================================================
function generateSeasonDates() {
    const dates = [];
    const startDate = new Date(2026, 7, 17); // 17 Agosto 2026 (Month is 0-indexed, so 7 is August)
    const endDate = new Date(2027, 4, 31);   // 31 Maggio 2027 (Month 4 is May)
    
    // Transizione a metÃƒÂ  settembre (15 Settembre 2026)
    const transitionDate = new Date(2026, 8, 15); // 15 Settembre 2026
    
    let current = new Date(startDate);
    while (current <= endDate) {
        const dayOfWeek = current.getDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mer, 4 = Gio, 5 = Ven, 6 = Sab
        
        if (current < transitionDate) {
            // Fino al 14 Settembre inclusi: dal lunedÃƒÂ¬ al venerdÃƒÂ¬ (1-5)
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                dates.push(new Date(current));
            }
        } else {
            // Dal 15 Settembre in poi: solo LunedÃƒÂ¬ (1), MercoledÃƒÂ¬ (3), VenerdÃƒÂ¬ (5)
            if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
                dates.push(new Date(current));
            }
        }
        
        current.setDate(current.getDate() + 1);
    }
    
    // Unisci le date delle convocazioni (partite) pianificate
    convocations.forEach(c => {
        if (c.date) {
            const parts = c.date.split('-');
            if (parts.length === 3) {
                const matchD = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
                
                // Evita date duplicate
                const dateStr = c.date;
                const alreadyExists = dates.some(d => {
                    const y = d.getFullYear();
                    const m = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    return `${y}-${m}-${day}` === dateStr;
                });
                
                if (!alreadyExists) {
                    dates.push(matchD);
                }
            }
        }
    });
    
    // Unisci le date degli allenamenti registrati in localStorage (incluso quelli personalizzati)
    trainings.forEach(t => {
        if (t.date) {
            const parts = t.date.split('-');
            if (parts.length === 3) {
                const trainingD = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
                
                // Evita date duplicate
                const dateStr = t.date;
                const alreadyExists = dates.some(d => {
                    const y = d.getFullYear();
                    const m = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    return `${y}-${m}-${day}` === dateStr;
                });
                
                if (!alreadyExists) {
                    dates.push(trainingD);
                }
            }
        }
    });
    
    // Ordina cronologicamente
    dates.sort((a, b) => a - b);
    
    return dates;
}

function renderAttendanceBoard() {
    const table = document.getElementById('attendance-board-table');
    if (!table) return;
    
    const filterEl = document.getElementById('board-month-filter');
    const filterVal = filterEl ? filterEl.value : 'all';
    
    // 1. Genera tutte le date (incluso le partite)
    const allDates = generateSeasonDates();
    
    // 2. Filtra le date per mese
    let filteredDates = allDates;
    if (filterVal !== 'all') {
        const [yearStr, monthStr] = filterVal.split('-');
        const targetYear = parseInt(yearStr, 10);
        const targetMonth = parseInt(monthStr, 10) - 1; // 0-indexed in JS
        
        filteredDates = allDates.filter(d => d.getFullYear() === targetYear && d.getMonth() === targetMonth);
    }
    
    table.innerHTML = '';
    
    if (players.length === 0) {
        table.innerHTML = `<tr><td style="text-align:center;padding:2rem;color:var(--text-muted)">Nessun giocatore registrato in rosa.</td></tr>`;
        return;
    }
    
    if (filteredDates.length === 0) {
        table.innerHTML = `<tr><td style="text-align:center;padding:2rem;color:var(--text-muted)">Nessun giorno di allenamento o partita previsto per questo mese.</td></tr>`;
        return;
    }
    
    // 3. Genera Intestazione
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const playerTh = document.createElement('th');
    playerTh.className = 'player-col-header';
    playerTh.textContent = 'Giocatori';
    headerRow.appendChild(playerTh);
    
    const dateKeys = filteredDates.map(d => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    });
    
    filteredDates.forEach(date => {
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const match = convocations.find(c => c.date === dateStr);
        const isMatchDate = !!match;
        
        const th = document.createElement('th');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        
        const wrapper = document.createElement('div');
        wrapper.className = 'col-header-wrapper';
        
        const textSpan = document.createElement('span');
        
        if (isMatchDate) {
            th.className = 'match-col-header';
            const isFriendly = match.type === 'friendly';
            th.title = `${isFriendly ? 'Amichevole' : 'Gara'} contro: ${match.opponent}`;
            textSpan.innerHTML = `${isFriendly ? '🤝 Amic.' : '⚽ Gara'}<br><strong>${day}/${month}</strong>`;
        } else {
            const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
            const dayName = dayNames[date.getDay()];
            textSpan.innerHTML = `${dayName}<br><strong>${day}/${month}</strong>`;
        }
        
        wrapper.appendChild(textSpan);
        
        // Col edit button
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'col-edit-btn';
        
        let btnTitle = 'Modifica Allenamento';
        if (isMatchDate) {
            btnTitle = match.type === 'friendly' ? 'Modifica Amichevole' : 'Modifica Gara';
        }
        editBtn.title = btnTitle;
        
        editBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openEditColumnModal(dateStr, isMatchDate);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'col-edit-btn';
        deleteBtn.title = 'Elimina Seduta';
        deleteBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isMatchDate) {
                if (confirm("Sei sicuro di voler eliminare questa gara/amichevole?")) {
                    convocations = convocations.filter(c => c.date !== dateStr);
                    localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                    showToast("Gara eliminata!", "success");
                    renderConvocationsHistory();
                    renderAttendanceBoard();
                    renderRoster();
                }
            } else {
                if (confirm("Sei sicuro di voler eliminare questo allenamento?")) {
                    trainings = trainings.filter(t => t.date !== dateStr);
                    localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                    showToast("Allenamento eliminato!", "success");
                    renderTrainingHistory();
                    renderAttendanceBoard();
                    renderRoster();
                }
            }
        });
        
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '6px';
        btnContainer.style.marginTop = '4px';
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        
        wrapper.appendChild(btnContainer);
        th.appendChild(wrapper);
        
        // --- NEW SELECT ALL CHECKBOX ---
        const selectAllContainer = document.createElement('div');
        selectAllContainer.style.marginTop = '0.5rem';
        selectAllContainer.style.fontSize = '0.75rem';
        selectAllContainer.style.display = 'flex';
        selectAllContainer.style.alignItems = 'center';
        selectAllContainer.style.justifyContent = 'center';
        selectAllContainer.style.gap = '0.25rem';
        
        const selectAllCheckbox = document.createElement('input');
        selectAllCheckbox.type = 'checkbox';
        selectAllCheckbox.title = isMatchDate ? 'Convoca tutti' : 'Segna tutti presenti';
        
        let allSelected = true;
        if (players.length > 0) {
            if (isMatchDate) {
                players.forEach(p => {
                    if (!match.selectedIds || !match.selectedIds.includes(p.id)) allSelected = false;
                });
            } else {
                const session = trainings.find(t => t.date === dateStr);
                players.forEach(p => {
                    if (!session || !session.roster || session.roster[p.id] !== 'P') allSelected = false;
                });
            }
        } else {
            allSelected = false;
        }
        selectAllCheckbox.checked = allSelected;

        selectAllCheckbox.addEventListener('change', (e) => {
            window.toggleAllPresences(dateStr, isMatchDate, e.target.checked);
        });
        
        const selectAllLabel = document.createElement('span');
        selectAllLabel.textContent = 'Tutti';
        
        selectAllContainer.appendChild(selectAllCheckbox);
        selectAllContainer.appendChild(selectAllLabel);
        th.appendChild(selectAllContainer);
        // --- END NEW CHECKBOX ---
        
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 4. Genera Righe Giocatori
    const tbody = document.createElement('tbody');
    players.forEach(player => {
        const row = document.createElement('tr');
        
        const playerTd = document.createElement('td');
        playerTd.className = 'player-col-cell';
        playerTd.innerHTML = `
            <span style="color:var(--color-player);font-weight:bold;margin-right:0.3rem;">#${player.number}</span>
            <span>${escapeHTML(player.name)}</span>
        `;
        row.appendChild(playerTd);
        
        dateKeys.forEach(dateStr => {
            const td = document.createElement('td');
            const match = convocations.find(c => c.date === dateStr);
            const isMatchDate = !!match;
            
            const select = document.createElement('select');
            select.className = 'cell-select';
            
            if (isMatchDate) {
                td.className = 'match-col-cell';
                const isCalledUp = match.selectedIds && match.selectedIds.includes(player.id);
                const currentStatus = isCalledUp ? 'C' : '';
                
                if (currentStatus === 'C') select.classList.add('c-status');
                else select.classList.add('empty-status');
                
                const optEmpty = document.createElement('option');
                optEmpty.value = '';
                optEmpty.textContent = '-';
                optEmpty.selected = !isCalledUp;
                select.appendChild(optEmpty);
                
                const optC = document.createElement('option');
                optC.value = 'C';
                optC.textContent = 'C';
                optC.selected = isCalledUp;
                select.appendChild(optC);
                
                select.addEventListener('change', () => {
                    updateBoardAttendance(dateStr, player.id, select.value);
                    
                    select.className = 'cell-select';
                    if (select.value === 'C') select.classList.add('c-status');
                    else select.classList.add('empty-status');
                });
            } else {
                // Roster allenamento standard
                const session = trainings.find(t => t.date === dateStr);
                let currentStatus = '';
                
                if (session && session.roster && session.roster[player.id]) {
                    currentStatus = session.roster[player.id];
                }
                
                if (currentStatus === 'P') select.classList.add('p-status');
                else if (currentStatus === 'A') select.classList.add('a-status');
                else if (currentStatus === 'I') select.classList.add('i-status');
                else if (currentStatus === 'G') select.classList.add('g-status');
                else if (currentStatus === 'T') select.classList.add('t-status');
                else select.classList.add('empty-status');
                
                const optEmpty = document.createElement('option');
                optEmpty.value = '';
                optEmpty.textContent = '-';
                optEmpty.selected = (currentStatus === '');
                select.appendChild(optEmpty);
                
                const optP = document.createElement('option');
                optP.value = 'P';
                optP.textContent = 'P';
                optP.selected = (currentStatus === 'P');
                select.appendChild(optP);
                
                const optA = document.createElement('option');
                optA.value = 'A';
                optA.textContent = 'A';
                optA.selected = (currentStatus === 'A');
                select.appendChild(optA);
                
                const optI = document.createElement('option');
                optI.value = 'I';
                optI.textContent = 'I';
                optI.selected = (currentStatus === 'I');
                select.appendChild(optI);
                
                const optG = document.createElement('option');
                optG.value = 'G';
                optG.textContent = 'G';
                optG.selected = (currentStatus === 'G');
                select.appendChild(optG);
                
                const optT = document.createElement('option');
                optT.value = 'T';
                optT.textContent = 'T';
                optT.selected = (currentStatus === 'T');
                select.appendChild(optT);
                
                select.addEventListener('change', () => {
                    updateBoardAttendance(dateStr, player.id, select.value);
                    
                    select.className = 'cell-select';
                    if (select.value === 'P') select.classList.add('p-status');
                    else if (select.value === 'A') select.classList.add('a-status');
                    else if (select.value === 'I') select.classList.add('i-status');
                    else if (select.value === 'G') select.classList.add('g-status');
                    else if (select.value === 'T') select.classList.add('t-status');
                    else select.classList.add('empty-status');
                });
            }
            
            td.appendChild(select);
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
}

window.toggleAllPresences = function(dateStr, isMatchDate, isChecked) {
    const newStatus = isChecked ? (isMatchDate ? 'C' : 'P') : '';
    players.forEach(p => {
        updateBoardAttendance(dateStr, p.id, newStatus);
    });
    renderAttendanceBoard();
};

function updateBoardAttendance(dateStr, playerId, status) {
    const match = convocations.find(c => c.date === dateStr);
    const isMatchDate = !!match;
    
    if (isMatchDate) {
        if (!match.selectedIds) {
            match.selectedIds = [];
        }
        
        if (status === 'C') {
            if (!match.selectedIds.includes(playerId)) {
                match.selectedIds.push(playerId);
            }
        } else {
            match.selectedIds = match.selectedIds.filter(id => id !== playerId);
        }
        
        localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
        renderConvocationsHistory();
    } else {
        let session = trainings.find(t => t.date === dateStr);
        
        if (session) {
            if (status === '') {
                if (session.roster) {
                    delete session.roster[playerId];
                }
            } else {
                if (!session.roster) {
                    session.roster = {};
                }
                session.roster[playerId] = status;
            }
        } else {
            if (status !== '') {
                const roster = {};
                roster[playerId] = status;
                
                const newSession = {
                    id: Date.now(),
                    date: dateStr,
                    type: 'Allenamento Tabellone',
                    roster: roster
                };
                
                trainings.push(newSession);
                trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        }
        
        trainings = trainings.filter(t => t.roster && Object.keys(t.roster).length > 0);
        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
        renderTrainingHistory();
    }
    
    renderRoster();
    
    const selectPlayer = document.getElementById('select-player');
    if (selectPlayer && selectPlayer.value) {
        const player = players.find(p => p.id === parseInt(selectPlayer.value, 10));
        updateAthleteProfileCard(player);
    }
    
    showToast("Presenza aggiornata con successo!", "success");
}

function setupProfileSubTabs() {
    const subTabBtns = document.querySelectorAll('.profile-sub-tab-btn');
    const subTabPanels = document.querySelectorAll('.profile-subtab-content');
    
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSub = btn.getAttribute('data-subtab');
            
            subTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            subTabPanels.forEach(panel => {
                if (panel.id === targetSub) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
            
            // Subtab-specific actions
            if (targetSub === 'subtab-roster-list') {
                renderRoster();
            } else if (targetSub === 'subtab-quartets') {
                if (typeof renderQuartets === 'function') renderQuartets();
            }
        });
    });
}

function setupRosterSubTabs() {
    const subTabBtns = document.querySelectorAll('.roster-sub-tab-btn');
    const subTabPanels = document.querySelectorAll('.roster-subtab-content');
    
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSub = btn.getAttribute('data-subtab');
            
            subTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            subTabPanels.forEach(panel => {
                if (panel.id === targetSub) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
            
            // Subtab-specific actions
            if (targetSub === 'subtab-evaluation') {
                populatePlayerDropdowns();
                checkRosterAvailability();
                setTimeout(() => {
                    if (radarChartInstance) {
                        radarChartInstance.resize();
                        radarChartInstance.update();
                    } else {
                        initRadarChart();
                    }
                }, 50);
            } else if (targetSub === 'subtab-trends') {
                populatePlayerDropdowns();
                handleTrendPlayerChange();
            }
        });
    });
}

// ==========================================================================
// MODAL POPUP CONTROL FUNCTIONS
// ==========================================================================
function openAddMatchModal() {
    const overlay = document.getElementById('modal-overlay');
    const popup = document.getElementById('popup-add-match');
    if (!overlay || !popup) return;
    
    // Clear fields
    document.getElementById('popup-match-date').value = '';
    document.getElementById('popup-match-opponent').value = '';
    document.getElementById('popup-match-notes').value = '';
    document.getElementById('popup-match-type').value = '';
    document.getElementById('popup-match-location').value = 'C';
    
    const eventTypeSelect = document.getElementById('popup-match-event-type');
    if (eventTypeSelect) {
        eventTypeSelect.value = 'match';
        document.getElementById('popup-add-match-fields').classList.remove('hidden');
        document.getElementById('popup-add-training-fields').classList.add('hidden');
        const titleEl = document.querySelector('#popup-add-match .modal-header h3');
        if (titleEl) titleEl.textContent = 'Pianifica Gara';
    }
    
    // Show modal
    overlay.classList.remove('hidden');
    popup.classList.remove('hidden');
    
    // Hide other popup just in case
    const editPopup = document.getElementById('popup-edit-column');
    if (editPopup) editPopup.classList.add('hidden');
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    
    document.querySelectorAll('.modal-overlay .modal-content').forEach(m => m.classList.add('hidden'));
    
    if (typeof cancelEdit === 'function') {
        cancelEdit();
    }
}

function openAddPlayerModal() {
    const overlay = document.getElementById('modal-overlay');
    const popup = document.getElementById('popup-add-player');
    if (!overlay || !popup) return;
    
    cancelEdit();
    
    overlay.classList.remove('hidden');
    popup.classList.remove('hidden');
    
    const popupAdd = document.getElementById('popup-add-match');
    if (popupAdd) popupAdd.classList.add('hidden');
    
    const popupEdit = document.getElementById('popup-edit-column');
    if (popupEdit) popupEdit.classList.add('hidden');
}

function openEditColumnModal(dateStr, isMatch) {
    const overlay = document.getElementById('modal-overlay');
    const popup = document.getElementById('popup-edit-column');
    if (!overlay || !popup) return;
    
    // Hide other popup just in case
    const addPopup = document.getElementById('popup-add-match');
    if (addPopup) addPopup.classList.add('hidden');
    
    // Reset fields values
    document.getElementById('edit-col-original-date').value = dateStr;
    document.getElementById('edit-col-date').value = dateStr;
    
    const titleEl = document.getElementById('edit-column-title');
    const matchFields = document.getElementById('edit-col-match-fields');
    const trainingFields = document.getElementById('edit-col-training-fields');
    const deleteBtn = document.getElementById('btn-delete-column');
    
    const match = convocations.find(c => c.date === dateStr);
    const session = trainings.find(t => t.date === dateStr);
    
    const eventType = match ? (match.type || 'match') : 'training';
    const typeSelect = document.getElementById('edit-col-event-type');
    if (typeSelect) {
        typeSelect.value = eventType;
    }
    
    if (eventType === 'match' || eventType === 'friendly') {
        titleEl.textContent = eventType === 'friendly' ? 'Modifica Amichevole' : 'Modifica Gara';
        matchFields.classList.remove('hidden');
        trainingFields.classList.add('hidden');
        
        if (match) {
            let opponentText = match.opponent || '';
            let locationVal = 'C'; // Default
            
            if (opponentText.endsWith('(C)')) {
                locationVal = 'C';
                opponentText = opponentText.replace(/\s*\([CT]\)$/, '');
            } else if (opponentText.endsWith('(T)')) {
                locationVal = 'T';
                opponentText = opponentText.replace(/\s*\([CT]\)$/, '');
            }
            
            document.getElementById('edit-col-location').value = locationVal;
            document.getElementById('edit-col-opponent').value = opponentText;
            document.getElementById('edit-col-notes').value = match.notes || '';
        } else {
            document.getElementById('edit-col-location').value = 'C';
            document.getElementById('edit-col-opponent').value = '';
            document.getElementById('edit-col-notes').value = '';
        }
        
        deleteBtn.classList.remove('hidden');
    } else {
        titleEl.textContent = 'Modifica Allenamento';
        matchFields.classList.add('hidden');
        trainingFields.classList.remove('hidden');
        
        if (session) {
            document.getElementById('edit-col-type').value = session.type || '';
            deleteBtn.classList.remove('hidden');
        } else {
            document.getElementById('edit-col-type').value = '';
            deleteBtn.classList.add('hidden');
        }
    }
    
    overlay.classList.remove('hidden');
    popup.classList.remove('hidden');
}

// Bind to window to ensure accessibility from inline onclick HTML handlers
window.openAddMatchModal = openAddMatchModal;
window.closeModal = closeModal;
window.openEditColumnModal = openEditColumnModal;
window.openAddPlayerModal = openAddPlayerModal;

// ==========================================================================
// PREPARAZIONE ATLETICA: SUB-TAB NAVIGATION
// ==========================================================================
function setupAthleticSubTabs() {
    const subTabBtns = document.querySelectorAll('.athletic-sub-tab-btn');
    const subTabPanels = document.querySelectorAll('.athletic-subtab-content');
    
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSub = btn.getAttribute('data-subtab');
            
            subTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            subTabPanels.forEach(panel => {
                if (panel.id === targetSub) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
            
            // Subtab-specific actions
            if (targetSub === 'subtab-athletic-history') {
                renderAthleticTestsTable();
            } else if (targetSub === 'subtab-athletic-analysis') {
                handleAthleticAnalysisPlayerChange();
            } else if (targetSub === 'subtab-athletic-team-fitness') {
                renderTeamFitnessDashboard();
            }
        });
    });
}

// ==========================================================================
// SCIENTIFIC FORMULAS & PHYSICAL TESTS EVALUATION
// ==========================================================================
function calculateYoyoVO2Max(distance) {
    if (!distance || distance < 40) return 0;
    // Standard Formula Yo-Yo IR1: VO2max (mL/kg/min) = distance (m) * 0.0084 + 36.4
    return (distance * 0.0084 + 36.4).toFixed(1);
}

function getTestRating(testType, value) {
    let rating = 'Medio';
    let badgeClass = 'badge-warning';
    let desc = '';
    
    if (testType === 'yoyo') {
        const d = parseFloat(value) || 0;
        const vo2 = calculateYoyoVO2Max(d);
        if (d >= 2000) {
            rating = 'Eccellente';
            badgeClass = 'badge-success';
            desc = `Ottimo livello cardiovascolare per il futsal (VO2max stimato: ${vo2} ml/kg/min). Adatto a ruoli ad alta intensitÃƒÂ  di transizioni (Laterali).`;
        } else if (d >= 1600) {
            rating = 'Buono';
            badgeClass = 'badge-info';
            desc = `Resistenza soddisfacente (VO2max stimato: ${vo2} ml/kg/min). Idoneo al ritmo di gioco agonistico regionale/nazionale.`;
        } else if (d >= 1200) {
            rating = 'Medio';
            badgeClass = 'badge-warning';
            desc = `Resistenza base discreta (VO2max stimato: ${vo2} ml/kg/min). Margini di miglioramento nella capacitÃƒÂ  di recupero intermittente.`;
        } else {
            rating = 'Insufficiente';
            badgeClass = 'badge-danger';
            desc = `Cilindrata aerobica insufficiente (VO2max stimato: ${vo2} ml/kg/min). Richiede lavoro specifico di fondo e interval training.`;
        }
    } else if (testType === 'agility') {
        const t = parseFloat(value) || 99;
        if (t < 9.5) {
            rating = 'Eccellente';
            badgeClass = 'badge-success';
            desc = 'RapiditÃƒÂ  e fluiditÃƒÂ  eccezionale nei cambi di direzione. Ottima coordinazione motoria e frenata.';
        } else if (t <= 10.5) {
            rating = 'Buono';
            badgeClass = 'badge-info';
            desc = 'Ottimo controllo motorio e reattivitÃƒÂ . Agile nei cambi di orientamento tipici del futsal.';
        } else if (t <= 11.5) {
            rating = 'Medio';
            badgeClass = 'badge-warning';
            desc = 'AgilitÃƒÂ  nella media. Margini di miglioramento nell\'esplosivitÃƒÂ  laterale e nella rapiditÃƒÂ  del passo.';
        } else {
            rating = 'Insufficiente';
            badgeClass = 'badge-danger';
            desc = 'Movimenti rigidi o lenti nei cambi di direzione. Richiede esercizi coordinativi e di forza esplosiva laterale.';
        }
    } else if (testType === 'sprint') {
        const t = parseFloat(value) || 99;
        if (t < 4.0) {
            rating = 'Eccellente';
            badgeClass = 'badge-success';
            desc = 'VelocitÃƒÂ  pura eccezionale. Forte capacitÃƒÂ  di accelerazione e spunto sui 30 metri.';
        } else if (t <= 4.3) {
            rating = 'Buono';
            badgeClass = 'badge-info';
            desc = 'VelocitÃƒÂ  buona. Molto competitivo negli allunghi ed efficacia nelle ripartenze.';
        } else if (t <= 4.6) {
            rating = 'Medio';
            badgeClass = 'badge-warning';
            desc = 'VelocitÃƒÂ  discreta. Lavoro consigliato sulle frequenze di passo e sulla spinta al suolo.';
        } else {
            rating = 'Insufficiente';
            badgeClass = 'badge-danger';
            desc = 'Fase di accelerazione lenta. Richiede sviluppo della forza esplosiva e tecnica di corsa.';
        }
    } else if (testType === 'cmj') {
        const h = parseFloat(value) || 0;
        if (h >= 55) {
            rating = 'Eccellente';
            badgeClass = 'badge-success';
            desc = 'Forza esplosiva e reclutamento neuromuscolare straordinari. Altissima potenza negli arti inferiori.';
        } else if (h >= 45) {
            rating = 'Buono';
            badgeClass = 'badge-info';
            desc = 'Ottima elevazione e spinta verticale. Molto utile per contrasti aerei e rinvii (Pivot/Portieri).';
        } else if (h >= 35) {
            rating = 'Medio';
            badgeClass = 'badge-warning';
            desc = 'Elevazione media. Si consiglia inserimento di pliometria e rinforzo della catena posteriore.';
        } else {
            rating = 'Insufficiente';
            badgeClass = 'badge-danger';
            desc = 'Spinta verticale debole. Richiede potenziamento muscolare della catena estensoria dell\'anca e ginocchio.';
        }
    }
    
    return { rating, class: badgeClass, desc };
}

// ==========================================================================
// REGISTRO E CALCOLATORI
// ==========================================================================
function setupAthleticCalculator() {
    const form = document.getElementById('form-athletic-test');
    
    if (!form) return;
    
    // Attach submit listener
    form.removeEventListener('submit', saveAthleticTest);
    form.addEventListener('submit', saveAthleticTest);
}

function updateAthleticCalculatorPreview() {
    // FunzionalitÃ  di preview singola rimossa perchÃ© ora si inseriscono
    // tutti i 4 test contemporaneamente nello stesso form.
}

function saveAthleticTest(e) {
    e.preventDefault();
    
    const playerId = parseInt(document.getElementById('athletic-player-select').value, 10);
    const date = document.getElementById('athletic-test-date').value;
    
    if (!playerId || !date) {
        showToast("Seleziona giocatore e data!", "error");
        return;
    }
    
    const valYoyo = parseFloat(document.getElementById('input-yoyo-distance').value);
    const valAgility = parseFloat(document.getElementById('input-agility-time').value);
    const valSprint = parseFloat(document.getElementById('input-sprint-time').value);
    const valCmj = parseFloat(document.getElementById('input-cmj-height').value);
    
    if (isNaN(valYoyo) && isNaN(valAgility) && isNaN(valSprint) && isNaN(valCmj)) {
        showToast("Inserisci almeno un valore per i test!", "error");
        return;
    }
    
    // Remove old tests for this session if editing or updating
    athleticTests = athleticTests.filter(t => !(t.playerId === playerId && t.date === date));
    
    // Also clear old tests if date/player was changed during edit
    if (editingAthleticSession) {
        if (editingAthleticSession.playerId !== playerId || editingAthleticSession.date !== date) {
            athleticTests = athleticTests.filter(t => !(t.playerId === editingAthleticSession.playerId && t.date === editingAthleticSession.date));
        }
        editingAthleticSession = null;
    }
    
    const timestamp = Date.now();
    let offset = 0;
    
    if (!isNaN(valYoyo) && valYoyo > 0) athleticTests.push({ id: timestamp + (++offset), playerId, date, type: 'yoyo', value: valYoyo });
    if (!isNaN(valAgility) && valAgility > 0) athleticTests.push({ id: timestamp + (++offset), playerId, date, type: 'agility', value: valAgility });
    if (!isNaN(valSprint) && valSprint > 0) athleticTests.push({ id: timestamp + (++offset), playerId, date, type: 'sprint', value: valSprint });
    if (!isNaN(valCmj) && valCmj > 0) athleticTests.push({ id: timestamp + (++offset), playerId, date, type: 'cmj', value: valCmj });
    
    athleticTests.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort latest first
    localStorage.setItem('futsal_portal_athletic_tests', JSON.stringify(athleticTests));
    
    showToast("Sessione salvata con successo!", "success");
    
    // Reset inputs
    document.getElementById('input-yoyo-distance').value = '';
    document.getElementById('input-agility-time').value = '';
    document.getElementById('input-sprint-time').value = '';
    document.getElementById('input-cmj-height').value = '';
    
    // Close modal
    closeModal();
    
    // Re-render
    renderAthleticTestsTable();
    handleAthleticAnalysisPlayerChange();
}

// ==========================================================================
// POPOLAMENTO DROPDOWN E RENDERING STORICO
// ==========================================================================
function populateAthleticDropdowns() {
    const playerSelect = document.getElementById('athletic-player-select');
    const filterPlayer = document.getElementById('filter-athletic-player');
    const analysisPlayer = document.getElementById('select-analysis-player');
    
    if (!playerSelect || !filterPlayer || !analysisPlayer) return;
    
    // Save selected values
    const selVal1 = playerSelect.value;
    const selVal2 = filterPlayer.value;
    const selVal3 = analysisPlayer.value;
    
    playerSelect.innerHTML = '<option value="">-- Seleziona Giocatore --</option>';
    filterPlayer.innerHTML = '<option value="all">Tutti i Giocatori</option>';
    analysisPlayer.innerHTML = '<option value="">-- Seleziona Giocatore --</option>';
    
    // Sort players by name
    const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name));
    
    sorted.forEach(p => {
        const nameText = `#${p.number} ${p.name}`;
        
        const opt1 = document.createElement('option');
        opt1.value = p.id;
        opt1.textContent = nameText;
        playerSelect.appendChild(opt1);
        
        const opt2 = document.createElement('option');
        opt2.value = p.id;
        opt2.textContent = nameText;
        filterPlayer.appendChild(opt2);
        
        const opt3 = document.createElement('option');
        opt3.value = p.id;
        opt3.textContent = nameText;
        analysisPlayer.appendChild(opt3);
    });
    
    // Restore values
    playerSelect.value = selVal1;
    filterPlayer.value = selVal2;
    analysisPlayer.value = selVal3;
    
    // Bind filters
    if (!filterPlayer.hasAttribute('data-bound')) {
        filterPlayer.setAttribute('data-bound', 'true');
        filterPlayer.addEventListener('change', (e) => {
            renderAthleticTestsTable();
            const analysisPlayer = document.getElementById('select-analysis-player');
            if (analysisPlayer) {
                analysisPlayer.value = e.target.value === 'all' ? '' : e.target.value;
                handleAthleticAnalysisPlayerChange();
            }
        });
    }
    
    const filterTest = document.getElementById('filter-athletic-test');
    if (filterTest && !filterTest.hasAttribute('data-bound')) {
        filterTest.setAttribute('data-bound', 'true');
        filterTest.addEventListener('change', renderAthleticTestsTable);
    }
    
    const filterDate = document.getElementById('filter-athletic-date');
    if (filterDate && !filterDate.hasAttribute('data-bound')) {
        filterDate.setAttribute('data-bound', 'true');
        filterDate.addEventListener('change', renderAthleticTestsTable);
    }
    
    if (!analysisPlayer.hasAttribute('data-bound')) {
        analysisPlayer.setAttribute('data-bound', 'true');
        analysisPlayer.addEventListener('change', handleAthleticAnalysisPlayerChange);
    }
}

function renderAthleticTestsTable() {
    const tbody = document.getElementById('athletic-tests-table-body');
    const filterPlayerEl = document.getElementById('filter-athletic-player');
    const filterDateEl = document.getElementById('filter-athletic-date');
    
    if (!tbody || !filterPlayerEl) return;
    
    const filterPlayerVal = filterPlayerEl.value;
    const filterDateVal = filterDateEl ? filterDateEl.value : '';
    
    tbody.innerHTML = '';
    
    let targetPlayers = players;
    
    if (filterPlayerVal !== 'all') {
        const targetId = parseInt(filterPlayerVal, 10);
        targetPlayers = targetPlayers.filter(p => p.id === targetId);
    }
    
    if (targetPlayers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted)">Nessun giocatore corrisponde ai filtri.</td></tr>`;
        return;
    }
    
    let filteredTests = athleticTests;
    
    if (filterPlayerVal !== 'all') {
        const targetId = parseInt(filterPlayerVal, 10);
        filteredTests = filteredTests.filter(t => t.playerId === targetId);
    }
    
    if (filterDateVal) {
        filteredTests = filteredTests.filter(t => t.date === filterDateVal);
    }
    
    // Sort descending by date
    filteredTests.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    targetPlayers.forEach(p => {
        const pTests = filteredTests.filter(t => t.playerId === p.id);
        
        if (pTests.length === 0) {
            if (filterDateVal) return; // Nascondi i giocatori vuoti se si sta cercando una data specifica (per pulizia visiva)
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:600; color:var(--color-player);">
                    <div style="display:flex; flex-direction:column;">
                        <span>#${p.number} ${escapeHTML(p.name)}</span>
                        <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:normal;">${escapeHTML(p.role)}</span>
                    </div>
                </td>
                <td><span style="color:var(--text-muted); font-style:italic;">--</span></td>
                <td><span style="color:var(--text-muted); font-style:italic;">--</span></td>
                <td><span style="color:var(--text-muted); font-style:italic;">--</span></td>
                <td><span style="color:var(--text-muted); font-style:italic;">--</span></td>
                <td><span style="color:var(--text-muted); font-style:italic;">--</span></td>
                <td style="text-align: center; vertical-align: middle;">
                    <button type="button" class="btn btn-icon btn-small btn-primary btn-add-session" data-player-id="${p.id}" title="Inserisci Nuovo">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
            return;
        }
        
        const uniqueDates = [...new Set(pTests.map(t => t.date))].sort((a, b) => new Date(b) - new Date(a));
        
        const formatTestCell = (test, suffix) => {
            if (!test) return '<span style="color:var(--text-muted); font-style:italic;">--</span>';
            const ratingData = getTestRating(test.type, test.value);
            return `
                <div style="display:flex; flex-direction:column; gap:0.3rem;">
                    <div><strong style="font-size:1.1rem;">${test.value}</strong> <span style="font-size:0.8rem; color:var(--text-secondary);">${suffix}</span></div>
                    <span class="badge ${ratingData.class}" style="font-size:0.65rem; align-self:flex-start;">${ratingData.rating}</span>
                </div>
            `;
        };
        
        uniqueDates.forEach((date, index) => {
            const testsOnDate = pTests.filter(t => t.date === date);
            const testYoyo = testsOnDate.find(t => t.type === 'yoyo');
            const testAgility = testsOnDate.find(t => t.type === 'agility');
            const testSprint = testsOnDate.find(t => t.type === 'sprint');
            const testCmj = testsOnDate.find(t => t.type === 'cmj');
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:600; color:var(--color-player);">
                    <div style="display:flex; flex-direction:column;">
                        <span>#${p.number} ${escapeHTML(p.name)}</span>
                        <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:normal;">${escapeHTML(p.role)}</span>
                    </div>
                </td>
                <td>${formatDate(date)}</td>
                <td>${formatTestCell(testYoyo, 'm')}</td>
                <td>${formatTestCell(testAgility, 's')}</td>
                <td>${formatTestCell(testSprint, 's')}</td>
                <td>${formatTestCell(testCmj, 'cm')}</td>
                <td style="text-align: center; vertical-align: middle;">
                    <div style="display:flex; gap:0.5rem; justify-content:center;">
                        <button type="button" class="btn btn-icon btn-edit-session" data-player-id="${p.id}" data-date="${date}" title="Modifica Sessione" style="background-color: var(--color-warning, #f39c12); color: white; border: none; width:30px; height:30px; padding:0;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button type="button" class="btn btn-icon btn-danger btn-delete-session" data-player-id="${p.id}" data-date="${date}" title="Elimina Sessione" style="width:30px; height:30px; padding:0;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                        ${index === 0 ? `
                        <button type="button" class="btn btn-icon btn-small btn-primary btn-add-session" data-player-id="${p.id}" title="Inserisci Nuovo" style="width:30px; height:30px; padding:0;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        ` : ''}
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

window.openAthleticTestForPlayer = function(playerId) {
    editingAthleticSession = null; // Fix: Reset the editing state for new insertions
    
    // Invece di aprire il popup, passiamo al tab di inserimento
    window.switchTabTo('tab-athletic', 'subtab-athletic-insert');
    
    // Diamo tempo al DOM di attivare il tab prima di impostare i valori se necessario (ma i valori possono essere impostati anche se nascosti)
    setTimeout(() => {
        const select = document.getElementById('athletic-player-select');
        if (select) {
            select.value = playerId;
            select.dispatchEvent(new Event('change'));
        }
        
        const dateInput = document.getElementById('athletic-test-date');
        if (dateInput) {
            // Set date to today's date formatted as YYYY-MM-DD
            dateInput.value = new Date().toISOString().split('T')[0];
        }
        
        // Svuotiamo i campi per sicurezza in caso di nuovo inserimento
        document.getElementById('input-yoyo-distance').value = '';
        document.getElementById('input-agility-time').value = '';
        document.getElementById('input-sprint-time').value = '';
        document.getElementById('input-cmj-height').value = '';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 60);
};

window.deleteAthleticSession = function(playerId, date) {
    if (!confirm("Sei sicuro di voler eliminare l'intera sessione di test per questa data?")) return;
    
    athleticTests = athleticTests.filter(t => !(t.playerId == playerId && t.date == date));
    localStorage.setItem('futsal_portal_athletic_tests', JSON.stringify(athleticTests));
    showToast("Sessione eliminata.", "info");
    
    renderAthleticTestsTable();
    handleAthleticAnalysisPlayerChange();
}

window.editAthleticSession = function(playerId, date) {
    const sessionTests = athleticTests.filter(t => t.playerId == playerId && t.date == date);
    if (sessionTests.length === 0) {
        alert("Nessun test trovato per questo giocatore e data.");
        return;
    }
    
    editingAthleticSession = { playerId, date };
    
    // Invece di aprire il popup, passiamo al tab di inserimento
    window.switchTabTo('tab-athletic', 'subtab-athletic-insert');
    
    setTimeout(() => {
        document.getElementById('athletic-player-select').value = playerId;
        document.getElementById('athletic-test-date').value = date;
        
        document.getElementById('input-yoyo-distance').value = '';
        document.getElementById('input-agility-time').value = '';
        document.getElementById('input-sprint-time').value = '';
        document.getElementById('input-cmj-height').value = '';
        
        sessionTests.forEach(test => {
            if (test.type === 'yoyo') document.getElementById('input-yoyo-distance').value = test.value;
            if (test.type === 'agility') document.getElementById('input-agility-time').value = test.value;
            if (test.type === 'sprint') document.getElementById('input-sprint-time').value = test.value;
            if (test.type === 'cmj') document.getElementById('input-cmj-height').value = test.value;
        });
        
        showToast("Sessione caricata per la modifica.", "info");
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 60);
};

// ==========================================================================
// GRAFICI DI PROGRESSO ATLETICO (CHART.JS)
// ==========================================================================
function handleAthleticAnalysisPlayerChange() {
    const select = document.getElementById('select-analysis-player');
    const emptyState = document.getElementById('analysis-empty-state');
    const chartsContainer = document.getElementById('analysis-charts-container');
    
    if (!select || !emptyState || !chartsContainer) return;
    
    const playerId = parseInt(select.value, 10);
    
    if (!playerId) {
        emptyState.classList.remove('hidden');
        chartsContainer.classList.add('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    chartsContainer.classList.remove('hidden');
    
    const player = players.find(p => p.id === playerId);
    if (player) {
        renderAthleticProgressCharts(player.id);
    }
}

function renderAthleticProgressCharts(playerId) {
    // Group and filter tests for the player
    const pTests = athleticTests.filter(t => t.playerId === playerId);
    
    const testTypes = ['yoyo', 'cmj', 'sprint', 'agility'];
    const dataGroups = { yoyo: [], cmj: [], sprint: [], agility: [] };
    
    pTests.forEach(t => {
        if (dataGroups[t.type]) {
            dataGroups[t.type].push(t);
        }
    });
    
    // Sort all chronologically (oldest to newest for progression plotting)
    testTypes.forEach(type => {
        dataGroups[type].sort((a, b) => new Date(a.date) - new Date(b.date));
    });
    
    // Destroy previous charts if any
    if (yoyoChartInstance) yoyoChartInstance.destroy();
    if (cmjChartInstance) cmjChartInstance.destroy();
    if (sprintChartInstance) sprintChartInstance.destroy();
    if (agilityChartInstance) agilityChartInstance.destroy();
    
    // 1. Yo-Yo Chart
    yoyoChartInstance = drawProgressionLineChart(
        'chart-progress-yoyo', 
        dataGroups.yoyo, 
        'Distanza (metri)', 
        'hsla(35, 95%, 55%, 0.85)', 
        'hsla(35, 95%, 55%, 0.15)'
    );
    
    // 2. CMJ Chart
    cmjChartInstance = drawProgressionLineChart(
        'chart-progress-cmj', 
        dataGroups.cmj, 
        'Altezza (cm)', 
        'hsla(190, 95%, 48%, 0.85)', 
        'hsla(190, 95%, 48%, 0.15)'
    );
    
    // 3. Sprint Chart
    sprintChartInstance = drawProgressionLineChart(
        'chart-progress-sprint', 
        dataGroups.sprint, 
        'Tempo (secondi)', 
        'hsla(270, 85%, 65%, 0.85)', 
        'hsla(270, 85%, 65%, 0.15)',
        true // Invert Y scale since lower time is better
    );
    
    // 4. Agility Chart
    agilityChartInstance = drawProgressionLineChart(
        'chart-progress-agility', 
        dataGroups.agility, 
        'Tempo (secondi)', 
        'hsla(145, 80%, 45%, 0.85)', 
        'hsla(145, 80%, 45%, 0.15)',
        true // Invert Y scale since lower time is better
    );
}

function drawProgressionLineChart(canvasId, dataPoints, labelName, strokeColor, fillColor, invertY = false) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    
    if (dataPoints.length === 0) {
        // Draw empty indicator
        return new Chart(ctx, {
            type: 'line',
            data: { labels: ['Nessun test'], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { display: false } },
                    y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { display: false } }
                }
            }
        });
    }
    
    const labels = dataPoints.map(d => formatDate(d.date));
    const values = dataPoints.map(d => d.value);
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: labelName,
                data: values,
                borderColor: strokeColor,
                backgroundColor: fillColor,
                borderWidth: 2,
                pointBackgroundColor: strokeColor,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    titleFont: { family: 'Outfit' },
                    bodyFont: { family: 'Outfit' }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.04)' },
                    ticks: { color: 'hsl(217, 15%, 55%)', font: { family: 'Outfit', size: 9 } }
                },
                y: {
                    reverse: invertY,
                    grid: { color: 'rgba(255, 255, 255, 0.04)' },
                    ticks: { color: 'hsl(217, 15%, 55%)', font: { family: 'Outfit', size: 9 } }
                }
            }
        }
    });
}

// ==========================================================================
// DASHBOARD PREPARAZIONE ATLETICA
// ==========================================================================
let teamFitnessChartInstance = null;

function renderTeamFitnessDashboard() {
    const canvas = document.getElementById('team-fitness-chart');
    const topFitList = document.getElementById('top-fit-players');
    const lowFitList = document.getElementById('low-fit-players');
    const missingList = document.getElementById('missing-tests-players');
    
    if (!canvas || !topFitList || !lowFitList || !missingList) return;
    
    const ratingValues = {
        'Eccellente': 10,
        'Buono': 8,
        'Medio': 6,
        'Insufficiente': 4
    };
    
    const playerScores = [];
    
    players.forEach(p => {
        const pTests = athleticTests.filter(t => t.playerId === p.id);
        const latestYoyo = pTests.filter(t => t.type === 'yoyo').sort((a,b) => new Date(b.date) - new Date(a.date))[0];
        const latestAgility = pTests.filter(t => t.type === 'agility').sort((a,b) => new Date(b.date) - new Date(a.date))[0];
        const latestSprint = pTests.filter(t => t.type === 'sprint').sort((a,b) => new Date(b.date) - new Date(a.date))[0];
        const latestCmj = pTests.filter(t => t.type === 'cmj').sort((a,b) => new Date(b.date) - new Date(a.date))[0];
        
        let scoreSum = 0;
        let count = 0;
        
        [latestYoyo, latestAgility, latestSprint, latestCmj].forEach(test => {
            if (test) {
                const r = getTestRating(test.type, test.value).rating;
                scoreSum += ratingValues[r] || 0;
                count++;
            }
        });
        
        const avgScore = count > 0 ? (scoreSum / count) : 0;
        const missingTests = 4 - count;
        
        playerScores.push({
            player: p,
            score: avgScore,
            missingTests: missingTests,
            count: count
        });
    });
    
    // Sort descending by score. If score is equal, the one with fewer missing tests wins.
    playerScores.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.missingTests - b.missingTests;
    });
    
    // Chart Data
    const labels = playerScores.map(ps => ps.player.name);
    const data = playerScores.map(ps => ps.score);
    const colors = playerScores.map(ps => {
        if (ps.count === 0) return 'hsla(224, 20%, 50%, 0.3)'; // Gray for no tests
        if (ps.score >= 8) return 'hsla(150, 80%, 40%, 0.7)'; // Green
        if (ps.score >= 6) return 'hsla(45, 90%, 50%, 0.7)'; // Yellow
        return 'hsla(0, 80%, 60%, 0.7)'; // Red
    });
    const borders = playerScores.map(ps => {
        if (ps.count === 0) return 'hsl(224, 20%, 50%)';
        if (ps.score >= 8) return 'hsl(150, 80%, 40%)'; 
        if (ps.score >= 6) return 'hsl(45, 90%, 50%)'; 
        return 'hsl(0, 80%, 60%)';
    });
    
    if (teamFitnessChartInstance) {
        teamFitnessChartInstance.destroy();
    }
    
    teamFitnessChartInstance = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Indice di Forma (0-10)',
                data: data,
                backgroundColor: colors,
                borderColor: borders,
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    grid: { color: 'hsla(224, 20%, 90%, 0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const ps = playerScores[context.dataIndex];
                            if (ps.count === 0) return 'Nessun test effettuato';
                            return `Indice: ${ps.score.toFixed(1)}/10 (${ps.missingTests} test mancanti)`;
                        }
                    }
                }
            }
        }
    });
    
    // Insights Cards
    topFitList.innerHTML = '';
    lowFitList.innerHTML = '';
    missingList.innerHTML = '';
    
    const topPlayers = playerScores.filter(ps => ps.score >= 7.5 && ps.count > 0).slice(0, 5);
    const lowPlayers = playerScores.filter(ps => ps.score > 0 && ps.score < 6).slice(0, 5);
    const missingPlayers = playerScores.filter(ps => ps.missingTests > 0);
    
    if (topPlayers.length === 0) {
        topFitList.innerHTML = '<li><span style="color:var(--text-muted)">Nessun giocatore in questa fascia.</span></li>';
    } else {
        topPlayers.forEach(ps => {
            topFitList.innerHTML += `
                <li style="display:flex; justify-content:space-between; align-items:center; background:hsla(150,80%,40%,0.05); padding:0.5rem; border-radius:4px; border-left: 3px solid hsl(150,80%,40%);">
                    <span style="font-weight:600;">#${ps.player.number} ${escapeHTML(ps.player.name)}</span>
                    <span class="badge badge-success">${ps.score.toFixed(1)} / 10</span>
                </li>`;
        });
    }
    
    if (lowPlayers.length === 0) {
        lowFitList.innerHTML = '<li><span style="color:var(--text-muted)">Nessun giocatore con indice critico.</span></li>';
    } else {
        lowPlayers.forEach(ps => {
            lowFitList.innerHTML += `
                <li style="display:flex; justify-content:space-between; align-items:center; background:hsla(0,80%,60%,0.05); padding:0.5rem; border-radius:4px; border-left: 3px solid hsl(0,80%,60%);">
                    <span style="font-weight:600;">#${ps.player.number} ${escapeHTML(ps.player.name)}</span>
                    <span class="badge badge-danger">${ps.score.toFixed(1)} / 10</span>
                </li>`;
        });
    }

    if (missingPlayers.length === 0) {
        missingList.innerHTML = '<li><span style="color:var(--text-muted)">Tutti i test sono aggiornati!</span></li>';
    } else {
        missingPlayers.slice(0, 6).forEach(ps => {
            missingList.innerHTML += `
                <li style="display:flex; justify-content:space-between; align-items:center; background:hsla(45,90%,50%,0.05); padding:0.5rem; border-radius:4px; border-left: 3px solid hsl(45,90%,50%);">
                    <span style="font-weight:600;">#${ps.player.number} ${escapeHTML(ps.player.name)}</span>
                    <span class="badge badge-warning">${ps.missingTests} mancanti</span>
                </li>`;
        });
    }
}

window.renderTeamFitnessDashboard = renderTeamFitnessDashboard;

// Bind to window to ensure accessibility from inline onclick HTML handlers
window.populateAthleticDropdowns = populateAthleticDropdowns;


// ==========================================================================
// PREPARATION TAB LOGIC
// ==========================================================================

const DEFAULT_CALENDAR_DATA = [
    {
        weekName: "Settimana 1: Adattamento e Valutazione",
        days: [
            { dayName: "Lunedi 17 Ago", type: "Campo", content: "Atletica: Seduta di Test (Yo-Yo IR1 / Test 10-20m / CMJ). Valutazione stato di forma base.\nPalla: Riconducimento tecnico a bassa intensita, mobilita articolare." },
            { dayName: "Martedi 18 Ago", type: "Campo", content: "Atletica: Lavoro aerobico di base. Corsa continua e variazioni di ritmo blande.\nPalla: Esercitazioni tecniche a coppie, passaggi e controllo." },
            { dayName: "Giovedi 20 Ago", type: "Campo", content: "Atletica: Lavoro intermittente aerobico (15\"/15\"). Core stability.\nPalla: Possessi palla 4v4 in ampi spazi." },
            { dayName: "Venerdi 21 Ago", type: "Campo", content: "Atletica: Richiamo di rapidita sui 5m.\nTattica: Introduzione ai principi di gioco difensivi (postura e distanze)." },
            { dayName: "Sab/Dom 22-23 Ago", type: "Sabbia", content: "Atletica: Lavoro metabolico lattacido su sabbia. Circuiti ad alta intensita.\nPalla: Tornei di footvolley per favorire l'amalgama del gruppo in un contesto meno formale." }
        ]
    },
    {
        weekName: "Settimana 2: Forza e Lavoro Specifico",
        days: [
            { dayName: "Lunedi 24 Ago", type: "Campo", content: "Atletica: Forza resistente. Sprint con traino o elastici, cambi di direzione.\nPalla: Lavori di forza specifica, 1v1 fisici e protezione palla." },
            { dayName: "Martedi 25 Ago", type: "Campo", content: "Atletica: Trasformazione della forza. Navette brevi con recupero al passo.\nPalla: Small-Sided Games (SSG) ad alta intensita 3v3." },
            { dayName: "Mercoledi 26 Ago", type: "Campo", content: "Atletica: Lavoro aerobico frazionato. Prevenzione infortuni (propriocezione).\nTattica: Movimenti offensivi senza palla, tagli e parallele." },
            { dayName: "Giovedi 27 Ago", type: "Campo", content: "Atletica: RSA (Repeated Sprint Ability) con cambi di direzione netti.\nPalla: Transizioni veloci 2v1, 3v2 a campo ridotto." },
            { dayName: "Venerdi 28 Ago", type: "Campo", content: "Atletica: Rapidita di base pre-gara (scatti brevissimi).\nTattica: Palle inattive (calci d'angolo e punizioni)." }
        ]
    },
    {
        weekName: "Settimana 3: Potenza e Tattica",
        days: [
            { dayName: "Lunedi 31 Ago", type: "Campo", content: "Atletica: Forza esplosiva e pliometria. Balzi e ostacoli.\nPalla: Tiri in porta da fuori area dopo percorso coordinativo." },
            { dayName: "Martedi 1 Set", type: "Campo", content: "Atletica: Resistenza alla potenza. Navette lunghe.\nPalla: Possessi palla in regime di affaticamento." },
            { dayName: "Mercoledi 2 Set", type: "Campo", content: "Atletica: Agility (ladder, cinesini, frenata/ripartenza).\nTattica: Lavoro specifico sulle rotazioni (3-1 o 4-0)." },
            { dayName: "Giovedi 3 Set", type: "Campo", content: "Atletica: Lavori di accelerazione contrastata in campo.\nPalla: Partite a tema a tocchi limitati per velocita di pensiero." },
            { dayName: "Venerdi 4 Set", type: "Campo", content: "Atletica: Attivazione neuromuscolare, reattivita.\nTattica: Situazioni di power play (portiere di movimento)." }
        ]
    },
    {
        weekName: "Settimana 4: Rapidita e Brillantezza",
        days: [
            { dayName: "Lunedi 7 Set", type: "Campo", content: "Atletica: Rapidita pura. Volumi bassi, qualita altissima.\nPalla: Rondo intensi, 1v1 rapidissimi." },
            { dayName: "Martedi 8 Set", type: "Campo", content: "Atletica: Rapidita cognitiva (esercizi sotto pressione temporale).\nTattica: Messa a punto sistemi di gioco difensivi." },
            { dayName: "Mercoledi 9 Set", type: "Campo", content: "Atletica: Scarico atletico (Tapering).\nPalla: Partitella a tocchi liberi / scarico mentale." },
            { dayName: "Giovedi 10 Set", type: "Campo", content: "Tattica: Ripasso finale palle inattive (rimesse laterali e angoli).\nPalla: Partita a tutto campo con focus sull'intensita di gara vera." },
            { dayName: "Venerdi 11 Set", type: "Campo", content: "Atletica: Riscaldamento reattivo pre-partita.\nTattica: Rifinitura finale e schemi su palla inattiva. La squadra e pronta." }
        ]
    }
];

window.initPreparationTab = function() {
    const container = document.getElementById('preparation-calendar-container');
    if (!container) return;
    
    let calData = DEFAULT_CALENDAR_DATA;
    try {
        const savedData = localStorage.getItem('futsal_portal_preparation_json');
        if (savedData) {
            calData = JSON.parse(savedData);
            
            // Auto-update migration for August 17th to include Palle inattive without resetting all user data
            let needsUpdate = false;
            calData.forEach(week => {
                week.days.forEach(day => {
                    if (day.dayName.includes('17 Ago') && !day.content.includes('Palle inattive')) {
                        day.content += '\nTattica: Palle inattive.';
                        needsUpdate = true;
                    }
                });
            });
            if (needsUpdate) {
                localStorage.setItem('futsal_portal_preparation_json', JSON.stringify(calData));
            }
        }
    } catch(e) {
        calData = DEFAULT_CALENDAR_DATA;
    }
    
    if (!Array.isArray(calData)) {
        calData = DEFAULT_CALENDAR_DATA;
    }
    
    container.innerHTML = '';
    
    calData.forEach((week, wIdx) => {
        const weekDiv = document.createElement('div');
        weekDiv.className = 'calendar-week';
        
        const title = document.createElement('div');
        title.className = 'calendar-week-title';
        title.contentEditable = "true";
        title.innerText = week.weekName;
        weekDiv.appendChild(title);
        
        const daysRow = document.createElement('div');
        daysRow.className = 'calendar-days-row';
        
        week.days.forEach((day, dIdx) => {
            const card = document.createElement('div');
            card.className = 'calendar-day-card glass-panel';
            
            let typeClass = 'type-campo';
            if (day.type.toLowerCase().includes('sabbia')) typeClass = 'type-sabbia';
            else if (day.type.toLowerCase().includes('riposo')) typeClass = 'type-riposo';
            else if (day.type.toLowerCase().includes('partita')) typeClass = 'type-partita';
            
            card.innerHTML = `
                <div class="calendar-day-header">
                    <div class="calendar-day-title" contenteditable="true" data-field="dayName">${day.dayName}</div>
                    <div class="calendar-day-type ${typeClass}" contenteditable="true" data-field="type">${day.type}</div>
                </div>
                <div class="calendar-day-content" contenteditable="true" data-field="content">${day.content}</div>
                <div class="calendar-day-image-container" style="margin-top: 10px;">
                    ${day.image ? `<img src="${day.image}" class="calendar-day-image" style="max-width:100%; max-height:200px; border-radius:8px; margin-bottom:8px; display:block;" />` : ''}
                    <div class="img-buttons" style="text-align:right;">
                        <label class="btn btn-primary btn-mini" style="cursor:pointer; display:inline-block; font-size:0.7rem; padding:3px 8px; margin:0;">
                            Aggiungi Immagine
                            <input type="file" accept="image/*" class="day-image-upload" style="display:none;" />
                        </label>
                        ${day.image ? `<button class="btn btn-danger btn-mini btn-remove-image" style="font-size:0.7rem; padding:3px 8px; margin-left:5px;"><i class="fas fa-trash"></i></button>` : ''}
                    </div>
                </div>
            `;
            
            const uploadInput = card.querySelector('.day-image-upload');
            const imgContainer = card.querySelector('.calendar-day-image-container');
            
            uploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        let w = img.width;
                        let h = img.height;
                        if (w > 800) { h = Math.round((h * 800) / w); w = 800; }
                        canvas.width = w; canvas.height = h;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, w, h);
                        const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // Compress to save localStorage quota
                        
                        let imgEl = imgContainer.querySelector('.calendar-day-image');
                        if (!imgEl) {
                            imgEl = document.createElement('img');
                            imgEl.className = 'calendar-day-image';
                            imgEl.style.maxWidth = '100%';
                            imgEl.style.maxHeight = '200px';
                            imgEl.style.borderRadius = '8px';
                            imgEl.style.marginBottom = '8px';
                            imgEl.style.display = 'block';
                            imgContainer.insertBefore(imgEl, imgContainer.querySelector('.img-buttons'));
                        }
                        imgEl.src = dataUrl;
                        
                        let removeBtn = imgContainer.querySelector('.btn-remove-image');
                        if (!removeBtn) {
                            removeBtn = document.createElement('button');
                            removeBtn.className = 'btn btn-danger btn-mini btn-remove-image';
                            removeBtn.style.fontSize = '0.7rem';
                            removeBtn.style.padding = '3px 8px';
                            removeBtn.style.marginLeft = '5px';
                            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
                            removeBtn.onclick = () => {
                                if(imgEl) imgEl.remove();
                                removeBtn.remove();
                            };
                            imgContainer.querySelector('.img-buttons').appendChild(removeBtn);
                        }
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            });
            
            const existingRemove = card.querySelector('.btn-remove-image');
            if (existingRemove) {
                existingRemove.onclick = () => {
                    const imgEl = card.querySelector('.calendar-day-image');
                    if(imgEl) imgEl.remove();
                    existingRemove.remove();
                };
            }
            
            daysRow.appendChild(card);
        });
        
        weekDiv.appendChild(daysRow);
        container.appendChild(weekDiv);
    });
};

window.savePreparationText = function() {
    const container = document.getElementById('preparation-calendar-container');
    if (!container) return;
    
    const calData = [];
    const weeks = container.querySelectorAll('.calendar-week');
    weeks.forEach((weekDiv) => {
        const weekName = weekDiv.querySelector('.calendar-week-title').innerText;
        const days = [];
        const dayCards = weekDiv.querySelectorAll('.calendar-day-card');
        dayCards.forEach((card) => {
            days.push({
                dayName: card.querySelector('[data-field="dayName"]').innerText,
                type: card.querySelector('[data-field="type"]').innerText,
                content: card.querySelector('[data-field="content"]').innerText,
                image: card.querySelector('.calendar-day-image') ? card.querySelector('.calendar-day-image').src : null
            });
        });
        calData.push({ weekName, days });
    });
    
    localStorage.setItem('futsal_portal_preparation_json', JSON.stringify(calData));
    showToast("Programma di preparazione salvato con successo!", "success");
    
    // Refresh to re-apply the correct color classes to types (in case they changed 'Campo' to 'Sabbia' etc)
    initPreparationTab();
};


window.athleticSubTabClickHandler_inline = function(btn) {
    if (!btn) return;
    
    const subBtns = document.querySelectorAll('.athletic-sub-tab-btn');
    const subContents = document.querySelectorAll('.athletic-subtab-content');
    
    // Remove active from all
    subBtns.forEach(b => b.classList.remove('active'));
    subContents.forEach(c => c.classList.add('hidden'));
    
    // Add active to clicked
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-subtab');
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        
        // Specific actions per tab
        if (targetId === 'subtab-athletic-insert') {
            populateAthleticDropdowns();
        } else if (targetId === 'subtab-athletic-history') {
            renderAthleticTestsTable();
        } else if (targetId === 'subtab-athletic-analysis') {
            populateAthleticDropdowns();
            setTimeout(handleAthleticAnalysisPlayerChange, 50);
        } else if (targetId === 'subtab-athletic-team-fitness') {
            setTimeout(renderTeamFitnessDashboard, 50);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

window.switchTabTo = function(tabName, subTabName = null) {
    // Switch main tabs
    const tabBtns = document.querySelectorAll('.tab-navigation .tab-btn, .sidebar-nav .nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    tabPanels.forEach(panel => {
        if (panel.id === tabName) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    // Handle subtabs if requested
    if (subTabName) {
        setTimeout(() => {
            const subBtns = document.querySelectorAll('.profile-sub-tab-btn, .roster-sub-tab-btn, .attendance-sub-tab-btn, .athletic-sub-tab-btn, .preparation-sub-tab-btn');
            const subBtnToClick = Array.from(subBtns).find(b => b.getAttribute('data-subtab') === subTabName);
            if (subBtnToClick) {
                subBtnToClick.click();
            }
        }, 50);
    }
    
    // Trigger any resize events for charts
    window.dispatchEvent(new Event('resize'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function setupDashboardCards() {
    const cards = document.querySelectorAll('.main-dashboard-card');
    cards.forEach(card => {
        const onclickStr = card.getAttribute('onclick');
        if (onclickStr && onclickStr.includes('switchTabTo')) {
            const matches = onclickStr.match(/'([^']+)'/g);
            if (matches && matches.length >= 1) {
                const tabName = matches[0].replace(/'/g, '');
                const subTabName = matches.length >= 2 ? matches[1].replace(/'/g, '') : null;
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.switchTabTo(tabName, subTabName);
                });
            }
            card.removeAttribute('onclick');
        }
    });
}

// Header inline functions
window.handleTeamLogoUpload_inline = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            const img = document.getElementById('team-logo-img');
            const placeholder = document.getElementById('team-logo-placeholder');
            if(img && placeholder) {
                img.src = dataUrl;
                img.style.display = 'block';
                placeholder.style.display = 'none';
                localStorage.setItem('futsal_team_logo', dataUrl);
            }
        };
        reader.readAsDataURL(file);
    }
};

window.editTeamName_inline = function() {
    const display = document.getElementById('team-name-display');
    const input = document.getElementById('team-name-input');
    if (!display || !input) return;
    
    const textNode = Array.from(display.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) {
        input.value = textNode.nodeValue.trim();
    }
    display.classList.add('hidden');
    display.style.display = 'none';
    input.classList.remove('hidden');
    input.style.display = 'block';
    input.focus();
};

window.saveTeamName_inline = function(value) {
    const display = document.getElementById('team-name-display');
    const input = document.getElementById('team-name-input');
    if (!display || !input) return;

    const newName = value.trim() || 'Nome Squadra Futsal';
    const textNode = Array.from(display.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) {
        textNode.nodeValue = newName + ' ';
    } else {
        display.insertBefore(document.createTextNode(newName + ' '), display.firstChild);
    }
    
    input.classList.add('hidden');
    input.style.display = 'none';
    display.classList.remove('hidden');
    display.style.display = 'flex';
    localStorage.setItem('futsal_team_name', newName);
};

window.editTeamSeason_inline = function() {
    const display = document.getElementById('team-season-display');
    const input = document.getElementById('team-season-input');
    if (!display || !input) return;

    const textNode = Array.from(display.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) {
        input.value = textNode.nodeValue.trim();
    }
    display.classList.add('hidden');
    display.style.display = 'none';
    input.classList.remove('hidden');
    input.style.display = 'block';
    input.focus();
};

window.saveTeamSeason_inline = function(value) {
    const display = document.getElementById('team-season-display');
    const input = document.getElementById('team-season-input');
    if (!display || !input) return;

    const newSeason = value.trim() || 'Stagione Sportiva';
    const textNode = Array.from(display.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) {
        textNode.nodeValue = newSeason + ' ';
    } else {
        display.insertBefore(document.createTextNode(newSeason + ' '), display.firstChild);
    }
    
    input.classList.add('hidden');
    input.style.display = 'none';
    display.classList.remove('hidden');
    display.style.display = 'flex';
    localStorage.setItem('futsal_team_season', newSeason);
};

document.addEventListener('DOMContentLoaded', () => {
    const savedLogo = localStorage.getItem('futsal_team_logo');
    if (savedLogo) {
        const img = document.getElementById('team-logo-img');
        const placeholder = document.getElementById('team-logo-placeholder');
        if (img && placeholder) {
            img.src = savedLogo;
            img.style.display = 'block';
            placeholder.style.display = 'none';
        }
    }
    const savedName = localStorage.getItem('futsal_team_name');
    if (savedName) {
        const display = document.getElementById('team-name-display');
        if (display) {
            const textNode = Array.from(display.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
            if (textNode) textNode.nodeValue = savedName + ' ';
        }
    }
    const savedSeason = localStorage.getItem('futsal_team_season');
    if (savedSeason) {
        const display = document.getElementById('team-season-display');
        if (display) {
            const textNode = Array.from(display.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
            if (textNode) textNode.nodeValue = savedSeason + ' ';
        }
    }
});

        window.onerror = function(msg, url, line, col, error) {
            if (line === 0 || msg === "Script error.") return false;
            alert("JS Error: " + msg + " al rigo " + line);
            return false;
        };
        window.exportPlayers = async function() {
            const mappedPlayers = players.map(p => {
                let mappedRole = "LT";
                if (p.role === "Portiere" || p.role === "GK") mappedRole = "GK";
                else if (p.role === "Centrale" || p.role === "Back" || p.role === "BK") mappedRole = "BK";
                else if (p.role === "Pivot" || p.role === "PV") mappedRole = "PV";
                else if (p.role === "Laterale" || p.role === "LT" || p.role === "Universale") mappedRole = "LT";
                else if (p.role) mappedRole = p.role;
                
                return {
                    ...p,
                    id: p.id,
                    num: String(p.number || p.num || ""),
                    name: p.name || "",
                    team: p.team || "home",
                    role: mappedRole,
                    isGk: mappedRole === 'GK',
                    status: p.status || "bench",
                    activeSeconds: p.activeSeconds || 0,
                    photoUrl: p.photo || p.photoUrl || null,
                    height: String(p.height || ""),
                    weight: String(p.weight || ""),
                    foot: String(p.foot || ""),
                    birthYear: String(p.birthYear || p.year || "")
                };
            });
            const dataStr = JSON.stringify({ players: mappedPlayers }, null, 2);
            try {
                if (window.showSaveFilePicker) {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: "rosa_squadra_" + new Date().toISOString().slice(0,10) + ".json",
                        types: [{
                            description: 'JSON Files',
                            accept: {'application/json': ['.json']}
                        }]
                    });
                    const writable = await handle.createWritable();
                    await writable.write(dataStr);
                    await writable.close();
                    showToast("Esportazione completata!", "success");
                } else {
                    throw new Error("File System Access API non supportata");
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    // Fallback
                    const blob = new Blob([dataStr], {type: "application/json;charset=utf-8"});
                    const url = URL.createObjectURL(blob);
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", url);
                    downloadAnchorNode.setAttribute("download", "rosa_squadra_" + new Date().toISOString().slice(0,10) + ".json");
                    document.body.appendChild(downloadAnchorNode);
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                    URL.revokeObjectURL(url);
                    showToast("Esportazione scaricata.", "info");
                }
            }
        };

        window.importPlayersFromJson = function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    const all_players = data.players || data.homePlayers || [];
                    if (!Array.isArray(all_players) || all_players.length === 0) {
                        showToast("Nessun giocatore trovato nel file.", "error");
                        return;
                    }

                    let added = 0;
                    let updated = 0;

                    all_players.forEach((p, idx) => {
                        let original_name = (p.name || '').trim();
                        if (!original_name) return;

                        let name_clean = original_name;
                        let role = 'Universale';
                        let name_lower = name_clean.toLowerCase();

                        if (name_lower.includes('(gk)') || name_lower.includes('portiere')) {
                            role = 'Portiere';
                            name_clean = name_clean.replace(/\(gk\)|portiere/gi, '').trim();
                        } else if (name_lower.includes('(lt)')) {
                            role = 'Laterale';
                            name_clean = name_clean.replace(/\(lt\)/gi, '').trim();
                        } else if (name_lower.includes('(pv)')) {
                            role = 'Pivot';
                            name_clean = name_clean.replace(/\(pv\)/gi, '').trim();
                        } else if (name_lower.includes('(ul)')) {
                            role = 'Back';
                            name_clean = name_clean.replace(/\(ul\)/gi, '').trim();
                        }

                        let parts = name_clean.split(/\s+/);
                        let formatted_name = name_clean;
                        if (parts.length > 1) {
                            let nome = parts[parts.length - 1];
                            let cognome = parts.slice(0, -1).join(' ');
                            formatted_name = nome + ' ' + cognome;
                        }
                        
                        formatted_name = formatted_name.replace(/\w\S*/g, function(txt) {
                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                        });

                        let existingPlayer = players.find(e => 
                            e.name.trim().toLowerCase() === formatted_name.toLowerCase() ||
                            e.name.trim().toLowerCase() === original_name.toLowerCase() ||
                            (e.original_name && e.original_name.trim().toLowerCase() === original_name.toLowerCase())
                        );

                        if (existingPlayer) {
                            existingPlayer.birthYear = p.birthYear || '2000';
                            existingPlayer.role = role;
                            existingPlayer.name = formatted_name;
                            existingPlayer.original_name = original_name;
                            updated++;
                        } else {
                            players.push({
                                id: 'player_imported_' + Date.now() + '_' + idx,
                                name: formatted_name,
                                original_name: original_name,
                                number: p.number || '',
                                role: role,
                                birthYear: p.birthYear || '2000',
                                status: 'Disponibile',
                                experience: '',
                                image: p.image || ''
                            });
                            added++;
                        }
                    });

                    localStorage.setItem('futsal_portal_players', JSON.stringify(players));
                    showToast(`Importazione completata! Aggiunti: ${added}, Aggiornati: ${updated}.`, "success");
                    if(typeof renderRoster === 'function') renderRoster();
                    
                } catch(err) {
                    console.error(err);
                    showToast("Errore durante la lettura del file JSON.", "error");
                }
                
                event.target.value = '';
            };
            reader.readAsText(file);
        };

        // ==========================================
        // IMPOSTAZIONI GLOBALI
        // ==========================================
        window.loadGlobalSettings = function() {
            // Load Name
            const savedName = localStorage.getItem('futsal_team_name') || 'Nome Squadra Futsal';
            const nameDisplay = document.getElementById('team-name-display');
            if (nameDisplay) {
                const textNode = Array.from(nameDisplay.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
                if (textNode) textNode.textContent = savedName;
            }
            const settingsNameInput = document.getElementById('settings-team-name');
            if (settingsNameInput) settingsNameInput.value = savedName;

            // Load Season
            let savedSeason = localStorage.getItem('futsal_team_season') || '2025/2026';
            let cleanSeason = savedSeason.replace(/^STAGIONE SPORTIVA\s*/i, '').replace(/^STAGIONE\s*/i, '').trim();

            const seasonDisplay = document.getElementById('team-season-display');
            if (seasonDisplay) {
                const textNode = Array.from(seasonDisplay.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
                if (textNode) textNode.textContent = `STAGIONE SPORTIVA ${cleanSeason}`;
            }
            const settingsSeasonInput = document.getElementById('settings-team-season');
            if (settingsSeasonInput) settingsSeasonInput.value = cleanSeason;

            // Load Logo
            const savedLogo = localStorage.getItem('futsal_team_logo');
            if (savedLogo) {
                // Header Logo
                const imgHead = document.getElementById('team-logo-img');
                const placeHead = document.getElementById('team-logo-placeholder');
                if (imgHead && placeHead) {
                    imgHead.src = savedLogo;
                    imgHead.style.display = 'block';
                    placeHead.style.display = 'none';
                }
                // Settings Logo
                const imgSet = document.getElementById('settings-logo-preview');
                const placeSet = document.getElementById('settings-logo-placeholder');
                if (imgSet && placeSet) {
                    imgSet.src = savedLogo;
                    imgSet.style.display = 'block';
                    placeSet.style.display = 'none';
                }
            }

            // Load Under Derogation
            const savedUnder = localStorage.getItem('futsal_under_derogation') || '2004';
            const settingsUnderInput = document.getElementById('settings-under-derogation');
            if (settingsUnderInput) settingsUnderInput.value = savedUnder;
        };

        window.saveGlobalSettings = function() {
            const nameInput = document.getElementById('settings-team-name').value.trim();
            const seasonInput = document.getElementById('settings-team-season').value.trim();
            const underInput = document.getElementById('settings-under-derogation').value;

            if (nameInput) localStorage.setItem('futsal_team_name', nameInput);
            if (seasonInput) localStorage.setItem('futsal_team_season', seasonInput);
            if (underInput) localStorage.setItem('futsal_under_derogation', underInput);

            // Ricarica UI globale
            loadGlobalSettings();
            
            // Re-render components dependent on these settings
            if (typeof renderRoster === 'function') renderRoster();
            
            showToast("Impostazioni salvate con successo!", "success");
        };

        window.handleSettingsLogoUpload = function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const dataUrl = e.target.result;
                    localStorage.setItem('futsal_team_logo', dataUrl);
                    loadGlobalSettings(); // aggiorna l'UI
                    showToast("Logo caricato e salvato correttamente.", "success");
                };
                reader.readAsDataURL(file);
            }
        };

        // Carica impostazioni all'avvio (da inserire dopo che il DOM è caricato)
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                loadGlobalSettings();
            }, 100);
        });

        // ==========================================
        // QUARTETTI LOGIC
        // ==========================================
        window.renderQuartets = function() {
            const quartets = {
                '1° Quartetto (Titolari)': 'pitch-quartet-1',
                '2° Quartetto (Prime Rotazioni)': 'pitch-quartet-2',
                '3° Quartetto (Seconde Rotazioni)': 'pitch-quartet-3'
            };

            for (const [qName, containerId] of Object.entries(quartets)) {
                const container = document.getElementById(containerId);
                if (!container) continue;
                
                // Get players for this quartet
                const qPlayers = players.filter(p => p.quartets === qName);
                
                // Classify by role
                let portiere = qPlayers.find(p => p.role === 'Portiere' || p.role === 'Portiere (GK)') || qPlayers.find(p => p.secondaryRoles && (p.secondaryRoles.includes('Portiere') || p.secondaryRoles.includes('GK')));
                let pivot = qPlayers.find(p => p.role === 'Pivot') || qPlayers.find(p => p.secondaryRoles && p.secondaryRoles.includes('Pivot'));
                let centrale = qPlayers.find(p => p.role === 'Centrale') || qPlayers.find(p => p.secondaryRoles && p.secondaryRoles.includes("Difensore"));
                let laterali = qPlayers.filter(p => p.role === 'Laterale' && p !== pivot && p !== centrale && p !== portiere);
                
                // If missing specific roles, fill with whatever is left in this quartet
                const assigned = [portiere, pivot, centrale, ...laterali].filter(Boolean);
                const unassigned = qPlayers.filter(p => !assigned.includes(p));
                
                if (!pivot && unassigned.length > 0) pivot = unassigned.shift();
                if (!centrale && unassigned.length > 0) centrale = unassigned.shift();
                while (laterali.length < 2 && unassigned.length > 0) {
                    laterali.push(unassigned.shift());
                }
                if (!portiere && unassigned.length > 0) portiere = unassigned.shift();

                // Render slots
                container.innerHTML = `
                    <!-- Linee del campo dinamiche -->
                    <div class="pitch-area-top"></div>
                    <div class="pitch-area-bottom"></div>
                    <div class="pitch-penalty-top"></div>
                    <div class="pitch-penalty-bottom"></div>

                    ${renderRhombusSlot(pivot, 'slot-top', '')}
                    ${renderRhombusSlot(laterali[0], 'slot-left', '')}
                    ${renderRhombusSlot(laterali[1], 'slot-right', '')}
                    ${renderRhombusSlot(centrale, 'slot-bottom', '')}
                    ${renderRhombusSlot(portiere, 'slot-goalie', '')}
                `;
            }

        };

        function renderRhombusSlot(player, posClass, roleLabel) {
            if (!player) {
                return `
                    <div class="rhombus-slot ${posClass}">
                        <div class="rhombus-empty">
                            <span>Vuoto</span>
                        </div>
                    </div>
                `;
            }
            
            const initials = getInitials(player.name);
            const avatarHTML = player.photo 
                ? `<img src="${player.photo}" alt="${escapeHTML(player.name)}">`
                : `${initials}`;
                
            const underYearStr = localStorage.getItem('futsal_under_derogation') || '2002';
            const underYear = parseInt(underYearStr, 10);
            let customBorder = '2px solid var(--color-player)';
            let boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
            
            if (player.birthYear && parseInt(player.birthYear, 10) >= underYear) {
                customBorder = '3px solid #ef4444'; // Rosso per under
                boxShadow = '0 0 10px rgba(239, 68, 68, 0.7)';
            }

            if (player.quinto === 'Portiere di Movimento') {
                customBorder = '3px solid #eab308'; // Giallo per Portiere di Movimento
                boxShadow = '0 0 12px rgba(234, 179, 8, 0.7)';
            }
                
            return `
                <div class="rhombus-slot ${posClass}">
                    <div class="rhombus-player clickable-card" onclick="openPlayerSummaryModal('${player.id}')" style="cursor:pointer;" title="Apri Profilo">
                        <div class="avatar" style="border: ${customBorder}; box-shadow: ${boxShadow};">${avatarHTML}</div>
                        <div class="rhombus-player-name">${escapeHTML(player.name)}</div>
                    </div>
                </div>
            `;
        }

        window.toggleFullScreen = function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        };
// ==========================================
// ROLE-BASED ACCESS CONTROL (RBAC) & LOGIN
// ==========================================
let futsalUsers = JSON.parse(localStorage.getItem('futsal_users')) || [
    { username: "admin", password: "password", role: "Admin" }
];

// Ensure the specific staff account exists
if (!futsalUsers.find(u => u.username === "staff")) {
    futsalUsers.push({ username: "staff", password: "adria", role: "Staff/Dir" });
    localStorage.setItem('futsal_users', JSON.stringify(futsalUsers));
}
let currentUser = JSON.parse(localStorage.getItem('futsal_current_user')) || null;

const defaultRolesPermissions = {
    "Admin": ["tab-dashboard", "tab-profile", "tab-attendance", "tab-roster", "tab-athletic", "tab-preparation", "tab-results", "tab-schemi", "tab-match-analyst", "tab-settings"],
    "Staff/Dir": ["tab-dashboard", "tab-profile", "tab-attendance", "tab-roster", "tab-athletic", "tab-preparation", "tab-results", "tab-schemi", "tab-match-analyst"],
    "Players": ["tab-dashboard", "tab-profile", "tab-results", "tab-schemi"]
};
let futsalRolesPermissions = JSON.parse(localStorage.getItem('futsal_roles_permissions')) || defaultRolesPermissions;

// Migration: If old roles exist, map them to new ones
if (futsalRolesPermissions["Staff Tecnico"] || futsalRolesPermissions["Giocatore"]) {
    futsalRolesPermissions["Staff/Dir"] = defaultRolesPermissions["Staff/Dir"];
    futsalRolesPermissions["Players"] = defaultRolesPermissions["Players"];
    delete futsalRolesPermissions["Staff Tecnico"];
    delete futsalRolesPermissions["Dirigenti"];
    delete futsalRolesPermissions["Giocatore"];
    localStorage.setItem('futsal_roles_permissions', JSON.stringify(futsalRolesPermissions));
}

// Sicurezza aggiuntiva: rimuoviamo forzatamente "tab-settings" dal Giocatore se era stato salvato per sbaglio
if (futsalRolesPermissions["Players"] && futsalRolesPermissions["Players"].includes("tab-settings")) {
    futsalRolesPermissions["Players"] = futsalRolesPermissions["Players"].filter(t => t !== "tab-settings");
    localStorage.setItem('futsal_roles_permissions', JSON.stringify(futsalRolesPermissions));
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // Popola tendina utenti
    const loginSelect = document.getElementById('login-user');
    if (loginSelect) {
        futsalUsers.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.username;
            opt.textContent = u.username;
            loginSelect.appendChild(opt);
        });
    }

    const loginForm = document.getElementById('login-form');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('login-user').value.trim();
            const pass = document.getElementById('login-pass').value;
            const errorMsg = document.getElementById('login-error-msg');
            
            const found = futsalUsers.find(u => u.username === user && u.password === pass);
            if(found) {
                errorMsg.style.display = 'none';
                currentUser = { username: found.username, role: found.role };
                localStorage.setItem('futsal_current_user', JSON.stringify(currentUser));
                window.location.href = 'index.html';
            } else {
                errorMsg.style.display = 'block';
            }
        });
    }
});

function checkAuth() {
    const isLoginPage = window.location.pathname.endsWith('login.html');
    
    if(!currentUser) {
        if(!isLoginPage) {
            window.location.href = 'login.html';
        } else {
            document.body.removeAttribute('data-role');
        }
    } else {
        if(isLoginPage) {
            window.location.href = 'index.html';
        } else {
            applyRolePermissions();
        }
    }
}

function applyRolePermissions() {
    if(!currentUser) return;
    document.body.setAttribute('data-role', currentUser.role);
    
    const display = document.getElementById('current-user-display');
    if(display) {
        display.textContent = currentUser.username + " (" + currentUser.role + ")";
    }

    const permissions = futsalRolesPermissions[currentUser.role] || [];

    // Hide or show dashboard cards (the only way to navigate now)
    document.querySelectorAll('.main-dashboard-card').forEach(card => {
        const dest = card.getAttribute('data-tab');
        if (dest && !permissions.includes(dest)) {
            card.style.display = 'none';
        } else {
            card.style.display = 'flex';
        }
    });

    if(currentUser.role === 'Admin') {
        // Admin also sees users list and permissions grid
        renderUsersList();
        renderPermissionsGrid();
    } else {
        // Se l'utente non  admin, assicuriamoci di nascondere le sezioni admin globalmente
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    }
}

window.performLogout = function() {
    localStorage.removeItem('futsal_current_user');
    currentUser = null;
    window.location.href = 'login.html';
};

// ==========================================
// ACCESS MANAGER (Admin Only)
// ==========================================
window.renderUsersList = function() {
    const container = document.getElementById('users-list-container');
    if(!container) return;
    
    container.innerHTML = '';
    futsalUsers.forEach(u => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.padding = '0.5rem 0';
        div.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        
        let deleteBtn = '';
        if(u.username !== 'admin') {
            deleteBtn = `<button class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;" onclick="deleteUser('${u.username}')">Rimuovi</button>`;
        }
        
        div.innerHTML = `
            <div style="flex: 2;">
                <strong style="color:var(--text-main);">${u.username}</strong> 
                <span style="font-size:0.8rem; color:var(--text-muted); margin-left:1rem;">(${u.role})</span>
            </div>
            <div style="flex: 2; font-size:0.9rem; color:var(--text-muted);">
                Password: <span style="color:var(--color-tech);">${u.password}</span>
            </div>
            <div>${deleteBtn}</div>
        `;
        container.appendChild(div);
    });
};

window.renderPermissionsGrid = function() {
    const gridContainer = document.getElementById('roles-permissions-grid');
    if(!gridContainer) return;
    
    const roles = ["Admin", "Staff/Dir", "Players"];
    const chapters = [
        { id: "tab-dashboard", label: "Dashboard" },
        { id: "tab-profile", label: "Profilo" },
        { id: "tab-attendance", label: "Presenze" },
        { id: "tab-roster", label: "Performance" },
        { id: "tab-athletic", label: "Test Atletici" },
        { id: "tab-preparation", label: "Prep. Atletica" },
        { id: "tab-results", label: "Classifica" },
        { id: "tab-schemi", label: "Schemi" },
        { id: "tab-match-analyst", label: "Match Analyst" },
        { id: "tab-settings", label: "Impostazioni" }
    ];

    let html = `<table style="width:100%; border-collapse: collapse; margin-top: 1rem; color: var(--text-main); font-size: 0.9rem;">
        <thead>
            <tr>
                <th style="text-align:left; border-bottom:1px solid rgba(255,255,255,0.2); padding: 0.5rem;">Capitolo</th>`;
    roles.forEach(role => {
        html += `<th style="text-align:center; border-bottom:1px solid rgba(255,255,255,0.2); padding: 0.5rem;">${role}</th>`;
    });
    html += `</tr></thead><tbody>`;

    chapters.forEach(chap => {
        html += `<tr>
            <td style="border-bottom:1px solid rgba(255,255,255,0.05); padding: 0.5rem;">${chap.label}</td>`;
        roles.forEach(role => {
            const isChecked = futsalRolesPermissions[role] && futsalRolesPermissions[role].includes(chap.id) ? "checked" : "";
            
            // Impedisce di togliere permessi all'Admin, e vieta le Impostazioni ai Giocatori
            let disabled = "";
            if (role === 'Admin') disabled = "disabled";
            if (role === 'Players' && chap.id === 'tab-settings') disabled = "disabled";
            
            html += `<td style="text-align:center; border-bottom:1px solid rgba(255,255,255,0.05); padding: 0.5rem;">
                <input type="checkbox" onchange="updateRolePermission('${role}', '${chap.id}', this.checked)" ${isChecked} ${disabled}>
            </td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    gridContainer.innerHTML = html;
};

window.updateRolePermission = function(role, chapterId, isGranted) {
    if(!futsalRolesPermissions[role]) futsalRolesPermissions[role] = [];
    
    if(isGranted) {
        if(!futsalRolesPermissions[role].includes(chapterId)) {
            futsalRolesPermissions[role].push(chapterId);
        }
    } else {
        futsalRolesPermissions[role] = futsalRolesPermissions[role].filter(id => id !== chapterId);
    }
    
    localStorage.setItem('futsal_roles_permissions', JSON.stringify(futsalRolesPermissions));
    if(typeof showToast === 'function') showToast("Permessi aggiornati", "info");
    
    // Aggiorna permessi attuali in tempo reale se si tocca il proprio ruolo
    if (currentUser && currentUser.role === role) {
        applyRolePermissions();
    }
};

window.createNewUser = function() {
    const nameInput = document.getElementById('new-user-name');
    const passInput = document.getElementById('new-user-pass');
    const roleInput = document.getElementById('new-user-role');
    
    const name = nameInput.value.trim();
    const pass = passInput.value;
    const role = roleInput.value;
    
    if(!name || !pass) {
        if(typeof showToast === 'function') showToast("Compila nome utente e password.", "warning");
        return;
    }
    
    if(futsalUsers.find(u => u.username === name)) {
        if(typeof showToast === 'function') showToast("Utente già esistente.", "error");
        return;
    }
    
    futsalUsers.push({ username: name, password: pass, role: role });
    localStorage.setItem('futsal_users', JSON.stringify(futsalUsers));
    
    nameInput.value = '';
    passInput.value = '';
    
    renderUsersList();
    if(typeof showToast === 'function') showToast("Utente aggiunto con successo.", "success");
};

window.deleteUser = function(username) {
    if(username === 'admin') return;
    if(confirm("Sei sicuro di voler rimuovere l'utente " + username + "?")) {
        futsalUsers = futsalUsers.filter(u => u.username !== username);
        localStorage.setItem('futsal_users', JSON.stringify(futsalUsers));
        renderUsersList();
        if(typeof showToast === 'function') showToast("Utente rimosso.", "info");
    }
};
