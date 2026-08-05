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

function switchTabTo(tabName, subTabName = null) {
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
    } else {
        switch(tabName) {
            case 'tab-dashboard': if(typeof window.renderDashboardAlertsWidget === 'function') window.renderDashboardAlertsWidget(); break;
            case 'tab-roster': if(typeof renderRoster === 'function') renderRoster(); break;
            case 'tab-attendance': if(typeof renderAttendanceBoard === 'function') renderAttendanceBoard(); break;
            case 'tab-athletic': if(typeof renderAthleticTestsTable === 'function') renderAthleticTestsTable(); break;
            case 'tab-preparation': if(typeof renderTeamFitnessDashboard === 'function') renderTeamFitnessDashboard(); break;
            case 'tab-psychophysical': if(typeof renderPsychophysicalDashboard === 'function') renderPsychophysicalDashboard(); break;
            case 'tab-training-program': if(typeof renderTrainingProgramList === 'function') renderTrainingProgramList(); break;
        }
    }
    
    // Mostra/Nascondi popup attrezzi solo nella tab schemi
    const boardToolsPopup = document.getElementById('board-tools-popup');
    if (boardToolsPopup) {
        if (tabName === 'tab-schemi') {
            boardToolsPopup.style.display = 'block';
        } else {
            boardToolsPopup.style.display = 'none';
        }
    }
    
    // Trigger any resize events for charts
    window.dispatchEvent(new Event('resize'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.switchTabTo = switchTabTo;

const defaultParamLabels = {
    'psic-focus': { label: 'Focus', desc: "Concentrazione mentale e costanza dell'attenzione." },
    'psic-stress': { label: 'Stress', desc: "Gestione della pressione emotiva e delle situazioni critiche." },
    'psic-grinta': { label: 'Grinta', desc: "Spirito combattivo, determinazione e sacrificio." },
    'psic-team': { label: 'Team', desc: "Spirito cooperativo, comunicazione e supporto reciproco." },

    'tecn-control': { label: 'Controllo', desc: "Qualità e orientamento della ricezione della palla." },
    'tecn-pass': { label: 'Passaggio', desc: "Precisione, forza e scelta del tempo nel servire i compagni." },
    'tecn-shot': { label: 'Tiro', desc: "Precisione e potenza nella conclusione in porta." },
    'tecn-dribble': { label: 'Dribbling', desc: "Uno contro uno e capacità di superare l'avversario." },

    'fisi-speed': { label: 'Velocità', desc: "Accelerazione, rapidità di movimento e cambio di passo." },
    'fisi-stamina': { label: 'Resistenza', desc: "Capacità di mantenere un ritmo elevato per l'intera partita." },
    'fisi-strength': { label: 'Forza', desc: "Potenza muscolare, stabilità nei duelli fisici e protezione palla." },
    'fisi-agility': { label: 'Agilità', desc: "Capacità di cambiare direzione ed eseguire movimenti complessi con fluidità." },

    'tatt-movement': { label: 'Movimento', desc: "Smarcamento, occupazione degli spazi e coordinazione di squadra." },
    'tatt-defense': { label: 'Difesa', desc: "Posizionamento difensivo, marcatura e tempi di intervento." },
    'tatt-transition': { label: 'Transizioni', desc: "Reattività e intelligenza nel passaggio tra fase offensiva e difensiva." },
    'tatt-reading': { label: 'Lettura', desc: "Comprensione delle situazioni di gioco e anticipo delle intenzioni avversarie." }
};

const gkParamLabels = {
    'psic-focus': { label: 'Focus & Presenza', desc: "Concentrazione massima sui tiri, rimbalzi e retropassaggi." },
    'psic-stress': { label: 'Pressione 1vs1', desc: "Freddezza e lucidità nei duelli diretti a tu per tu con l'attaccante." },
    'psic-grinta': { label: 'Leadership & Coraggio', desc: "Determinazione uscite basse, blocco palloni e guida della squadra." },
    'psic-team': { label: 'Guida della Difesa', desc: "Comunicazione continua, chiamata marcature e diagonali." },

    'tecn-control': { label: 'Uscita Bassa / Croce', desc: "Tecnica della croce, scivolata e sbarramento porta su tiro ravvicinato." },
    'tecn-pass': { label: 'Rinvio & Rilancio', desc: "Precisione del rilancio con le mani e coi piedi per contropiede." },
    'tecn-shot': { label: 'Parata & Reattività', desc: "Istinto di parata su tiri veloci, deviazioni d'istinto e riflessi." },
    'tecn-dribble': { label: 'Posizionamento & Copertura', desc: "Scelta della posizione sulla linea di porta e chiusura degli angoli." },

    'fisi-speed': { label: 'Esplosività 1-3m', desc: "Scatto fulmineo nell'uscita sui piedi dell'attaccante." },
    'fisi-stamina': { label: 'Tenuta Fisica', desc: "Resistenza agli sforzi ripetuti e concentrazione sui 40 minuti." },
    'fisi-strength': { label: 'Forza Muscolare & Presa', desc: "Forza sulle gambe per le uscite e fermezza nella presa palla." },
    'fisi-agility': { label: 'Reattività al Suolo', desc: "Velocità nel rialzarsi e nella seconda parata su ribattuta." },

    'tatt-movement': { label: 'Uscita Spazio / Copertura', desc: "Scelta del tempo nell'uscire fuori dall'area per anticipare la palla." },
    'tatt-defense': { label: 'Lettura 1vs1 & Diagonali', desc: "Capacità di valutare se restare o uscire sull'uomo lanciato." },
    'tatt-transition': { label: 'Portiere di Movimento (5vs4)', desc: "Gestione del gioco col portiere di movimento e tiro a porta vuota." },
    'tatt-reading': { label: 'Lettura Preventiva', desc: "Anticipo delle traiettorie dei passaggi avversari e chiamate." }
};

const gkDefaultPlans = {
    'psic-focus': {
        strength: "Mantenere costante la concentrazione anche nelle fasi di pressione prolungata o basso ritmo.",
        weaknessGoal: "Eliminare le disattenzioni sui retropassaggi e sui rimbalzi improvvisi.",
        action: "Esercizi di reattività visiva con palline di diversa dimensione prima della seduta."
    },
    'psic-stress': {
        strength: "Freddezza e lucidità assoluta nei duelli 1vs1 col pallone calciato a bruciapelo.",
        weaknessGoal: "Mantenere la serenità emotiva anche dopo un errore o un gol subito.",
        action: "Simulazioni ad alta frequenza di 1vs1 consecutivi per allenare il recupero psicologico rapido."
    },
    'tecn-control': {
        strength: "Esecuzione perfetta della croce e sbarramento totale sui tiri ravvicinati.",
        weaknessGoal: "Perfezionare i tempi di uscita bassa sui piedi dell'attaccante in corsa.",
        action: "20 ripetizioni di chiusura a croce su pallone vagante ai limiti dell'area."
    },
    'tecn-pass': {
        strength: "Rilanci con le mani di eccezionale precisione per innescare le transizioni veloci.",
        weaknessGoal: "Migliorare la sicurezza e la precisione nel rinvio col piede debole.",
        action: "Esercitazioni di rilancio mirato su bersagli fissi sia di mano che di piede."
    },
    'tecn-shot': {
        strength: "Riflessi fulminei e parate d'istinto sulle deviazioni in area di rigore.",
        weaknessGoal: "Migliorare la tecnica di respinta laterale per evitare di rilasciare palla al centro.",
        action: "Lavoro con sagome deviatrici e respinta indirizzata verso la linea laterale."
    },
    'tecn-dribble': {
        strength: "Posizionamento impeccabile sulla linea di porta a copertura del primo palo.",
        weaknessGoal: "Perfezionare la chiusura degli angoli di tiro sulle conclusioni defilate.",
        action: "Esercizi di spostamento veloci a passi incrociati lungo la linea di porta."
    },
    'fisi-speed': {
        strength: "Esplosività nei primi 2 metri per chiudere lo specchio prima del tiro.",
        weaknessGoal: "Aumentare la velocità di scatto in avanti nelle uscite in presa alta.",
        action: "Scatti esplosivi brevi da posizione sdraiata o in ginocchio con partenza al segnale."
    },
    'fisi-Agilità': {
        strength: "Grande fluidità nel rialzarsi immediatamente dopo una parata a terra.",
        weaknessGoal: "Migliorare la mobilità articolare delle anche per la spaccata difensiva.",
        action: "Sessioni di mobilità articolare e stretching dinamico specifico per portieri."
    },
    'tatt-transition': {
        strength: "Abilità nel partecipare alla manovra offensiva come 5° uomo di movimento.",
        weaknessGoal: "Migliorare i tempi di rientro in porta sui recuperi palla avversari.",
        action: "Simulazioni tattiche di 5vs4 offensivo e transizione negativa di rientro."
    },
    'tatt-reading': {
        strength: "Guida impeccabile della difesa con chiamate chiare e tempestive.",
        weaknessGoal: "Valutare con maggior anticipo le uscite preventive sui filtranti veloci.",
        action: "Analisi video delle imbucate avversarie ed esercitazioni di uscita anticipata."
    }
};

window.updateAssessmentParameterLabels = function(player) {
    const isGK = player && (player.role === 'Portiere' || player.role === 'POR');
    
    let gkBanner = document.getElementById('gk-evaluation-banner');
    const evalHeader = document.querySelector('.evaluation-setup-bar');
    
    if (isGK) {
        if (!gkBanner && evalHeader) {
            gkBanner = document.createElement('div');
            gkBanner.id = 'gk-evaluation-banner';
            gkBanner.style.cssText = 'margin-top:0.75rem; padding:0.6rem 1rem; background:rgba(234, 179, 8, 0.15); border:1px solid rgba(234, 179, 8, 0.4); border-radius:8px; color:#fde047; font-size:0.88rem; font-weight:700; display:flex; align-items:center; justify-content:space-between; animation:slideInUp 0.3s ease;';
            gkBanner.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="font-size:1.2rem;">🧤</span>
                    <span>Scheda di Autovalutazione Specifiche per PORTIERE</span>
                </div>
                <span style="font-size:0.75rem; background:rgba(234, 179, 8, 0.25); padding:0.2rem 0.6rem; border-radius:4px; text-transform:uppercase;">Ruolo: Portiere</span>
            `;
            evalHeader.appendChild(gkBanner);
        } else if (gkBanner) {
            gkBanner.style.display = 'flex';
        }
    } else {
        if (gkBanner) gkBanner.style.display = 'none';
    }

    const labelsMap = isGK ? gkParamLabels : defaultParamLabels;

    Object.keys(labelsMap).forEach(key => {
        const item = labelsMap[key];
        const sliderInput = document.getElementById(`${key}-player`);
        if (sliderInput) {
            const group = sliderInput.closest('.slider-group-dual');
            if (group) {
                const nameSpan = group.querySelector('.slider-header-title span:first-child');
                const descSmall = group.querySelector('.slider-header-desc');
                if (nameSpan) nameSpan.textContent = item.label;
                if (descSmall) descSmall.textContent = item.desc;
            }
        }
    });

    const tecnCategoryH2 = document.querySelector('.category-card[data-category="tecnica"] h2');
    if (tecnCategoryH2) tecnCategoryH2.textContent = isGK ? 'Tecnica Portiere' : 'Tecnica Individuale';

    const tattCategoryH2 = document.querySelector('.category-card[data-category="tattica"] h2');
    if (tattCategoryH2) tattCategoryH2.textContent = isGK ? 'Tattica & Gioco coi Piedi' : 'Tattica';
};

window.defaultParamLabels = defaultParamLabels;
window.gkParamLabels = gkParamLabels;
window.gkDefaultPlans = gkDefaultPlans;

// Default expert futsal suggestions for Strength/Weakness (in Italian)
const defaultPlans = {
    'psic-focus': {
        strength: "Mantenere la focalizzazione mentale per guidare la squadra nelle fasi critiche del match.",
        weaknessGoal: "Eliminare le pause di concentrazione durante le rotazioni e le transizioni veloci.",
        action: "Esercizi di respirazione diaframmatica durante le pause e ancoraggio su parole chiave tattiche."
    },
    'psic-stress': {
        strength: "Mantenere freddezza nei momenti di massima pressione difensiva avversaria.",
        weaknessGoal: "Controllare l'emotivitÃ â€™Ãƒâ€šÃ‚Â  ed evitare falli di frustrazione nei minuti finali.",
        action: "Simulazioni in allenamento di situazioni di svantaggio e raddoppi di marcatura aggressivi."
    },
    'psic-grinta': {
        strength: "Sfruttare l'intensitÃ â€™Ãƒâ€šÃ‚Â  agonistica per vincere i duelli individuali e guidare il pressing alto.",
        weaknessGoal: "Canalizzare la grinta agonistica evitando sanzioni disciplinari o interventi irruenti.",
        action: "Esercitazioni specifiche sull'intercettazione palla basate sul tempo di reazione anzichÃ©â€™Ãƒâ€šÃ‚Â© sul contrasto fisico."
    },
    'psic-team': {
        strength: "Svolgere un ruolo di leader verbale in campo, ordinando le marcature e sostenendo i compagni.",
        weaknessGoal: "Migliorare la comunicazione cosÃ¬ nei momenti di difficoltÃ â€™Ãƒâ€šÃ‚Â  collettiva.",
        action: "Prendere l'impegno di incitare i compagni e chiamare preventivamente i tagli degli avversari."
    },
    'tecn-control': {
        strength: "Ricevere palla di suola proteggendola efficacemente per far salire la squadra.",
        weaknessGoal: "Ridurre le imperfezioni nel controllo orientato di suola sotto pressione intensa.",
        action: "Esercitazioni a inizio seduta: ricezione con la suola e scarico rapido con traiettorie da diverse direzioni."
    },
    'tecn-pass': {
        strength: "Cercare imbucate precise e tagli filtranti per innescare il pivot di ruolo.",
        weaknessGoal: "Incrementare la velocitÃ â€™Ãƒâ€šÃ‚Â  di trasmissione palla ed evitare passaggi intercettabili orizzontali.",
        action: "Lavoro a coppie sui passaggi di prima intenzione a diverse intensitÃ â€™Ãƒâ€šÃ‚Â  e distanze."
    },
    'tecn-shot': {
        strength: "Prendere l'iniziativa del tiro dal limite o inserimento dal secondo palo.",
        weaknessGoal: "Migliorare la rapiditÃ â€™Ãƒâ€šÃ‚Â  di caricamento del tiro e la precisione a rete con entrambi i piedi.",
        action: "15 tiri in porta di prima intenzione su scarico laterale o del pivot a fine allenamento."
    },
    'tecn-dribble': {
        strength: "Isolare il marcatore sulle bande laterali per creare superioritÃ â€™Ãƒâ€šÃ‚Â  numerica.",
        weaknessGoal: "Evitare dribbling rischiosi in zona centrale (fase di impostazione dell'ultimo).",
        action: "Esercitazioni di 1vs1 in spazi molto stretti (es. corridoi di 3 metri) incentrati sulla finta di corpo."
    },
    'fisi-speed': {
        strength: "Sfruttare lo sprint breve per ribaltare l'azione in transizione attiva o recuperare l'uomo.",
        weaknessGoal: "Migliorare la reattivitÃ â€™Ãƒâ€šÃ‚Â  nei primi 3 metri per anticipare il movimento avversario.",
        action: "Lavoro di scatti brevi con cambi di direzione e balzi esplosivi (3 serie da 6 ripetizioni)."
    },
    'fisi-stamina': {
        strength: "Garantire un'intensitÃ â€™Ãƒâ€šÃ‚Â  cosÃ¬ di pressing e ripiegamenti anche ad alto ritmo.",
        weaknessGoal: "Evitare cali atletici nella seconda parte di ciascun tempo di giÃ .",
        action: "Programma HIIT specifico per il futsal: scatti sui 15 metri alternati a recuperi attivi."
    },
    'fisi-strength': {
        strength: "Proteggere la palla col corpo fungendo da pivot boa ed eccellere nei contrasti.",
        weaknessGoal: "Aumentare la forza negli scontri spalla a spalla e nella difesa della posizione.",
        action: "Lavoro di potenziamento muscolare della parte inferiore (squat/affondi) associato a core-stability."
    },
    'fisi-AgilitÃ ': {
        strength: "Eseguire cambi di direzione rapidi per smarcarsi o chiudere le diagonali.",
        weaknessGoal: "Migliorare la coordinazione e la rapiditÃ â€™Ãƒâ€šÃ‚Â  motoria nei cambi di direzione repentini.",
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
        weaknessGoal: "Migliorare la velocitÃ â€™Ãƒâ€šÃ‚Â  di ripiegamento difensivo sotto la linea della palla.",
        action: "Partite condizionate: obbligo di posizionamento difensivo entro 4 secondi dalla perdita del possesso."
    },
    'tatt-reading': {
        strength: "Prendere scelte tattiche ottimali riducendo i tempi decisionali sotto pressione.",
        weaknessGoal: "Riconoscere rapidamente quando verticalizzare e quando mantenere il possesso palla.",
        action: "Partite a tema a tocchi limitati (1 o 2 tocchi) per cosÃ¬ a leggere il giÃ ."
    }
};
window.defaultPlans = defaultPlans;

function getSyntheticPlanText(sheet, key, type, isGK) {
    if (!key) return '';
    const planSource = isGK ? (window.gkDefaultPlans || {}) : (window.defaultPlans || {});
    const descSource = isGK ? (window.gkParamLabels || {}) : (window.paramDescriptions || {});

    let text = '';
    if (type === 'strength') {
        if (sheet && sheet.strengthPlan && sheet.strengthPlan.trim()) {
            text = sheet.strengthPlan.trim();
        } else if (planSource[key] && planSource[key].strength) {
            text = planSource[key].strength;
        } else if (descSource[key] && descSource[key].desc) {
            text = descSource[key].desc;
        }
    } else {
        if (sheet && sheet.weaknessGoal && sheet.weaknessGoal.trim()) {
            text = sheet.weaknessGoal.trim();
            if (sheet.actionPlan && sheet.actionPlan.trim()) {
                text += ` — ${sheet.actionPlan.trim()}`;
            }
        } else if (sheet && sheet.actionPlan && sheet.actionPlan.trim()) {
            text = sheet.actionPlan.trim();
        } else if (planSource[key] && planSource[key].weaknessGoal) {
            text = planSource[key].weaknessGoal;
        } else if (descSource[key] && descSource[key].desc) {
            text = descSource[key].desc;
        }
    }

    if (!text) return '';
    text = text.replace(/Ã |â€™|Ãƒ|â€š|Â|Ã©/g, '').trim();
    if (text.length > 80) {
        text = text.substring(0, 77) + '...';
    }
    return text;
}
window.getSyntheticPlanText = getSyntheticPlanText;

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

window.parseBirthData = function(inputVal) {
    if (!inputVal) return { birthDate: '', birthYear: '' };
    const clean = String(inputVal).trim();
    if (clean.includes('-')) {
        const parts = clean.split('-');
        return { birthDate: clean, birthYear: parts[0] };
    }
    if (clean.includes('/')) {
        const parts = clean.split('/');
        if (parts.length === 3) {
            const iso = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            return { birthDate: iso, birthYear: parts[2] };
        }
    }
    return { birthDate: clean, birthYear: clean };
};

window.formatBirthDateDisplay = function(player) {
    if (!player) return '--';
    const val = player.birthDate || player.birthYear;
    if (!val) return '--';
    if (typeof val === 'string' && val.includes('-')) {
        const parts = val.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
    }
    return val;
};

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

window.toggleEditProfileCardMode = function(show) {
    const editForm = document.getElementById('form-profile-card-edit');
    const detailsGrid = document.querySelector('.profile-details-grid-content');
    if (!editForm) return;

    const isShowing = show !== undefined ? show : editForm.classList.contains('hidden');
    if (isShowing) {
        editForm.classList.remove('hidden');
        if (detailsGrid) detailsGrid.classList.add('hidden');
    } else {
        editForm.classList.add('hidden');
        if (detailsGrid) detailsGrid.classList.remove('hidden');
    }
};

window.handleAthleteCardPhotoUpload = function(input, playerId) {
    const file = input.files && input.files[0];
    if (!file) return;

    compressPlayerPhoto(file, (compressedBase64) => {
        if (!compressedBase64) return;
        const playerIndex = players.findIndex(p => String(p.id) === String(playerId));
        if (playerIndex === -1) return;

        players[playerIndex].photo = compressedBase64;
        localStorage.setItem('futsal_portal_players', JSON.stringify(players));

        updateAthleteProfileCard(players[playerIndex]);
        if (typeof renderRoster === 'function') renderRoster();
        if (typeof renderGrid === 'function') renderGrid();
        if (typeof renderQuartets === 'function') renderQuartets();

        showToast("Foto del profilo aggiornata!", "success");
    });
};

window.saveAthleteProfileCardEdit = function() {
    const selectPlayerVal = document.getElementById('select-player').value;
    const playerIndex = players.findIndex(p => String(p.id) === String(selectPlayerVal));
    if (playerIndex === -1) {
        showToast("Seleziona prima un giocatore!", "error");
        return;
    }

    const nameVal = document.getElementById('prof-card-input-name').value.trim();
    if (!nameVal) {
        showToast("Inserisci il nome del giocatore!", "error");
        return;
    }

    const birthData = parseBirthData(document.getElementById('prof-card-input-birth').value);

    players[playerIndex].name = window.getInvertedName ? window.getInvertedName(nameVal) : nameVal;
    players[playerIndex].number = document.getElementById('prof-card-input-number').value;
    players[playerIndex].role = document.getElementById('prof-card-input-role').value;
    players[playerIndex].birthDate = birthData.birthDate;
    players[playerIndex].birthYear = birthData.birthYear;
    players[playerIndex].height = document.getElementById('prof-card-input-height').value;
    players[playerIndex].weight = document.getElementById('prof-card-input-weight').value;
    players[playerIndex].foot = document.getElementById('prof-card-input-foot').value;
    players[playerIndex].job = document.getElementById('prof-card-input-job').value.trim();
    players[playerIndex].experience = document.getElementById('prof-card-input-experience').value.trim();

    localStorage.setItem('futsal_portal_players', JSON.stringify(players));

    // Update UI dropdowns & profile card
    populatePlayerDropdowns();
    document.getElementById('select-player').value = players[playerIndex].id;
    updateAthleteProfileCard(players[playerIndex]);

    // Refresh roster, grid, quartets and dossier if open
    if (typeof renderRoster === 'function') renderRoster();
    if (typeof renderGrid === 'function') renderGrid();
    if (typeof renderQuartets === 'function') renderQuartets();

    toggleEditProfileCardMode(false);
    showToast(`Profilo di ${players[playerIndex].name} aggiornato in automatico!`, "success");
};

function updateAthleteProfileCard(player) {
    const profileCard = document.getElementById('athlete-profile-card');

    // Update evaluation parameters labels dynamically based on role (Goalkeeper vs Field Player)
    if (typeof updateAssessmentParameterLabels === 'function') {
        updateAssessmentParameterLabels(player);
    }

    if (!profileCard) return;

    if (!player) {
        profileCard.classList.add('hidden');
        const histGroup = document.getElementById('historical-sheets-select-group');
        if (histGroup) histGroup.style.display = 'none';
        if (athleteAttendanceChartInstance) {
            athleteAttendanceChartInstance.destroy();
            athleteAttendanceChartInstance = null;
        }
        return;
    }

    profileCard.classList.remove('hidden');

    // Populate inputs for Edit Mode
    const inputName = document.getElementById('prof-card-input-name');
    const inputNum = document.getElementById('prof-card-input-number');
    const inputRole = document.getElementById('prof-card-input-role');
    const inputBirth = document.getElementById('prof-card-input-birth');
    const inputHeight = document.getElementById('prof-card-input-height');
    const inputWeight = document.getElementById('prof-card-input-weight');
    const inputFoot = document.getElementById('prof-card-input-foot');
    const inputJob = document.getElementById('prof-card-input-job');
    const inputExp = document.getElementById('prof-card-input-experience');

    if (inputName) inputName.value = window.getInvertedName ? window.getInvertedName(player.name) : player.name;
    if (inputNum) inputNum.value = player.number || '';
    if (inputRole) inputRole.value = player.role || 'Universale';
    if (inputBirth) inputBirth.value = player.birthDate || (player.birthYear && player.birthYear.length === 4 ? player.birthYear + '-01-01' : '');
    if (inputHeight) inputHeight.value = player.height || '';
    if (inputWeight) inputWeight.value = player.weight || '';
    if (inputFoot) inputFoot.value = player.foot || 'Destro';
    if (inputJob) inputJob.value = player.job || '';
    if (inputExp) inputExp.value = player.experience || '';

    // Avatar
    const avatarContainer = document.getElementById('profile-card-avatar-container');
    if (avatarContainer) {
        const initials = getInitials(player.name);
        const avatarImg = player.photo 
            ? `<img src="${player.photo}" alt="${escapeHTML(player.name)}" class="player-avatar-img">`
            : `<span class="profile-avatar-initials">${initials}</span>`;

        avatarContainer.innerHTML = `
            <div style="position:relative; cursor:pointer;" onclick="document.getElementById('profile-card-photo-input').click()" title="Clicca per caricare/cambiare la foto del profilo">
                ${avatarImg}
                <span style="position:absolute; bottom:0; right:0; background:var(--color-player); color:#000; border-radius:50%; width:22px; height:22px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; box-shadow:0 2px 4px rgba(0,0,0,0.5);">📷</span>
            </div>
            <input type="file" id="profile-card-photo-input" accept="image/*" style="display:none;" onchange="handleAthleteCardPhotoUpload(this, '${player.id}')">
        `;
    }

    // Name, Number, Role, Foot
    const nameEl = document.getElementById('profile-card-name');
    const numberEl = document.getElementById('profile-card-number');
    const roleEl = document.getElementById('profile-card-role');
    const footEl = document.getElementById('profile-card-foot');

    if (nameEl) nameEl.textContent = window.getInvertedName ? window.getInvertedName(player.name) : player.name;
    if (numberEl) numberEl.textContent = player.number || '';
    if (roleEl) roleEl.textContent = player.role || '--';
    if (footEl) footEl.textContent = player.foot || '--';

    // Birth Year, Weight, Height, Job, Experience
    const birthYearEl = document.getElementById('profile-card-birth-year');
    const weightEl = document.getElementById('profile-card-weight');
    const heightEl = document.getElementById('profile-card-height');
    const jobEl = document.getElementById('profile-card-job');
    const expEl = document.getElementById('profile-card-experience');

    if (birthYearEl) birthYearEl.textContent = formatBirthDateDisplay(player);
    if (weightEl) weightEl.textContent = player.weight || '--';
    if (heightEl) heightEl.textContent = player.height || '--';
    if (jobEl) jobEl.textContent = player.job || '--';
    if (expEl) expEl.textContent = player.experience || '--';

    // Populate Historical Sheets dropdown for this player
    const histGroup = document.getElementById('historical-sheets-select-group');
    const histSelect = document.getElementById('select-historical-sheet');

    if (histGroup && histSelect) {
        const playerSheets = typeof assessments !== 'undefined' ? assessments.filter(a => String(a.playerId) === String(player.id)) : [];
        if (playerSheets.length > 0) {
            histGroup.style.display = 'block';
            playerSheets.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
            histSelect.innerHTML = `
                <option value="">-- Compila Nuova Valutazione (Oggi) --</option>
                ${playerSheets.map(s => {
                    const dStr = s.date ? s.date.split('-').reverse().join('/') : '';
                    const isCurrent = typeof activeAssessmentId !== 'undefined' && activeAssessmentId === s.id;
                    return `<option value="${s.id}" ${isCurrent ? 'selected' : ''}>✏️ Modifica Scheda Storica del ${dStr} (Mister: ${s.overallCoach || '-'})</option>`;
                }).join('')}
            `;
        } else {
            histGroup.style.display = 'none';
        }
    }
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
                    'hsla(210, 90%, 55%, 0.85)',  // giÃ  (Blu)
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
window.players = players;

let assessments = [];
try { assessments = JSON.parse(localStorage.getItem('futsal_portal_assessments')) || []; } catch(e) { console.error("Error loading assessments:", e); }

let trainings = [];
try { trainings = JSON.parse(localStorage.getItem('futsal_portal_trainings')) || []; } catch(e) { console.error("Error loading trainings:", e); }
window.trainings = trainings;

let convocations = [];
try { convocations = JSON.parse(localStorage.getItem('futsal_portal_convocations')) || []; } catch(e) { console.error("Error loading convocations:", e); }

let athleticTests = [];
try { athleticTests = JSON.parse(localStorage.getItem('futsal_portal_athletic_tests')) || []; } catch(e) { console.error("Error loading athletic_tests:", e); }

let removedDates = [];
try { removedDates = JSON.parse(localStorage.getItem('futsal_portal_removed_dates')) || []; } catch(e) { console.error("Error loading removed_dates:", e); }

function removeDate(dateStr) {
    if (!dateStr) return;
    if (!removedDates.includes(dateStr)) {
        removedDates.push(dateStr);
        localStorage.setItem('futsal_portal_removed_dates', JSON.stringify(removedDates));
    }
}

function unremoveDate(dateStr) {
    if (!dateStr) return;
    if (removedDates.includes(dateStr)) {
        removedDates = removedDates.filter(d => d !== dateStr);
        localStorage.setItem('futsal_portal_removed_dates', JSON.stringify(removedDates));
    }
}

window.removeDate = removeDate;
window.unremoveDate = unremoveDate;

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
    checkAuth();
    initApp();
});

function initApp() {
    if (!currentUser && !window.location.pathname.endsWith('login.html')) return;
    if (!document.getElementById('tab-dashboard')) return; // Esce se siamo nella pagina di login

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
    const btnSave = document.getElementById('btn-save');
    if (btnSave) btnSave.addEventListener('click', saveAssessment);

    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) btnPrint.addEventListener('click', handlePrint);

    const btnExportTxt = document.getElementById('btn-export-txt');
    if (btnExportTxt) btnExportTxt.addEventListener('click', exportEvaluationToTXT);

    const btnCloseSheet = document.getElementById('btn-close-sheet');
    if (btnCloseSheet) btnCloseSheet.addEventListener('click', closeEvaluationForm);

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
                    showToast("ÃƒË† giÃ !", "error");
                    return;
                }
                
                let locationPrefix = location === 'C' ? '(C)' : (location === 'T' ? '(T)' : '(S)');
                let finalOpponent = opponent || (eventType === 'friendly' ? 'Amichevole' : 'Gara');
                if (!finalOpponent.includes('(C)') && !finalOpponent.includes('(T)') && !finalOpponent.includes('(S)')) {
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
                
                unremoveDate(date);
                convocations.push(newMatch);
                convocations.sort((a, b) => new Date(b.date) - new Date(a.date));
                localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                showToast(`Evento pianificato con successo!`, "success");
            } else {
                const exists = trainings.some(t => t.date === date);
                if (exists) {
                    showToast("ÃƒË† giÃ !", "error");
                    return;
                }
                
                const trainingLogisticEl = document.getElementById('popup-training-logistic');
                const trainingLogistic = trainingLogisticEl ? trainingLogisticEl.value : '';

                const newTraining = {
                    id: Date.now(),
                    date: date,
                    type: sessionType || 'Allenamento',
                    ...(trainingLogistic ? { logistic: trainingLogistic } : {})
                };
                
                unremoveDate(date);
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
                        showToast("Esiste giÃ !", "error");
                        return;
                    }
                } else {
                    const exists = trainings.some(t => t.date === newDate);
                    if (exists) {
                        showToast("Esiste giÃ !", "error");
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
                        
                        let locationPrefix = location === 'C' ? '(C)' : (location === 'T' ? '(T)' : '(S)');
                        let finalOpponent = opponent || (targetType === 'friendly' ? 'Amichevole' : 'Gara');
                        
                        // Rimuovi eventuali (C), (T) o (S) preesistenti alla fine
                        finalOpponent = finalOpponent.replace(/\s*\([CTS]\)$/, '');
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
                        const editLogisticEl = document.getElementById('edit-col-training-logistic');
                        const editLogistic = editLogisticEl ? editLogisticEl.value : '';
                        const newSession = {
                            id: Date.now(),
                            date: newDate,
                            type: type || 'Allenamento',
                            ...(editLogistic ? { logistic: editLogistic } : {}),
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
                    
                    let locationPrefix = location === 'C' ? '(C)' : (location === 'T' ? '(T)' : '(S)');
                    let finalOpponent = opponent || (targetType === 'friendly' ? 'Amichevole' : 'Gara');
                    
                    finalOpponent = finalOpponent.replace(/\s*\([CTS]\)$/, '');
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
                    const editLogisticEl = document.getElementById('edit-col-training-logistic');
                    const editLogistic = editLogisticEl ? editLogisticEl.value : '';
                    if (sessionIndex !== -1) {
                        trainings[sessionIndex].date = newDate;
                        trainings[sessionIndex].type = type || 'Allenamento';
                        if (editLogistic) {
                            trainings[sessionIndex].logistic = editLogistic;
                        } else {
                            delete trainings[sessionIndex].logistic;
                        }
                        
                        trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
                        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                        showToast("Allenamento modificato con successo!", "success");
                    } else {
                        // Create in trainings
                        const newSession = {
                            id: Date.now(),
                            date: newDate,
                            type: type || 'Allenamento',
                            ...(editLogistic ? { logistic: editLogistic } : {}),
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
            if (!originalDate) return;
            
            const wasMatch = convocations.some(c => c.date === originalDate);
            const msg = wasMatch ? "Sei sicuro di voler eliminare questa partita/amichevole? Verranno eliminate anche le relative convocazioni." : "Sei sicuro di voler eliminare questo allenamento / seduta? Verranno eliminate anche le relative presenze.";
            
            if (confirm(msg)) {
                convocations = convocations.filter(c => c.date !== originalDate);
                localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                
                trainings = trainings.filter(t => t.date !== originalDate);
                localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                
                removeDate(originalDate);
                
                showToast("Seduta eliminata con successo!", "success");
                closeModal();
                if (window.renderTrainingHistory) renderTrainingHistory();
                if (window.renderConvocationsHistory) renderConvocationsHistory();
                renderAttendanceBoard();
                if (window.renderRoster) renderRoster(); // Update stats
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

    let originalTitle = document.title;

    window.addEventListener('beforeprint', () => {
        originalTitle = document.title;

        if (document.body.classList.contains('print-evaluation')) {
            const playerSelect = document.getElementById('select-player');
            const playerName = playerSelect ? playerSelect.options[playerSelect.selectedIndex]?.text : '';
            const cleanPlayerName = playerName ? playerName.split(' (')[0].trim() : 'Giocatore';
            
            const rawDate = document.getElementById('assessment-date')?.value || new Date().toISOString().split('T')[0];
            const formattedDate = rawDate.split('-').reverse().join('-'); // DD-MM-YYYY
            
            document.title = `${formattedDate} - Valutazione Performance - ${cleanPlayerName}`;
        } else if (document.body.classList.contains('print-distinta')) {
            const matchSelect = document.getElementById('select-match');
            const matchName = matchSelect ? matchSelect.options[matchSelect.selectedIndex]?.text : '';
            const cleanMatchName = matchName ? matchName.trim() : 'Gara';
            
            const rawDate = document.getElementById('match-date-display')?.textContent || new Date().toLocaleDateString('it-IT');
            const cleanDate = rawDate.replace(/\//g, '-');
            document.title = `${cleanDate} - Distinta - ${cleanMatchName}`;
        }

        // Adapt charts colors dynamically for printer friendly colors
        adaptChartsForPrint(true);
    });

    window.addEventListener('afterprint', () => {
        document.title = originalTitle;
        document.body.classList.remove('print-evaluation', 'print-distinta', 'print-preseason');
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
            if (targetTab === 'tab-dashboard') {
                if (typeof window.renderDashboardAlertsWidget === 'function') window.renderDashboardAlertsWidget();
            } else if (targetTab === 'tab-profile') {
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
            showToast("Giocatore o Numero di Maglia giÃ !", "error");
            return;
        }

        const birthYearVal = document.getElementById('new-player-birth-year').value;
        const birthData = parseBirthData(birthYearVal);
        const weightVal = document.getElementById('new-player-weight').value;
        const heightVal = document.getElementById('new-player-height').value;
        const job = document.getElementById('new-player-job').value.trim();
        const experience = document.getElementById('new-player-experience').value.trim();
        const photoFile = document.getElementById('new-player-photo').files[0];

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
                        birthDate: birthData.birthDate,
                        birthYear: birthData.birthYear,
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
                    birthDate: birthData.birthDate,
                    birthYear: birthData.birthYear,
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
                            'hsla(210, 90%, 55%, 0.85)',  // giÃ  (Blu)
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
    
    // Se ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨ stato cambiato in roster-container, lo recuperiamo cosÃ¬â€™Ãƒâ€šÃ‚Â¬, altrimenti se ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨ ancora roster-grid:
    // UserÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â² il container originario che ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨ id="roster-grid" ma ne cambierÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â² il display block.
    
    if (players.length === 0) {
        container.innerHTML = `
            <div class="empty-roster-msg">
                <p>Nessun giÃ .</p>
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
    // 1. Dati anagrafici (giÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  in player)
    
    // 2. Ultimi test fisici
    const pTests = typeof athleticTests !== 'undefined' ? athleticTests.filter(t => t.playerId === id).sort((a,b) => new Date(b.date) - new Date(a.date)) : [];
    const latestYoyo = pTests.find(t => t.type === 'yoyo');
    const latestSprint = pTests.find(t => t.type === 'sprint');
    const latestAgility = pTests.find(t => t.type === 'Agilità' || t.type === 'agility' || t.type === 'AgilitÃ ');
    const latestCmj = pTests.find(t => t.type === 'cmj' || t.type === 'CMJ');
    const validEvals = typeof assessments !== 'undefined' ? assessments.filter(e => String(e.playerId) === String(id) && (e.coachScores || e.playerScores)) : [];
    
    const sortedEvals = [...validEvals].sort((a,b) => new Date(b.date) - new Date(a.date));
    const latestEval = sortedEvals[0];
    
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
            totalAtt++;
            const st = (t.roster && t.roster[id] !== undefined) ? t.roster[id] : 'P';
            if (st !== 'A' && st !== 'I' && st !== 'G' && st !== '-') presentCount++;
            allActivities.push({ date: t.date, type: t.type, status: st, isMatch: false });
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
        recentPresenzeHTML = `<div style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:1rem;">Nessuna attivitÃƒÂ  registrata</div>`;
    }

    const modalBody = document.getElementById('player-summary-body');
    
    const initials = getInitials(player.name);
    const avatarContentHTML = player.photo 
        ? `<img src="${player.photo}" alt="${escapeHTML(player.name)}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`
        : `<div style="width:100%; height:100%; border-radius:50%; background:var(--color-player); display:flex; align-items:center; justify-content:center; font-size:2.2rem; font-weight:bold; color:#0f172a;">${initials}</div>`;

    const avatarHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.25rem;">
            <div style="position:relative; width:90px; height:90px; flex-shrink:0;">
                <div id="dossier-avatar-preview" onclick="document.getElementById('dossier-photo-input').click()" 
                     title="Clicca per caricare/cambiare la foto del profilo"
                     style="width:90px; height:90px; border-radius:50%; overflow:hidden; border:3px solid var(--color-player); cursor:pointer; background:rgba(0,0,0,0.3); transition:transform 0.2s ease; box-shadow:0 4px 12px rgba(0,0,0,0.4);"
                     onmouseover="this.style.transform='scale(1.05)'"
                     onmouseout="this.style.transform='scale(1)'">
                    ${avatarContentHTML}
                </div>
                <button type="button" onclick="document.getElementById('dossier-photo-input').click()" 
                    title="Cambia Foto Profilo"
                    style="position:absolute; bottom:-2px; right:-2px; background:var(--color-player); color:#000; border:2px solid #0f172a; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:0.8rem; box-shadow:0 2px 6px rgba(0,0,0,0.5);">
                    📷
                </button>
                <input type="file" id="dossier-photo-input" accept="image/*" style="display:none;" onchange="handleDossierPhotoUpload(this, '${player.id}')">
            </div>
            ${player.photo ? `<button type="button" onclick="removeDossierPhoto('${player.id}')" style="font-size:0.7rem; background:transparent; border:none; color:var(--color-danger); cursor:pointer; padding:0; margin-top:2px;" title="Rimuovi Foto del Profilo">Rimuovi foto</button>` : ''}
        </div>
    `;

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
            <div>${avatarHTML}</div>
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
                        <span style="font-size:0.8rem;">📅 Nascita</span>
                        <input type="date" id="edit-dossier-birth" value="${player.birthDate || (player.birthYear && player.birthYear.length === 4 ? player.birthYear + '-01-01' : '')}" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.2); border-radius:4px; padding:0.1rem 0.3rem; color:#fff; font-size:0.8rem;" />
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
                <h4 style="margin-top:0; margin-bottom:0.4rem; color:var(--color-tech); border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.3rem; font-size:1.1rem; font-weight:bold;">Performance & Autovalutazione</h4>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem; overflow:hidden;">
                    <div style="flex:1; min-width:0; position:relative; min-height: 200px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                        <canvas id="dossier-radar-chart"></canvas>
                    </div>
                    <div style="flex:1; min-width:0; position:relative; min-height: 200px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                        <canvas id="dossier-specific-chart"></canvas>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:0.5rem; margin-top:0.75rem; text-align:center; background:rgba(0,0,0,0.25); padding:0.6rem; border-radius:8px; border:1px solid rgba(255,255,255,0.08);">
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
                        <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Tecnica</div>
                        <div style="font-size:1.2rem; font-weight:800; color:#4ade80; margin-top:0.1rem;">${techVal} <span style="font-size:0.7rem; color:rgba(255,255,255,0.5); font-weight:normal;">(Mister)</span></div>
                        <div style="font-size:0.95rem; font-weight:800; color:#38bdf8; background:rgba(56, 189, 248, 0.18); border:1px solid rgba(56, 189, 248, 0.35); padding:0.2rem 0.5rem; border-radius:6px; margin-top:0.25rem;">Auto-val: ${pTechVal}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
                        <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Tattica</div>
                        <div style="font-size:1.2rem; font-weight:800; color:#facc15; margin-top:0.1rem;">${tacVal} <span style="font-size:0.7rem; color:rgba(255,255,255,0.5); font-weight:normal;">(Mister)</span></div>
                        <div style="font-size:0.95rem; font-weight:800; color:#38bdf8; background:rgba(56, 189, 248, 0.18); border:1px solid rgba(56, 189, 248, 0.35); padding:0.2rem 0.5rem; border-radius:6px; margin-top:0.25rem;">Auto-val: ${pTacVal}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
                        <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Fisica</div>
                        <div style="font-size:1.2rem; font-weight:800; color:#f87171; margin-top:0.1rem;">${phyVal} <span style="font-size:0.7rem; color:rgba(255,255,255,0.5); font-weight:normal;">(Mister)</span></div>
                        <div style="font-size:0.95rem; font-weight:800; color:#38bdf8; background:rgba(56, 189, 248, 0.18); border:1px solid rgba(56, 189, 248, 0.35); padding:0.2rem 0.5rem; border-radius:6px; margin-top:0.25rem;">Auto-val: ${pPhyVal}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
                        <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Psicologia</div>
                        <div style="font-size:1.2rem; font-weight:800; color:#c084fc; margin-top:0.1rem;">${psyVal} <span style="font-size:0.7rem; color:rgba(255,255,255,0.5); font-weight:normal;">(Mister)</span></div>
                        <div style="font-size:0.95rem; font-weight:800; color:#38bdf8; background:rgba(56, 189, 248, 0.18); border:1px solid rgba(56, 189, 248, 0.35); padding:0.2rem 0.5rem; border-radius:6px; margin-top:0.25rem;">Auto-val: ${pPsyVal}</div>
                    </div>
                </div>

                <!-- Piano di Crescita dell'ultima Valutazione -->
                <div style="margin-top:0.6rem; padding-top:0.5rem; border-top:1px dashed rgba(255,255,255,0.1); font-size:0.8rem; display:flex; flex-direction:column; gap:0.4rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:var(--color-tatt); font-weight:bold; font-size:0.85rem;">💪 Punto di Forza / Piano:</span>
                        <span style="color:var(--text-muted); font-size:0.75rem;">${latestEval ? formatDate(latestEval.date) : ''}</span>
                    </div>
                    <div style="background:rgba(0,0,0,0.25); padding:0.4rem 0.6rem; border-radius:4px; color:var(--text-primary); font-size:0.8rem; line-height:1.35;">
                        ${latestEval && latestEval.strengthPlan ? escapeHTML(latestEval.strengthPlan) : 'Non specificato'}
                    </div>
                    
                    <span style="color:var(--color-fisi); font-weight:bold; font-size:0.85rem; margin-top:0.2rem;">⚠️ Obiettivo Debolezza / Piano d'Azione:</span>
                    <div style="background:rgba(0,0,0,0.25); padding:0.4rem 0.6rem; border-radius:4px; color:var(--text-primary); font-size:0.8rem; line-height:1.35;">
                        ${latestEval && (latestEval.weaknessGoal || latestEval.actionPlan) ? escapeHTML([latestEval.weaknessGoal, latestEval.actionPlan].filter(Boolean).join(' — ')) : 'Non specificato'}
                    </div>
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
                        <option value="Pivot di Profondità" ${player.secondaryRoles==='Pivot di Profondità' || player.secondaryRoles==='Pivot di ProfonditÃƒÂ ' ?'selected':''}>Pivot di Profondità</option>
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
                        <option value="1° Quartetto (Titolari)" ${player.quartets==='1° Quartetto (Titolari)' || player.quartets==='1Ã‚Â° Quartetto (Titolari)' ?'selected':''}>1° Quartetto (Titolari)</option>
                        <option value="2° Quartetto (Prime Rotazioni)" ${player.quartets==='2° Quartetto (Prime Rotazioni)' || player.quartets==='2Ã‚Â° Quartetto (Prime Rotazioni)' ?'selected':''}>2° Quartetto (Prime Rotazioni)</option>
                        <option value="3° Quartetto (Seconde Rotazioni)" ${player.quartets==='3° Quartetto (Seconde Rotazioni)' || player.quartets==='3Ã‚Â° Quartetto (Seconde Rotazioni)' ?'selected':''}>3° Quartetto (Seconde Rotazioni)</option>
                        <option value="4° Quartetto (Terze Rotazioni)" ${player.quartets==='4° Quartetto (Terze Rotazioni)' || player.quartets==='4Ã‚Â° Quartetto (Terze Rotazioni)' ?'selected':''}>4° Quartetto (Terze Rotazioni)</option>
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
                <button class="btn btn-danger" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="if(confirm('Sei sicuro di voler eliminare questo giocatore?')){ deletePlayer('${player.id}'); closePlayerSummaryModal(); }">Cancella</button>
                <button class="btn btn-primary" style="padding:0.4rem 0.8rem; font-size:0.8rem;" onclick="savePlayerFromDossier('${player.id}')">Salva Modifiche</button>
            </div>
        </div>
    `;
    // Assicuriamoci che tutti gli altri popup siano nascosÃ¬
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
                safeNum(sc['fisi-speed']), safeNum(sc['fisi-stamina']), safeNum(sc['fisi-strength']), safeNum(sc['fisi-agility'] || sc['fisi-Agilità'] || sc['fisi-AgilitÃ ']),
                safeNum(sc['psic-focus']), safeNum(sc['psic-stress']), safeNum(sc['psic-grinta']), safeNum(sc['psic-team'])
            ];

            const playerSpecificData = [
                safeNum(sp['tecn-control']), safeNum(sp['tecn-pass']), safeNum(sp['tecn-shot']), safeNum(sp['tecn-dribble']),
                safeNum(sp['tatt-movement']), safeNum(sp['tatt-defense']), safeNum(sp['tatt-transition']), safeNum(sp['tatt-reading']),
                safeNum(sp['fisi-speed']), safeNum(sp['fisi-stamina']), safeNum(sp['fisi-strength']), safeNum(sp['fisi-agility'] || sp['fisi-Agilità'] || sp['fisi-AgilitÃ ']),
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
    // Nascondi overlay solo se non ci sono altri modal aperti (in questo caso ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨ semplice)
    document.getElementById('modal-overlay').classList.add('hidden');
};

window.savePlayerFromDossier = function(id) {
    const playerIndex = players.findIndex(p => String(p.id) === String(id));
    if (playerIndex === -1) return;

    const birthData = parseBirthData(document.getElementById('edit-dossier-birth').value);
    players[playerIndex].name = window.getInvertedName(document.getElementById('edit-dossier-name').value);
    players[playerIndex].role = document.getElementById('edit-dossier-role').value;
    players[playerIndex].number = document.getElementById('edit-dossier-number').value;
    players[playerIndex].birthDate = birthData.birthDate;
    players[playerIndex].birthYear = birthData.birthYear;
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

window.handleDossierPhotoUpload = function(input, playerId) {
    const file = input.files && input.files[0];
    if (!file) return;

    compressPlayerPhoto(file, (compressedBase64) => {
        if (!compressedBase64) return;
        const playerIndex = players.findIndex(p => String(p.id) === String(playerId));
        if (playerIndex === -1) return;

        players[playerIndex].photo = compressedBase64;
        localStorage.setItem('futsal_portal_players', JSON.stringify(players));

        const avatarPreviewEl = document.getElementById('dossier-avatar-preview');
        if (avatarPreviewEl) {
            avatarPreviewEl.innerHTML = `<img src="${compressedBase64}" alt="${escapeHTML(players[playerIndex].name)}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
        }

        if (typeof renderRoster === 'function') renderRoster();
        if (typeof renderGrid === 'function') renderGrid();
        if (typeof renderQuartets === 'function') renderQuartets();

        showToast("Foto del profilo aggiornata!", "success");
    });
};

window.removeDossierPhoto = function(playerId) {
    if (!confirm("Vuoi rimuovere la foto del profilo di questo giocatore?")) return;

    const playerIndex = players.findIndex(p => String(p.id) === String(playerId));
    if (playerIndex === -1) return;

    players[playerIndex].photo = null;
    localStorage.setItem('futsal_portal_players', JSON.stringify(players));

    const player = players[playerIndex];
    const initials = getInitials(player.name);
    const avatarPreviewEl = document.getElementById('dossier-avatar-preview');
    if (avatarPreviewEl) {
        avatarPreviewEl.innerHTML = `<div style="width:100%; height:100%; border-radius:50%; background:var(--color-player); display:flex; align-items:center; justify-content:center; font-size:2.2rem; font-weight:bold; color:#0f172a;">${initials}</div>`;
    }

    if (typeof renderRoster === 'function') renderRoster();
    if (typeof renderGrid === 'function') renderGrid();
    if (typeof renderQuartets === 'function') renderQuartets();

    showToast("Foto del profilo rimossa", "info");
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
    if (!selectPlayer || !selectTrendPlayer) return;

    // Save current selections
    const prevSelectVal = selectPlayer.value;
    const prevTrendVal = selectTrendPlayer.value;

    // Sort players alphabetically by Cognome Nome (or inverted name)
    const sortedPlayers = [...players].sort((a, b) => {
        const nameA = window.getInvertedName ? window.getInvertedName(a.name) : (a.name || '');
        const nameB = window.getInvertedName ? window.getInvertedName(b.name) : (b.name || '');
        return nameA.localeCompare(nameB, 'it', { sensitivity: 'base' });
    });

    const optionsHTML = `
        <option value="">-- Seleziona giocatore --</option>
        ${sortedPlayers.map(p => {
            const displayName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
            const numLabel = p.number ? ` (#${p.number})` : '';
            return `<option value="${p.id}">${escapeHTML(displayName)}${numLabel}</option>`;
        }).join('')}
    `;

    selectPlayer.innerHTML = optionsHTML;
    selectTrendPlayer.innerHTML = optionsHTML;

    // Restore selections if player still exists
    if (players.some(p => String(p.id) === String(prevSelectVal))) selectPlayer.value = prevSelectVal;
    if (players.some(p => String(p.id) === String(prevTrendVal))) selectTrendPlayer.value = prevTrendVal;
}

// ==========================================================================
// TAB 2: EVALUATIONS & CALCULATIONS
// ==========================================================================
function convertSliderSpansToInputs() {
    const spans = document.querySelectorAll('.slider-value');
    spans.forEach(span => {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'slider-value-input';
        input.id = span.id;
        input.value = span.textContent;
        input.min = '1';
        input.max = '10';
        input.step = '1';
        input.style.width = '3.5rem';
        input.style.background = 'rgba(0,0,0,0.2)';
        input.style.border = '1px solid rgba(255,255,255,0.1)';
        input.style.borderRadius = '4px';
        input.style.color = '#fff';
        input.style.textAlign = 'center';
        input.style.fontSize = '0.9rem';
        input.style.fontWeight = 'bold';
        
        // Sincronizzazione bidirezionale digitando il numero
        input.addEventListener('change', (e) => {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val)) val = 5;
            if (val < 1) val = 1;
            if (val > 10) val = 10;
            e.target.value = val;
            
            const sliderId = e.target.id.replace('val-', '');
            const slider = document.getElementById(sliderId);
            if (slider) {
                slider.value = val;
            }
            
            const idParts = sliderId.split('-');
            const param = idParts[0] + '-' + idParts[1];
            const role = idParts[2]; // 'player' | 'coach'
            if (role === 'player') {
                tempPlayerScores[param] = val;
            } else {
                tempCoachScores[param] = val;
            }
            updateCalculations();
        });
        
        span.replaceWith(input);
    });
}

function setupEvaluationForm() {
    const dateInput = document.getElementById('assessment-date');
    if (!dateInput) return; // Siamo in login.html o l'elemento non esiste

    // Converti le etichette span in input modificabili
    convertSliderSpansToInputs();

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
            
            // 1. Update text label (ora è un input)
            const valEl = document.getElementById(`val-${e.target.id}`);
            if (valEl) {
                valEl.value = val;
            }

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

    const hideCoachCheckbox = document.getElementById('hide-coach-evaluation');
    if (hideCoachCheckbox) {
        hideCoachCheckbox.addEventListener('change', () => {
            const evalSubtab = document.getElementById('subtab-evaluation');
            if (evalSubtab) {
                evalSubtab.classList.toggle('hide-coach-mode', hideCoachCheckbox.checked);
            }
            updateCalculations();
        });
    }

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
            valSpan.value = slider.value;
        }
    });
}

function handlePlayerChange() {
    const rawVal = document.getElementById('select-player').value;
    
    if (!rawVal) {
        resetAssessmentForm();
        return;
    }

    const player = players.find(p => String(p.id) === String(rawVal));
    if (!player) {
        resetAssessmentForm();
        return;
    }

    updateAthleteProfileCard(player);

    // Check if there is an existing assessment for this player to load as base
    const playerSheets = assessments.filter(a => String(a.playerId) === String(player.id));
    
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

        const hideCoachCheckbox = document.getElementById('hide-coach-evaluation');
        if (hideCoachCheckbox) {
            hideCoachCheckbox.checked = !!latest.hideCoachEvaluation;
            const evalSubtab = document.getElementById('subtab-evaluation');
            if (evalSubtab) {
                evalSubtab.classList.toggle('hide-coach-mode', hideCoachCheckbox.checked);
            }
        }

        showToast("Caricate valutazioni precedenti come base di compilazione.", "info");
    } else {
        // Brand new player, reset completely
        resetTemporaryScores();
        clearGrowthPlanFields();
        
        const hideCoachCheckbox = document.getElementById('hide-coach-evaluation');
        if (hideCoachCheckbox) {
            hideCoachCheckbox.checked = false;
            const evalSubtab = document.getElementById('subtab-evaluation');
            if (evalSubtab) {
                evalSubtab.classList.remove('hide-coach-mode');
            }
        }
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
    
    const hideCoachCheckbox = document.getElementById('hide-coach-evaluation');
    if (hideCoachCheckbox) {
        hideCoachCheckbox.checked = false;
        const evalSubtab = document.getElementById('subtab-evaluation');
        if (evalSubtab) {
            evalSubtab.classList.remove('hide-coach-mode');
        }
    }
    
    resetTemporaryScores();
    clearGrowthPlanFields();
    syncSlidersUI();
    updateCalculations();
    updateAthleteProfileCard(null);
}

window.closeEvaluationForm = function() {
    resetAssessmentForm();
    if (typeof toggleEditProfileCardMode === 'function') toggleEditProfileCardMode(false);
    showToast("Scheda di valutazione chiusa.", "info");
};

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
    if (gapAnalysisEl) {
        if (absoluteGap <= 0.8) {
            gapAnalysisEl.textContent = "🎯 Allineamento Elevato (Mister e Giocatore concordano)";
            gapAnalysisEl.style.color = "var(--color-tatt)";
        } else if (overallPlayer > overallCoach) {
            gapAnalysisEl.textContent = "⚠️ Sopravvalutazione (Il Giocatore si valuta più in alto del Mister)";
            gapAnalysisEl.style.color = "var(--color-fisi)";
        } else {
            gapAnalysisEl.textContent = "💡 Sottovalutazione (Il Mister valuta il Giocatore più in alto)";
            gapAnalysisEl.style.color = "var(--color-player)";
        }
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

    const rawVal = document.getElementById('select-player')?.value;
    const currPlayer = rawVal ? players.find(p => String(p.id) === String(rawVal)) : null;
    const isGK = currPlayer && (currPlayer.role === 'Portiere' || currPlayer.role === 'POR');
    const labelSource = isGK ? gkParamLabels : defaultParamLabels;

    const sLabel = labelSource[strengthKey] ? labelSource[strengthKey].label : (paramInfo[strengthKey] ? paramInfo[strengthKey].label : strengthKey);
    const wLabel = labelSource[weaknessKey] ? labelSource[weaknessKey].label : (paramInfo[weaknessKey] ? paramInfo[weaknessKey].label : weaknessKey);

    if (strengthLabelEl) strengthLabelEl.textContent = `${sLabel} (${maxVal}/10)`;
    if (weaknessLabelEl) weaknessLabelEl.textContent = `${wLabel} (${minVal}/10)`;

    // Auto-fill Growth Plan recommendations if not manually edited by user
    const planSource = isGK ? (window.gkDefaultPlans || {}) : (window.defaultPlans || {});
    if (!userEditedFields.strengthPlan && planSource[strengthKey] && planSource[strengthKey].strength) {
        const strEl = document.getElementById('strength-plan');
        if (strEl) strEl.value = planSource[strengthKey].strength;
    }
    if (!userEditedFields.weaknessGoal && planSource[weaknessKey] && planSource[weaknessKey].weaknessGoal) {
        const wgEl = document.getElementById('weakness-goal');
        if (wgEl) wgEl.value = planSource[weaknessKey].weaknessGoal;
    }
    if (!userEditedFields.weaknessAction && planSource[weaknessKey] && planSource[weaknessKey].action) {
        const waEl = document.getElementById('weakness-action');
        if (waEl) waEl.value = planSource[weaknessKey].action;
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
        
        const hideCoachEl = document.getElementById('hide-coach-evaluation');
        const hideCoach = hideCoachEl ? hideCoachEl.checked : false;
        radarChartInstance.data.datasets[1].hidden = hideCoach;
        
        radarChartInstance.update();
    }
}

// ==========================================================================
// CRUDS FOR EVALUATIONS (SAVE / LOAD / DELETE)
// ==========================================================================
function saveAssessment() {
    const rawVal = document.getElementById('select-player').value;
    const player = players.find(p => String(p.id) === String(rawVal));
    if (!player) {
        showToast("Seleziona prima un giocatore!", "error");
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
        playerId: player.id,
        date: date,
        playerScores: { ...tempPlayerScores },
        coachScores: { ...tempCoachScores },
        overallPlayer: overallPlayer,
        overallCoach: overallCoach,
        strengthPlan: strengthPlan,
        weaknessGoal: weaknessGoal,
        actionPlan: actionPlan,
        hideCoachEvaluation: document.getElementById('hide-coach-evaluation').checked
    };

    if (activeAssessmentId) {
        // Update existing record
        assessments = assessments.map(a => a.id === activeAssessmentId ? record : a);
        showToast("Valutazione aggiornata correttamente!", "success");
    } else {
        // Check if there is already an evaluation on the same day for this player
        const duplicateIdx = assessments.findIndex(a => String(a.playerId) === String(player.id) && a.date === date);
        if (duplicateIdx !== -1) {
            if (confirm("Esiste già una valutazione per questa data. Vuoi sovrascriverla?")) {
                record.id = assessments[duplicateIdx].id; // Keep original ID
                assessments[duplicateIdx] = record;
                showToast("Valutazione sovrascritta correttamente!", "success");
            } else {
                return;
            }
        } else {
            // Push new
            assessments.unshift(record);
            showToast("Valutazione salvata correttamente!", "success");
        }
    }

    localStorage.setItem('futsal_portal_assessments', JSON.stringify(assessments));
    activeAssessmentId = record.id; // Mark current as saved

    // Refresh athlete card & historical dropdown
    updateAthleteProfileCard(player);

    // Refresh roster averages
    if (typeof renderRoster === 'function') renderRoster();
}

// ==========================================================================
// TAB 3: HISTORICAL TRENDS & LINE CHARTS
// ==========================================================================
function setupTrendsUI() {
    const selectTrendPlayer = document.getElementById('select-trend-player');
    selectTrendPlayer.addEventListener('change', handleTrendPlayerChange);
}

function handleTrendPlayerChange() {
    const rawVal = document.getElementById('select-trend-player').value;
    const warning = document.getElementById('trends-warning');
    const container = document.getElementById('trends-core-container');

    if (!rawVal) {
        warning.classList.remove('hidden');
        container.classList.add('hidden');
        return;
    }

    const player = players.find(p => String(p.id) === String(rawVal));
    if (!player) {
        warning.classList.remove('hidden');
        container.classList.add('hidden');
        return;
    }

    warning.classList.add('hidden');
    container.classList.remove('hidden');

    const playerSheets = assessments.filter(a => String(a.playerId) === String(player.id));
    
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
                Nessuna valutazione salvata per questo giÃ .
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
    const sheet = assessments.find(a => String(a.id) === String(id));
    if (!sheet) return;

    // Switch tab
    document.querySelector('.tab-btn[data-tab="tab-roster"]').click();
    document.querySelector('.roster-sub-tab-btn[data-subtab="subtab-evaluation"]').click();

    // Populate selects
    document.getElementById('select-player').value = sheet.playerId;
    document.getElementById('assessment-date').value = sheet.date;

    // Render profile card
    const player = players.find(p => String(p.id) === String(sheet.playerId));
    updateAthleteProfileCard(player);

    // Populate scores
    tempPlayerScores = { ...sheet.playerScores };
    tempCoachScores = { ...sheet.coachScores };

    const hideCoachCheckbox = document.getElementById('hide-coach-evaluation');
    if (hideCoachCheckbox) {
        hideCoachCheckbox.checked = !!sheet.hideCoachEvaluation;
        const evalSubtab = document.getElementById('subtab-evaluation');
        if (evalSubtab) {
            evalSubtab.classList.toggle('hide-coach-mode', hideCoachCheckbox.checked);
        }
    }

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
        showToast("Seleziona il giocatore!", "error");
        return;
    }
    document.body.classList.add('print-evaluation');
    document.body.classList.remove('print-distinta');
    window.print();
}

function getPlayerParamScore(paramKey) {
    return tempPlayerScores[paramKey] || 5;
}

function exportEvaluationToTXT() {
    const playerId = document.getElementById('select-player').value;
    if (!playerId) {
        showToast("Seleziona prima un giocatore!", "error");
        return;
    }
    const player = players.find(p => String(p.id) === String(playerId));
    const playerName = player ? player.name : 'Giocatore';
    const rawDate = document.getElementById('assessment-date').value;
    const formattedDate = rawDate.split('-').reverse().join('-');

    // Category averages (Player)
    const catKeys = {
        'Stato Psicologico': ['psic-focus', 'psic-stress', 'psic-grinta', 'psic-team'],
        'Tecnica Individuale': ['tecn-control', 'tecn-pass', 'tecn-shot', 'tecn-dribble'],
        'Condizione Fisica': ['fisi-speed', 'fisi-stamina', 'fisi-strength', 'fisi-Agilità'],
        'Tattica': ['tatt-movement', 'tatt-defense', 'tatt-transition', 'tatt-reading']
    };

    let averagesTxt = "";
    Object.keys(catKeys).forEach(cat => {
        const avg = calculateAverage(catKeys[cat], tempPlayerScores);
        averagesTxt += `- ${cat}: ${avg.toFixed(1)}/10\n`;
    });
    
    const overallPlayer = calculateAverage(Object.keys(paramInfo), tempPlayerScores);
    averagesTxt += `- MEDIA GENERALE GIOCATORE: ${overallPlayer.toFixed(1)}/10\n`;

    let detailTxt = "";
    let currentCat = "";
    Object.keys(paramInfo).forEach(key => {
        const info = paramInfo[key];
        if (info.cat !== currentCat) {
            currentCat = info.cat;
            detailTxt += `[${currentCat}]\n`;
        }
        const score = tempPlayerScores[key] || 5;
        detailTxt += `  - ${info.label}: ${score}/10\n`;
    });

    const strengthPlan = document.getElementById('strength-plan').value.trim();
    const weaknessGoal = document.getElementById('weakness-goal').value.trim();
    const actionPlan = document.getElementById('weakness-action').value.trim();
    
    const strengthLabel = document.getElementById('detected-strength').textContent;
    const weaknessLabel = document.getElementById('detected-weakness').textContent;

    let txt = `==================================================\n`;
    txt += `FUTSAL DASHBOARD - VALUTAZIONE PERFORMANCE\n`;
    txt += `==================================================\n`;
    txt += `Giocatore: ${playerName}\n`;
    txt += `Data Valutazione: ${formattedDate}\n`;
    txt += `--------------------------------------------------\n\n`;
    
    txt += `1. MEDIE PER CATEGORIA (GIOCATORE)\n`;
    txt += averagesTxt + `\n`;
    
    txt += `2. DETTAGLIO PUNTEGGI INDIVIDUALI (GIOCATORE)\n`;
    txt += detailTxt + `\n`;
    
    txt += `3. PIANO DI CRESCITA INDIVIDUALE\n`;
    txt += `Punto di Forza Rilevato: ${strengthLabel}\n`;
    txt += `  - Obiettivo e Piano di Valorizzazione:\n`;
    txt += `    ${strengthPlan || 'Nessuna nota inserita'}\n\n`;
    txt += `Punto Debole Rilevato: ${weaknessLabel}\n`;
    txt += `  - Obiettivo Specifico di Miglioramento (Goal):\n`;
    txt += `    ${weaknessGoal || 'Nessuna nota inserita'}\n`;
    txt += `  - Piano d'Azione (Action Plan):\n`;
    txt += `    ${actionPlan || 'Nessuna nota inserita'}\n\n`;
    txt += `==================================================\n`;

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${formattedDate} - Valutazione Performance - ${playerName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

    if (riepilogoRadarChart) {
        if (riepilogoRadarChart.options.scales && riepilogoRadarChart.options.scales.r) {
            const rScale = riepilogoRadarChart.options.scales.r;
            if (rScale.ticks) rScale.ticks.color = fontColor;
            if (rScale.grid) rScale.grid.color = gridColor;
            if (rScale.angleLines) rScale.angleLines.color = gridColor;
            if (rScale.pointLabels) rScale.pointLabels.color = fontColor;
        }
        riepilogoRadarChart.update('none');
    }

    if (riepilogoBarChart) {
        if (riepilogoBarChart.options.scales) {
            const x = riepilogoBarChart.options.scales.x;
            const y = riepilogoBarChart.options.scales.y;
            if (x) {
                if (x.grid) x.grid.color = gridColor;
                if (x.ticks) x.ticks.color = fontColor;
            }
            if (y) {
                if (y.grid) y.grid.color = gridColor;
                if (y.ticks) y.ticks.color = fontColor;
            }
        }
        riepilogoBarChart.update('none');
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
    document.getElementById('new-player-birth-year').value = player.birthDate || (player.birthYear && String(player.birthYear).length === 4 ? player.birthYear + '-01-01' : '');
    document.getElementById('new-player-weight').value = player.weight || '';
    document.getElementById('new-player-height').value = player.height || '';
    document.getElementById('new-player-job').value = player.job || '';
    document.getElementById('new-player-experience').value = player.experience || '';

    // Pulisci l'input file per evitare caricamenti indesiderati
    document.getElementById('new-player-photo').value = '';

    // Cambia interfaccia in modalitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  modifica
    const formTitle = document.getElementById('form-player-title');
    const submitBtn = document.getElementById('btn-submit-player');

    if (formTitle) formTitle.textContent = `Modifica giÃ .name}`;
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

    if (formTitle) formTitle.textContent = "Aggiungi giÃ  alla Rosa";
    if (submitBtn) {
        submitBtn.querySelector('span').textContent = "Salva";
    }
}

function getZodiacSign(month, day) {
    if (!month || !day) return '';
    const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
    const signs = [
        "♑ Capricorno", "♒ Acquario", "♓ Pesci", "♈ Ariete", 
        "♉ Toro", "♊ Gemelli", "♋ Cancro", "♌ Leone", 
        "♍ Vergine", "♎ Bilancia", "♏ Scorpione", "♐ Sagittario", "♑ Capricorno"
    ];
    return day < dates[month - 1] ? signs[month - 1] : signs[month];
}

window.bdaySortCol = window.bdaySortCol || 'nextBday';
window.bdaySortDir = window.bdaySortDir || 'asc';

window.sortBirthdaysTable = function(colKey) {
    if (window.bdaySortCol === colKey) {
        window.bdaySortDir = window.bdaySortDir === 'asc' ? 'desc' : 'asc';
    } else {
        window.bdaySortCol = colKey;
        window.bdaySortDir = 'asc';
    }
    if (typeof window.renderBirthdaysTab === 'function') window.renderBirthdaysTab();
};

window.switchBirthdayView = function(mode) {
    window.birthdayViewMode = mode;
    const calView = document.getElementById('birthday-calendar-view');
    const tblView = document.getElementById('birthday-table-view');
    const calBtn = document.getElementById('bday-view-calendar-btn');
    const tblBtn = document.getElementById('bday-view-table-btn');

    if (mode === 'calendar') {
        if (calView) calView.style.display = 'block';
        if (tblView) tblView.style.display = 'none';
        if (calBtn) { calBtn.style.background = 'var(--color-player)'; calBtn.style.color = '#000'; calBtn.style.fontWeight = 'bold'; }
        if (tblBtn) { tblBtn.style.background = 'transparent'; tblBtn.style.color = 'var(--text-muted)'; tblBtn.style.fontWeight = 'normal'; }
    } else {
        if (calView) calView.style.display = 'none';
        if (tblView) tblView.style.display = 'block';
        if (tblBtn) { tblBtn.style.background = 'var(--color-player)'; tblBtn.style.color = '#000'; tblBtn.style.fontWeight = 'bold'; }
        if (calBtn) { calBtn.style.background = 'transparent'; calBtn.style.color = 'var(--text-muted)'; calBtn.style.fontWeight = 'normal'; }
    }
    if (typeof window.renderBirthdaysTab === 'function') window.renderBirthdaysTab();
};

window.renderBirthdaysTab = function() {
    const tbody = document.getElementById('birthdays-tbody');
    const spotlightContainer = document.getElementById('birthday-spotlight-container');
    const seasonCalendarGrid = document.getElementById('season-calendar-grid');

    const monthFilter = document.getElementById('birthday-month-filter')?.value || 'all';
    const searchQuery = (document.getElementById('birthday-search-input')?.value || '').toLowerCase().trim();

    const monthNamesIt = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const playersList = (typeof players !== 'undefined' && Array.isArray(players) && players.length > 0) ? players : (window.players || []);
    
    // Compute birthday metrics for each player
    const processedPlayers = playersList.map(p => {
        const bInfo = window.parsePlayerBirthDate(p);
        if (!bInfo) {
            return { player: p, hasBirthDate: false, daysRemaining: 9999 };
        }

        const bMonth = bInfo.month;
        const bDay = bInfo.day;
        const bYear = bInfo.year;

        // Next birthday target
        let nextBday = new Date(today.getFullYear(), bMonth - 1, bDay);
        if (nextBday < today) {
            nextBday = new Date(today.getFullYear() + 1, bMonth - 1, bDay);
        }

        const diffTime = nextBday.getTime() - today.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const currentAge = bYear ? (today.getFullYear() - bYear - ((today.getMonth() + 1 < bMonth || (today.getMonth() + 1 === bMonth && today.getDate() < bDay)) ? 1 : 0)) : null;
        const turningAge = bYear ? (nextBday.getFullYear() - bYear) : null;

        const zodiac = getZodiacSign(bMonth, bDay);
        const birthDateStr = bYear ? `${bDay} ${monthNamesIt[bMonth - 1]} ${bYear}` : `${bDay} ${monthNamesIt[bMonth - 1]}`;

        return {
            player: p,
            hasBirthDate: true,
            bMonth,
            bDay,
            bYear,
            daysRemaining,
            nextBday,
            currentAge,
            turningAge,
            zodiac,
            birthDateStr
        };
    });

    // 1. Spotlight Banner (Next Birthday or Today)
    const validPlayersWithBday = processedPlayers.filter(p => p.hasBirthDate);
    validPlayersWithBday.sort((a, b) => a.daysRemaining - b.daysRemaining);

    if (spotlightContainer) {
        if (validPlayersWithBday.length > 0) {
            const closest = validPlayersWithBday[0];
            const pName = window.getInvertedName ? window.getInvertedName(closest.player.name) : closest.player.name;

            if (closest.daysRemaining === 0) {
                spotlightContainer.innerHTML = `
                    <div style="padding: 1rem 1.25rem; background: linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(234, 179, 8, 0.05)); border: 2px solid #facc15; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; animation: pulse 2s infinite;">
                        <div style="display: flex; align-items: center; gap: 0.85rem;">
                            <span style="font-size: 2.2rem;">🎉</span>
                            <div>
                                <h4 style="margin: 0; color: #fef08a; font-size: 1.15rem; font-weight: 800;">OGGI È IL COMPLEANNO DI ${escapeHTML(pName).toUpperCase()}! 🥳</h4>
                                <p style="margin: 0.2rem 0 0 0; color: var(--text-primary); font-size: 0.88rem;">
                                    Tanti auguri per i suoi <strong>${closest.turningAge ? closest.turningAge + ' anni' : ''}</strong>! #${closest.player.number || ''} (${closest.player.role || 'Giocatore'})
                                </p>
                            </div>
                        </div>
                        <span style="font-size: 0.8rem; background: #facc15; color: #000; padding: 0.35rem 0.85rem; border-radius: 20px; font-weight: 800; text-transform: uppercase;">🎈 Festeggiato di Oggi!</span>
                    </div>
                `;
            } else {
                const dayFormatted = `${String(closest.bDay).padStart(2, '0')}/${String(closest.bMonth).padStart(2, '0')}`;
                spotlightContainer.innerHTML = `
                    <div style="padding: 0.85rem 1.25rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.85rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.5rem;">🎁</span>
                            <div>
                                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Prossimo Compleanno in Squadra</span>
                                <div style="font-size: 0.95rem; color: #fff; font-weight: 700; margin-top: 0.1rem;">
                                    ${escapeHTML(pName)} - <span style="color: #fde047;">${dayFormatted}</span> (Tra ${closest.daysRemaining} ${closest.daysRemaining === 1 ? 'giorno' : 'giorni'}) ${closest.turningAge ? '- Compirà ' + closest.turningAge + ' anni' : ''}
                                </div>
                            </div>
                        </div>
                        <span style="font-size: 0.78rem; color: var(--color-player); font-weight: bold; background: rgba(0,210,255,0.1); border: 1px solid rgba(0,210,255,0.3); padding: 0.25rem 0.75rem; border-radius: 15px;">${closest.zodiac}</span>
                    </div>
                `;
            }
        } else {
            spotlightContainer.innerHTML = '';
        }
    }

    // 2. RENDER SEASON CALENDAR GRID (Agosto - Giugno/Luglio)
    if (seasonCalendarGrid) {
        const seasonMonths = [
            { month: 8, year: 2026, name: "Agosto 2026", icon: "🏖️" },
            { month: 9, year: 2026, name: "Settembre 2026", icon: "⚽" },
            { month: 10, year: 2026, name: "Ottobre 2026", icon: "🍂" },
            { month: 11, year: 2026, name: "Novembre 2026", icon: "🌧️" },
            { month: 12, year: 2026, name: "Dicembre 2026", icon: "❄️" },
            { month: 1, year: 2027, name: "Gennaio 2027", icon: "🎆" },
            { month: 2, year: 2027, name: "Febbraio 2027", icon: "🎭" },
            { month: 3, year: 2027, name: "Marzo 2027", icon: "🌱" },
            { month: 4, year: 2027, name: "Aprile 2027", icon: "🐣" },
            { month: 5, year: 2027, name: "Maggio 2027", icon: "🌸" },
            { month: 6, year: 2027, name: "Giugno 2027", icon: "☀️" },
            { month: 7, year: 2027, name: "Luglio 2027", icon: "🌴" }
        ];

        let gridCardsHTML = '';

        seasonMonths.forEach(m => {
            // Find players with birthday in this month
            const monthPlayers = processedPlayers.filter(item => {
                if (!item.hasBirthDate || item.bMonth !== m.month) return false;
                if (searchQuery) {
                    const pName = (item.player.name || '').toLowerCase();
                    const pRole = (item.player.role || '').toLowerCase();
                    if (!pName.includes(searchQuery) && !pRole.includes(searchQuery)) return false;
                }
                return true;
            });

            monthPlayers.sort((a, b) => a.bDay - b.bDay);

            const hasBirthdays = monthPlayers.length > 0;
            const cardBorder = hasBirthdays ? 'border: 1px solid rgba(250, 204, 21, 0.4);' : 'border: 1px solid var(--border-color);';
            const cardBg = hasBirthdays ? 'background: hsla(224, 45%, 4%, 0.6);' : 'background: hsla(224, 45%, 2%, 0.4);';

            // Generate Mini Calendar Grid for Month
            const daysInMonth = new Date(m.year, m.month, 0).getDate();
            const firstDayIndex = (new Date(m.year, m.month - 1, 1).getDay() + 6) % 7; // Mon=0..Sun=6

            let miniCalHTML = `
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; text-align: center; margin: 0.6rem 0; font-size: 0.68rem;">
                    <div style="color:var(--text-muted); font-weight:bold;">L</div>
                    <div style="color:var(--text-muted); font-weight:bold;">M</div>
                    <div style="color:var(--text-muted); font-weight:bold;">M</div>
                    <div style="color:var(--text-muted); font-weight:bold;">G</div>
                    <div style="color:var(--text-muted); font-weight:bold;">V</div>
                    <div style="color:var(--text-muted); font-weight:bold;">S</div>
                    <div style="color:var(--text-muted); font-weight:bold;">D</div>
            `;

            // Blank slots before 1st day
            for (let i = 0; i < firstDayIndex; i++) {
                miniCalHTML += `<div style="padding: 2px;"></div>`;
            }

            // Days cells
            for (let d = 1; d <= daysInMonth; d++) {
                const bdayOnDay = monthPlayers.filter(p => p.bDay === d);
                if (bdayOnDay.length > 0) {
                    const namesTxt = bdayOnDay.map(p => {
                        const pName = window.getInvertedName ? window.getInvertedName(p.player.name) : p.player.name;
                        return `${pName} (${p.turningAge ? p.turningAge + ' anni' : ''})`;
                    }).join(', ');

                    miniCalHTML += `
                        <div style="background: linear-gradient(135deg, rgba(234, 179, 8, 0.45), rgba(234, 179, 8, 0.2)); border: 1.5px solid #facc15; color: #fef08a; font-weight: 800; border-radius: 5px; padding: 3px 0; font-size: 0.72rem; cursor: help; box-shadow: 0 0 6px rgba(250, 204, 21, 0.4);" title="🎂 Compleanno: ${escapeHTML(namesTxt)}">
                            ${d}🎂
                        </div>
                    `;
                } else {
                    miniCalHTML += `
                        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); border-radius: 4px; padding: 2px 0; font-size: 0.68rem;">
                            ${d}
                        </div>
                    `;
                }
            }
            miniCalHTML += `</div>`;

            // List of players for the month
            let playersListHTML = '';
            if (hasBirthdays) {
                playersListHTML = monthPlayers.map(item => {
                    const p = item.player;
                    const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
                    const isToday = item.daysRemaining === 0;
                    return `
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.45rem 0.65rem; border-radius: 6px; ${isToday ? 'background: linear-gradient(135deg, rgba(234, 179, 8, 0.35), rgba(234, 179, 8, 0.15)); border: 1.5px solid #facc15; animation: pulse 2s infinite;' : 'background: rgba(234, 179, 8, 0.12); border: 1px solid rgba(234, 179, 8, 0.3);'} margin-bottom: 0.4rem; font-size: 0.8rem;">
                            <div style="display: flex; align-items: center; gap: 0.45rem;">
                                <span style="font-size: 0.95rem;">🎂</span>
                                <strong style="color: #fde047; font-size: 0.85rem;">${item.bDay} ${m.name.split(' ')[0]}</strong>
                                <span style="color: #fff; font-weight: 700;">#${p.number || ''} ${escapeHTML(pName)}</span>
                            </div>
                            <span style="color: #fde047; font-weight: 800; font-size: 0.78rem; background: rgba(0,0,0,0.3); padding: 0.15rem 0.5rem; border-radius: 10px; border: 1px solid rgba(250, 204, 21, 0.4);">${item.turningAge ? item.turningAge + ' anni' : ''}</span>
                        </div>
                    `;
                }).join('');
            } else {
                playersListHTML = `<div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic; text-align: center; padding: 0.4rem 0;">Nessun compleanno in questo mese 🎈</div>`;
            }

            gridCardsHTML += `
                <div class="glass-panel" style="padding: 1rem; border-radius: 10px; ${cardBg} ${cardBorder}">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.4rem;">
                        <h4 style="margin: 0; font-size: 0.95rem; color: ${hasBirthdays ? '#fde047' : 'var(--text-main)'}; font-weight: 800; display: flex; align-items: center; gap: 0.4rem;">
                            <span>${m.icon} ${m.name}</span>
                        </h4>
                        <span style="font-size: 0.72rem; padding: 0.15rem 0.55rem; border-radius: 10px; ${hasBirthdays ? 'background: rgba(234, 179, 8, 0.25); color: #fde047; font-weight: bold; border: 1px solid rgba(250, 204, 21, 0.4);' : 'background: rgba(255,255,255,0.08); color: var(--text-muted);'}">
                            ${monthPlayers.length} ${monthPlayers.length === 1 ? 'Compleanno' : 'Compleanni'}
                        </span>
                    </div>

                    ${miniCalHTML}

                    <div style="margin-top: 0.6rem;">
                        ${playersListHTML}
                    </div>
                </div>
            `;
        });

        seasonCalendarGrid.innerHTML = gridCardsHTML;
    }

    // 3. RENDER TABLE VIEW (if table exists)
    if (tbody) {
        let filteredList = processedPlayers.filter(item => {
            if (!item.hasBirthDate) return false;
            
            if (monthFilter !== 'all') {
                if (String(item.bMonth) !== monthFilter) return false;
            }

            if (searchQuery) {
                const pName = (item.player.name || '').toLowerCase();
                const pRole = (item.player.role || '').toLowerCase();
                if (!pName.includes(searchQuery) && !pRole.includes(searchQuery)) return false;
            }

            return true;
        });

        const sortCol = window.bdaySortCol || 'nextBday';
        const sortDir = window.bdaySortDir || 'asc';
        const mult = sortDir === 'asc' ? 1 : -1;

        filteredList.sort((a, b) => {
            if (sortCol === 'name') {
                const nameA = (a.player.name || '').toLowerCase();
                const nameB = (b.player.name || '').toLowerCase();
                return nameA.localeCompare(nameB) * mult;
            } else if (sortCol === 'role') {
                const roleA = (a.player.role || '').toLowerCase();
                const roleB = (b.player.role || '').toLowerCase();
                return roleA.localeCompare(roleB) * mult;
            } else if (sortCol === 'birthDate') {
                if (a.bMonth !== b.bMonth) return (a.bMonth - b.bMonth) * mult;
                return (a.bDay - b.bDay) * mult;
            } else if (sortCol === 'age') {
                const ageA = a.currentAge !== null ? a.currentAge : -1;
                const ageB = b.currentAge !== null ? b.currentAge : -1;
                return (ageA - ageB) * mult;
            } else if (sortCol === 'nextBday') {
                return (a.daysRemaining - b.daysRemaining) * mult;
            } else if (sortCol === 'zodiac') {
                const zA = (a.zodiac || '').toLowerCase();
                const zB = (b.zodiac || '').toLowerCase();
                return zA.localeCompare(zB) * mult;
            }
            return 0;
        });

        // Update Header Sort Icons
        const cols = ['name', 'role', 'birthDate', 'age', 'nextBday', 'zodiac'];
        cols.forEach(col => {
            const iconEl = document.getElementById(`bday-sort-icon-${col}`);
            if (iconEl) {
                if (col === sortCol) {
                    iconEl.textContent = sortDir === 'asc' ? ' ▲' : ' ▼';
                    iconEl.style.color = '#fde047';
                    iconEl.style.opacity = '1';
                } else {
                    iconEl.textContent = ' ↕';
                    iconEl.style.color = 'var(--text-muted)';
                    iconEl.style.opacity = '0.4';
                }
            }
        });

        if (filteredList.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                        Nessun compleanno trovato per i filtri selezionati.
                    </td>
                </tr>
            `;
            return;
        }

        let rowsHTML = '';
        filteredList.forEach(item => {
            const p = item.player;
            const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
            const initials = getInitials(p.name);
            const avatarImg = p.photo 
                ? `<img src="${p.photo}" alt="${escapeHTML(p.name)}" style="width:32px; height:32px; border-radius:50%; object-fit:cover;">`
                : `<div style="width:32px; height:32px; border-radius:50%; background:var(--color-player); color:#000; font-weight:bold; font-size:0.75rem; display:flex; align-items:center; justify-content:center;">${initials}</div>`;

            const dayFormatted = `${String(item.bDay).padStart(2, '0')}/${String(item.bMonth).padStart(2, '0')}/${item.nextBday.getFullYear()}`;
            
            let statusBadge = '';
            if (item.daysRemaining === 0) {
                statusBadge = `<span class="badge" style="background:#eab308; color:#000; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px; animation:pulse 2s infinite;">OGGI! 🎉</span>`;
            } else if (item.daysRemaining <= 7) {
                statusBadge = `<span class="badge" style="background:rgba(234, 179, 8, 0.3); color:#fde047; border:1px solid rgba(234, 179, 8, 0.6); padding:0.2rem 0.5rem; border-radius:10px; font-weight:bold;">Tra ${item.daysRemaining} gg (${dayFormatted})</span>`;
            } else {
                statusBadge = `<span style="color:#fde047; font-weight:600;">Tra ${item.daysRemaining} gg (${dayFormatted})</span>`;
            }

            const isTodayRow = item.daysRemaining === 0;

            rowsHTML += `
                <tr style="background: rgba(234, 179, 8, 0.08); border-bottom: 1px solid rgba(250, 204, 21, 0.2); border-left: 3px solid ${isTodayRow ? '#facc15' : 'rgba(234, 179, 8, 0.5)'};">
                    <td style="padding: 0.65rem 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.65rem;">
                            ${avatarImg}
                            <div>
                                <div style="font-weight: 700; color: var(--color-player); display: flex; align-items: center; gap: 0.35rem;">
                                    <span>#${p.number || ''}</span>
                                    <span>${escapeHTML(pName)}</span>
                                    <span style="font-size:0.85rem;">🎂</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                        <span class="badge" style="background: rgba(255,255,255,0.08); color: var(--text-primary); font-size: 0.75rem;">${escapeHTML(p.role || 'Giocatore')}</span>
                    </td>
                    <td style="padding: 0.65rem 0.75rem; font-weight: 700; color: #fde047;">
                        ${item.birthDateStr}
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                        <strong style="color:#fff;">${item.currentAge !== null ? item.currentAge + ' anni' : '--'}</strong>
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                        ${statusBadge}
                    </td>
                    <td style="padding: 0.65rem 0.75rem; color: var(--text-secondary); font-weight: 600;">
                        ${item.zodiac}
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = rowsHTML;
    }
};

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
            } else if (targetSub === 'subtab-birthdays') {
                if (typeof renderBirthdaysTab === 'function') renderBirthdaysTab();
            } else if (targetSub === 'subtab-absences') {
                if (typeof window.renderAbsencesTab === 'function') window.renderAbsencesTab();
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
        list.innerHTML = `<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;padding:1rem;">Nessun giÃ .</p>`;
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
        list.innerHTML = `<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;padding:1rem;">Nessun giÃ .</p>`;
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
    const countBadge = document.getElementById('training-count');
    if (countBadge) {
        countBadge.textContent = `${trainings.length} Session${trainings.length === 1 ? 'e' : 'i'}`;
    }
    
    renderTrainingsAttendanceChart();
}

function renderTrainingsAttendanceChart() {
    const container = document.getElementById('training-chart-container');
    const canvas = document.getElementById('trainings-attendance-chart');
    if (!container || !canvas) return;
    
    if (trainings.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    
    // Sort trainings by date ascending (chronological order)
    const sortedTrainings = [...trainings].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const labels = sortedTrainings.map(t => {
        if (!t.date) return 'Data ?';
        const parts = t.date.split('-');
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return t.date;
    });
    
    const presentCounts = sortedTrainings.map(t => {
        let present = 0;
        const roster = t.roster || {};
        const playersList = (typeof players !== 'undefined' && Array.isArray(players) && players.length > 0) ? players : [];
        if (playersList.length > 0) {
            playersList.forEach(p => {
                const st = roster[p.id] !== undefined ? roster[p.id] : roster[String(p.id)];
                const status = st !== undefined ? st : 'P';
                if (status === 'P') present++;
            });
        } else {
            Object.values(roster).forEach(status => {
                if (status === 'P') present++;
            });
        }
        return present;
    });
    
    const sessionDetails = sortedTrainings.map(t => {
        let absent = 0;
        let injured = 0;
        let justified = 0;
        const roster = t.roster || {};
        const playersList = (typeof players !== 'undefined' && Array.isArray(players) && players.length > 0) ? players : [];
        if (playersList.length > 0) {
            playersList.forEach(p => {
                const st = roster[p.id] !== undefined ? roster[p.id] : roster[String(p.id)];
                if (st === 'A') absent++;
                else if (st === 'I') injured++;
                else if (st === 'G') justified++;
            });
        }
        return {
            type: t.type || 'Allenamento',
            date: t.date,
            absent,
            injured,
            justified
        };
    });

    if (trainingsAttendanceChartInstance) {
        trainingsAttendanceChartInstance.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0, 'rgba(0, 242, 254, 0.45)');
    gradient.addColorStop(1, 'rgba(0, 242, 254, 0.02)');
    
    trainingsAttendanceChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Giocatori Presenti',
                    data: presentCounts,
                    backgroundColor: gradient,
                    borderColor: 'rgba(0, 242, 254, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.35,
                    pointBackgroundColor: 'rgba(0, 242, 254, 1)',
                    pointBorderColor: '#090d16',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8
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
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#e2e8f0',
                    borderColor: 'rgba(0, 242, 254, 0.4)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(items) {
                            if (!items.length) return '';
                            const idx = items[0].dataIndex;
                            const detail = sessionDetails[idx];
                            return `📅 ${labels[idx]} - ${detail.type}`;
                        },
                        label: function(context) {
                            const idx = context.dataIndex;
                            const detail = sessionDetails[idx];
                            return [
                                `✅ Presenti: ${context.parsed.y} giocatori`,
                                `❌ Assenti: ${detail.absent}`,
                                `🏥 Infortunati / Giustificati: ${detail.injured + detail.justified}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'hsla(0, 0%, 70%, 0.8)',
                        font: {
                            family: 'Outfit',
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.08)'
                    },
                    ticks: {
                        color: 'hsla(0, 0%, 70%, 0.8)',
                        stepSize: 1,
                        precision: 0,
                        font: {
                            family: 'Outfit',
                            size: 11
                        }
                    },
                    min: 0
                }
            }
        }
    });
}

window.deleteTraining = function(id) {
    const session = trainings.find(t => t.id === id);
    if (confirm("Sei sicuro di voler eliminare questo allenamento? Le statistiche verranno aggiornate.")) {
        if (session && session.date) {
            removeDate(session.date);
        }
        trainings = trainings.filter(t => t.id !== id);
        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
        showToast("Allenamento rimosso dallo storico.", "info");
        renderTrainingHistory();
        renderAttendanceBoard();
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
        let locationVal = '';
        if (c.opponent.endsWith('(C)')) locationVal = 'C';
        else if (c.opponent.endsWith('(T)')) locationVal = 'T';
        else if (c.opponent.endsWith('(S)')) locationVal = 'S';
        
        let logisticBadge = '';
        if (locationVal) {
            let label = '';
            let icon = '';
            let valClass = '';
            if (locationVal === 'C') { label = 'Casa'; icon = '🏠'; valClass = 'casa'; }
            else if (locationVal === 'T') { label = 'Trasferta'; icon = '🚌'; valClass = 'trasferta'; }
            else if (locationVal === 'S') { label = 'Spiaggia'; icon = '🏖️'; valClass = 'spiaggia'; }
            
            logisticBadge = `<span class="logistic-badge" style="margin-left: 0.5rem; font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; border: 1px solid currentColor; display: inline-flex; align-items: center; gap: 3px;" data-logistic="${valClass}">${icon} ${label}</span>`;
        }
        
        const card = document.createElement('div');
        card.className = 'attendance-history-card glass-panel';
        card.innerHTML = `
            <div class="attendance-card-header">
                <span class="attendance-card-date">${formatDate(c.date)}${logisticBadge}</span>
                <button class="card-btn-icon delete" onclick="deleteConvocation(${c.id})" title="Elimina convocazione" style="padding:0.2rem;">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:1rem;height:1rem;">
                        <path d="M19 7L18.1327 19.1422C18.051 20.1859 17.1882 21 16.1402 21H7.85978C6.81175 21 5.94899 20.1859 5.86732 19.1422L5 7M4 7H20" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
            <div class="attendance-card-type" style="font-weight:700;color:var(--color-player);">${c.type === 'friendly' ? '🤝 Amichevole' : '⚽ Gara'}: ${escapeHTML(c.opponent.replace(/\s*\([CTS]\)$/, ''))}</div>
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
    const match = convocations.find(c => c.id === id);
    if (confirm("Sei sicuro di voler eliminare questa convocazione?")) {
        if (match && match.date) {
            removeDate(match.date);
        }
        convocations = convocations.filter(c => c.id !== id);
        localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
        showToast("Convocazione rimossa dallo storico.", "info");
        renderConvocationsHistory();
        renderAttendanceBoard();
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
    
    // Transizione a metÃ  settembre (15 Settembre 2026)
    const transitionDate = new Date(2026, 8, 15); // 15 Settembre 2026
    
    let current = new Date(startDate);
    while (current <= endDate) {
        const dayOfWeek = current.getDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mer, 4 = giÃ  5 = Ven, 6 = Sab
        
        let isDefaultDate = false;
        if (current < transitionDate) {
            // Fino al 14 Settembre inclusi: dal lunedÃ¬ al venerdÃ¬ (1-5)
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                isDefaultDate = true;
            }
        } else {
            // Dal 15 Settembre in poi: solo lunedÃ¬ (1), mercoledÃ¬ (3), venerdÃ¬ (5)
            if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
                isDefaultDate = true;
            }
        }
        
        if (isDefaultDate) {
            const y = current.getFullYear();
            const m = String(current.getMonth() + 1).padStart(2, '0');
            const day = String(current.getDate()).padStart(2, '0');
            const dateStr = `${y}-${m}-${day}`;
            
            if (!removedDates.includes(dateStr)) {
                dates.push(new Date(current));
            }
        }
        
        current.setDate(current.getDate() + 1);
    }
    
    // Unisci le date delle convocazioni (partite) pianificate
    convocations.forEach(c => {
        if (c.date && !removedDates.includes(c.date)) {
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
        if (t.date && !removedDates.includes(t.date)) {
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

window.parsePlayerBirthDate = function(player) {
    if (!player) return null;
    const bStr = player.birthDate || player.birthYear || player.dob || player.dataNascita || player.birth;
    if (!bStr) return null;

    const clean = String(bStr).trim();
    if (!clean) return null;

    let year = null, month = null, day = null;

    // Standard ISO YYYY-MM-DD
    if (/^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}$/.test(clean)) {
        const parts = clean.split(/[-\/]/);
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        day = parseInt(parts[2], 10);
    } 
    // European DD/MM/YYYY or DD-MM-YYYY
    else if (/^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}$/.test(clean)) {
        const parts = clean.split(/[-\/]/);
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
    }
    // Short DD/MM or DD-MM or MM-DD
    else if (/^\d{1,2}[-\/]\d{1,2}$/.test(clean)) {
        const parts = clean.split(/[-\/]/);
        const p1 = parseInt(parts[0], 10);
        const p2 = parseInt(parts[1], 10);
        if (p1 <= 31 && p2 <= 12) {
            day = p1; month = p2;
        } else if (p1 <= 12 && p2 <= 31) {
            month = p1; day = p2;
        }
    }
    // Textual: e.g. "26 Luglio 1998" or "26 Lug"
    else {
        const monthMap = {
            'gen': 1, 'gennaio': 1, 'feb': 2, 'febbraio': 2, 'mar': 3, 'marzo': 3,
            'apr': 4, 'aprile': 4, 'mag': 5, 'maggio': 5, 'giu': 6, 'giugno': 6,
            'lug': 7, 'luglio': 7, 'ago': 8, 'agosto': 8, 'set': 9, 'settembre': 9,
            'ott': 10, 'ottobre': 10, 'nov': 11, 'novembre': 11, 'dic': 12, 'dicembre': 12
        };
        const lower = clean.toLowerCase();
        for (let key in monthMap) {
            if (lower.includes(key)) {
                month = monthMap[key];
                break;
            }
        }
        const nums = clean.match(/\d+/g);
        if (nums && nums.length >= 1) {
            day = parseInt(nums[0], 10);
            if (nums.length >= 2 && !year && nums[1].length === 4) {
                year = parseInt(nums[1], 10);
            }
        }
    }

    if (!month || !day || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
        // Fallback for players with year-only or missing day/month: generate deterministic day/month based on player number/id
        const seed = player.number ? parseInt(player.number, 10) : (player.id ? parseInt(player.id, 10) : 1);
        month = ((seed * 7) % 12) + 1;
        day = ((seed * 3) % 28) + 1;
        if (!year) year = player.birthYear ? parseInt(player.birthYear, 10) : 2000;
    }

    return { year, month, day };
};

window.isPlayerBirthdayOnDate = function(player, dateObjOrStr) {
    const bInfo = window.parsePlayerBirthDate(player);
    if (!bInfo) return false;

    let targetMonth = null;
    let targetDay = null;

    if (dateObjOrStr instanceof Date) {
        targetMonth = dateObjOrStr.getMonth() + 1;
        targetDay = dateObjOrStr.getDate();
    } else if (typeof dateObjOrStr === 'string') {
        const parts = dateObjOrStr.split('-');
        if (parts.length >= 3) {
            targetMonth = parseInt(parts[1], 10);
            targetDay = parseInt(parts[2], 10);
        } else if (parts.length === 2) {
            targetMonth = parseInt(parts[0], 10);
            targetDay = parseInt(parts[1], 10);
        }
    }

    return bInfo.month === targetMonth && bInfo.day === targetDay;
};

window.getPlayerAgeOnDate = function(player, dateObjOrStr) {
    const bInfo = window.parsePlayerBirthDate(player);
    if (!bInfo || !bInfo.year) return null;

    let targetYear = new Date().getFullYear();
    if (dateObjOrStr instanceof Date) {
        targetYear = dateObjOrStr.getFullYear();
    } else if (typeof dateObjOrStr === 'string') {
        const parts = dateObjOrStr.split('-');
        if (parts.length >= 1) targetYear = parseInt(parts[0], 10);
    }

    const age = targetYear - bInfo.year;
    return age > 0 ? age : null;
};

function getPlayerBirthdayTargetDateKey(player, filteredDates) {
    const bInfo = window.parsePlayerBirthDate ? window.parsePlayerBirthDate(player) : null;
    if (!bInfo) return null;

    // 1. Check exact day & month match in filteredDates
    const exactMatch = filteredDates.find(d => d.getMonth() + 1 === bInfo.month && d.getDate() === bInfo.day);
    if (exactMatch) {
        const y = exactMatch.getFullYear();
        const m = String(exactMatch.getMonth() + 1).padStart(2, '0');
        const day = String(exactMatch.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    // 2. No exact match: calculate the following Monday for each season year in filteredDates
    if (!filteredDates || filteredDates.length === 0) return null;
    
    const yearsInFilter = Array.from(new Set(filteredDates.map(d => d.getFullYear())));
    for (const yr of yearsInFilter) {
        const bdayDate = new Date(yr, bInfo.month - 1, bInfo.day);
        const dayOfWeek = bdayDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
        const daysToNextMonday = dayOfWeek === 1 ? 7 : (dayOfWeek === 0 ? 1 : (8 - dayOfWeek));
        const nextMonday = new Date(bdayDate.getTime() + daysToNextMonday * 24 * 3600 * 1000);
        
        const nextMondayMatch = filteredDates.find(d => {
            return d.getFullYear() === nextMonday.getFullYear() &&
                   d.getMonth() === nextMonday.getMonth() &&
                   d.getDate() === nextMonday.getDate();
        }) || filteredDates.find(d => d >= nextMonday);

        if (nextMondayMatch) {
            const y = nextMondayMatch.getFullYear();
            const m = String(nextMondayMatch.getMonth() + 1).padStart(2, '0');
            const day = String(nextMondayMatch.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        }
    }

    return null;
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
        table.innerHTML = `<tr><td style="text-align:center;padding:2rem;color:var(--text-muted)">Nessun giocatore.</td></tr>`;
        return;
    }
    
    if (filteredDates.length === 0) {
        table.innerHTML = `<tr><td style="text-align:center;padding:2rem;color:var(--text-muted)">Nessuna data trovata per il filtro selezionato.</td></tr>`;
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

        const birthdayPlayers = players.filter(p => window.isPlayerBirthdayOnDate(p, date));
        if (birthdayPlayers.length > 0) {
            th.style.background = 'rgba(234, 179, 8, 0.2)';
            th.style.borderBottom = '2px solid #facc15';
        }
        
        const wrapper = document.createElement('div');
        wrapper.className = 'col-header-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.gap = '2px';
        wrapper.style.alignItems = 'center';
        
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
        const dayName = dayNames[date.getDay()];
        
        if (isMatchDate) {
            th.className = 'match-col-header';
            const isFriendly = match.type === 'friendly';
            th.title = `${isFriendly ? 'Amichevole' : 'Gara'} contro: ${match.opponent}`;
        }
        
        const topRow = document.createElement('div');
        topRow.style.display = 'flex';
        topRow.style.alignItems = 'center';
        topRow.style.justifyContent = 'space-between';
        topRow.style.width = '100%';
        
        const textSpan = document.createElement('span');
        textSpan.style.fontSize = '0.72rem';
        textSpan.style.lineHeight = '1.1';
        textSpan.innerHTML = `<span style="opacity:0.7;">${dayName}</span> <strong>${day}/${month}</strong>`;
        topRow.appendChild(textSpan);

        // Col edit button
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'col-edit-btn';
        let btnTitle = isMatchDate ? (match.type === 'friendly' ? 'Modifica Amichevole' : 'Modifica Gara') : 'Modifica Allenamento';
        editBtn.title = btnTitle;
        editBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"/></svg>`;
        editBtn.addEventListener('click', (e) => { e.stopPropagation(); openEditColumnModal(dateStr, isMatchDate); });
        
        const formBtn = document.createElement('button');
        formBtn.type = 'button';
        formBtn.className = 'col-edit-btn';
        formBtn.title = 'Vedi Scheda Allenamento';
        formBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"/><path d="M16 2V6M8 2V6M3 10H21"/></svg>`;
        formBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if(window.switchTabTo) window.switchTabTo('tab-training-program');
            if(window.openTrainingForm) setTimeout(() => window.openTrainingForm(dateStr), 50);
        });
        
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '2px';
        if (!isMatchDate) btnContainer.appendChild(formBtn);
        btnContainer.appendChild(editBtn);
        
        topRow.appendChild(btnContainer);
        wrapper.appendChild(topRow);
        
        // Bottom row: Logistics + Select All
        const bottomRow = document.createElement('div');
        bottomRow.style.display = 'flex';
        bottomRow.style.alignItems = 'center';
        bottomRow.style.justifyContent = 'space-between';
        bottomRow.style.width = '100%';
        bottomRow.style.marginTop = '2px';

        const logisticSelect = document.createElement('select');
        logisticSelect.className = 'logistic-select-hdr';
        logisticSelect.style.fontSize = '0.75rem';
        logisticSelect.style.padding = '0';
        logisticSelect.style.height = '20px';
        logisticSelect.style.width = '26px';
        logisticSelect.style.textAlign = 'center';
        logisticSelect.style.textAlignLast = 'center';
        logisticSelect.style.borderRadius = '3px';
        logisticSelect.style.border = '1px solid var(--border-color)';
        logisticSelect.style.background = 'hsla(224, 45%, 3%, 0.6)';
        logisticSelect.style.color = 'var(--text-muted)';
        logisticSelect.style.cursor = 'pointer';
        logisticSelect.style.outline = 'none';

        if (!isMatchDate) {
            const optNone = document.createElement('option'); optNone.value = ''; optNone.textContent = '📍'; optNone.title = 'Nessuna Sede'; logisticSelect.appendChild(optNone);
            const optSpiaggia = document.createElement('option'); optSpiaggia.value = 'spiaggia'; optSpiaggia.textContent = '🏖️'; optSpiaggia.title = 'Sede: Spiaggia'; logisticSelect.appendChild(optSpiaggia);
            const optCasa = document.createElement('option'); optCasa.value = 'casa'; optCasa.textContent = '🏠'; optCasa.title = 'Sede: Casa'; logisticSelect.appendChild(optCasa);
            const optTrasferta = document.createElement('option'); optTrasferta.value = 'trasferta'; optTrasferta.textContent = '🚌'; optTrasferta.title = 'Sede: Trasferta'; logisticSelect.appendChild(optTrasferta);
            
            const session = trainings.find(t => t.date === dateStr);
            const currentLogistic = (session && session.logistic) || '';
            logisticSelect.value = currentLogistic;
            
            const updateLocalStyle = (val) => {
                if (val === 'spiaggia') { logisticSelect.style.borderColor = 'rgba(255, 193, 7, 0.6)'; logisticSelect.style.color = '#ffca2c'; logisticSelect.title = 'Sede: Spiaggia (🏖️)'; }
                else if (val === 'casa') { logisticSelect.style.borderColor = 'rgba(57, 255, 20, 0.6)'; logisticSelect.style.color = '#39ff14'; logisticSelect.title = 'Sede: Casa (🏠)'; }
                else if (val === 'trasferta') { logisticSelect.style.borderColor = 'rgba(255, 0, 127, 0.6)'; logisticSelect.style.color = '#ff007f'; logisticSelect.title = 'Sede: Trasferta (🚌)'; }
                else { logisticSelect.style.borderColor = 'var(--border-color)'; logisticSelect.style.color = 'var(--text-muted)'; logisticSelect.title = 'Seleziona Sede Seduta'; }
            };
            updateLocalStyle(currentLogistic);
            
            logisticSelect.addEventListener('change', () => {
                const val = logisticSelect.value;
                updateLocalStyle(val);
                let s = trainings.find(t => t.date === dateStr);
                if (s) { if (val === '') delete s.logistic; else s.logistic = val; }
                else if (val !== '') { trainings.push({ id: Date.now(), date: dateStr, type: 'Allenamento', roster: {}, logistic: val }); trainings.sort((a, b) => new Date(b.date) - new Date(a.date)); }
                trainings = trainings.filter(t => (t.roster && Object.keys(t.roster).length > 0) || (t.logistic && t.logistic !== ''));
                localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
                if (window.renderTrainingHistory) window.renderTrainingHistory();
                showToast("Logistica aggiornata!", "success");
            });
        } else {
            const optNone = document.createElement('option'); optNone.value = ''; optNone.textContent = '📍'; optNone.title = 'Nessuna Sede'; logisticSelect.appendChild(optNone);
            const optCasa = document.createElement('option'); optCasa.value = 'C'; optCasa.textContent = '🏠'; optCasa.title = 'Sede: Casa'; logisticSelect.appendChild(optCasa);
            const optTrasferta = document.createElement('option'); optTrasferta.value = 'T'; optTrasferta.textContent = '🚌'; optTrasferta.title = 'Sede: Trasferta'; logisticSelect.appendChild(optTrasferta);
            const optSpiaggia = document.createElement('option'); optSpiaggia.value = 'S'; optSpiaggia.textContent = '🏖️'; optSpiaggia.title = 'Sede: Spiaggia'; logisticSelect.appendChild(optSpiaggia);
            
            let currentLogistic = '';
            if (match.opponent.endsWith('(C)')) currentLogistic = 'C';
            else if (match.opponent.endsWith('(T)')) currentLogistic = 'T';
            else if (match.opponent.endsWith('(S)')) currentLogistic = 'S';
            logisticSelect.value = currentLogistic;
            
            const updateLocalStyle = (val) => {
                if (val === 'S') { logisticSelect.style.borderColor = 'rgba(255, 193, 7, 0.6)'; logisticSelect.style.color = '#ffca2c'; logisticSelect.title = 'Sede: Spiaggia (🏖️)'; }
                else if (val === 'C') { logisticSelect.style.borderColor = 'rgba(57, 255, 20, 0.6)'; logisticSelect.style.color = '#39ff14'; logisticSelect.title = 'Sede: Casa (🏠)'; }
                else if (val === 'T') { logisticSelect.style.borderColor = 'rgba(255, 0, 127, 0.6)'; logisticSelect.style.color = '#ff007f'; logisticSelect.title = 'Sede: Trasferta (🚌)'; }
                else { logisticSelect.style.borderColor = 'var(--border-color)'; logisticSelect.style.color = 'var(--text-muted)'; logisticSelect.title = 'Seleziona Sede Partita'; }
            };
            updateLocalStyle(currentLogistic);
            
            logisticSelect.addEventListener('change', () => {
                const val = logisticSelect.value;
                updateLocalStyle(val);
                let cleanOpponent = match.opponent.replace(/\s*\([CTS]\)$/, '');
                match.opponent = val ? `${cleanOpponent} (${val})` : cleanOpponent;
                localStorage.setItem('futsal_portal_convocations', JSON.stringify(convocations));
                if (window.renderConvocationsHistory) window.renderConvocationsHistory();
                showToast("Logistica gara aggiornata!", "success");
            });
        }
        bottomRow.appendChild(logisticSelect);

        // Select all checkbox
        const selectAllContainer = document.createElement('label');
        selectAllContainer.style.fontSize = '0.68rem';
        selectAllContainer.style.display = 'flex';
        selectAllContainer.style.alignItems = 'center';
        selectAllContainer.style.gap = '2px';
        selectAllContainer.style.cursor = 'pointer';
        selectAllContainer.title = isMatchDate ? 'Convoca tutti' : 'Segna tutti presenti/assenti';

        const selectAllCheckbox = document.createElement('input');
        selectAllCheckbox.type = 'checkbox';
        selectAllCheckbox.style.margin = '0';
        selectAllCheckbox.style.width = '12px';
        selectAllCheckbox.style.height = '12px';
        
        let allSelected = true;
        if (players.length > 0) {
            if (isMatchDate) {
                players.forEach(p => { if (!match.selectedIds || !match.selectedIds.includes(p.id)) allSelected = false; });
            } else {
                const session = trainings.find(t => t.date === dateStr);
                players.forEach(p => { if (session && session.roster && session.roster[p.id] === 'A') allSelected = false; });
            }
        } else {
            allSelected = false;
        }
        selectAllCheckbox.checked = allSelected;
        selectAllCheckbox.addEventListener('change', (e) => { window.toggleAllPresences(dateStr, isMatchDate, e.target.checked); });
        
        const selectAllLabel = document.createElement('span');
        selectAllLabel.style.fontSize = '0.68rem';
        selectAllLabel.style.color = 'var(--text-muted)';
        selectAllLabel.textContent = 'Tutti';

        selectAllContainer.appendChild(selectAllCheckbox);
        selectAllContainer.appendChild(selectAllLabel);
        bottomRow.appendChild(selectAllContainer);

        wrapper.appendChild(bottomRow);
        th.appendChild(wrapper);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 4. Genera Righe Giocatori
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
        
        const targetBdayKey = getPlayerBirthdayTargetDateKey(player, filteredDates);
        
        dateKeys.forEach(dateStr => {
            const td = document.createElement('td');
            const match = convocations.find(c => c.date === dateStr);
            const isMatchDate = !!match;
            
            const isBirthdayCell = (dateStr === targetBdayKey);
            if (isBirthdayCell) {
                const age = window.getPlayerAgeOnDate ? window.getPlayerAgeOnDate(player, dateStr) : null;
                const ageTxt = age ? ` (${age} anni)` : '';
                td.style.background = 'rgba(234, 179, 8, 0.25)';
                td.style.border = '1px solid rgba(234, 179, 8, 0.6)';
                td.title = `🎂 Compleanno di ${player.name}${ageTxt}! 🎉`;
            }

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
                const session = trainings.find(t => t.date === dateStr);
                let currentStatus = 'P';
                
                if (session && session.roster && session.roster[player.id] !== undefined) {
                    currentStatus = session.roster[player.id];
                }
                
                if (currentStatus === 'P') select.classList.add('p-status');
                else if (currentStatus === 'A') select.classList.add('a-status');
                else if (currentStatus === 'I') select.classList.add('i-status');
                else if (currentStatus === 'G') select.classList.add('g-status');
                else if (currentStatus === 'T') select.classList.add('t-status');
                else select.classList.add('p-status');
                
                const optP = document.createElement('option');
                optP.value = 'P';
                optP.textContent = 'P';
                optP.title = 'P: Presente';
                optP.selected = (currentStatus === 'P');
                select.appendChild(optP);
                
                const optA = document.createElement('option');
                optA.value = 'A';
                optA.textContent = 'A';
                optA.title = 'A: Assente';
                optA.selected = (currentStatus === 'A');
                select.appendChild(optA);
                
                const optI = document.createElement('option');
                optI.value = 'I';
                optI.textContent = 'I';
                optI.title = 'I: Infortunato';
                optI.selected = (currentStatus === 'I');
                select.appendChild(optI);
                
                const optG = document.createElement('option');
                optG.value = 'G';
                optG.textContent = 'G';
                optG.title = 'G: Giustificato';
                optG.selected = (currentStatus === 'G');
                select.appendChild(optG);
                
                const optT = document.createElement('option');
                optT.value = 'T';
                optT.textContent = 'T';
                optT.title = 'T: Test';
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
            
            const cellBox = document.createElement('div');
            cellBox.style.display = 'flex';
            cellBox.style.alignItems = 'center';
            cellBox.style.justifyContent = 'center';
            cellBox.style.width = '100%';
            cellBox.style.height = '100%';
            cellBox.style.gap = '2px';
            cellBox.style.padding = '0 1px';
            cellBox.style.boxSizing = 'border-box';

            if (isBirthdayCell) {
                const bIcon = document.createElement('span');
                bIcon.style.fontSize = '0.72rem';
                bIcon.style.cursor = 'help';
                bIcon.style.lineHeight = '1';
                bIcon.style.flexShrink = '0';
                bIcon.title = `🎂 Compleanno di ${player.name}! 🎉`;
                bIcon.textContent = '🎂';
                cellBox.appendChild(bIcon);
                
                select.style.flex = '1';
                select.style.minWidth = '0';
                select.style.width = 'auto';
                select.style.paddingRight = '0.3rem';
            }
            
            cellBox.appendChild(select);
            td.appendChild(cellBox);
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
}

window.toggleAllPresences = function(dateStr, isMatchDate, isChecked) {
    const newStatus = isChecked ? (isMatchDate ? 'C' : 'P') : (isMatchDate ? '' : 'A');
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
                    type: 'Allenamento',
                    roster: roster
                };
                
                trainings.push(newSession);
                trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        }
        
        trainings = trainings.filter(t => (t.roster && Object.keys(t.roster).length > 0) || (t.logistic && t.logistic !== ''));
        window.trainings = trainings;
        localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
        renderTrainingHistory();
        if (typeof window.renderAbsencesTab === 'function') window.renderAbsencesTab();
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
            } else if (targetSub === 'subtab-riepilogo') {
                renderRiepilogoPsicofisico();
            }
        });
    });
}

// ==========================================================================
// RIEPILOGO PSICOFISICO (in-performance compact version)
// ==========================================================================
let riepilogoRadarChart = null;
let riepilogoBarChart = null;

function renderRiepilogoPsicofisico() {
    // Helper to retrieve score supporting key variations (fisi-agility, fisi-Agilità)
    const getParamScore = (sc, key) => {
        if (!sc) return undefined;
        if (sc.hasOwnProperty(key) && sc[key] !== undefined && sc[key] !== null) return Number(sc[key]);
        if (key === 'fisi-agility') {
            if (sc['fisi-Agilità'] !== undefined && sc['fisi-Agilità'] !== null) return Number(sc['fisi-Agilità']);
            if (sc['fisi-AgilitÃ '] !== undefined && sc['fisi-AgilitÃ '] !== null) return Number(sc['fisi-AgilitÃ ']);
        }
        return undefined;
    };

    // Gather latest assessment per player
    const playerLatestMap = {};
    assessments.forEach(a => {
        const pid = String(a.playerId);
        if (!playerLatestMap[pid] || new Date(a.date) > new Date(playerLatestMap[pid].date)) {
            playerLatestMap[pid] = a;
        }
    });

    const isGk = player => {
        if (!player || !player.role) return false;
        const r = String(player.role).toLowerCase();
        return r === 'portiere' || r === 'gk' || r === 'por' || r.includes('portier');
    };

    // Separate movement players and goalkeepers
    const allPlayersList = players || [];
    const movementPlayers = allPlayersList.filter(p => p && !isGk(p));
    const gkPlayers = allPlayersList.filter(p => p && isGk(p));

    // Sort both: compiled first, then uncompiled, then by name
    const sortFn = (a, b) => {
        const aHas = !!playerLatestMap[String(a.id)];
        const bHas = !!playerLatestMap[String(b.id)];
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;
        return (a.name || '').localeCompare(b.name || '');
    };
    movementPlayers.sort(sortFn);
    gkPlayers.sort(sortFn);

    // 1. MOVEMENT PLAYERS STATS & MAIN SECTION
    const compiledMovement = movementPlayers.filter(p => playerLatestMap[String(p.id)]);
    const numCompiledMov = compiledMovement.length;

    if (movementPlayers.length === 0 && compiledMovement.length === 0) {
        document.getElementById('riepilogo-overview-grid').innerHTML = `<p style="color:var(--text-secondary); grid-column:1/-1; text-align:center; padding:2rem;">Nessun giocatore di movimento in rosa.</p>`;
        ['riepilogo-strengths','riepilogo-weaknesses','riepilogo-exercises','riepilogo-player-tbody'].forEach(id => { const el = document.getElementById(id); if(el) el.innerHTML = ''; });
    } else if (numCompiledMov === 0) {
        document.getElementById('riepilogo-overview-grid').innerHTML = `<p style="color:var(--text-secondary); grid-column:1/-1; text-align:center; padding:2rem;">Nessuna valutazione salvata per i giocatori di movimento.</p>`;
        ['riepilogo-strengths','riepilogo-weaknesses','riepilogo-exercises'].forEach(id => { const el = document.getElementById(id); if(el) el.innerHTML = ''; });
        
        const tbody = document.getElementById('riepilogo-player-tbody');
        if (tbody) {
            tbody.innerHTML = movementPlayers.map(player => {
                const displayName = window.getInvertedName ? window.getInvertedName(player.name) : player.name;
                return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); opacity:0.75;">
                    <td style="padding:0.5rem 0.8rem; font-weight:600;">${displayName}</td>
                    <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td colspan="2" style="padding:0.5rem;"><span style="background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.3); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600;">⚠️ Non compilata</span></td>
                </tr>`;
            }).join('');
        }
    } else {
        // Category & parameter averages across compiled movement players (strictly autovalutazione)
        const catAvgs = {};
        const paramAvgs = {};
        
        Object.keys(paramInfo).forEach(key => {
            let paramSum = 0;
            let paramCount = 0;
            compiledMovement.forEach(player => {
                const sheet = playerLatestMap[String(player.id)];
                const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
                const val = getParamScore(sc, key);
                if (val !== undefined && !isNaN(val)) {
                    paramSum += val;
                    paramCount++;
                }
            });
            paramAvgs[key] = paramCount > 0 ? (paramSum / paramCount) : 0;
        });

        Object.entries(psychCategoryMap).forEach(([catName, catInfo]) => {
            const sum = catInfo.keys.reduce((acc, k) => acc + (paramAvgs[k] || 0), 0);
            catAvgs[catName] = catInfo.keys.length > 0 ? (sum / catInfo.keys.length) : 0;
        });

        // Overview cards
        const overviewGrid = document.getElementById('riepilogo-overview-grid');
        if (overviewGrid) {
            let html = '';
            Object.entries(psychCategoryMap).forEach(([catName, catInfo]) => {
                const avg = catAvgs[catName];
                const pct = (avg / 10) * 100;
                const levelLabel = avg >= 7.5 ? 'Eccellente' : avg >= 6 ? 'Buono' : avg >= 4.5 ? 'Sufficiente' : 'Da migliorare';
                const levelColor = avg >= 7.5 ? 'var(--color-tatt)' : avg >= 6 ? 'var(--color-player)' : avg >= 4.5 ? '#f59e0b' : 'var(--color-fisi)';
                html += `<div style="background:${catInfo.bg}; border:1px solid ${catInfo.color}30; border-radius:12px; padding:1.25rem; display:flex; flex-direction:column; gap:0.5rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:1.5rem;">${catInfo.emoji}</span><span style="font-size:1.6rem; font-weight:800; color:${catInfo.color};">${avg.toFixed(1)}</span></div>
                    <h4 style="margin:0; font-size:0.9rem; font-weight:700;">${catName}</h4>
                    <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;"><div style="height:100%; width:${pct}%; background:${catInfo.color}; border-radius:3px;"></div></div>
                    <span style="font-size:0.75rem; color:${levelColor}; font-weight:600;">${levelLabel}</span>
                </div>`;
            });
            overviewGrid.innerHTML = html;
        }

        // Radar chart
        const radarCanvas = document.getElementById('riepilogo-radar-chart');
        if (radarCanvas) {
            if (riepilogoRadarChart) riepilogoRadarChart.destroy();
            const catNames = Object.keys(psychCategoryMap);
            riepilogoRadarChart = new Chart(radarCanvas.getContext('2d'), {
                type: 'radar',
                data: { labels: catNames, datasets: [{ label: 'Media Giocatori Movimento', data: catNames.map(c => catAvgs[c]), backgroundColor: 'hsla(330, 80%, 60%, 0.2)', borderColor: '#f472b6', borderWidth: 2.5, pointBackgroundColor: '#fff', pointBorderColor: '#f472b6', pointRadius: 5 }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { min: 0, max: 10, ticks: { stepSize: 2, display: true, color: 'rgba(255,255,255,0.5)', backdropColor: 'transparent', font: { size: 12 } }, grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: 'rgba(255,255,255,0.85)', font: { size: 13, weight: '600' } }, angleLines: { color: 'rgba(255,255,255,0.1)' } } } }
            });
        }

        // Bar chart
        const barCanvas = document.getElementById('riepilogo-bar-chart');
        if (barCanvas) {
            if (riepilogoBarChart) riepilogoBarChart.destroy();
            const allKeys = Object.keys(paramInfo);
            const barColors = allKeys.map(k => { const cat = paramInfo[k].cat; return psychCategoryMap[cat] ? psychCategoryMap[cat].color : '#f472b6'; });
            riepilogoBarChart = new Chart(barCanvas.getContext('2d'), {
                type: 'bar',
                data: { labels: allKeys.map(k => paramInfo[k].label), datasets: [{ label: 'Media', data: allKeys.map(k => paramAvgs[k] || 0), backgroundColor: barColors.map(c => c.replace('1)', '0.65)')), borderColor: barColors, borderWidth: 1.5, borderRadius: 5 }] },
                options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { min: 0, max: 10, ticks: { color: 'rgba(255,255,255,0.6)', stepSize: 2, font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.06)' } }, y: { ticks: { color: 'rgba(255,255,255,0.8)', font: { size: 11 } }, grid: { display: false } } } }
            });
        }

        // Calculate score distribution for low scores (1 to 5) for every parameter
        const getLowScoreDistribution = (compiledList, key) => {
            const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            let countLow = 0;
            compiledList.forEach(p => {
                const sheet = playerLatestMap[String(p.id)];
                const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
                const val = getParamScore(sc, key);
                if (val !== undefined && !isNaN(val)) {
                    if (val < 6) {
                        countLow++;
                        const r = Math.max(1, Math.min(5, Math.floor(val)));
                        dist[r] = (dist[r] || 0) + 1;
                    }
                }
            });
            return { dist, countLow };
        };

        const paramDists = {};
        Object.keys(paramInfo).forEach(key => {
            paramDists[key] = getLowScoreDistribution(compiledMovement, key);
        });

        // Strengths (Punti Positivi): ordered by highest average score
        const top = Object.keys(paramAvgs).sort((a, b) => paramAvgs[b] - paramAvgs[a]).slice(0, 4);

        // Weaknesses (Punti Negativi): ordered strictly by HIGHEST FREQUENCY OF LOWEST SCORES (1 to 5), then by countLow, then lowest average
        const bottom = Object.keys(paramInfo).sort((a, b) => {
            for (let s = 1; s <= 5; s++) {
                const diff = paramDists[b].dist[s] - paramDists[a].dist[s];
                if (diff !== 0) return diff;
            }
            const diffCount = paramDists[b].countLow - paramDists[a].countLow;
            if (diffCount !== 0) return diffCount;
            return paramAvgs[a] - paramAvgs[b];
        }).slice(0, 4);

        const strEl = document.getElementById('riepilogo-strengths');
        if (strEl) strEl.innerHTML = top.map(key => {
            const avg = paramAvgs[key];
            const countHigh = compiledMovement.filter(p => {
                const sheet = playerLatestMap[String(p.id)];
                const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
                const val = getParamScore(sc, key);
                return val !== undefined && !isNaN(val) && val >= 7;
            }).length;
            return `<div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0.75rem; background:rgba(255,255,255,0.03); border-radius:8px; border-left:3px solid var(--color-tatt);">
                <div>
                    <strong style="font-size:0.88rem;">${paramInfo[key].label}</strong>
                    <span style="color:var(--text-secondary); font-size:0.78rem; margin-left:0.4rem;">(${paramInfo[key].cat})</span>
                </div>
                <div style="text-align:right;">
                    <span style="font-weight:800; color:var(--color-tatt);">${avg.toFixed(1)}/10</span>
                    <div style="font-size:0.72rem; color:var(--text-secondary);">${countHigh} gioc. ≥ 7</div>
                </div>
            </div>`;
        }).join('');

        const weakEl = document.getElementById('riepilogo-weaknesses');
        if (weakEl) weakEl.innerHTML = bottom.map(key => {
            const avg = paramAvgs[key];
            const countEqualOrLower = compiledMovement.filter(p => {
                const sheet = playerLatestMap[String(p.id)];
                const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
                const val = getParamScore(sc, key);
                return val !== undefined && !isNaN(val) && val <= avg;
            }).length;
            const bgStyle = countEqualOrLower > 0 
                ? 'background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444;' 
                : 'background:rgba(255,255,255,0.03); border-left:3px solid var(--color-fisi);';
            const badgeHtml = countEqualOrLower > 0 
                ? `<span style="background:rgba(239, 68, 68, 0.22); color:#ef4444; font-weight:700; padding:0.15rem 0.45rem; border-radius:4px; border:1px solid rgba(239, 68, 68, 0.4); font-size:0.72rem;">⚠️ ${countEqualOrLower} gioc. ≤ ${avg.toFixed(1)}</span>` 
                : `<span style="font-size:0.72rem; color:var(--text-secondary);">${countEqualOrLower} gioc. ≤ ${avg.toFixed(1)}</span>`;

            return `<div style="display:flex; justify-content:space-between; align-items:center; padding:0.55rem 0.75rem; border-radius:8px; ${bgStyle}">
                <div>
                    <strong style="font-size:0.88rem; color:var(--text-primary);">${paramInfo[key].label}</strong>
                    <span style="color:var(--text-secondary); font-size:0.78rem; margin-left:0.4rem;">(${paramInfo[key].cat})</span>
                </div>
                <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:0.1rem;">
                    <span style="font-weight:800; color:var(--color-fisi); font-size:0.95rem;">${avg.toFixed(1)}/10</span>
                    ${badgeHtml}
                </div>
            </div>`;
        }).join('');

        const exEl = document.getElementById('riepilogo-exercises');
        if (exEl) exEl.innerHTML = bottom.map(key => {
            const ex = psychCorrectiveExercises[key] || 'Esercizio specifico da definire con lo staff tecnico.';
            const avg = paramAvgs[key];
            const countEqualOrLower = compiledMovement.filter(p => {
                const sheet = playerLatestMap[String(p.id)];
                const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
                const val = getParamScore(sc, key);
                return val !== undefined && !isNaN(val) && val <= avg;
            }).length;
            const freqBadge = countEqualOrLower > 0 ? `<span style="background:rgba(239, 68, 68, 0.2); color:#ef4444; font-weight:700; padding:0.1rem 0.4rem; border-radius:4px; font-size:0.72rem; border:1px solid rgba(239, 68, 68, 0.3);">⚠️ ${countEqualOrLower} gioc. ≤ ${avg.toFixed(1)}</span>` : '';
            return `<div style="padding:0.65rem 0.9rem; background:rgba(255,255,255,0.03); border-radius:8px; border-left:3px solid #f472b6;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.2rem;">
                    <strong style="font-size:0.88rem;">${paramInfo[key].label}</strong>
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                        ${freqBadge}
                        <span style="font-size:0.75rem; color:var(--color-fisi); font-weight:600;">Media: ${avg.toFixed(1)}/10</span>
                    </div>
                </div>
                <p style="color:var(--text-secondary); font-size:0.83rem; margin:0; line-height:1.4;">${ex}</p>
            </div>`;
        }).join('');

        // Movement Players table
        const tbody = document.getElementById('riepilogo-player-tbody');
        if (tbody) {
            const colorScore = v => v >= 7.5 ? 'var(--color-tatt)' : v >= 6 ? 'var(--color-player)' : v >= 4.5 ? '#f59e0b' : 'var(--color-fisi)';
            tbody.innerHTML = movementPlayers.map(player => {
                const pid = String(player.id);
                const sheet = playerLatestMap[pid];
                const displayName = window.getInvertedName ? window.getInvertedName(player.name) : player.name;
                
                if (!sheet) {
                    return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); opacity:0.75;">
                        <td style="padding:0.5rem 0.8rem; font-weight:600;">${displayName}</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td colspan="2" style="padding:0.5rem;"><span style="background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.3); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600;">⚠️ Non compilata</span></td>
                    </tr>`;
                }

                const scores = sheet.playerScores || {};
                const catScores = {};
                Object.entries(psychCategoryMap).forEach(([cat, info]) => {
                    let cSum = 0, cCount = 0;
                    info.keys.forEach(k => {
                        const v = getParamScore(scores, k);
                        cSum += (v !== undefined ? v : 5);
                        cCount++;
                    });
                    catScores[cat] = cCount > 0 ? (cSum / cCount) : 5;
                });
                const overall = Object.values(catScores).reduce((a, b) => a + b, 0) / 4;
                
                let maxKey = '', maxVal = -1, minKey = '', minVal = 11;
                Object.keys(paramInfo).forEach(k => {
                    const v = getParamScore(scores, k);
                    if (v !== undefined && !isNaN(v)) {
                        if (v > maxVal) { maxVal = v; maxKey = k; }
                        if (v < minVal) { minVal = v; minKey = k; }
                    }
                });
                const labelSource = (typeof defaultParamLabels !== 'undefined' ? defaultParamLabels : {});
                const bestLabel = (labelSource[maxKey] && labelSource[maxKey].label) || (paramInfo[maxKey] && paramInfo[maxKey].label) || maxKey;
                const worstLabel = (labelSource[minKey] && labelSource[minKey].label) || (paramInfo[minKey] && paramInfo[minKey].label) || minKey;
                
                const bestDesc = getSyntheticPlanText(sheet, maxKey, 'strength', false);
                const worstDesc = getSyntheticPlanText(sheet, minKey, 'weakness', false);

                const bestCell = maxKey ? `<div style="font-weight:700; color:var(--color-tatt); font-size:0.8rem;">${bestLabel} (${maxVal.toFixed(1)})</div>${bestDesc ? `<div style="font-size:0.73rem; color:var(--text-secondary); line-height:1.25; margin-top:0.12rem; font-weight:400;">${bestDesc}</div>` : ''}` : '-';
                const worstCell = minKey ? `<div style="font-weight:700; color:var(--color-fisi); font-size:0.8rem;">${worstLabel} (${minVal.toFixed(1)})</div>${worstDesc ? `<div style="font-size:0.73rem; color:var(--text-secondary); line-height:1.25; margin-top:0.12rem; font-weight:400;">${worstDesc}</div>` : ''}` : '-';

                return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:0.6rem 0.8rem; font-weight:600; vertical-align:middle;">${displayName}</td><td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Stato Psicologico'])}; font-weight:700; vertical-align:middle;">${catScores['Stato Psicologico'].toFixed(1)}</td><td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Tecnica Individuale'])}; font-weight:700; vertical-align:middle;">${catScores['Tecnica Individuale'].toFixed(1)}</td><td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Condizione Fisica'])}; font-weight:700; vertical-align:middle;">${catScores['Condizione Fisica'].toFixed(1)}</td><td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Tattica'])}; font-weight:700; vertical-align:middle;">${catScores['Tattica'].toFixed(1)}</td><td style="padding:0.6rem 0.5rem; text-align:center; font-weight:800; color:${colorScore(overall)}; vertical-align:middle;">${overall.toFixed(1)}</td><td style="padding:0.6rem 0.6rem; vertical-align:middle; max-width:210px;">${bestCell}</td><td style="padding:0.6rem 0.6rem; vertical-align:middle; max-width:210px;">${worstCell}</td></tr>`;
            }).join('');
        }
    }

    // 2. GOALKEEPERS SECTION AT THE BOTTOM
    const summaryGkEl = document.getElementById('riepilogo-gk-stats-summary');
    const overviewGkGrid = document.getElementById('riepilogo-gk-overview-grid');
    const tbodyGk = document.getElementById('riepilogo-gk-tbody');

    const compiledGk = gkPlayers.filter(p => playerLatestMap[String(p.id)]);
    const numCompiledGk = compiledGk.length;

    if (summaryGkEl) {
        summaryGkEl.textContent = `Schede compilate: ${numCompiledGk} su ${gkPlayers.length} portieri`;
    }

    if (overviewGkGrid) {
        if (numCompiledGk === 0) {
            overviewGkGrid.innerHTML = `<p style="color:var(--text-secondary); grid-column:1/-1; text-align:center; padding:1rem; background:rgba(255,255,255,0.02); border-radius:8px;">Nessuna scheda salvata per i portieri.</p>`;
        } else {
            const gkCatAvgs = {};
            const gkParamAvgs = {};
            Object.keys(paramInfo).forEach(key => {
                let sum = 0, count = 0;
                compiledGk.forEach(player => {
                    const sheet = playerLatestMap[String(player.id)];
                    const scores = sheet ? sheet.playerScores : {};
                    const val = getParamScore(scores, key);
                    if (val !== undefined && !isNaN(val)) {
                        sum += val;
                        count++;
                    }
                });
                gkParamAvgs[key] = count > 0 ? (sum / count) : 0;
            });

            Object.entries(psychCategoryMap).forEach(([catName, catInfo]) => {
                const catSum = catInfo.keys.reduce((acc, k) => acc + (gkParamAvgs[k] || 0), 0);
                gkCatAvgs[catName] = catInfo.keys.length > 0 ? (catSum / catInfo.keys.length) : 0;
            });

            let gkHtml = '';
            Object.entries(psychCategoryMap).forEach(([catName, catInfo]) => {
                const avg = gkCatAvgs[catName];
                const pct = (avg / 10) * 100;
                const labelName = catName === 'Tecnica Individuale' ? 'Tecnica Portiere' : catName;
                gkHtml += `<div style="background:rgba(59, 130, 246, 0.08); border:1px solid rgba(96, 165, 250, 0.25); border-radius:10px; padding:0.9rem; display:flex; flex-direction:column; gap:0.4rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:1.2rem;">🧤</span>
                        <span style="font-size:1.3rem; font-weight:800; color:#60a5fa;">${avg.toFixed(1)}</span>
                    </div>
                    <h5 style="margin:0; font-size:0.82rem; font-weight:700; color:var(--text-primary);">${labelName}</h5>
                    <div style="height:5px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;"><div style="height:100%; width:${pct}%; background:#60a5fa; border-radius:3px;"></div></div>
                </div>`;
            });
            overviewGkGrid.innerHTML = gkHtml;
        }
    }

    if (tbodyGk) {
        if (gkPlayers.length === 0) {
            tbodyGk.innerHTML = `<tr><td colspan="8" style="padding:1rem; text-align:center; color:var(--text-secondary);">Nessun portiere registrato in rosa.</td></tr>`;
        } else {
            const colorScore = v => v >= 7.5 ? 'var(--color-tatt)' : v >= 6 ? 'var(--color-player)' : v >= 4.5 ? '#f59e0b' : 'var(--color-fisi)';
            tbodyGk.innerHTML = gkPlayers.map(player => {
                const pid = String(player.id);
                const sheet = playerLatestMap[pid];
                const displayName = window.getInvertedName ? window.getInvertedName(player.name) : player.name;

                if (!sheet) {
                    return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); opacity:0.75;">
                        <td style="padding:0.5rem 0.8rem; font-weight:600; color:#60a5fa;">🧤 ${displayName}</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td style="padding:0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                        <td colspan="2" style="padding:0.5rem;"><span style="background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.3); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600;">⚠️ Non compilata</span></td>
                    </tr>`;
                }

                const scores = sheet.playerScores || {};
                const catScores = {};
                Object.entries(psychCategoryMap).forEach(([cat, info]) => {
                    let cSum = 0, cCount = 0;
                    info.keys.forEach(k => {
                        const v = getParamScore(scores, k);
                        cSum += (v !== undefined ? v : 5);
                        cCount++;
                    });
                    catScores[cat] = cCount > 0 ? (cSum / cCount) : 5;
                });
                const overall = Object.values(catScores).reduce((a, b) => a + b, 0) / 4;

                let maxKey = '', maxVal = -1, minKey = '', minVal = 11;
                Object.keys(paramInfo).forEach(k => {
                    const v = getParamScore(scores, k);
                    if (v !== undefined && !isNaN(v)) {
                        if (v > maxVal) { maxVal = v; maxKey = k; }
                        if (v < minVal) { minVal = v; minKey = k; }
                    }
                });
                const labelSource = (typeof gkParamLabels !== 'undefined' ? gkParamLabels : {});
                const bestLabel = (labelSource[maxKey] && labelSource[maxKey].label) || (paramInfo[maxKey] && paramInfo[maxKey].label) || maxKey;
                const worstLabel = (labelSource[minKey] && labelSource[minKey].label) || (paramInfo[minKey] && paramInfo[minKey].label) || minKey;

                const bestDesc = getSyntheticPlanText(sheet, maxKey, 'strength', true);
                const worstDesc = getSyntheticPlanText(sheet, minKey, 'weakness', true);

                const bestCell = maxKey ? `<div style="font-weight:700; color:var(--color-tatt); font-size:0.8rem;">${bestLabel} (${maxVal.toFixed(1)})</div>${bestDesc ? `<div style="font-size:0.73rem; color:var(--text-secondary); line-height:1.25; margin-top:0.12rem; font-weight:400;">${bestDesc}</div>` : ''}` : '-';
                const worstCell = minKey ? `<div style="font-weight:700; color:var(--color-fisi); font-size:0.8rem;">${worstLabel} (${minVal.toFixed(1)})</div>${worstDesc ? `<div style="font-size:0.73rem; color:var(--text-secondary); line-height:1.25; margin-top:0.12rem; font-weight:400;">${worstDesc}</div>` : ''}` : '-';

                return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:0.6rem 0.8rem; font-weight:600; color:#60a5fa; vertical-align:middle;">🧤 ${displayName}</td><td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Stato Psicologico'])}; font-weight:700; vertical-align:middle;">${catScores['Stato Psicologico'].toFixed(1)}</td><td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Tecnica Individuale'])}; font-weight:700; vertical-align:middle;">${catScores['Tecnica Individuale'].toFixed(1)}</td><td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Condizione Fisica'])}; font-weight:700; vertical-align:middle;">${catScores['Condizione Fisica'].toFixed(1)}</td><td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Tattica'])}; font-weight:700; vertical-align:middle;">${catScores['Tattica'].toFixed(1)}</td><td style="padding:0.6rem 0.5rem; text-align:center; font-weight:800; color:${colorScore(overall)}; vertical-align:middle;">${overall.toFixed(1)}</td><td style="padding:0.6rem 0.6rem; vertical-align:middle; max-width:210px;">${bestCell}</td><td style="padding:0.6rem 0.6rem; vertical-align:middle; max-width:210px;">${worstCell}</td></tr>`;
            }).join('');
        }
    }
}
window.renderRiepilogoPsicofisico = renderRiepilogoPsicofisico;

function printRiepilogoPsicofisico() {
    document.body.classList.add('print-riepilogo');
    adaptChartsForPrint(true);
    window.print();
    setTimeout(() => {
        document.body.classList.remove('print-riepilogo');
        adaptChartsForPrint(false);
    }, 500);
}
window.printRiepilogoPsicofisico = printRiepilogoPsicofisico;

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
    const popupLogistic = document.getElementById('popup-training-logistic');
    if (popupLogistic) popupLogistic.value = '';
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
                opponentText = opponentText.replace(/\s*\([CTS]\)$/, '');
            } else if (opponentText.endsWith('(T)')) {
                locationVal = 'T';
                opponentText = opponentText.replace(/\s*\([CTS]\)$/, '');
            } else if (opponentText.endsWith('(S)')) {
                locationVal = 'S';
                opponentText = opponentText.replace(/\s*\([CTS]\)$/, '');
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
            const editLogisticEl = document.getElementById('edit-col-training-logistic');
            if (editLogisticEl) editLogisticEl.value = session.logistic || '';
            deleteBtn.classList.remove('hidden');
        } else {
            document.getElementById('edit-col-type').value = '';
            const editLogisticEl = document.getElementById('edit-col-training-logistic');
            if (editLogisticEl) editLogisticEl.value = '';
            deleteBtn.classList.remove('hidden');
        }
    }
    
    overlay.classList.remove('hidden');
    popup.classList.remove('hidden');
}

function openPreseasonSummaryModal() {
    const overlay = document.getElementById('modal-overlay');
    const popup = document.getElementById('popup-preseason-summary');
    const body = document.getElementById('preseason-summary-body');
    if (!overlay || !popup || !body) return;

    // Date range: 17/08/2026 to 18/09/2026
    const allDates = generateSeasonDates();
    const startDate = new Date(2026, 7, 17, 0, 0, 0); // 17 Agosto 2026
    const endDate = new Date(2026, 8, 18, 23, 59, 59); // 18 Settembre 2026

    const preseasonDates = allDates.filter(d => d >= startDate && d <= endDate);

    let totalSessions = preseasonDates.length;
    let trainingsCount = 0;
    let friendliesCount = 0;
    let officialMatchesCount = 0;
    let totalPresenti = 0;
    let totalAssenti = 0;
    let totalInfortunati = 0;
    let totalGiustificati = 0;

    const sessionItemsHTML = preseasonDates.map((date, index) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${day}`;

        const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        const dayName = dayNames[date.getDay()];

        const match = convocations.find(c => c.date === dateStr);
        const session = trainings.find(t => t.date === dateStr);

        let eventTypeLabel = '';
        let badgeStyle = '';
        let detailsText = '';
        let attendanceStatsHTML = '';
        let locationBadgeHTML = '';

        // Extract location (Casa = Palazzetto / Spiaggia / Trasferta)
        let locationKey = 'casa'; // Default
        if (match) {
            let cleanOpp = match.opponent || '';
            if (cleanOpp.endsWith('(T)')) locationKey = 'trasferta';
            else if (cleanOpp.endsWith('(S)')) locationKey = 'spiaggia';
            else locationKey = 'casa';
        } else if (session && session.logistic) {
            locationKey = session.logistic;
        }

        if (locationKey === 'trasferta') {
            locationBadgeHTML = `<span style="background: rgba(255, 0, 127, 0.18); color: #ff007f; border: 1px solid rgba(255, 0, 127, 0.5); padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;">🚌 Trasferta</span>`;
        } else if (locationKey === 'spiaggia') {
            locationBadgeHTML = `<span style="background: rgba(255, 193, 7, 0.18); color: #ffca2c; border: 1px solid rgba(255, 193, 7, 0.5); padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;">🏖️ Spiaggia</span>`;
        } else {
            locationBadgeHTML = `<span style="background: rgba(57, 255, 20, 0.15); color: #39ff14; border: 1px solid rgba(57, 255, 20, 0.4); padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;">🏠 Palazzetto (Casa)</span>`;
        }

        if (match) {
            const isFriendly = match.type === 'friendly';
            if (isFriendly) friendliesCount++;
            else officialMatchesCount++;

            let cleanOpponent = (match.opponent || '').replace(/\s*\([CTS]\)$/, '');

            eventTypeLabel = isFriendly ? '🤝 Amichevole' : '⚽ Gara Ufficiale';
            badgeStyle = isFriendly 
                ? 'background: rgba(255, 193, 7, 0.2); color: #ffca2c; border: 1px solid rgba(255, 193, 7, 0.4);' 
                : 'background: rgba(40, 167, 69, 0.2); color: #2ecc71; border: 1px solid rgba(40, 167, 69, 0.4);';

            detailsText = `vs <strong>${escapeHTML(cleanOpponent)}</strong>`;

            const convocatiCount = (match.selectedIds || []).length;
            if (convocatiCount > 0) {
                attendanceStatsHTML = `<span style="color: var(--color-player); font-weight: 600;">${convocatiCount} Convocati</span>`;
            } else {
                attendanceStatsHTML = ``;
            }
        } else {
            trainingsCount++;
            eventTypeLabel = '🏃 Allenamento';
            badgeStyle = 'background: rgba(0, 123, 255, 0.2); color: #38bdf8; border: 1px solid rgba(0, 123, 255, 0.4);';

            let typeName = (session && session.type) ? session.type.trim() : '';

            if (typeName && typeName !== 'Allenamento' && typeName !== 'Allenamento Tabellone') {
                detailsText = `<strong>${escapeHTML(typeName)}</strong>`;
            } else {
                detailsText = '';
            }

            let p = 0, a = 0, i = 0, g = 0, t = 0;
            if (session && session.roster) {
                Object.values(session.roster).forEach(st => {
                    if (st === 'P') p++;
                    else if (st === 'A') a++;
                    else if (st === 'I') i++;
                    else if (st === 'G') g++;
                    else if (st === 'T') t++;
                });
            }
            totalPresenti += (p + t);
            totalAssenti += a;
            totalInfortunati += i;
            totalGiustificati += g;

            const active = p + a + t;
            const rate = active > 0 ? (((p + t) / active) * 100).toFixed(0) : '-';

            if (p === 0 && a === 0 && i === 0 && g === 0 && t === 0) {
                attendanceStatsHTML = ``;
            } else {
                attendanceStatsHTML = `
                    <span style="color: var(--color-tatt); font-weight:600;">${p + t} Presenti</span>
                    ${a > 0 ? `<span style="color: var(--color-danger); font-size:0.8rem; margin-left:4px;">(${a}A)</span>` : ''}
                    <span style="color: var(--text-muted); font-size:0.8rem; margin-left:4px;">(${rate}%)</span>
                `;
            }
        }

        return `
            <div style="display: grid; grid-template-columns: 190px 1fr 310px; align-items: center; padding: 0.75rem 1rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); gap: 1rem;">
                <!-- 1. DATA E GIORNO -->
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <span style="font-weight: 700; color: var(--color-tecn); font-size: 0.85rem; min-width: 28px;">#${index + 1}</span>
                    <div>
                        <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-color);">${dayName} ${day}/${m}/${y}</div>
                    </div>
                </div>

                <!-- 2. TIPO EVENTO & DETTAGLI -->
                <div style="display: flex; align-items: center; gap: 0.75rem; overflow: hidden;">
                    <span style="font-size: 0.75rem; padding: 4px 10px; border-radius: 12px; font-weight: 600; white-space: nowrap; ${badgeStyle}">${eventTypeLabel}</span>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${detailsText}</div>
                </div>

                <!-- 3. LUOGO EVIDENZIATO & PRESENZE -->
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.8rem;">
                    ${locationBadgeHTML}
                    <div style="text-align: right; min-width: 130px;">
                        ${attendanceStatsHTML}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    body.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
            <div class="stat-bubble" style="background: rgba(0, 123, 255, 0.1); border: 1px solid rgba(0, 123, 255, 0.3); text-align: center; padding: 0.85rem; border-radius: 8px;">
                <span class="num" style="display: block; font-size: 1.6rem; font-weight: 800; color: #38bdf8;">${totalSessions}</span>
                <span class="lbl" style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Giorni Programmati</span>
            </div>
            <div class="stat-bubble" style="background: rgba(0, 200, 150, 0.1); border: 1px solid rgba(0, 200, 150, 0.3); text-align: center; padding: 0.85rem; border-radius: 8px;">
                <span class="num" style="display: block; font-size: 1.6rem; font-weight: 800; color: #2ecc71;">${trainingsCount}</span>
                <span class="lbl" style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Sedute Allenamento</span>
            </div>
            <div class="stat-bubble" style="background: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.3); text-align: center; padding: 0.85rem; border-radius: 8px;">
                <span class="num" style="display: block; font-size: 1.6rem; font-weight: 800; color: #ffca2c;">${friendliesCount}</span>
                <span class="lbl" style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Amichevoli</span>
            </div>
            ${officialMatchesCount > 0 ? `
            <div class="stat-bubble" style="background: rgba(155, 89, 182, 0.1); border: 1px solid rgba(155, 89, 182, 0.3); text-align: center; padding: 0.85rem; border-radius: 8px;">
                <span class="num" style="display: block; font-size: 1.6rem; font-weight: 800; color: #9b59b6;">${officialMatchesCount}</span>
                <span class="lbl" style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Gare Ufficiali</span>
            </div>` : ''}
        </div>

        <div style="margin-top: 0.5rem;">
            <div style="display: grid; grid-template-columns: 190px 1fr 310px; gap: 1rem; padding: 0.4rem 1rem; margin-bottom: 0.4rem; background: hsla(224, 45%, 4%, 0.6); border-radius: var(--border-radius-sm); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                <div>1. Data & Giorno</div>
                <div>2. Evento / Dettagli</div>
                <div style="text-align: right;">3. Luogo & Presenze</div>
            </div>
            <div class="preseason-summary-list" style="display: flex; flex-direction: column; gap: 0.6rem; max-height: 50vh; overflow-y: auto; padding-right: 4px;">
                ${sessionItemsHTML || '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Nessuna seduta programmata nel periodo.</div>'}
            </div>
        </div>
    `;

    // Hide any other popups inside overlay
    const popups = document.querySelectorAll('.modal-overlay .modal-content');
    popups.forEach(p => p.classList.add('hidden'));

    overlay.classList.remove('hidden');
    popup.classList.remove('hidden');
}

function downloadPreseasonSummaryTXT() {
    const allDates = generateSeasonDates();
    const startDate = new Date(2026, 7, 17, 0, 0, 0); // 17 Agosto 2026
    const endDate = new Date(2026, 8, 18, 23, 59, 59); // 18 Settembre 2026

    const preseasonDates = allDates.filter(d => d >= startDate && d <= endDate);

    let totalSessions = preseasonDates.length;
    let trainingsCount = 0;
    let friendliesCount = 0;
    let officialMatchesCount = 0;

    let lines = [];
    lines.push("===================================================================");
    lines.push("📋 RIEPILOGO PRE-CAMPIONATO (dal 17/08/2026 al 18/09/2026)");
    lines.push("Futsal Dashboard - Adriauto F.M. C5");
    lines.push("===================================================================");
    lines.push("");

    let itemsLines = [];

    preseasonDates.forEach((date, index) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${day}`;

        const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        const dayName = dayNames[date.getDay()];

        const match = convocations.find(c => c.date === dateStr);
        const session = trainings.find(t => t.date === dateStr);

        let eventTypeLabel = '';
        let detailsText = '';
        let attendanceText = '';
        let locationText = '';

        // Location
        let locationKey = 'casa';
        if (match) {
            let cleanOpp = match.opponent || '';
            if (cleanOpp.endsWith('(T)')) locationKey = 'trasferta';
            else if (cleanOpp.endsWith('(S)')) locationKey = 'spiaggia';
            else locationKey = 'casa';
        } else if (session && session.logistic) {
            locationKey = session.logistic;
        }

        if (locationKey === 'trasferta') locationText = '🚌';
        else if (locationKey === 'spiaggia') locationText = '🏖️';
        else locationText = '🏠';

        if (match) {
            const isFriendly = match.type === 'friendly';
            if (isFriendly) friendliesCount++;
            else officialMatchesCount++;

            let cleanOpponent = (match.opponent || '').replace(/\s*\([CTS]\)$/, '');

            eventTypeLabel = isFriendly ? 'Amichevole' : 'Gara Ufficiale';
            detailsText = `vs ${cleanOpponent}`;

            const convocatiCount = (match.selectedIds || []).length;
            if (convocatiCount > 0) {
                attendanceText = `${convocatiCount} Convocati`;
            }
        } else {
            trainingsCount++;
            eventTypeLabel = 'Allenamento';

            let typeName = (session && session.type) ? session.type.trim() : '';
            if (typeName && typeName !== 'Allenamento' && typeName !== 'Allenamento Tabellone') {
                detailsText = typeName;
            }

            let p = 0, a = 0, i = 0, g = 0, t = 0;
            if (session && session.roster) {
                Object.values(session.roster).forEach(st => {
                    if (st === 'P') p++;
                    else if (st === 'A') a++;
                    else if (st === 'I') i++;
                    else if (st === 'G') g++;
                    else if (st === 'T') t++;
                });
            }
            const active = p + a + t;
            const rate = active > 0 ? (((p + t) / active) * 100).toFixed(0) : '-';

            if (p + t > 0 || a > 0) {
                attendanceText = `${p + t} Presenti${a > 0 ? ` (${a} Assenti)` : ''} [${rate}%]`;
            }
        }

        let numStr = `#${String(index + 1).padStart(2, '0')}`;
        let rowStr = `${numStr} | ${dayName} ${day}/${m}/${y} | ${eventTypeLabel}${detailsText ? ` (${detailsText})` : ''} | ${locationText}${attendanceText ? ` | ${attendanceText}` : ''}`;
        itemsLines.push(rowStr);
    });

    lines.push("[ STATISTICHE GENERALI ]");
    lines.push(`- Giorni Programmati : ${totalSessions}`);
    lines.push(`- Sedute Allenamento : ${trainingsCount}`);
    lines.push(`- Amichevoli          : ${friendliesCount}`);
    if (officialMatchesCount > 0) {
        lines.push(`- Gare Ufficiali     : ${officialMatchesCount}`);
    }
    lines.push("");
    lines.push("-------------------------------------------------------------------");
    lines.push("CRONOLOGIA DETTAGLIATA SEDUTE E AMICHEVOLI");
    lines.push("-------------------------------------------------------------------");
    lines.push(...itemsLines);
    lines.push("");
    lines.push("===================================================================");

    const txtContent = lines.join("\r\n");
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Riepilogo_Pre-Campionato_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Bind to window to ensure accessibility from inline onclick HTML handlers
window.openAddMatchModal = openAddMatchModal;
window.closeModal = closeModal;
window.openEditColumnModal = openEditColumnModal;
window.openAddPlayerModal = openAddPlayerModal;
window.openPreseasonSummaryModal = openPreseasonSummaryModal;
window.downloadPreseasonSummaryTXT = downloadPreseasonSummaryTXT;
window.printPreseasonSummary = function() {
    document.body.classList.add('print-preseason');
    document.body.classList.remove('print-evaluation', 'print-distinta');
    window.print();
};

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
            desc = `Ottimo livello cardiovascolare per il futsal (VO2max stimato: ${vo2} ml/kg/min). Adatto a ruoli ad alta intensitÃ â€™Ãƒâ€šÃ‚Â  di transizioni (Laterali).`;
        } else if (d >= 1600) {
            rating = 'Buono';
            badgeClass = 'badge-info';
            desc = `Resistenza soddisfacente (VO2max stimato: ${vo2} ml/kg/min). Idoneo al ritmo di giÃ .`;
        } else if (d >= 1200) {
            rating = 'Medio';
            badgeClass = 'badge-warning';
            desc = `Resistenza base discreta (VO2max stimato: ${vo2} ml/kg/min). Margini di miglioramento nella capacitÃ â€™Ãƒâ€šÃ‚Â  di recupero intermittente.`;
        } else {
            rating = 'Insufficiente';
            badgeClass = 'badge-danger';
            desc = `Cilindrata aerobica insufficiente (VO2max stimato: ${vo2} ml/kg/min). Richiede lavoro specifico di fondo e interval training.`;
        }
    } else if (testType === 'Agilità') {
        const t = parseFloat(value) || 99;
        if (t < 9.5) {
            rating = 'Eccellente';
            badgeClass = 'badge-success';
            desc = 'Rapidità e fluidità eccezionale nei cambi di direzione. Ottima coordinazione motoria e frenata.';
        } else if (t <= 10.5) {
            rating = 'Buono';
            badgeClass = 'badge-info';
            desc = 'Ottimo controllo motorio e reattività. Agile nei cambi di orientamento tipici del futsal.';
        } else if (t <= 11.5) {
            rating = 'Medio';
            badgeClass = 'badge-warning';
            desc = 'Agilità nella media. Margini di miglioramento nell\'esplosività laterale e nella rapidità del passo.';
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
            desc = 'Velocità pura eccezionale. Forte capacità di accelerazione e spunto sui 30 metri.';
        } else if (t <= 4.3) {
            rating = 'Buono';
            badgeClass = 'badge-info';
            desc = 'Velocità buona. Molto competitivo negli allunghi ed efficacia nelle ripartenze.';
        } else if (t <= 4.6) {
            rating = 'Medio';
            badgeClass = 'badge-warning';
            desc = 'Velocità discreta. Lavoro consigliato sulle frequenze di passo e sulla spinta al suolo.';
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
            desc = 'Spinta verticale debole. Richiede potenziamento muscolare della catena estensoria dell\'anca e giÃ .';
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
        showToast("Seleziona giÃ !", "error");
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
    if (!isNaN(valAgility) && valAgility > 0) athleticTests.push({ id: timestamp + (++offset), playerId, date, type: 'Agilità', value: valAgility });
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
    
    playerSelect.innerHTML = '<option value="">-- Seleziona giÃ  --</option>';
    filterPlayer.innerHTML = '<option value="all">Tutti i Giocatori</option>';
    analysisPlayer.innerHTML = '<option value="">-- Seleziona giÃ  --</option>';
    
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
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted)">Nessun giÃ .</td></tr>`;
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
            if (filterDateVal) return; // Nascondi i giÃ  vuoti se si sta cercando una data specifica (per pulizia visiva)
            
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
            const testAgility = testsOnDate.find(t => t.type === 'Agilità' || t.type === 'agility' || t.type === 'AgilitÃ ');
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
    
    // Diamo tempo al DOM di attivare il tab prima di impostare i valori se necessario
    setTimeout(() => {
        const select = document.getElementById('athletic-player-select');
        if (select) {
            select.value = playerId;
            select.dispatchEvent(new Event('change'));
        }
        
        const dateInput = document.getElementById('athletic-test-date');
        if (dateInput) {
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
        alert("Nessun test trovato per questo giocatore.");
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
            if (test.type === 'Agilità' || test.type === 'agility' || test.type === 'AgilitÃ ') document.getElementById('input-agility-time').value = test.value;
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
    
    const testTypes = ['yoyo', 'cmj', 'sprint', 'Agilità'];
    const dataGroups = { yoyo: [], cmj: [], sprint: [], Agilità: [] };
    
    pTests.forEach(t => {
        const typeKey = (t.type === 'agility' || t.type === 'AgilitÃ ') ? 'Agilità' : t.type;
        if (dataGroups[typeKey]) {
            dataGroups[typeKey].push(t);
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
    
    // 4. Agilità Chart
    agilityChartInstance = drawProgressionLineChart(
        'chart-progress-agility', 
        dataGroups.Agilità, 
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
        const latestAgility = pTests.filter(t => t.type === 'Agilità' || t.type === 'agility' || t.type === 'AgilitÃ ').sort((a,b) => new Date(b.date) - new Date(a.date))[0];
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
        topFitList.innerHTML = '<li><span style="color:var(--text-muted)">Nessun giÃ .</span></li>';
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
        lowFitList.innerHTML = '<li><span style="color:var(--text-muted)">Nessun giÃ .</span></li>';
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
            { dayName: "lunedÃ¬ 17 Ago", type: "Campo", content: "Atletica: Seduta di Test (Yo-Yo IR1 / Test 10-20m / CMJ). Valutazione stato di forma base.\nPalla: Riconducimento tecnico a bassa intensitÃ , mobilita articolare." },
            { dayName: "Martedi 18 Ago", type: "Campo", content: "Atletica: Lavoro aerobico di base. Corsa continua e variazioni di ritmo blande.\nPalla: Esercitazioni tecniche a coppie, passaggi e controllo." },
            { dayName: "Giovedi 20 Ago", type: "Campo", content: "Atletica: Lavoro intermittente aerobico (15\"/15\"). Core stability.\nPalla: Possessi palla 4v4 in ampi spazi." },
            { dayName: "venerdÃ¬ 21 Ago", type: "Campo", content: "Atletica: Richiamo di rapiditÃ  sui 5m.\nTattica: Introduzione ai principi di giÃ ." },
            { dayName: "Sab/Dom 22-23 Ago", type: "Sabbia", content: "Atletica: Lavoro metabolico lattacido su sabbia. Circuiti ad alta intensitÃ .\nPalla: Tornei di footvolley per favorire l'amalgama del gruppo in un contesto meno formale." }
        ]
    },
    {
        weekName: "Settimana 2: Forza e Lavoro Specifico",
        days: [
            { dayName: "lunedÃ¬ 24 Ago", type: "Campo", content: "Atletica: Forza resistente. Sprint con traino o elastici, cambi di direzione.\nPalla: Lavori di forza specifica, 1v1 fisici e protezione palla." },
            { dayName: "Martedi 25 Ago", type: "Campo", content: "Atletica: Trasformazione della forza. Navette brevi con recupero al passo.\nPalla: Small-Sided Games (SSG) ad alta intensitÃ  3v3." },
            { dayName: "mercoledÃ¬ 26 Ago", type: "Campo", content: "Atletica: Lavoro aerobico frazionato. Prevenzione infortuni (propriocezione).\nTattica: Movimenti offensivi senza palla, tagli e parallele." },
            { dayName: "Giovedi 27 Ago", type: "Campo", content: "Atletica: RSA (Repeated Sprint Ability) con cambi di direzione netti.\nPalla: Transizioni veloci 2v1, 3v2 a campo ridotto." },
            { dayName: "venerdÃ¬ 28 Ago", type: "Campo", content: "Atletica: rapiditÃ  di base pre-gara (scatti brevissimi).\nTattica: Palle inattive (calci d'angolo e punizioni)." }
        ]
    },
    {
        weekName: "Settimana 3: Potenza e Tattica",
        days: [
            { dayName: "lunedÃ¬ 31 Ago", type: "Campo", content: "Atletica: Forza esplosiva e pliometria. Balzi e ostacoli.\nPalla: Tiri in porta da fuori area dopo percorso coordinativo." },
            { dayName: "Martedi 1 Set", type: "Campo", content: "Atletica: Resistenza alla potenza. Navette lunghe.\nPalla: Possessi palla in regime di affaticamento." },
            { dayName: "mercoledÃ¬ 2 Set", type: "Campo", content: "Atletica: AgilitÃ  (ladder, cinesini, frenata/ripartenza).\nTattica: Lavoro specifico sulle rotazioni (3-1 o 4-0)." },
            { dayName: "Giovedi 3 Set", type: "Campo", content: "Atletica: Lavori di accelerazione contrastata in campo.\nPalla: Partite a tema a tocchi limitati per velocitÃ  di pensiero." },
            { dayName: "venerdÃ¬ 4 Set", type: "Campo", content: "Atletica: Attivazione neuromuscolare, reattivitÃ .\nTattica: Situazioni di power play (portiere di movimento)." }
        ]
    },
    {
        weekName: "Settimana 4: rapiditÃ  e Brillantezza",
        days: [
            { dayName: "lunedÃ¬ 7 Set", type: "Campo", content: "Atletica: rapiditÃ  pura. Volumi bassi, qualita altissima.\nPalla: Rondo intensi, 1v1 rapidissimi." },
            { dayName: "Martedi 8 Set", type: "Campo", content: "Atletica: rapiditÃ  cognitiva (esercizi sotto pressione temporale).\nTattica: Messa a punto sistemi di giÃ ." },
            { dayName: "mercoledÃ¬ 9 Set", type: "Campo", content: "Atletica: Scarico atletico (Tapering).\nPalla: Partitella a tocchi liberi / scarico mentale." },
            { dayName: "Giovedi 10 Set", type: "Campo", content: "Tattica: Ripasso finale palle inattive (rimesse laterali e angoli).\nPalla: Partita a tutto campo con focus sull'intensitÃ  di gara vera." },
            { dayName: "venerdÃ¬ 11 Set", type: "Campo", content: "Atletica: Riscaldamento reattivo pre-partita.\nTattica: Rifinitura finale e schemi su palla inattiva. La squadra e pronta." }
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

// ==========================================================================
// TAB: CONDIZIONE PSICOFISICA
// ==========================================================================
let psychRadarChartInstance = null;
let psychBarChartInstance = null;

const psychCategoryMap = {
    'Stato Psicologico': { keys: ['psic-focus','psic-stress','psic-grinta','psic-team'], color: 'hsla(270, 80%, 65%, 1)', bg: 'hsla(270, 80%, 65%, 0.15)', emoji: '🧠' },
    'Tecnica Individuale': { keys: ['tecn-control','tecn-pass','tecn-shot','tecn-dribble'], color: 'hsla(185, 90%, 50%, 1)', bg: 'hsla(185, 90%, 50%, 0.15)', emoji: '⚽' },
    'Condizione Fisica': { keys: ['fisi-speed','fisi-stamina','fisi-strength','fisi-agility'], color: 'hsla(30, 95%, 55%, 1)', bg: 'hsla(30, 95%, 55%, 0.15)', emoji: '🏃' },
    'Tattica': { keys: ['tatt-movement','tatt-defense','tatt-transition','tatt-reading'], color: 'hsla(160, 80%, 45%, 1)', bg: 'hsla(160, 80%, 45%, 0.15)', emoji: '🎯' }
};

const psychCorrectiveExercises = {
    'psic-focus': '🧘 Esercizi di mindfulness e concentrazione pre-partita (visualizzazione 5 min)',
    'psic-stress': '🌬️ Respirazione diaframmatica 4-7-8 e simulazioni di pressione in allenamento',
    'psic-grinta': '🥊 Esercitazioni competitive ad alta intensità con sfide a punti',
    'psic-team': '🤝 Team building e comunicazione verbale obbligatoria durante gli esercizi',
    'tecn-control': '👟 Ricezione di suola con cambio direzione rapido (3 serie x 10 ripetizioni)',
    'tecn-pass': '🎯 Passaggi di prima intenzione a coppie con variazioni di distanza e angolo',
    'tecn-shot': '⚡ 15 tiri in porta di prima su scarico laterale a fine allenamento',
    'tecn-dribble': '🏃 1vs1 in spaces ristretti (corridoi 3m) con finta di corpo obbligatoria',
    'fisi-speed': '🚀 Scatti brevi 5-10m con cambi di direzione e ripartenze esplosive',
    'fisi-stamina': '💪 HIIT specifico futsal: scatti 15m alternati a recuperi attivi (4 serie x 6)',
    'fisi-strength': '🏋️ Squat, affondi e core-stability con sovraccarico progressivo',
    'fisi-agility': '🔄 Scaletta coordinativa rapida + scatto con arresto e ripartenza',
    'tatt-movement': '📐 Rotazioni tattiche a secco (3-1, 4-0) con tempi di smarcamento',
    'tatt-defense': '🛡️ Situazionali difensivi 2vs2 e 3vs3 sulla distanza di marcamento',
    'tatt-transition': '⏱️ Partite condizionate: ripiegamento difensivo obbligatorio entro 4 secondi',
    'tatt-reading': '🧩 Partite a tocchi limitati (1-2 tocchi) per velocizzare la lettura del gioco'
};

function renderPsychophysicalDashboard() {
    // Gather the latest assessment for each player (coach scores preferred)
    const playerLatestMap = {};
    assessments.forEach(a => {
        const pid = String(a.playerId);
        if (!playerLatestMap[pid] || new Date(a.date) > new Date(playerLatestMap[pid].date)) {
            playerLatestMap[pid] = a;
        }
    });

    const targetPlayers = (players || []).slice();
    targetPlayers.sort((a, b) => {
        const aHas = !!playerLatestMap[String(a.id)];
        const bHas = !!playerLatestMap[String(b.id)];
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;
        return (a.name || '').localeCompare(b.name || '');
    });

    const compiledPlayers = targetPlayers.filter(p => playerLatestMap[String(p.id)]);
    const numCompiled = compiledPlayers.length;

    // Empty state
    if (targetPlayers.length === 0) {
        document.getElementById('psych-overview-grid').innerHTML = '<p style="color:var(--text-secondary); grid-column:1/-1; text-align:center; padding:2rem;">Nessun giocatore in rosa.</p>';
        document.getElementById('psych-team-strengths').innerHTML = '';
        document.getElementById('psych-team-weaknesses').innerHTML = '';
        document.getElementById('psych-corrective-exercises').innerHTML = '';
        document.getElementById('psych-player-detail-tbody').innerHTML = '';
        return;
    }

    if (numCompiled === 0) {
        document.getElementById('psych-overview-grid').innerHTML = '<p style="color:var(--text-secondary); grid-column:1/-1; text-align:center; padding:2rem;">Nessuna valutazione salvata. Vai nella sezione <strong>Performance</strong> per compilare le schede dei giocatori.</p>';
        document.getElementById('psych-team-strengths').innerHTML = '';
        document.getElementById('psych-team-weaknesses').innerHTML = '';
        document.getElementById('psych-corrective-exercises').innerHTML = '';
        
        const tbody = document.getElementById('psych-player-detail-tbody');
        if (tbody) {
            tbody.innerHTML = targetPlayers.map(player => {
                const displayName = window.getInvertedName ? window.getInvertedName(player.name) : player.name;
                return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); opacity:0.75;">
                    <td style="padding:0.6rem 0.8rem; font-weight:600; color:var(--text-primary);">${displayName}</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td colspan="2" style="padding:0.6rem 0.5rem;"><span style="background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.3); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600;">⚠️ Non compilata</span></td>
                </tr>`;
            }).join('');
        }
        return;
    }

    // Helper to retrieve score supporting key variations (fisi-agility, fisi-Agilità)
    const getParamScore = (sc, key) => {
        if (!sc) return undefined;
        if (sc.hasOwnProperty(key) && sc[key] !== undefined && sc[key] !== null) return Number(sc[key]);
        if (key === 'fisi-agility') {
            if (sc['fisi-Agilità'] !== undefined && sc['fisi-Agilità'] !== null) return Number(sc['fisi-Agilità']);
            if (sc['fisi-AgilitÃ '] !== undefined && sc['fisi-AgilitÃ '] !== null) return Number(sc['fisi-AgilitÃ ']);
        }
        return undefined;
    };

    // Calculate category & parameter averages across compiled players (strictly autovalutazione)
    const catAvgs = {};
    const paramAvgs = {};

    Object.keys(paramInfo).forEach(key => {
        let paramSum = 0;
        let paramCount = 0;
        compiledPlayers.forEach(player => {
            const sheet = playerLatestMap[String(player.id)];
            const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
            const val = getParamScore(sc, key);
            if (val !== undefined && !isNaN(val)) {
                paramSum += val;
                paramCount++;
            }
        });
        paramAvgs[key] = paramCount > 0 ? (paramSum / paramCount) : 0;
    });

    Object.entries(psychCategoryMap).forEach(([catName, catInfo]) => {
        const sum = catInfo.keys.reduce((acc, k) => acc + (paramAvgs[k] || 0), 0);
        catAvgs[catName] = catInfo.keys.length > 0 ? (sum / catInfo.keys.length) : 0;
    });

    // 1. Overview Grid Cards
    const overviewGrid = document.getElementById('psych-overview-grid');
    let overviewHTML = '';
    Object.entries(psychCategoryMap).forEach(([catName, catInfo]) => {
        const avg = catAvgs[catName];
        const pct = (avg / 10) * 100;
        const levelLabel = avg >= 7.5 ? 'Eccellente' : avg >= 6 ? 'Buono' : avg >= 4.5 ? 'Sufficiente' : 'Da migliorare';
        const levelColor = avg >= 7.5 ? 'var(--color-tatt)' : avg >= 6 ? 'var(--color-player)' : avg >= 4.5 ? '#f59e0b' : 'var(--color-fisi)';
        overviewHTML += `
            <div style="background:${catInfo.bg}; border:1px solid ${catInfo.color}30; border-radius:12px; padding:1.25rem; display:flex; flex-direction:column; gap:0.5rem;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:1.5rem;">${catInfo.emoji}</span>
                    <span style="font-size:1.6rem; font-weight:800; color:${catInfo.color};">${avg.toFixed(1)}</span>
                </div>
                <h4 style="margin:0; font-size:0.9rem; font-weight:700; color:var(--text-primary);">${catName}</h4>
                <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                    <div style="height:100%; width:${pct}%; background:${catInfo.color}; border-radius:3px; transition:width 0.5s;"></div>
                </div>
                <span style="font-size:0.75rem; color:${levelColor}; font-weight:600;">${levelLabel}</span>
            </div>
        `;
    });
    if (overviewGrid) overviewGrid.innerHTML = overviewHTML;

    // 2. Radar Chart
    const radarCanvas = document.getElementById('psych-team-radar-chart');
    if (radarCanvas) {
        if (psychRadarChartInstance) psychRadarChartInstance.destroy();
        const catNames = Object.keys(psychCategoryMap);
        const catValues = catNames.map(c => catAvgs[c]);

        psychRadarChartInstance = new Chart(radarCanvas.getContext('2d'), {
            type: 'radar',
            data: {
                labels: catNames,
                datasets: [{
                    label: 'Media Squadra',
                    data: catValues,
                    backgroundColor: 'hsla(330, 80%, 60%, 0.2)',
                    borderColor: '#f472b6',
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#f472b6',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        min: 0, max: 10,
                        ticks: { stepSize: 2, display: true, color: 'rgba(255,255,255,0.4)', backdropColor: 'transparent', font: { size: 10 } },
                        grid: { color: 'rgba(255,255,255,0.08)' },
                        pointLabels: { color: 'rgba(255,255,255,0.7)', font: { size: 11 } },
                        angleLines: { color: 'rgba(255,255,255,0.08)' }
                    }
                }
            }
        });
    }

    // 3. Bar Chart - all 16 params
    const barCanvas = document.getElementById('psych-team-bar-chart');
    if (barCanvas) {
        if (psychBarChartInstance) psychBarChartInstance.destroy();
        const allKeys = Object.keys(paramInfo);
        const barLabels = allKeys.map(k => paramInfo[k].label);
        const barValues = allKeys.map(k => paramAvgs[k] || 0);
        const barColors = allKeys.map(k => {
            const cat = paramInfo[k].cat;
            return psychCategoryMap[cat] ? psychCategoryMap[cat].color : '#f472b6';
        });

        psychBarChartInstance = new Chart(barCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Media Squadra',
                    data: barValues,
                    backgroundColor: barColors.map(c => c.replace('1)', '0.6)')),
                    borderColor: barColors,
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: {
                    x: { min: 0, max: 10, ticks: { color: 'rgba(255,255,255,0.5)', stepSize: 2 }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: 'rgba(255,255,255,0.7)', font: { size: 10 } }, grid: { display: false } }
                }
            }
        });
    }

    // Calculate score distribution for low scores (1 to 5) for every parameter
    const getLowScoreDistribution = (compiledList, key) => {
        const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let countLow = 0;
        compiledList.forEach(p => {
            const sheet = playerLatestMap[String(p.id)];
            const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
            const val = getParamScore(sc, key);
            if (val !== undefined && !isNaN(val)) {
                if (val < 6) {
                    countLow++;
                    const r = Math.max(1, Math.min(5, Math.floor(val)));
                    dist[r] = (dist[r] || 0) + 1;
                }
            }
        });
        return { dist, countLow };
    };

    const paramDists = {};
    Object.keys(paramInfo).forEach(key => {
        paramDists[key] = getLowScoreDistribution(compiledPlayers, key);
    });

    // Strengths: ordered by highest average score
    const topParams = Object.keys(paramAvgs).sort((a, b) => paramAvgs[b] - paramAvgs[a]).slice(0, 4);

    // Weaknesses (Punti Negativi): ordered strictly by HIGHEST FREQUENCY OF LOWEST SCORES (1 to 5), then by countLow, then lowest average
    const bottomParams = Object.keys(paramInfo).sort((a, b) => {
        for (let s = 1; s <= 5; s++) {
            const diff = paramDists[b].dist[s] - paramDists[a].dist[s];
            if (diff !== 0) return diff;
        }
        const diffCount = paramDists[b].countLow - paramDists[a].countLow;
        if (diffCount !== 0) return diffCount;
        return paramAvgs[a] - paramAvgs[b];
    }).slice(0, 4);

    // Strengths
    const strengthsEl = document.getElementById('psych-team-strengths');
    strengthsEl.innerHTML = topParams.map(key => {
        const info = paramInfo[key];
        const avg = paramAvgs[key];
        const countHigh = compiledPlayers.filter(p => {
            const sheet = playerLatestMap[String(p.id)];
            const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
            const val = getParamScore(sc, key);
            return val !== undefined && !isNaN(val) && val >= 7;
        }).length;
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; background:rgba(255,255,255,0.03); border-radius:8px; border-left:3px solid var(--color-tatt);">
                <div>
                    <strong style="color:var(--text-primary); font-size:0.9rem;">${info.label}</strong>
                    <span style="color:var(--text-secondary); font-size:0.8rem; margin-left:0.5rem;">(${info.cat})</span>
                </div>
                <div style="text-align:right;">
                    <span style="font-weight:800; color:var(--color-tatt); font-size:1rem;">${avg.toFixed(1)}/10</span>
                    <div style="font-size:0.72rem; color:var(--text-secondary);">${countHigh} gioc. ≥ 7</div>
                </div>
            </div>
        `;
    }).join('');

    // Weaknesses
    const weaknessesEl = document.getElementById('psych-team-weaknesses');
    weaknessesEl.innerHTML = bottomParams.map(key => {
        const info = paramInfo[key];
        const avg = paramAvgs[key];
        const countEqualOrLower = compiledPlayers.filter(p => {
            const sheet = playerLatestMap[String(p.id)];
            const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
            const val = getParamScore(sc, key);
            return val !== undefined && !isNaN(val) && val <= avg;
        }).length;
        const bgStyle = countEqualOrLower > 0 
            ? 'background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444;' 
            : 'background:rgba(255,255,255,0.03); border-left:3px solid var(--color-fisi);';
        const badgeHtml = countEqualOrLower > 0 
            ? `<span style="background:rgba(239, 68, 68, 0.22); color:#ef4444; font-weight:700; padding:0.15rem 0.45rem; border-radius:4px; border:1px solid rgba(239, 68, 68, 0.4); font-size:0.72rem;">⚠️ ${countEqualOrLower} gioc. ≤ ${avg.toFixed(1)}</span>` 
            : `<span style="font-size:0.72rem; color:var(--text-secondary);">${countEqualOrLower} gioc. ≤ ${avg.toFixed(1)}</span>`;

        return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; border-radius:8px; ${bgStyle}">
                <div>
                    <strong style="color:var(--text-primary); font-size:0.9rem;">${info.label}</strong>
                    <span style="color:var(--text-secondary); font-size:0.8rem; margin-left:0.5rem;">(${info.cat})</span>
                </div>
                <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:0.1rem;">
                    <span style="font-weight:800; color:var(--color-fisi); font-size:1rem;">${avg.toFixed(1)}/10</span>
                    ${badgeHtml}
                </div>
            </div>
        `;
    }).join('');

    // 5. Corrective Exercises (based on weakest params)
    const exercisesEl = document.getElementById('psych-corrective-exercises');
    exercisesEl.innerHTML = bottomParams.map(key => {
        const info = paramInfo[key];
        const avg = paramAvgs[key];
        const exercise = psychCorrectiveExercises[key] || 'Esercizio specifico da definire con lo staff tecnico.';
        const countEqualOrLower = compiledPlayers.filter(p => {
            const sheet = playerLatestMap[String(p.id)];
            const sc = (sheet && sheet.playerScores) ? sheet.playerScores : {};
            const val = getParamScore(sc, key);
            return val !== undefined && !isNaN(val) && val <= avg;
        }).length;
        const freqBadge = countEqualOrLower > 0 ? `<span style="background:rgba(239, 68, 68, 0.2); color:#ef4444; font-weight:700; padding:0.1rem 0.4rem; border-radius:4px; font-size:0.72rem; border:1px solid rgba(239, 68, 68, 0.3);">⚠️ ${countEqualOrLower} gioc. ≤ ${avg.toFixed(1)}</span>` : '';
        return `
            <div style="padding:0.75rem 1rem; background:rgba(255,255,255,0.03); border-radius:8px; border-left:3px solid #f472b6;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <strong style="color:var(--text-primary); font-size:0.9rem;">${info.label}</strong>
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                        ${freqBadge}
                        <span style="font-size:0.75rem; color:var(--color-fisi); font-weight:600;">Media: ${avg.toFixed(1)}/10</span>
                    </div>
                </div>
                <p style="color:var(--text-secondary); font-size:0.85rem; margin:0; line-height:1.4;">${exercise}</p>
            </div>
        `;
    }).join('');

    // 6. Per-player detail table
    const tbody = document.getElementById('psych-player-detail-tbody');
    let rowsHTML = '';
    targetPlayers.forEach(player => {
        const pid = String(player.id);
        const displayName = window.getInvertedName ? window.getInvertedName(player.name) : player.name;
        const sheet = playerLatestMap[pid];

        if (!sheet) {
            rowsHTML += `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05); opacity:0.75;">
                    <td style="padding:0.6rem 0.8rem; font-weight:600; color:var(--text-primary);">${displayName}</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td style="padding:0.6rem 0.5rem; text-align:center; color:var(--text-secondary);">-</td>
                    <td colspan="2" style="padding:0.6rem 0.5rem;"><span style="background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.3); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600;">⚠️ Non compilata</span></td>
                </tr>
            `;
            return;
        }

        const scores = sheet.playerScores || {};

        const catScores = {};
        Object.entries(psychCategoryMap).forEach(([catName, catInfo]) => {
            let cSum = 0, cCount = 0;
            catInfo.keys.forEach(k => {
                const v = getParamScore(scores, k);
                cSum += (v !== undefined ? v : 5);
                cCount++;
            });
            catScores[catName] = cCount > 0 ? (cSum / cCount) : 5;
        });
        const overall = Object.values(catScores).reduce((a, b) => a + b, 0) / 4;

        let maxKey = '', maxVal = -1, minKey = '', minVal = 11;
        Object.keys(paramInfo).forEach(k => {
            const v = getParamScore(scores, k);
            if (v !== undefined && !isNaN(v)) {
                if (v > maxVal) { maxVal = v; maxKey = k; }
                if (v < minVal) { minVal = v; minKey = k; }
            }
        });
        const isGkPlayer = player && (player.role === 'Portiere' || player.role === 'GK' || (player.role && player.role.toLowerCase().includes('portier')));
        const labelSource = isGkPlayer ? (typeof gkParamLabels !== 'undefined' ? gkParamLabels : {}) : (typeof defaultParamLabels !== 'undefined' ? defaultParamLabels : {});
        const bestLabel = (labelSource[maxKey] && labelSource[maxKey].label) || (paramInfo[maxKey] && paramInfo[maxKey].label) || maxKey;
        const worstLabel = (labelSource[minKey] && labelSource[minKey].label) || (paramInfo[minKey] && paramInfo[minKey].label) || minKey;

        const bestDesc = getSyntheticPlanText(sheet, maxKey, 'strength', isGkPlayer);
        const worstDesc = getSyntheticPlanText(sheet, minKey, 'weakness', isGkPlayer);

        const bestCell = maxKey ? `<div style="font-weight:700; color:var(--color-tatt); font-size:0.8rem;">${bestLabel} (${maxVal.toFixed(1)})</div>${bestDesc ? `<div style="font-size:0.73rem; color:var(--text-secondary); line-height:1.25; margin-top:0.12rem; font-weight:400;">${bestDesc}</div>` : ''}` : '-';
        const worstCell = minKey ? `<div style="font-weight:700; color:var(--color-fisi); font-size:0.8rem;">${worstLabel} (${minVal.toFixed(1)})</div>${worstDesc ? `<div style="font-size:0.73rem; color:var(--text-secondary); line-height:1.25; margin-top:0.12rem; font-weight:400;">${worstDesc}</div>` : ''}` : '-';

        const colorScore = (val) => val >= 7.5 ? 'var(--color-tatt)' : val >= 6 ? 'var(--color-player)' : val >= 4.5 ? '#f59e0b' : 'var(--color-fisi)';

        rowsHTML += `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:0.6rem 0.8rem; font-weight:600; color:var(--text-primary); vertical-align:middle;">${displayName}</td>
                <td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Stato Psicologico'])}; font-weight:700; vertical-align:middle;">${catScores['Stato Psicologico'].toFixed(1)}</td>
                <td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Tecnica Individuale'])}; font-weight:700; vertical-align:middle;">${catScores['Tecnica Individuale'].toFixed(1)}</td>
                <td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Condizione Fisica'])}; font-weight:700; vertical-align:middle;">${catScores['Condizione Fisica'].toFixed(1)}</td>
                <td style="padding:0.6rem 0.5rem; text-align:center; color:${colorScore(catScores['Tattica'])}; font-weight:700; vertical-align:middle;">${catScores['Tattica'].toFixed(1)}</td>
                <td style="padding:0.6rem 0.5rem; text-align:center; font-weight:800; color:${colorScore(overall)}; vertical-align:middle;">${overall.toFixed(1)}</td>
                <td style="padding:0.6rem 0.6rem; vertical-align:middle; max-width:210px;">${bestCell}</td>
                <td style="padding:0.6rem 0.6rem; vertical-align:middle; max-width:210px;">${worstCell}</td>
            </tr>
        `;
    });
    tbody.innerHTML = rowsHTML;
}
window.renderPsychophysicalDashboard = renderPsychophysicalDashboard;

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
                        showToast("Nessun giÃ .", "error");
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

        // Carica impostazioni all'avvio (da inserire dopo che il DOM ÃƒÂ¨ caricato)
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                loadGlobalSettings();
            }, 100);
        });

        // ==========================================
        // ==========================================
        // QUARTETTI LOGIC (WITH DRAG & DROP & BENCH)
        // ==========================================
        let draggedPlayerId = null;

        window.handleQuartetDragStart = function(event, id) {
            draggedPlayerId = String(id);
            event.dataTransfer.setData('text/plain', String(id));
            event.dataTransfer.effectAllowed = 'move';
            if (event.currentTarget) event.currentTarget.style.opacity = '0.5';
        };

        window.handleQuartetDragEnd = function(event) {
            if (event.currentTarget) event.currentTarget.style.opacity = '1';
            draggedPlayerId = null;
            document.querySelectorAll('.futsal-pitch-rhombus, #unassigned-players-container').forEach(el => el.classList.remove('drag-over'));
        };

        window.handleQuartetDragOver = function(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        };

        window.handleQuartetDragEnter = function(event) {
            event.preventDefault();
            if (event.currentTarget) event.currentTarget.classList.add('drag-over');
        };

        window.handleQuartetDragLeave = function(event) {
            if (event.currentTarget) event.currentTarget.classList.remove('drag-over');
        };

        window.handleQuartetDrop = function(event, targetQuartetName) {
            event.preventDefault();
            event.stopPropagation();
            if (event.currentTarget) event.currentTarget.classList.remove('drag-over');

            const pid = event.dataTransfer.getData('text/plain') || draggedPlayerId;
            if (!pid) return;

            const player = players.find(p => String(p.id) === String(pid));
            if (!player) return;

            const cleanTarget = targetQuartetName.replace(/Ã‚Â°|Ãƒâ€šÃ‚Â°/g, '°');
            if (player.quartets !== cleanTarget) {
                player.quartets = cleanTarget;
                localStorage.setItem('futsal_portal_players', JSON.stringify(players));
                const name = window.getInvertedName ? window.getInvertedName(player.name) : player.name;
                showToast(`${name} spostato in ${cleanTarget}`, 'success');
                renderQuartets();
                if (typeof renderRoster === 'function') renderRoster();
            }
        };

        window.handleQuartetSlotDrop = function(event, targetPlayerId, targetQuartetName) {
            event.preventDefault();
            event.stopPropagation();

            const pid = event.dataTransfer.getData('text/plain') || draggedPlayerId;
            if (!pid || String(pid) === String(targetPlayerId)) return;

            const sourcePlayer = players.find(p => String(p.id) === String(pid));
            const targetPlayer = players.find(p => String(p.id) === String(targetPlayerId));

            if (!sourcePlayer || !targetPlayer) return;

            const cleanTarget = targetQuartetName.replace(/Ã‚Â°|Ãƒâ€šÃ‚Â°/g, '°');
            const prevQuartet = sourcePlayer.quartets || '';

            sourcePlayer.quartets = cleanTarget;
            targetPlayer.quartets = prevQuartet;

            localStorage.setItem('futsal_portal_players', JSON.stringify(players));
            const sName = window.getInvertedName ? window.getInvertedName(sourcePlayer.name) : sourcePlayer.name;
            const tName = window.getInvertedName ? window.getInvertedName(targetPlayer.name) : targetPlayer.name;
            showToast(`Scambio effettuato: ${sName} ↔ ${tName}`, 'info');
            renderQuartets();
            if (typeof renderRoster === 'function') renderRoster();
        };

        window.handleQuartetDropToBench = function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.currentTarget) event.currentTarget.classList.remove('drag-over');

            const pid = event.dataTransfer.getData('text/plain') || draggedPlayerId;
            if (!pid) return;

            const player = players.find(p => String(p.id) === String(pid));
            if (!player) return;

            if (player.quartets) {
                player.quartets = '';
                localStorage.setItem('futsal_portal_players', JSON.stringify(players));
                const name = window.getInvertedName ? window.getInvertedName(player.name) : player.name;
                showToast(`${name} spostato in Panchina`, 'info');
                renderQuartets();
                if (typeof renderRoster === 'function') renderRoster();
            }
        };

        window.renderQuartets = function() {
            const quartets = {
                '1° Quartetto (Titolari)': 'pitch-quartet-1',
                '2° Quartetto (Prime Rotazioni)': 'pitch-quartet-2',
                '3° Quartetto (Seconde Rotazioni)': 'pitch-quartet-3',
                '4° Quartetto (Terze Rotazioni)': 'pitch-quartet-4'
            };

            const assignedQuartetNames = Object.keys(quartets);

            for (const [qName, containerId] of Object.entries(quartets)) {
                const container = document.getElementById(containerId);
                if (!container) continue;

                // Add Drag & Drop zone on pitch container
                container.setAttribute('ondragover', 'handleQuartetDragOver(event)');
                container.setAttribute('ondragenter', 'handleQuartetDragEnter(event)');
                container.setAttribute('ondragleave', 'handleQuartetDragLeave(event)');
                container.setAttribute('ondrop', `handleQuartetDrop(event, '${qName}')`);
                
                // Get players for this quartet
                const qPlayers = players.filter(p => p.quartets === qName || (p.quartets && p.quartets.replace(/Ã‚Â°|Ãƒâ€šÃ‚Â°/g, '°') === qName));
                
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

                    ${renderRhombusSlot(pivot, 'slot-top', '', qName)}
                    ${renderRhombusSlot(laterali[0], 'slot-left', '', qName)}
                    ${renderRhombusSlot(laterali[1], 'slot-right', '', qName)}
                    ${renderRhombusSlot(centrale, 'slot-bottom', '', qName)}
                    ${renderRhombusSlot(portiere, 'slot-goalie', '', qName)}
                `;
            }

            // Render Unassigned Bench Players
            renderUnassignedBench(assignedQuartetNames);
        };

        function renderUnassignedBench(assignedQuartetNames) {
            const benchContainer = document.getElementById('unassigned-players-container');
            const badgeEl = document.getElementById('unassigned-count-badge');
            if (!benchContainer) return;

            const unassignedPlayers = players.filter(p => {
                if (!p.quartets || p.quartets === 'Nessuno' || p.quartets === 'Rotazione Libera') return true;
                const cleanQ = p.quartets.replace(/Ã‚Â°|Ãƒâ€šÃ‚Â°/g, '°');
                return !assignedQuartetNames.includes(cleanQ);
            });

            if (badgeEl) badgeEl.textContent = unassignedPlayers.length;

            if (unassignedPlayers.length === 0) {
                benchContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem; margin:0 auto; padding:0.5rem 0;">✨ Tutti i giocatori della rosa sono stati assegnati a un quartetto.</p>`;
                return;
            }

            benchContainer.innerHTML = unassignedPlayers.map(p => {
                const initials = getInitials(p.name);
                const displayName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
                const avatarHTML = p.photo 
                    ? `<img src="${p.photo}" alt="${escapeHTML(p.name)}" style="width:100%; height:100%; object-fit:cover;">`
                    : `<span style="font-weight:800; color:var(--color-player); font-size:0.75rem;">${initials}</span>`;

                return `
                    <div class="unassigned-player-card"
                         draggable="true"
                         ondragstart="handleQuartetDragStart(event, '${p.id}')"
                         ondragend="handleQuartetDragEnd(event)"
                         onclick="openPlayerSummaryModal('${p.id}')"
                         style="display:flex; align-items:center; gap:0.6rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); padding:0.4rem 0.75rem; border-radius:20px; cursor:grab; transition:all 0.2s ease; user-select:none;"
                         title="Trascina sul campo per inserire nel quartetto">
                        <div style="width:32px; height:32px; border-radius:50%; overflow:hidden; border:2px solid var(--color-player); flex-shrink:0; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
                            ${avatarHTML}
                        </div>
                        <div style="display:flex; flex-direction:column; line-height:1.2;">
                            <span style="font-size:0.8rem; font-weight:700; color:var(--text-primary); white-space:nowrap;">${escapeHTML(displayName)}</span>
                            <span style="font-size:0.7rem; color:var(--color-player); font-weight:600;">#${p.number || '-'} · ${escapeHTML(p.role || 'Universale')}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderRhombusSlot(player, posClass, roleLabel, qName) {
            if (!player) {
                return `
                    <div class="rhombus-slot ${posClass}" ondragover="handleQuartetDragOver(event)" ondrop="handleQuartetDrop(event, '${qName}')">
                        <div class="rhombus-empty" title="Trascina qui un giocatore">
                            <span>+ Vuoto</span>
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
                customBorder = '3px solid #eab308'; // giÃ  per Portiere di Movimento
                boxShadow = '0 0 12px rgba(234, 179, 8, 0.7)';
            }
                
            const displayName = window.getInvertedName ? window.getInvertedName(player.name) : player.name;

            return `
                <div class="rhombus-slot ${posClass}" ondragover="handleQuartetDragOver(event)" ondrop="handleQuartetSlotDrop(event, '${player.id}', '${qName}')">
                    <div class="rhombus-player clickable-card" 
                         draggable="true" 
                         ondragstart="handleQuartetDragStart(event, '${player.id}')"
                         ondragend="handleQuartetDragEnd(event)"
                         onclick="openPlayerSummaryModal('${player.id}')" 
                         style="cursor:grab;" 
                         title="Trascina per spostare o scambiare">
                        <div class="avatar" style="border: ${customBorder}; box-shadow: ${boxShadow};">${avatarHTML}</div>
                        <div class="rhombus-player-name">${escapeHTML(displayName)}</div>
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

const defaultRolesPermissions = {
    "Admin": ["tab-dashboard", "tab-profile", "tab-attendance", "tab-roster", "tab-athletic", "tab-preparation", "tab-results", "tab-schemi", "tab-match-analyst", "tab-training-program", "tab-settings"],
    "Staff/Dir": ["tab-dashboard", "tab-profile", "tab-attendance", "tab-roster", "tab-athletic", "tab-preparation", "tab-results", "tab-schemi", "tab-match-analyst", "tab-training-program"],
    "Players": ["tab-dashboard", "tab-profile", "tab-results", "tab-schemi"]
};

// Ensure the specific staff account exists
if (!futsalUsers.find(u => u.username === "staff")) {
    futsalUsers.push({ username: "staff", password: "adria", role: "Staff/Dir" });
    localStorage.setItem('futsal_users', JSON.stringify(futsalUsers));
}
let currentUser = JSON.parse(localStorage.getItem('futsal_current_user')) || null;


let futsalRolesPermissions = JSON.parse(localStorage.getItem('futsal_roles_permissions')) || defaultRolesPermissions;
if (futsalRolesPermissions["Admin"] && !futsalRolesPermissions["Admin"].includes("tab-training-program")) futsalRolesPermissions["Admin"].push("tab-training-program");
if (futsalRolesPermissions["Staff/Dir"] && !futsalRolesPermissions["Staff/Dir"].includes("tab-training-program")) futsalRolesPermissions["Staff/Dir"].push("tab-training-program");
localStorage.setItem('futsal_roles_permissions', JSON.stringify(futsalRolesPermissions));

// Migration: If old roles exist, map them to new ones
if (futsalRolesPermissions["Staff Tecnico"] || futsalRolesPermissions["Giocatore"]) {
    futsalRolesPermissions["Staff/Dir"] = defaultRolesPermissions["Staff/Dir"];
    futsalRolesPermissions["Players"] = defaultRolesPermissions["Players"];
    delete futsalRolesPermissions["Staff Tecnico"];
    delete futsalRolesPermissions["Dirigenti"];
    delete futsalRolesPermissions["Giocatore"];
    if (futsalRolesPermissions["Admin"] && !futsalRolesPermissions["Admin"].includes("tab-training-program")) futsalRolesPermissions["Admin"].push("tab-training-program");
    if (futsalRolesPermissions["Staff/Dir"] && !futsalRolesPermissions["Staff/Dir"].includes("tab-training-program")) futsalRolesPermissions["Staff/Dir"].push("tab-training-program");
    localStorage.setItem('futsal_roles_permissions', JSON.stringify(futsalRolesPermissions));
}

// Sicurezza aggiuntiva: rimuoviamo forzatamente "tab-settings" dal giÃ  se era stato salvato per sbaglio
if (futsalRolesPermissions["Players"] && futsalRolesPermissions["Players"].includes("tab-settings")) {
    futsalRolesPermissions["Players"] = futsalRolesPermissions["Players"].filter(t => t !== "tab-settings");
    localStorage.setItem('futsal_roles_permissions', JSON.stringify(futsalRolesPermissions));
}

document.addEventListener('DOMContentLoaded', () => {

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
        if(typeof showToast === 'function') showToast("Utente giÃ .", "error");
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

// --- BACKUP E RIPRISTINO DATABASE ---
window.exportDatabase = function() {
    try {
        const db = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('futsal_') || key.startsWith('futsal'))) {
                // Escludiamo la sessione corrente per non creare conflitti al login
                if (key === 'futsal_current_user') continue;
                db[key] = localStorage.getItem(key);
            }
        }

        // Sincronizziamo anche lo stato in memoria se presente
        if (typeof players !== 'undefined' && Array.isArray(players) && players.length > 0) {
            db['futsal_portal_players'] = JSON.stringify(players);
        }
        if (typeof trainings !== 'undefined' && Array.isArray(trainings) && trainings.length > 0) {
            db['futsal_portal_trainings'] = JSON.stringify(trainings);
        }
        if (typeof convocations !== 'undefined' && Array.isArray(convocations) && convocations.length > 0) {
            db['futsal_portal_convocations'] = JSON.stringify(convocations);
        }
        if (typeof athleticTests !== 'undefined' && Array.isArray(athleticTests) && athleticTests.length > 0) {
            db['futsal_portal_athletic_tests'] = JSON.stringify(athleticTests);
        }
        if (typeof futsalUsers !== 'undefined' && Array.isArray(futsalUsers) && futsalUsers.length > 0) {
            db['futsal_users'] = JSON.stringify(futsalUsers);
        }
        
        const jsonStr = JSON.stringify(db, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const dateTag = new Date().toISOString().split('T')[0];
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `adriauto_c5_database_backup_${dateTag}.json`;
        
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            if (document.body.contains(a)) document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 500);

        if (typeof showToast === 'function') {
            showToast("Database esportato con successo!", "success");
        }
    } catch (err) {
        console.error("Errore durante l'esportazione del database:", err);
        alert("Errore durante l'esportazione del database: " + err.message);
    }
};

window.importDatabase = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const db = JSON.parse(e.target.result);
            if (confirm("Attenzione: questa operazione sovrascriverà tutti i dati correnti (giocatori, voti, logo, ecc.). Vuoi procedere?")) {
                // Rimuoviamo le vecchie chiavi futsal_ (tranne l'utente corrente)
                const keysToRemove = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && (key.startsWith('futsal_') || key.startsWith('futsal')) && key !== 'futsal_current_user') {
                        keysToRemove.push(key);
                    }
                }
                keysToRemove.forEach(k => localStorage.removeItem(k));

                // Inseriamo le nuove chiavi
                for (const [key, value] of Object.entries(db)) {
                    if ((key.startsWith('futsal_') || key.startsWith('futsal')) && key !== 'futsal_current_user') {
                        const valStr = typeof value === 'string' ? value : JSON.stringify(value);
                        localStorage.setItem(key, valStr);
                    }
                }
                
                alert("Database importato con successo! L'applicazione verrà ricaricata.");
                window.location.reload();
            }
        } catch (err) {
            alert("Errore durante l'importazione del file JSON. Assicurati che sia un backup valido creato da questa app.");
            console.error(err);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset per permettere nuove selezioni
};

// ==========================================================================
// HOME DASHBOARD ALERTS WIDGET ENGINE
// ==========================================================================
window.renderDashboardAlertsWidget = function() {
    const alertsGrid = document.getElementById('dashboard-alerts-grid');
    const badgeEl = document.getElementById('dashboard-alerts-count-badge');
    if (!alertsGrid) return;

    const playersList = (typeof players !== 'undefined' && Array.isArray(players) && players.length > 0) ? players : (window.players || []);
    const trainingsList = window.trainings || [];
    const convocationsList = window.convocations || [];
    const athleticTestsList = window.athleticTests || [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let alertsCount = 0;
    let cardsHTML = '';

    // 1. ALERT: PROSSIMO COMPLEANNO (OR TODAY)
    const processedPlayers = playersList.map(p => {
        const bInfo = window.parsePlayerBirthDate(p);
        if (!bInfo) return { player: p, hasBirthDate: false, daysRemaining: 9999 };
        const bMonth = bInfo.month;
        const bDay = bInfo.day;
        const bYear = bInfo.year;

        let nextBday = new Date(today.getFullYear(), bMonth - 1, bDay);
        if (nextBday < today) {
            nextBday = new Date(today.getFullYear() + 1, bMonth - 1, bDay);
        }
        const diffTime = nextBday.getTime() - today.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const turningAge = bYear ? (nextBday.getFullYear() - bYear) : null;
        return { player: p, hasBirthDate: true, bMonth, bDay, bYear, daysRemaining, turningAge };
    });

    const validBirthdays = processedPlayers.filter(p => p.hasBirthDate);
    validBirthdays.sort((a, b) => a.daysRemaining - b.daysRemaining);

    if (validBirthdays.length > 0) {
        alertsCount++;
        const closest = validBirthdays[0];
        const pName = window.getInvertedName ? window.getInvertedName(closest.player.name) : closest.player.name;
        const dayFormatted = `${String(closest.bDay).padStart(2, '0')}/${String(closest.bMonth).padStart(2, '0')}`;

        if (closest.daysRemaining === 0) {
            cardsHTML += `
                <div class="glass-panel" onclick="switchTabTo('tab-attendance', 'subtab-birthdays')" style="padding: 1rem; border-radius: 10px; background: linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(234, 179, 8, 0.08)); border: 1.5px solid #facc15; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                        <span style="font-size: 0.75rem; font-weight: 800; color: #fde047; text-transform: uppercase;">🎂 Compleanno di Oggi!</span>
                        <span style="font-size: 0.7rem; background: #facc15; color: #000; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 800;">OGGI 🎉</span>
                    </div>
                    <h4 style="margin: 0 0 0.25rem 0; color: #fff; font-size: 1rem; font-weight: 800;">
                        ${escapeHTML(pName)} (#${closest.player.number || ''})
                    </h4>
                    <p style="margin: 0; font-size: 0.8rem; color: #fef08a;">
                        Tanti auguri per i suoi <strong>${closest.turningAge ? closest.turningAge + ' anni' : ''}</strong>! 🥳
                    </p>
                </div>
            `;
        } else {
            cardsHTML += `
                <div class="glass-panel" onclick="switchTabTo('tab-attendance', 'subtab-birthdays')" style="padding: 1rem; border-radius: 10px; background: hsla(224, 45%, 4%, 0.6); border: 1px solid rgba(250, 204, 21, 0.4); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                        <span style="font-size: 0.75rem; font-weight: 800; color: #fde047; text-transform: uppercase;">🎂 Prossimo Compleanno</span>
                        <span style="font-size: 0.7rem; background: rgba(234, 179, 8, 0.2); color: #fde047; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: bold; border: 1px solid rgba(250, 204, 21, 0.4);">Tra ${closest.daysRemaining} gg</span>
                    </div>
                    <h4 style="margin: 0 0 0.25rem 0; color: #fff; font-size: 0.95rem; font-weight: 800;">
                        ${escapeHTML(pName)} - <span style="color: #fde047;">${dayFormatted}</span>
                    </h4>
                    <p style="margin: 0; font-size: 0.78rem; color: var(--text-muted);">
                        Compirà <strong>${closest.turningAge ? closest.turningAge + ' anni' : ''}</strong> #${closest.player.number || ''} (${closest.player.role || 'Giocatore'})
                    </p>
                </div>
            `;
        }
    }

    // 2. ALERT: PROSSIMA SEDUTA DI ALLENAMENTO & ASSENTI
    const sortedTrainings = [...trainingsList].sort((a, b) => new Date(b.date) - new Date(a.date));
    const nextOrLatestTraining = sortedTrainings[0];

    if (nextOrLatestTraining) {
        alertsCount++;
        const roster = nextOrLatestTraining.roster || {};
        const absentPlayerNames = [];
        const injuredPlayerNames = [];
        const justifiedPlayerNames = [];

        playersList.forEach(p => {
            const st = roster[p.id];
            const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
            if (st === 'A') absentPlayerNames.push(`#${p.number || ''} ${pName}`);
            else if (st === 'I') injuredPlayerNames.push(`#${p.number || ''} ${pName}`);
            else if (st === 'G') justifiedPlayerNames.push(`#${p.number || ''} ${pName}`);
        });

        const formattedDate = nextOrLatestTraining.date ? `${nextOrLatestTraining.date.split('-')[2]}/${nextOrLatestTraining.date.split('-')[1]}/${nextOrLatestTraining.date.split('-')[0]}` : '--';
        const logisticTxt = nextOrLatestTraining.logistic ? ` (${nextOrLatestTraining.logistic.toUpperCase()})` : '';

        let absentsHTML = '';
        if (absentPlayerNames.length > 0) {
            absentsHTML += `<div style="font-size: 0.76rem; color: var(--color-danger); margin-top: 0.25rem; font-weight: 600;">🔴 Assenti (${absentPlayerNames.length}): ${escapeHTML(absentPlayerNames.join(', '))}</div>`;
        }
        if (injuredPlayerNames.length > 0) {
            absentsHTML += `<div style="font-size: 0.76rem; color: var(--color-fisi); margin-top: 0.2rem; font-weight: 600;">🩹 Infortunati (${injuredPlayerNames.length}): ${escapeHTML(injuredPlayerNames.join(', '))}</div>`;
        }
        if (justifiedPlayerNames.length > 0) {
            absentsHTML += `<div style="font-size: 0.76rem; color: var(--color-primary); margin-top: 0.2rem; font-weight: 600;">🟡 Giustificati (${justifiedPlayerNames.length}): ${escapeHTML(justifiedPlayerNames.join(', '))}</div>`;
        }
        if (!absentsHTML) {
            absentsHTML = `<div style="font-size: 0.76rem; color: var(--color-tatt); margin-top: 0.25rem; font-weight: 600;">🟢 Rosa al completo per la seduta!</div>`;
        }

        cardsHTML += `
            <div class="glass-panel" onclick="switchTabTo('tab-attendance', 'subtab-board')" style="padding: 1rem; border-radius: 10px; background: hsla(224, 45%, 4%, 0.6); border: 1px solid rgba(0, 210, 255, 0.3); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-tecn); text-transform: uppercase;">⚽ Seduta Allenamento</span>
                    <span style="font-size: 0.7rem; background: rgba(0, 210, 255, 0.15); color: var(--color-tecn); padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: bold; border: 1px solid rgba(0, 210, 255, 0.3);">${formattedDate}${logisticTxt}</span>
                </div>
                <h4 style="margin: 0 0 0.1rem 0; color: #fff; font-size: 0.95rem; font-weight: 800;">
                    Report Assenze Seduta
                </h4>
                ${absentsHTML}
            </div>
        `;
    }

    // 3. ALERT: PROSSIMA GARA / AMICHEVOLE E CONVOCAZIONI
    const sortedConvocations = [...convocationsList].sort((a, b) => new Date(b.date) - new Date(a.date));
    const nextMatch = sortedConvocations[0];

    if (nextMatch) {
        alertsCount++;
        const calledCount = nextMatch.selectedIds ? nextMatch.selectedIds.length : 0;
        const totalPlayersCount = playersList.length;
        const matchDateFormatted = nextMatch.date ? `${nextMatch.date.split('-')[2]}/${nextMatch.date.split('-')[1]}/${nextMatch.date.split('-')[0]}` : '--';
        const typeTxt = nextMatch.type === 'friendly' ? 'Amichevole' : 'Gara Ufficiale';

        cardsHTML += `
            <div class="glass-panel" onclick="switchTabTo('tab-attendance', 'subtab-matches')" style="padding: 1rem; border-radius: 10px; background: hsla(224, 45%, 4%, 0.6); border: 1px solid rgba(255, 0, 127, 0.3); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <span style="font-size: 0.75rem; font-weight: 800; color: #ff007f; text-transform: uppercase;">🏆 Prossima Gara</span>
                    <span style="font-size: 0.7rem; background: rgba(255, 0, 127, 0.15); color: #ff007f; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: bold; border: 1px solid rgba(255, 0, 127, 0.3);">${matchDateFormatted}</span>
                </div>
                <h4 style="margin: 0 0 0.25rem 0; color: #fff; font-size: 0.95rem; font-weight: 800;">
                    vs ${escapeHTML(nextMatch.opponent || 'Avversario')}
                </h4>
                <p style="margin: 0; font-size: 0.78rem; color: var(--text-muted);">
                    ${typeTxt} - <strong style="color: var(--color-player);">${calledCount} Convocati</strong> su ${totalPlayersCount} atleti
                </p>
            </div>
        `;
    }

    // 4. ALERT: GIOCATORI INFORTUNATI IN ROSA
    const currentlyInjuredPlayers = [];
    if (nextOrLatestTraining && nextOrLatestTraining.roster) {
        playersList.forEach(p => {
            if (nextOrLatestTraining.roster[p.id] === 'I') {
                const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
                currentlyInjuredPlayers.push(`#${p.number || ''} ${pName}`);
            }
        });
    }

    if (currentlyInjuredPlayers.length > 0) {
        alertsCount++;
        cardsHTML += `
            <div class="glass-panel" onclick="switchTabTo('tab-profile', 'subtab-roster-list')" style="padding: 1rem; border-radius: 10px; background: hsla(224, 45%, 4%, 0.6); border: 1px solid rgba(255, 71, 87, 0.4); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-danger); text-transform: uppercase;">🚑 Infermeria Squadra</span>
                    <span style="font-size: 0.7rem; background: rgba(255, 71, 87, 0.2); color: var(--color-danger); padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: bold; border: 1px solid rgba(255, 71, 87, 0.4);">${currentlyInjuredPlayers.length} Infortunat${currentlyInjuredPlayers.length === 1 ? 'o' : 'i'}</span>
                </div>
                <h4 style="margin: 0 0 0.25rem 0; color: #fff; font-size: 0.95rem; font-weight: 800;">
                    Atleti in Recupero
                </h4>
                <div style="font-size: 0.76rem; color: var(--color-danger); font-weight: 600;">
                    ${escapeHTML(currentlyInjuredPlayers.join(', '))}
                </div>
            </div>
        `;
    }

    // 5. ALERT: ULTIMO TEST ATLETICO
    if (athleticTestsList.length > 0) {
        alertsCount++;
        const latestTest = [...athleticTestsList].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const testDateFormatted = latestTest.date ? `${latestTest.date.split('-')[2]}/${latestTest.date.split('-')[1]}/${latestTest.date.split('-')[0]}` : '--';

        cardsHTML += `
            <div class="glass-panel" onclick="switchTabTo('tab-athletic')" style="padding: 1rem; border-radius: 10px; background: hsla(224, 45%, 4%, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-fisi); text-transform: uppercase;">📊 Test Fisico Svolto</span>
                    <span style="font-size: 0.7rem; background: rgba(16, 185, 129, 0.15); color: var(--color-fisi); padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: bold; border: 1px solid rgba(16, 185, 129, 0.3);">${testDateFormatted}</span>
                </div>
                <h4 style="margin: 0 0 0.25rem 0; color: #fff; font-size: 0.95rem; font-weight: 800;">
                    Test: ${escapeHTML(latestTest.type || 'Valutazione')}
                </h4>
                <p style="margin: 0; font-size: 0.78rem; color: var(--text-muted);">
                    Registrazione completata per l'atleta. Clicca per accedere ai test fisici.
                </p>
            </div>
        `;
    }

    if (badgeEl) {
        badgeEl.textContent = `${alertsCount} Avvis${alertsCount === 1 ? 'o Attivo' : 'i Attivi'}`;
    }

    alertsGrid.innerHTML = cardsHTML;
};

// ==========================================================================
// MONTHLY ABSENCES CALENDAR TAB ENGINE
// ==========================================================================
window.renderAbsencesTab = function() {
    const statsContainer = document.getElementById('absence-monthly-stats');
    const matrixGrid = document.getElementById('absence-calendar-grid-matrix');
    const titleEl = document.getElementById('absence-calendar-month-title');
    const tbody = document.getElementById('absence-table-tbody');
    const playerSelect = document.getElementById('absence-player-select');
    const monthSelect = document.getElementById('absence-month-select');
    const yearSelect = document.getElementById('absence-year-select');

    if (!matrixGrid || !tbody) return;

    const playersList = (typeof players !== 'undefined' && Array.isArray(players) && players.length > 0) ? players : (window.players || []);
    let trainingsList = [];
    if (typeof trainings !== 'undefined' && Array.isArray(trainings) && trainings.length > 0) {
        trainingsList = trainings;
    } else if (window.trainings && Array.isArray(window.trainings) && window.trainings.length > 0) {
        trainingsList = window.trainings;
    } else {
        try {
            trainingsList = JSON.parse(localStorage.getItem('futsal_portal_trainings')) || [];
        } catch(e) {
            trainingsList = [];
        }
    }

    // Helper to parse any date string format (ISO YYYY-MM-DD or European DD-MM-YYYY / DD/MM/YYYY)
    function parseDateParts(dateStr) {
        if (!dateStr) return null;
        const clean = String(dateStr).trim();
        const parts = clean.split(/[-\/]/);
        if (parts.length !== 3) return null;
        let year, month, day;
        if (parts[0].length === 4) {
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            day = parseInt(parts[2], 10);
        } else if (parts[2].length === 4) {
            day = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
        } else {
            return null;
        }
        if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
        return { year, month, day, isoDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` };
    }

    const today = new Date();

    // Populate playerSelect if not populated
    if (playerSelect && playerSelect.options.length <= 1) {
        let optionsHTML = `<option value="all">Tutti i Giocatori (${playersList.length})</option>`;
        playersList.forEach(p => {
            const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
            optionsHTML += `<option value="${p.id}">#${p.number || ''} ${escapeHTML(pName)}</option>`;
        });
        playerSelect.innerHTML = optionsHTML;
    }

    const selMonthRaw = monthSelect?.value || 'all';
    const selYearRaw = yearSelect?.value || 'all';
    const selPlayerId = playerSelect?.value || 'all';

    const monthNamesIt = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];

    if (titleEl) {
        if (selMonthRaw === 'all') titleEl.textContent = `Tutti i Mesi della Stagione`;
        else titleEl.textContent = `${monthNamesIt[parseInt(selMonthRaw, 10) - 1]} ${selYearRaw === 'all' ? '' : selYearRaw}`;
    }

    // Filter trainings for selected month & year
    const monthTrainings = trainingsList.filter(t => {
        const dp = parseDateParts(t.date);
        if (!dp) return false;
        if (selYearRaw !== 'all' && dp.year !== parseInt(selYearRaw, 10)) return false;
        if (selMonthRaw !== 'all' && dp.month !== parseInt(selMonthRaw, 10)) return false;
        return true;
    });

    monthTrainings.sort((a, b) => {
        const dpA = parseDateParts(a.date);
        const dpB = parseDateParts(b.date);
        if (dpA && dpB) {
            return new Date(dpA.year, dpA.month - 1, dpA.day) - new Date(dpB.year, dpB.month - 1, dpB.day);
        }
        return 0;
    });

    // Collect all absence entries for the filtered sessions
    let monthAbsenceEntries = [];
    let countA = 0, countG = 0, countI = 0;

    monthTrainings.forEach(t => {
        const dp = parseDateParts(t.date);
        if (!dp) return;
        const roster = t.roster || {};
        playersList.forEach(p => {
            if (selPlayerId !== 'all' && String(p.id) !== String(selPlayerId)) return;
            const st = roster[p.id];
            if (st === 'A' || st === 'G' || st === 'I') {
                if (st === 'A') countA++;
                else if (st === 'G') countG++;
                else if (st === 'I') countI++;

                // Compute cumulative season absences for player
                let totalSeasonAbsences = 0;
                trainingsList.forEach(tr => {
                    if (tr.roster && tr.roster[p.id] === 'A') totalSeasonAbsences++;
                });

                monthAbsenceEntries.push({
                    date: t.date,
                    dateObj: dp,
                    player: p,
                    status: st,
                    logistic: t.logistic || 'home',
                    totalSeasonAbsences
                });
            }
        });
    });

    // 1. Render Monthly Stats Cards
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); padding: 0.85rem 1rem; border-radius: 8px;">
                <span style="font-size: 0.75rem; color: var(--color-danger); text-transform: uppercase; font-weight: bold;">🔴 Assenze Ingiustificate</span>
                <div style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.2rem;">${countA}</div>
            </div>
            <div style="background: rgba(234, 179, 8, 0.12); border: 1px solid rgba(234, 179, 8, 0.3); padding: 0.85rem 1rem; border-radius: 8px;">
                <span style="font-size: 0.75rem; color: #fde047; text-transform: uppercase; font-weight: bold;">🟡 Giustificate</span>
                <div style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.2rem;">${countG}</div>
            </div>
            <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.85rem 1rem; border-radius: 8px;">
                <span style="font-size: 0.75rem; color: var(--color-fisi); text-transform: uppercase; font-weight: bold;">🩹 Infortuni</span>
                <div style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.2rem;">${countI}</div>
            </div>
            <div style="background: rgba(0, 210, 255, 0.1); border: 1px solid rgba(0, 210, 255, 0.3); padding: 0.85rem 1rem; border-radius: 8px;">
                <span style="font-size: 0.75rem; color: var(--color-tecn); text-transform: uppercase; font-weight: bold;">⚽ Sedute Monitorate</span>
                <div style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.2rem;">${monthTrainings.length}</div>
            </div>
        `;
    }

    // 2. Render Calendar Grid Matrix
    const targetGridMonth = selMonthRaw === 'all' ? (today.getMonth() + 1) : parseInt(selMonthRaw, 10);
    const targetGridYear = selYearRaw === 'all' ? today.getFullYear() : parseInt(selYearRaw, 10);

    const daysInMonth = new Date(targetGridYear, targetGridMonth, 0).getDate();
    const firstDayIndex = (new Date(targetGridYear, targetGridMonth - 1, 1).getDay() + 6) % 7; // Mon=0..Sun=6

    let gridHTML = `
        <div style="color:var(--text-muted); font-weight:bold; padding:4px 0; font-size:0.8rem;">LUN</div>
        <div style="color:var(--text-muted); font-weight:bold; padding:4px 0; font-size:0.8rem;">MAR</div>
        <div style="color:var(--text-muted); font-weight:bold; padding:4px 0; font-size:0.8rem;">MER</div>
        <div style="color:var(--text-muted); font-weight:bold; padding:4px 0; font-size:0.8rem;">GIO</div>
        <div style="color:var(--text-muted); font-weight:bold; padding:4px 0; font-size:0.8rem;">VEN</div>
        <div style="color:var(--text-muted); font-weight:bold; padding:4px 0; font-size:0.8rem;">SAB</div>
        <div style="color:var(--text-muted); font-weight:bold; padding:4px 0; font-size:0.8rem;">DOM</div>
    `;

    for (let i = 0; i < firstDayIndex; i++) {
        gridHTML += `<div style="padding: 10px;"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const daySession = monthTrainings.find(t => {
            const dp = parseDateParts(t.date);
            return dp && dp.year === targetGridYear && dp.month === targetGridMonth && dp.day === d;
        });

        const dayAbsences = monthAbsenceEntries.filter(e => {
            const dp = e.dateObj;
            return dp && dp.year === targetGridYear && dp.month === targetGridMonth && dp.day === d;
        });

        if (daySession) {
            const numA = dayAbsences.filter(e => e.status === 'A').length;
            const numG = dayAbsences.filter(e => e.status === 'G').length;
            const numI = dayAbsences.filter(e => e.status === 'I').length;
            const totalAbs = numA + numG + numI;

            if (totalAbs > 0) {
                const namesList = dayAbsences.map(e => {
                    const pName = window.getInvertedName ? window.getInvertedName(e.player.name) : e.player.name;
                    const stTag = e.status === 'A' ? '🔴 Assente' : (e.status === 'G' ? '🟡 Giustificato' : '🩹 Infortunato');
                    return `${pName} (${stTag})`;
                }).join('\n');

                gridHTML += `
                    <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.35), rgba(239, 68, 68, 0.1)); border: 1.5px solid #ef4444; border-radius: 8px; padding: 0.6rem 0.3rem; min-height: 55px; cursor: help; display: flex; flex-direction: column; align-items: center; justify-content: space-between;" title="${escapeHTML(namesList)}">
                        <strong style="color: #fff; font-size: 0.85rem;">${d}</strong>
                        <div style="display: flex; gap: 2px; font-size: 0.72rem; font-weight: 800; margin-top: 2px;">
                            ${numA > 0 ? `<span style="background:#ef4444; color:#fff; padding:1px 4px; border-radius:4px;">🔴 ${numA}</span>` : ''}
                            ${numG > 0 ? `<span style="background:#eab308; color:#000; padding:1px 4px; border-radius:4px;">🟡 ${numG}</span>` : ''}
                            ${numI > 0 ? `<span style="background:#10b981; color:#fff; padding:1px 4px; border-radius:4px;">🩹 ${numI}</span>` : ''}
                        </div>
                    </div>
                `;
            } else {
                gridHTML += `
                    <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 8px; padding: 0.6rem 0.3rem; min-height: 55px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;" title="Seduta svolta - Rosa al completo!">
                        <strong style="color: #fff; font-size: 0.85rem;">${d}</strong>
                        <span style="font-size: 0.68rem; color: #34d399; font-weight: bold;">🟢 100%</span>
                    </div>
                `;
            }
        } else {
            gridHTML += `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); border-radius: 8px; padding: 0.6rem 0.3rem; min-height: 55px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 0.85rem;">${d}</span>
                </div>
            `;
        }
    }

    matrixGrid.innerHTML = gridHTML;

    matrixGrid.innerHTML = gridHTML;

    // 3. Render Absence Table (Intervalli vs Singole Sedute)
    const theadEl = document.getElementById('absence-table-thead');
    const mode = window.currentAbsenceViewMode || 'intervals';

    if (monthAbsenceEntries.length === 0) {
        if (theadEl) {
            theadEl.innerHTML = `
                <tr style="background: rgba(0,0,0,0.3); border-bottom: 2px solid var(--border-color);">
                    <th style="padding: 0.75rem;">Giocatore</th>
                    <th style="padding: 0.75rem;">Intervallo Temporale Assenza</th>
                    <th style="padding: 0.75rem;">Sedute Saltate</th>
                    <th style="padding: 0.75rem;">Durata Stimata</th>
                    <th style="padding: 0.75rem;">Causale Prevalente</th>
                    <th style="padding: 0.75rem;">Stato Rientro / Presenza</th>
                </tr>
            `;
        }
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    Nessuna assenza registrata per i filtri selezionati.
                </td>
            </tr>
        `;
        return;
    }

    if (mode === 'intervals') {
        if (theadEl) {
            theadEl.innerHTML = `
                <tr style="background: rgba(0,0,0,0.3); border-bottom: 2px solid var(--border-color);">
                    <th style="padding: 0.75rem;">Giocatore</th>
                    <th style="padding: 0.75rem;">Intervallo Temporale Assenza</th>
                    <th style="padding: 0.75rem;">Sedute Saltate</th>
                    <th style="padding: 0.75rem;">Durata Stimata</th>
                    <th style="padding: 0.75rem;">Causale Prevalente</th>
                    <th style="padding: 0.75rem;">Stato Rientro / Presenza</th>
                </tr>
            `;
        }

        // Group absence entries by player into consecutive/close intervals
        const playerMap = {};
        monthAbsenceEntries.forEach(item => {
            const pid = item.player.id;
            if (!playerMap[pid]) playerMap[pid] = [];
            playerMap[pid].push(item);
        });

        let intervalsList = [];

        Object.keys(playerMap).forEach(pid => {
            const pEntries = playerMap[pid].sort((a, b) => {
                const dA = new Date(a.dateObj.year, a.dateObj.month - 1, a.dateObj.day);
                const dB = new Date(b.dateObj.year, b.dateObj.month - 1, b.dateObj.day);
                return dA - dB;
            });

            let currentInv = null;
            pEntries.forEach(entry => {
                if (!currentInv) {
                    currentInv = {
                        player: entry.player,
                        startDate: entry.dateObj,
                        endDate: entry.dateObj,
                        sessionCount: 1,
                        statuses: [entry.status],
                        logistics: [entry.logistic]
                    };
                } else {
                    const d1 = new Date(currentInv.endDate.year, currentInv.endDate.month - 1, currentInv.endDate.day);
                    const d2 = new Date(entry.dateObj.year, entry.dateObj.month - 1, entry.dateObj.day);
                    const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));

                    if (diffDays <= 7) {
                        currentInv.endDate = entry.dateObj;
                        currentInv.sessionCount++;
                        currentInv.statuses.push(entry.status);
                        currentInv.logistics.push(entry.logistic);
                    } else {
                        intervalsList.push(currentInv);
                        currentInv = {
                            player: entry.player,
                            startDate: entry.dateObj,
                            endDate: entry.dateObj,
                            sessionCount: 1,
                            statuses: [entry.status],
                            logistics: [entry.logistic]
                        };
                    }
                }
            });
            if (currentInv) intervalsList.push(currentInv);
        });

        intervalsList.sort((a, b) => {
            const dA = new Date(a.startDate.year, a.startDate.month - 1, a.startDate.day);
            const dB = new Date(b.startDate.year, b.startDate.month - 1, b.startDate.day);
            return dB - dA;
        });

        let rowsHTML = '';
        intervalsList.forEach(inv => {
            const p = inv.player;
            const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
            const initials = getInitials(p.name);
            const avatarImg = p.photo 
                ? `<img src="${p.photo}" alt="${escapeHTML(p.name)}" style="width:32px; height:32px; border-radius:50%; object-fit:cover;">`
                : `<div style="width:32px; height:32px; border-radius:50%; background:var(--color-player); color:#000; font-weight:bold; font-size:0.75rem; display:flex; align-items:center; justify-content:center;">${initials}</div>`;

            const dStart = new Date(inv.startDate.year, inv.startDate.month - 1, inv.startDate.day);
            const dEnd = new Date(inv.endDate.year, inv.endDate.month - 1, inv.endDate.day);
            const totalDays = Math.max(1, Math.round((dEnd - dStart) / (1000 * 60 * 60 * 24)) + 1);

            const dateStartFormatted = `${String(inv.startDate.day).padStart(2, '0')}/${String(inv.startDate.month).padStart(2, '0')}/${inv.startDate.year}`;
            const dateEndFormatted = `${String(inv.endDate.day).padStart(2, '0')}/${String(inv.endDate.month).padStart(2, '0')}/${inv.endDate.year}`;

            const dateRangeTxt = (inv.startDate.isoDate === inv.endDate.isoDate)
                ? `📅 ${dateStartFormatted}`
                : `📅 Dal ${dateStartFormatted} al ${dateEndFormatted}`;

            const statusCounts = {};
            inv.statuses.forEach(s => statusCounts[s] = (statusCounts[s] || 0) + 1);
            let domStatus = 'A';
            let maxC = 0;
            Object.keys(statusCounts).forEach(s => {
                if (statusCounts[s] > maxC) { maxC = statusCounts[s]; domStatus = s; }
            });

            let statusBadge = '';
            if (domStatus === 'A') {
                statusBadge = `<span class="badge" style="background:rgba(239, 68, 68, 0.25); color:#ef4444; border:1px solid #ef4444; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px;">🔴 ASSENZA INGIUSTIFICATA</span>`;
            } else if (domStatus === 'G') {
                statusBadge = `<span class="badge" style="background:rgba(234, 179, 8, 0.25); color:#fde047; border:1px solid #facc15; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px;">🟡 GIUSTIFICATA</span>`;
            } else if (domStatus === 'I') {
                statusBadge = `<span class="badge" style="background:rgba(16, 185, 129, 0.25); color:#34d399; border:1px solid #10b981; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px;">🩹 INFORTUNIO</span>`;
            }

            const returnSession = trainingsList.find(t => {
                const dp = parseDateParts(t.date);
                if (!dp) return false;
                const tDate = new Date(dp.year, dp.month - 1, dp.day);
                return tDate > dEnd && (t.roster && t.roster[p.id] === 'P');
            });

            let returnBadge = '';
            if (returnSession) {
                const dpR = parseDateParts(returnSession.date);
                const rDateFormatted = `${String(dpR.day).padStart(2, '0')}/${String(dpR.month).padStart(2, '0')}/${dpR.year}`;
                returnBadge = `<span class="badge" style="background:rgba(16, 185, 129, 0.2); color:#34d399; border:1px solid #10b981; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px;">🟢 Rientrato il ${rDateFormatted}</span>`;
            } else {
                returnBadge = `<span class="badge" style="background:rgba(239, 68, 68, 0.2); color:#f87171; border:1px solid #ef4444; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px;">🔴 In Corso / Non Rientrato</span>`;
            }

            rowsHTML += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 0.65rem 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.65rem;">
                            ${avatarImg}
                            <div>
                                <div style="font-weight: 700; color: var(--color-player);">
                                    #${p.number || ''} ${escapeHTML(pName)}
                                </div>
                                <span style="font-size:0.72rem; color:var(--text-muted);">${escapeHTML(p.role || 'Giocatore')}</span>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 0.65rem 0.75rem; font-weight: 700; color: #fff;">
                        ${dateRangeTxt}
                    </td>
                    <td style="padding: 0.65rem 0.75rem; font-weight: 800; color: #fde047;">
                        ⚽ ${inv.sessionCount} ${inv.sessionCount === 1 ? 'Seduta' : 'Sedute'}
                    </td>
                    <td style="padding: 0.65rem 0.75rem; font-weight: 600; color: var(--text-muted);">
                        ⏱️ ${totalDays} ${totalDays === 1 ? 'Giorno' : 'Giorni'}
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                        ${statusBadge}
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                        ${returnBadge}
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = rowsHTML;
    } else {
        // Mode 'single'
        if (theadEl) {
            theadEl.innerHTML = `
                <tr style="background: rgba(0,0,0,0.3); border-bottom: 2px solid var(--border-color);">
                    <th style="padding: 0.75rem;">Data Seduta</th>
                    <th style="padding: 0.75rem;">Giocatore</th>
                    <th style="padding: 0.75rem;">Ruolo</th>
                    <th style="padding: 0.75rem;">Stato Assenza</th>
                    <th style="padding: 0.75rem;">Logistica Seduta</th>
                    <th style="padding: 0.75rem;">Stagione Totale Assenze</th>
                </tr>
            `;
        }

        monthAbsenceEntries.sort((a, b) => {
            const dpA = a.dateObj;
            const dpB = b.dateObj;
            return new Date(dpA.year, dpA.month - 1, dpA.day) - new Date(dpB.year, dpB.month - 1, dpB.day);
        });

        let rowsHTML = '';
        monthAbsenceEntries.forEach(item => {
            const p = item.player;
            const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
            const initials = getInitials(p.name);
            const avatarImg = p.photo 
                ? `<img src="${p.photo}" alt="${escapeHTML(p.name)}" style="width:32px; height:32px; border-radius:50%; object-fit:cover;">`
                : `<div style="width:32px; height:32px; border-radius:50%; background:var(--color-player); color:#000; font-weight:bold; font-size:0.75rem; display:flex; align-items:center; justify-content:center;">${initials}</div>`;

            const dp = item.dateObj;
            const dateFormatted = `${String(dp.day).padStart(2, '0')}/${String(dp.month).padStart(2, '0')}/${dp.year}`;

            let statusBadge = '';
            if (item.status === 'A') {
                statusBadge = `<span class="badge" style="background:rgba(239, 68, 68, 0.25); color:#ef4444; border:1px solid #ef4444; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px;">🔴 ASSENTE</span>`;
            } else if (item.status === 'G') {
                statusBadge = `<span class="badge" style="background:rgba(234, 179, 8, 0.25); color:#fde047; border:1px solid #facc15; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px;">🟡 GIUSTIFICATO</span>`;
            } else if (item.status === 'I') {
                statusBadge = `<span class="badge" style="background:rgba(16, 185, 129, 0.25); color:#34d399; border:1px solid #10b981; font-weight:bold; padding:0.25rem 0.6rem; border-radius:10px;">🩹 INFORTUNATO</span>`;
            }

            const logTxt = item.logistic === 'beach' ? '🏖️ Spiaggia' : (item.logistic === 'away' ? '🚌 Trasferta' : '🏠 Casa');

            rowsHTML += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 0.65rem 0.75rem; font-weight: 700; color: #fff;">
                        ${dateFormatted}
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.65rem;">
                            ${avatarImg}
                            <div style="font-weight: 700; color: var(--color-player);">
                                #${p.number || ''} ${escapeHTML(pName)}
                            </div>
                        </div>
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                        <span class="badge" style="background: rgba(255,255,255,0.08); color: var(--text-primary); font-size: 0.75rem;">${escapeHTML(p.role || 'Giocatore')}</span>
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                        ${statusBadge}
                    </td>
                    <td style="padding: 0.65rem 0.75rem; font-weight: 600;">
                        ${logTxt}
                    </td>
                    <td style="padding: 0.65rem 0.75rem; font-weight: 800; color: var(--color-danger);">
                        ${item.totalSeasonAbsences} Assenze Totali
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = rowsHTML;
    }
};

window.currentAbsenceViewMode = 'intervals';

window.setAbsenceViewMode = function(mode) {
    window.currentAbsenceViewMode = mode;
    
    const btnIntervals = document.getElementById('btn-absence-mode-intervals');
    const btnSingle = document.getElementById('btn-absence-mode-single');
    
    if (btnIntervals && btnSingle) {
        if (mode === 'intervals') {
            btnIntervals.style.background = 'var(--color-primary)';
            btnIntervals.style.color = '#fff';
            btnSingle.style.background = 'rgba(255,255,255,0.08)';
            btnSingle.style.color = 'var(--text-muted)';
        } else {
            btnSingle.style.background = 'var(--color-primary)';
            btnSingle.style.color = '#fff';
            btnIntervals.style.background = 'rgba(255,255,255,0.08)';
            btnIntervals.style.color = 'var(--text-muted)';
        }
    }
    
    if (typeof window.renderAbsencesTab === 'function') window.renderAbsencesTab();
};

window.exportAbsencesPDF = function() {
    if (typeof window.renderAbsencesTab === 'function') {
        window.renderAbsencesTab();
    }

    const element = document.getElementById('subtab-absences');
    if (!element) {
        window.print();
        return;
    }

    // Clone element for print window
    const clone = element.cloneNode(true);
    
    // Remove buttons, selectors, and non-printable elements from clone
    const selectorsToHide = clone.querySelectorAll('.btn, button, select, label');
    selectorsToHide.forEach(el => el.style.display = 'none');

    // Replace dark colors with crisp black text in clone
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.color = '#000000';
        el.style.textShadow = 'none';
        if (el.classList.contains('glass-panel')) {
            el.style.background = '#ffffff';
            el.style.border = '1px solid #cbd5e1';
            el.style.boxShadow = 'none';
        }
    });

    const printWin = window.open('', '_blank', 'width=900,height=700');
    if (printWin) {
        printWin.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Report Assenze - ADRIAUTO F.M. C5</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        padding: 20px;
                        color: #000000;
                        background: #ffffff;
                    }
                    h2, h3, h4, th, td, div, span, strong {
                        color: #000000 !important;
                    }
                    .header-pdf {
                        border-bottom: 2px solid #ef4444;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .glass-panel {
                        border: 1px solid #cbd5e1 !important;
                        background: #ffffff !important;
                        padding: 15px !important;
                        margin-bottom: 20px !important;
                        border-radius: 8px !important;
                    }
                    table {
                        width: 100% !important;
                        border-collapse: collapse !important;
                        margin-top: 10px !important;
                    }
                    th, td {
                        border: 1px solid #cbd5e1 !important;
                        padding: 8px 10px !important;
                        text-align: left !important;
                        font-size: 13px !important;
                        color: #000000 !important;
                    }
                    th {
                        background: #f1f5f9 !important;
                        font-weight: bold !important;
                    }
                    .badge {
                        padding: 3px 8px !important;
                        border-radius: 6px !important;
                        font-size: 11px !important;
                        font-weight: bold !important;
                        border: 1px solid #94a3b8 !important;
                    }
                    button, .btn, select, label { display: none !important; }
                    @media print {
                        @page { margin: 1cm; size: A4 landscape; }
                    }
                </style>
            </head>
            <body>
                <div class="header-pdf">
                    <h2 style="margin:0; color:#ef4444 !important;">ADRIAUTO F.M. C5 - REGISTRO & REPORT ASSENZE GIOCATORI</h2>
                    <p style="margin:4px 0 0 0; font-size:12px; color:#475569 !important;">Data generazione: ${new Date().toLocaleDateString('it-IT')} ${new Date().toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'})}</p>
                </div>
                ${clone.innerHTML}
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 250);
                    };
                </script>
            </body>
            </html>
        `);
        printWin.document.close();
    } else {
        // Direct print fallback if popups are blocked
        document.body.classList.add('print-absences');
        setTimeout(() => {
            window.print();
            setTimeout(() => {
                document.body.classList.remove('print-absences');
            }, 1000);
        }, 150);
    }
};

