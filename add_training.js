
// ==========================================
// PROGRAMMA DI ALLENAMENTO (SCHEDA)
// ==========================================

window.updateLinkButton = function(inputId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(inputId + '-btn');
    if (!input || !btn) return;
    
    let val = input.value.trim();
    if (val) {
        // Se è un semplice nome file senza slash o backslash ma con estensione
        if (!val.includes('/') && !val.includes('\\') && val.includes('.')) {
            btn.href = 'file:///C:/Users/prova/Desktop/Adriauto F.M. C5/Esercizi/' + val;
        } else if (/^[a-zA-Z]:[\\/]/.test(val)) {
            // Percorso Windows assoluto (es. C:\cartella\file.pdf)
            let formattedPath = val.replace(/\\/g, '/');
            btn.href = 'file:///' + formattedPath;
        } else {
            // Qualsiasi altra risorsa (link web http/https o percorsi relativi standard)
            btn.href = val;
        }
        btn.style.display = 'inline';
    } else {
        btn.style.display = 'none';
    }
};

// IndexedDB helper to persist directory handle for automatic saving
const DB_NAME = 'futsal_directory_db';
const STORE_NAME = 'handles';
const KEY_NAME = 'training_dir';

function getDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

async function saveDirectoryHandle(handle) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const req = store.put(handle, KEY_NAME);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    } catch (err) {
        console.error("IndexedDB error saving directory handle:", err);
    }
}

async function getDirectoryHandle() {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(KEY_NAME);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    } catch (err) {
        console.error("IndexedDB error getting directory handle:", err);
        return null;
    }
}

function getWeekMonday(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const d = new Date(year, month, day);
    if (isNaN(d.getTime())) return null;
    const dayOfWeek = d.getDay();
    const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(year, month, diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
}

function renderTrainingProgramList() {
    const listContainer = document.getElementById('training-sessions-list');
    if (!listContainer) return;
    
    const sortOrderEl = document.getElementById('training-sort-order');
    const sortOrder = sortOrderEl ? sortOrderEl.value : 'asc';
    
    const trainingsList = (typeof trainings !== 'undefined' && Array.isArray(trainings)) ? trainings : [];
    const convocationsList = (typeof convocations !== 'undefined' && Array.isArray(convocations)) ? convocations : [];

    const unifiedItems = [];
    trainingsList.forEach(t => {
        if (t && t.date) {
            unifiedItems.push({
                date: t.date,
                isMatch: false,
                raw: t
            });
        }
    });

    convocationsList.forEach(c => {
        if (c && c.date) {
            unifiedItems.push({
                date: c.date,
                isMatch: true,
                raw: c
            });
        }
    });

    if (unifiedItems.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Nessun evento o seduta di allenamento registrato. Clicca su "+ Nuova Seduta" per iniziare.</p>';
        return;
    }

    const itemsWithMonday = unifiedItems.map(item => {
        const monday = getWeekMonday(item.date);
        return { ...item, monday };
    }).filter(item => item.monday !== null);

    if (itemsWithMonday.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Nessuna seduta o gara con data valida.</p>';
        return;
    }

    let minMondayTime = Infinity;
    itemsWithMonday.forEach(item => {
        if (item.monday.getTime() < minMondayTime) {
            minMondayTime = item.monday.getTime();
        }
    });

    const weeksMap = new Map();
    itemsWithMonday.forEach(item => {
        const key = item.monday.getTime();
        if (!weeksMap.has(key)) {
            weeksMap.set(key, { monday: item.monday, items: [] });
        }
        weeksMap.get(key).items.push(item);
    });

    const weekGroups = Array.from(weeksMap.values());
    weekGroups.sort((a, b) => {
        return sortOrder === 'desc' ? b.monday - a.monday : a.monday - b.monday;
    });

    const dayNamesShort = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

    let html = '';
    weekGroups.forEach(group => {
        const weekNum = Math.round((group.monday.getTime() - minMondayTime) / (7 * 24 * 3600 * 1000)) + 1;
        
        const sunday = new Date(group.monday.getTime() + 6 * 24 * 3600 * 1000);
        const startStr = `${String(group.monday.getDate()).padStart(2, '0')}/${String(group.monday.getMonth() + 1).padStart(2, '0')}`;
        const endStr = `${String(sunday.getDate()).padStart(2, '0')}/${String(sunday.getMonth() + 1).padStart(2, '0')}/${sunday.getFullYear()}`;

        const itemsByDate = {};
        group.items.forEach(item => {
            if (!itemsByDate[item.date]) {
                itemsByDate[item.date] = [];
            }
            itemsByDate[item.date].push(item);
        });

        const dayIndices = sortOrder === 'desc' ? [6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6];

        let weekCardsHtml = '';
        dayIndices.forEach(d => {
            const curDate = new Date(group.monday.getTime() + d * 24 * 3600 * 1000);
            const yyyy = curDate.getFullYear();
            const mm = String(curDate.getMonth() + 1).padStart(2, '0');
            const dd = String(curDate.getDate()).padStart(2, '0');
            const dateKey = `${yyyy}-${mm}-${dd}`;
            const dateStr = `${dd}/${mm}/${yyyy}`;
            const dayName = dayNamesShort[d];

            const dayItems = itemsByDate[dateKey] || [];

            if (dayItems.length > 0) {
                dayItems.forEach(item => {
                    if (item.isMatch) {
                        const c = item.raw;
                        const isFriendly = c.type === 'friendly';
                        const eventBadge = isFriendly
                            ? `<span style="font-size: 0.72rem; padding: 2px 7px; border-radius: 4px; background: #f59e0b; color: #ffffff; font-weight: 800; box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);">🤝 Amichevole</span>`
                            : `<span style="font-size: 0.72rem; padding: 2px 7px; border-radius: 4px; background: #ef4444; color: #ffffff; font-weight: 800; box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);">🏆 Gara</span>`;

                        let locationVal = '';
                        if (c.opponent && c.opponent.endsWith('(C)')) locationVal = 'C';
                        else if (c.opponent && c.opponent.endsWith('(T)')) locationVal = 'T';
                        else if (c.opponent && c.opponent.endsWith('(S)')) locationVal = 'S';
                        
                        let logisticBadge = '';
                        if (locationVal) {
                            let label = locationVal === 'C' ? 'Casa' : (locationVal === 'T' ? 'Trasferta' : 'Spiaggia');
                            let icon = locationVal === 'C' ? '🏠' : (locationVal === 'T' ? '🚌' : '🏖️');
                            let valClass = locationVal === 'C' ? 'casa' : (locationVal === 'T' ? 'trasferta' : 'spiaggia');
                            logisticBadge = `<span class="logistic-badge" style="margin-left: 0.3rem; font-size: 0.7rem; padding: 1px 4px; border-radius: 4px; border: 1px solid currentColor; display: inline-flex; align-items: center; gap: 2px;" data-logistic="${valClass}">${icon} ${label}</span>`;
                        }

                        const myTeamName = localStorage.getItem('futsal_my_team_name') || 'Adriauto F.M. C5';
                        const cleanOpponent = c.opponent ? c.opponent.replace(/\s*\([CTS]\)$/, '') : 'Gara';
                        const convocatiCount = (c.selectedIds && Array.isArray(c.selectedIds)) ? c.selectedIds.length : 0;

                        const rawMatchTitle = locationVal === 'T'
                            ? `${cleanOpponent} vs ${myTeamName}`
                            : `${myTeamName} vs ${cleanOpponent}`;

                        const matchTitle = locationVal === 'T'
                            ? `${escapeHTML(cleanOpponent)} vs ${escapeHTML(myTeamName)}`
                            : `${escapeHTML(myTeamName)} vs ${escapeHTML(cleanOpponent)}`;

                        const cardStyle = isFriendly
                            ? 'background: linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(180, 83, 9, 0.15)); border: 1.5px solid #f59e0b; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.25);'
                            : 'background: linear-gradient(135deg, rgba(239, 68, 68, 0.22), rgba(153, 27, 27, 0.15)); border: 1.5px solid #ef4444; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.25);';

                        weekCardsHtml += `
                            <div class="glass-panel" style="padding: 0.85rem 1rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: 0.2s; ${cardStyle}" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'" onclick="if(window.switchTabTo){ window.switchTabTo('tab-attendance', 'subtab-matches'); if(window.viewDistinta) window.viewDistinta(${c.id}); }">
                                <div>
                                    <div style="font-size: 0.78rem; font-weight: bold; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                        <span style="display: flex; align-items: center; gap: 0.2rem; color: #fff;">📅 ${dayName} ${dateStr}${logisticBadge}</span>
                                        ${eventBadge}
                                    </div>
                                    <h4 style="margin: 0 0 0.35rem 0; font-size: 0.88rem; font-weight: 800; color: ${isFriendly ? '#fde047' : '#fca5a5'}; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 1px 4px ${isFriendly ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'};" title="${escapeHTML(rawMatchTitle)}">⚽ ${matchTitle}</h4>
                                    <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.3;">
                                        <span style="display:inline-block; font-weight:600; color:#ffffff;">👥 Convocati: ${convocatiCount}</span>
                                    </div>
                                    ${c.notes ? `<div style="font-size: 0.74rem; color: var(--color-tatt); margin-top: 0.35rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${escapeHTML(c.notes)}">📝 ${escapeHTML(c.notes.substring(0, 35))}${c.notes.length > 35 ? '...' : ''}</div>` : ''}
                                </div>
                            </div>
                        `;
                    } else {
                        const t = item.raw;
                        let typeStr = t.type || 'Allenamento';
                        if (typeStr === 'Allenamento Tabellone' || typeStr === 'Allenamento tabellone') {
                            typeStr = 'Allenamento';
                        }
                        
                        let totalMins = 0;
                        if (t.warmup && t.warmup.mins) totalMins += parseInt(t.warmup.mins) || 0;
                        if (t.athleticPhase && t.athleticPhase.mins) totalMins += parseInt(t.athleticPhase.mins) || 0;
                        if (t.mainPhase && t.mainPhase.mins) totalMins += parseInt(t.mainPhase.mins) || 0;
                        if (t.main2Phase && t.main2Phase.mins) totalMins += parseInt(t.main2Phase.mins) || 0;
                        if (t.finalPhase && t.finalPhase.mins) totalMins += parseInt(t.finalPhase.mins) || 0;

                        let preview = '';
                        if (t.warmup && t.warmup.desc) preview += `<span style="margin-right:0.5rem; display:inline-block;">🔥 Risc: ${t.warmup.mins || '?'}m</span>`;
                        if (t.athleticPhase && t.athleticPhase.desc) preview += `<span style="margin-right:0.5rem; display:inline-block;">🏃 Atl: ${t.athleticPhase.mins || '?'}m</span>`;
                        
                        let mainMins = 0;
                        let hasMain = false;
                        if (t.mainPhase && t.mainPhase.desc) {
                            mainMins += parseInt(t.mainPhase.mins) || 0;
                            hasMain = true;
                        }
                        if (t.main2Phase && t.main2Phase.desc) {
                            mainMins += parseInt(t.main2Phase.mins) || 0;
                            hasMain = true;
                        }
                        if (hasMain) preview += `<span style="margin-right:0.5rem; display:inline-block;">⚽ Cent: ${mainMins || '?'}m</span>`;
                        
                        if (t.finalPhase && t.finalPhase.desc) preview += `<span style="margin-right:0.5rem; display:inline-block;">🏃 Defat: ${t.finalPhase.mins || '?'}m</span>`;
                        
                        if (totalMins > 0) preview += `<span style="display:inline-block; font-weight:600; color:var(--color-coach);">⏱️ Tot: ${totalMins}m</span>`;

                        let logisticBadge = '';
                        if (t.logistic) {
                            let label = '';
                            let icon = '';
                            if (t.logistic === 'spiaggia') { label = 'Spiaggia'; icon = '🏖️'; }
                            else if (t.logistic === 'casa') { label = 'Casa'; icon = '🏠'; }
                            else if (t.logistic === 'trasferta') { label = 'Trasferta'; icon = '🚌'; }
                            
                            if (label) {
                                logisticBadge = `<span class="logistic-badge" style="margin-left: 0.3rem; font-size: 0.7rem; padding: 1px 4px; border-radius: 4px; border: 1px solid currentColor; display: inline-flex; align-items: center; gap: 2px;" data-logistic="${t.logistic}">${icon} ${label}</span>`;
                            }
                        }

                        weekCardsHtml += `
                            <div class="glass-panel" style="padding: 0.85rem 1rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'" onclick="openTrainingForm('${t.date}')">
                                <div>
                                    <div style="font-size: 0.78rem; color: var(--color-coach); font-weight: bold; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                        <span style="display: flex; align-items: center; gap: 0.2rem;">📅 ${dayName} ${dateStr}${logisticBadge}</span>
                                    </div>
                                    <h4 style="margin: 0 0 0.35rem 0; font-size: 1.05rem; color: #fff; line-height: 1.2;">${typeStr}</h4>
                                    <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.3;">${preview || 'Nessun dettaglio inserito'}</div>
                                    ${t.notes ? `<div style="font-size: 0.74rem; color: var(--color-tatt); margin-top: 0.35rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${t.notes.replace(/"/g, '&quot;')}">📝 ${t.notes.substring(0, 35)}${t.notes.length > 35 ? '...' : ''}</div>` : ''}
                                </div>
                            </div>
                        `;
                    }
                });
            } else {
                weekCardsHtml += `
                    <div class="glass-panel" style="padding: 0.85rem 1rem; display: flex; flex-direction: column; justify-content: space-between; border: 1px dashed rgba(255, 255, 255, 0.15); opacity: 0.75; background: rgba(255, 255, 255, 0.02);">
                        <div>
                            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: bold; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                                <span>📅 ${dayName} ${dateStr}</span>
                                <span style="font-size: 0.7rem; padding: 1px 5px; border-radius: 4px; background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); font-weight: bold;">🛌 Riposo</span>
                            </div>
                            <h4 style="margin: 0 0 0.35rem 0; font-size: 1.05rem; color: #94a3b8; line-height: 1.2;">Riposo</h4>
                            <div style="font-size: 0.78rem; color: rgba(255,255,255,0.4); line-height: 1.3;">Nessuna attività in programma</div>
                        </div>
                    </div>
                `;
            }
        });

        html += `
            <div class="training-week-section">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; border-bottom: 1px solid rgba(56, 189, 248, 0.25); padding-bottom: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <h3 style="margin: 0; color: #38bdf8; font-size: 1.1rem; font-weight: 800; display: flex; align-items: center; gap: 0.35rem; letter-spacing: 0.3px;">
                            📋 Settimana ${weekNum}
                        </h3>
                        <span style="color: #38bdf8; font-size: 0.78rem; background: rgba(56, 189, 248, 0.12); font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.3);">
                            dal ${startStr} al ${endStr}
                        </span>
                    </div>
                    <span style="font-size: 0.78rem; font-weight: 600; color: #94a3b8; background: rgba(255,255,255,0.05); padding: 0.15rem 0.55rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08);">
                        ${group.items.length} event${group.items.length === 1 ? 'o' : 'i'}
                    </span>
                </div>
                <div class="training-week-grid">
                    ${weekCardsHtml}
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;
}

window.updateQuartetAbsenceAlert = function(phaseKey) {
    const quartetEl = document.getElementById(`training-${phaseKey}-quartet`);
    const infoEl = document.getElementById(`training-${phaseKey}-quartet-info`);
    const dateInput = document.getElementById('training-date');
    if (!quartetEl || !infoEl) return;

    const qVal = quartetEl.value;
    if (!qVal) {
        infoEl.style.display = 'none';
        infoEl.innerHTML = '';
        return;
    }

    const dateStr = dateInput ? dateInput.value : '';
    const session = (window.trainings || []).find(t => t.date === dateStr);
    const playersList = window.players || [];

    const norm = (s) => (s || '').toString().toLowerCase().replace(/[°º]/g, '').trim();

    let qFieldPlayers = [];
    if (qVal.includes('Tutti')) {
        qFieldPlayers = playersList.filter(p => p.quartets && p.quartets !== '' && p.quartets !== 'Nessuno' && p.role !== 'Portiere' && p.role !== 'POR');
    } else {
        const prefix = qVal.split(' ')[0];
        qFieldPlayers = playersList.filter(p => {
            if (!p.quartets) return false;
            return norm(p.quartets).includes(norm(prefix)) || norm(p.quartets) === norm(qVal);
        });
    }

    // Include goalkeepers
    const goalkeepers = playersList.filter(p => p.role === 'Portiere' || p.role === 'POR');
    const totalUnit = [...qFieldPlayers, ...goalkeepers];

    if (totalUnit.length === 0) {
        infoEl.style.display = 'block';
        infoEl.style.background = 'rgba(255, 255, 255, 0.05)';
        infoEl.style.border = '1px solid rgba(255, 255, 255, 0.15)';
        infoEl.style.color = 'var(--text-muted)';
        infoEl.innerHTML = `ℹ️ Nessun giocatore ancora assegnato al <strong>${escapeHTML(qVal)}</strong> nei Quartetti di Rotazione.`;
        return;
    }

    const absentPlayers = [];
    const presentPlayers = [];

    totalUnit.forEach(p => {
        const st = (session && session.roster && session.roster[p.id] !== undefined) ? session.roster[p.id] : 'P';
        const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
        if (st === 'A' || st === 'I' || st === 'G') {
            const reason = st === 'A' ? 'Assente' : (st === 'I' ? 'Infortunato' : 'Giustificato');
            absentPlayers.push(`${pName} (${p.role || 'Giocatore'} - ${reason})`);
        } else {
            presentPlayers.push(`${pName} (${p.role || 'Giocatore'})`);
        }
    });

    infoEl.style.display = 'block';
    if (absentPlayers.length > 0) {
        infoEl.style.background = 'rgba(239, 68, 68, 0.14)';
        infoEl.style.border = '1px solid rgba(239, 68, 68, 0.4)';
        infoEl.style.color = '#fca5a5';

        const benchPlayers = playersList.filter(p => (!p.quartets || p.quartets === '' || p.quartets === 'Nessuno') && (!session || !session.roster || session.roster[p.id] === 'P' || session.roster[p.id] === undefined));
        const benchNames = benchPlayers.map(p => window.getInvertedName ? window.getInvertedName(p.name) : p.name).slice(0, 4).join(', ');

        infoEl.innerHTML = `
            <div style="font-weight:700; margin-bottom:0.2rem;">⚠️ Assenti nel ${escapeHTML(qVal.split(' ')[0])} + Portiere (${absentPlayers.length}/${totalUnit.length}):</div>
            <div>• <strong style="color:#ef4444;">${escapeHTML(absentPlayers.join(', '))}</strong></div>
            ${benchNames ? `<div style="margin-top:0.25rem; font-size:0.72rem; color:var(--text-secondary);">💡 Sostituti disponibili in panchina: ${escapeHTML(benchNames)}</div>` : ''}
        `;
    } else {
        infoEl.style.background = 'rgba(34, 197, 94, 0.14)';
        infoEl.style.border = '1px solid rgba(34, 197, 94, 0.4)';
        infoEl.style.color = '#86efac';
        infoEl.innerHTML = `✅ <strong>${escapeHTML(qVal.split(' ')[0])} + Portiere Al Completo:</strong> Tutti i ${totalUnit.length} giocatori (${presentPlayers.join(', ')}) presenti.`;
    }
};

window.updateAllQuartetAbsenceAlerts = function() {
    ['warmup', 'athletic', 'main', 'main2', 'final'].forEach(key => window.updateQuartetAbsenceAlert(key));
};

window.renderQuartetDropdowns = function() {
    const playersList = (typeof players !== 'undefined' && Array.isArray(players) && players.length > 0) ? players : (window.players || []);
    const dateStr = document.getElementById('training-date')?.value || '';
    
    // Find attendance roster for current training date
    let roster = {};
    let session = null;
    if (dateStr && window.trainings) {
        session = window.trainings.find(t => t.date === dateStr);
        if (session && session.roster) roster = session.roster;
    }

    const phases = [
        { name: 'main', keys: ['main-q1', 'main-q2', 'main-q3'] },
        { name: 'main2', keys: ['main2-q1', 'main2-q2', 'main2-q3'] },
        { name: 'final', keys: ['final-q1', 'final-q2', 'final-q3'] }
    ];

    phases.forEach(phase => {
        // Collect current selections across all slots of all quartets in this phase
        const phaseSelections = {};
        const selectedInPhase = [];

        phase.keys.forEach(qKey => {
            for (let s = 1; s <= 5; s++) {
                const slotId = `training-${qKey}-slot-${s}`;
                const el = document.getElementById(slotId);
                let val = '';
                if (el) {
                    if (el.dataset.pendingVal !== undefined) {
                        val = el.dataset.pendingVal;
                    } else {
                        val = el.value || '';
                    }
                }
                val = (val || '').trim();
                phaseSelections[slotId] = val;
                if (val) {
                    selectedInPhase.push({ slotId, val: val.toLowerCase() });
                }
            }
        });

        // Populate options for each slot in this phase
        phase.keys.forEach(qKey => {
            for (let s = 1; s <= 5; s++) {
                const slotId = `training-${qKey}-slot-${s}`;
                const el = document.getElementById(slotId);
                if (!el) continue;

                const curVal = (phaseSelections[slotId] || '').trim();
                const curValNorm = curVal.toLowerCase();

                // Other slot selections in the SAME PHASE
                const otherValsInPhase = selectedInPhase
                    .filter(item => item.slotId !== slotId)
                    .map(item => item.val);

                let html = `<option value="">-- Slot ${s}: Seleziona Giocatore --</option>`;

                playersList.forEach(p => {
                    const pName = window.getInvertedName ? window.getInvertedName(p.name) : p.name;
                    const pId = String(p.id);
                    const normName = String(pName).trim().toLowerCase();
                    const rawName = String(p.name).trim().toLowerCase();
                    
                    const st = roster[p.id] !== undefined ? roster[p.id] : roster[pId];
                    const isAbsent = (st === 'A' || st === 'G' || st === 'I');

                    const isCurrentChoice = (
                        curValNorm === pId.toLowerCase() ||
                        curValNorm === normName ||
                        curValNorm === rawName
                    );

                    const isSelectedInSamePhase = otherValsInPhase.some(v => 
                        v === pId.toLowerCase() || v === normName || v === rawName
                    );

                    let label = `#${p.number || ''} ${pName}`;
                    if (p.role) label += ` (${p.role})`;

                    let disAttr = '';
                    if (isAbsent) {
                        label += ` (A)`;
                        disAttr = 'disabled="disabled" style="color:#ef4444;"';
                    } else if (isSelectedInSamePhase && !isCurrentChoice) {
                        label += ` (In uso)`;
                        disAttr = 'disabled="disabled" style="color:var(--text-muted);"';
                    }

                    const selAttr = isCurrentChoice ? 'selected="selected"' : '';

                    html += `<option value="${escapeHTML(pName)}" ${selAttr} ${disAttr}>${escapeHTML(label)}</option>`;
                });

                el.innerHTML = html;
                delete el.dataset.pendingVal;
            }
        });
    });
};

function populateQuartetSlots(qKey, quartetStr) {
    const parts = quartetStr ? String(quartetStr).split(/\s*(?:,| - | -|-)\s*/).filter(Boolean) : [];
    for (let s = 1; s <= 5; s++) {
        const el = document.getElementById(`training-${qKey}-slot-${s}`);
        if (el) {
            el.dataset.pendingVal = parts[s - 1] || '';
        }
    }
}

function getQuartetStringFromSlots(qKey) {
    const names = [];
    for (let s = 1; s <= 5; s++) {
        const el = document.getElementById(`training-${qKey}-slot-${s}`);
        const val = el ? el.value.trim() : '';
        if (val) names.push(val);
    }
    return names.join(' - ');
}

function openTrainingForm(dateStr = '') {
    document.getElementById('training-sessions-list').style.display = 'none';
    const formContainer = document.getElementById('training-session-form-container');
    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    const popup = document.getElementById('board-tools-popup');
    if (popup) popup.style.display = 'none'; // Nascondiamo di default finché non si seleziona un campo
    
    const formTitle = document.getElementById('training-form-title');
    const dateInput = document.getElementById('training-date');
    
    if (dateStr) {
        formTitle.textContent = 'Scheda Allenamento';
        dateInput.value = dateStr;
        dateInput.readOnly = true; 
        
        const t = trainings.find(tr => tr.date === dateStr);
        if (t) {
            document.getElementById('training-id').value = t.id || '';
            document.getElementById('training-type').value = t.type || '';
            const logisticEl = document.getElementById('training-logistic');
            if (logisticEl) logisticEl.value = t.logistic || '';
            
            document.getElementById('training-warmup').value = (t.warmup && t.warmup.desc) || '';
            document.getElementById('training-warmup-mins').value = (t.warmup && t.warmup.mins) || '';
            document.getElementById('training-warmup-link').value = (t.warmup && t.warmup.link) || '';

            document.getElementById('training-main').value = (t.mainPhase && t.mainPhase.desc) || '';
            document.getElementById('training-main-mins').value = (t.mainPhase && t.mainPhase.mins) || '';
            document.getElementById('training-main-link').value = (t.mainPhase && t.mainPhase.link) || '';

            document.getElementById('training-athletic').value = (t.athleticPhase && t.athleticPhase.desc) || '';
            document.getElementById('training-athletic-mins').value = (t.athleticPhase && t.athleticPhase.mins) || '';
            document.getElementById('training-athletic-link').value = (t.athleticPhase && t.athleticPhase.link) || '';

            document.getElementById('training-main2').value = (t.main2Phase && t.main2Phase.desc) || '';
            document.getElementById('training-main2-mins').value = (t.main2Phase && t.main2Phase.mins) || '';
            document.getElementById('training-main2-link').value = (t.main2Phase && t.main2Phase.link) || '';

            document.getElementById('training-final').value = (t.finalPhase && t.finalPhase.desc) || '';
            document.getElementById('training-final-mins').value = (t.finalPhase && t.finalPhase.mins) || '';
            document.getElementById('training-final-link').value = (t.finalPhase && t.finalPhase.link) || '';

            populateQuartetSlots('main-q1', (t.mainPhase && t.mainPhase.quartet1) || t.quartet1 || '');
            populateQuartetSlots('main-q2', (t.mainPhase && t.mainPhase.quartet2) || t.quartet2 || '');
            populateQuartetSlots('main-q3', (t.mainPhase && t.mainPhase.quartet3) || t.quartet3 || '');

            populateQuartetSlots('main2-q1', (t.main2Phase && t.main2Phase.quartet1) || '');
            populateQuartetSlots('main2-q2', (t.main2Phase && t.main2Phase.quartet2) || '');
            populateQuartetSlots('main2-q3', (t.main2Phase && t.main2Phase.quartet3) || '');

            populateQuartetSlots('final-q1', (t.finalPhase && t.finalPhase.quartet1) || '');
            populateQuartetSlots('final-q2', (t.finalPhase && t.finalPhase.quartet2) || '');
            populateQuartetSlots('final-q3', (t.finalPhase && t.finalPhase.quartet3) || '');

            window.renderQuartetDropdowns();

            document.getElementById('training-notes').value = t.notes || '';
            
            updateLinkButton('training-warmup-link');
            updateLinkButton('training-athletic-link');
            updateLinkButton('training-main-link');
            updateLinkButton('training-main2-link');
            updateLinkButton('training-final-link');
            
            if (!window.trainingBoardsState) window.trainingBoardsState = {};
            window.trainingBoardsState['board-warmup-full'] = t.warmup && t.warmup.boardFull ? JSON.parse(JSON.stringify(t.warmup.boardFull)) : [];
            window.trainingBoardsState['board-warmup-half'] = t.warmup && t.warmup.boardHalf ? JSON.parse(JSON.stringify(t.warmup.boardHalf)) : [];
            window.trainingBoardsState['board-athletic-full'] = t.athleticPhase && t.athleticPhase.boardFull ? JSON.parse(JSON.stringify(t.athleticPhase.boardFull)) : [];
            window.trainingBoardsState['board-athletic-half'] = t.athleticPhase && t.athleticPhase.boardHalf ? JSON.parse(JSON.stringify(t.athleticPhase.boardHalf)) : [];
            window.trainingBoardsState['board-mainPhase-full'] = t.mainPhase && t.mainPhase.boardFull ? JSON.parse(JSON.stringify(t.mainPhase.boardFull)) : [];
            window.trainingBoardsState['board-mainPhase-half'] = t.mainPhase && t.mainPhase.boardHalf ? JSON.parse(JSON.stringify(t.mainPhase.boardHalf)) : [];
            window.trainingBoardsState['board-main2Phase-full'] = t.main2Phase && t.main2Phase.boardFull ? JSON.parse(JSON.stringify(t.main2Phase.boardFull)) : [];
            window.trainingBoardsState['board-main2Phase-half'] = t.main2Phase && t.main2Phase.boardHalf ? JSON.parse(JSON.stringify(t.main2Phase.boardHalf)) : [];
            window.trainingBoardsState['board-finalPhase-full'] = t.finalPhase && t.finalPhase.boardFull ? JSON.parse(JSON.stringify(t.finalPhase.boardFull)) : [];
            window.trainingBoardsState['board-finalPhase-half'] = t.finalPhase && t.finalPhase.boardHalf ? JSON.parse(JSON.stringify(t.finalPhase.boardHalf)) : [];
            
            if(window.renderInlineBoard) {
                window.renderInlineBoard('board-warmup-full');
                window.renderInlineBoard('board-warmup-half');
                window.renderInlineBoard('board-athletic-full');
                window.renderInlineBoard('board-athletic-half');
                window.renderInlineBoard('board-mainPhase-full');
                window.renderInlineBoard('board-mainPhase-half');
                window.renderInlineBoard('board-main2Phase-full');
                window.renderInlineBoard('board-main2Phase-half');
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
        const logisticEl = document.getElementById('training-logistic');
        if (logisticEl) logisticEl.value = '';
        document.getElementById('training-warmup').value = '';
        document.getElementById('training-warmup-mins').value = '';
        document.getElementById('training-warmup-link').value = '';

        document.getElementById('training-main').value = '';
        document.getElementById('training-main-mins').value = '';
        document.getElementById('training-main-link').value = '';

        document.getElementById('training-athletic').value = '';
        document.getElementById('training-athletic-mins').value = '';
        document.getElementById('training-athletic-link').value = '';

        document.getElementById('training-main2').value = '';
        document.getElementById('training-main2-mins').value = '';
        document.getElementById('training-main2-link').value = '';

        document.getElementById('training-final').value = '';
        document.getElementById('training-final-mins').value = '';
        document.getElementById('training-final-link').value = '';

        ['main-q1', 'main-q2', 'main-q3', 'main2-q1', 'main2-q2', 'main2-q3', 'final-q1', 'final-q2', 'final-q3'].forEach(p => populateQuartetSlots(p, ''));
        window.renderQuartetDropdowns();

        document.getElementById('training-notes').value = '';
        
        updateLinkButton('training-warmup-link');
        updateLinkButton('training-athletic-link');
        updateLinkButton('training-main-link');
        updateLinkButton('training-main2-link');
        updateLinkButton('training-final-link');
        
        if (!window.trainingBoardsState) window.trainingBoardsState = {};
        window.trainingBoardsState['board-warmup-full'] = [];
        window.trainingBoardsState['board-warmup-half'] = [];
        window.trainingBoardsState['board-athletic-full'] = [];
        window.trainingBoardsState['board-athletic-half'] = [];
        window.trainingBoardsState['board-mainPhase-full'] = [];
        window.trainingBoardsState['board-mainPhase-half'] = [];
        window.trainingBoardsState['board-main2Phase-full'] = [];
        window.trainingBoardsState['board-main2Phase-half'] = [];
        window.trainingBoardsState['board-finalPhase-full'] = [];
        window.trainingBoardsState['board-finalPhase-half'] = [];
        
        if(window.renderInlineBoard) {
            window.renderInlineBoard('board-warmup-full');
            window.renderInlineBoard('board-warmup-half');
            window.renderInlineBoard('board-athletic-full');
            window.renderInlineBoard('board-athletic-half');
            window.renderInlineBoard('board-mainPhase-full');
            window.renderInlineBoard('board-mainPhase-half');
            window.renderInlineBoard('board-main2Phase-full');
            window.renderInlineBoard('board-main2Phase-half');
            window.renderInlineBoard('board-finalPhase-full');
            window.renderInlineBoard('board-finalPhase-half');
        }
    }

    updateAllQuartetAbsenceAlerts();
}

function closeTrainingForm() {
    document.getElementById('training-session-form-container').style.display = 'none';
    document.getElementById('training-sessions-list').style.display = 'flex';
    const popup = document.getElementById('board-tools-popup');
    if (popup) popup.style.display = 'none';
}

async function saveTrainingSession() {
    const dateStr = document.getElementById('training-date').value;
    if (!dateStr) {
        if(window.showToast) window.showToast("Inserire una data valida.", "error");
        return;
    }
    
    const type = document.getElementById('training-type').value.trim();
    const logisticEl = document.getElementById('training-logistic');
    const logistic = logisticEl ? logisticEl.value : '';
    const warmupDesc = document.getElementById('training-warmup').value.trim();
    const warmupMins = document.getElementById('training-warmup-mins').value;
    const warmupLink = document.getElementById('training-warmup-link').value.trim();

    const athleticDesc = document.getElementById('training-athletic').value.trim();
    const athleticMins = document.getElementById('training-athletic-mins').value;
    const athleticLink = document.getElementById('training-athletic-link').value.trim();

    const mainDesc = document.getElementById('training-main').value.trim();
    const mainMins = document.getElementById('training-main-mins').value;
    const mainLink = document.getElementById('training-main-link').value.trim();

    const main2Desc = document.getElementById('training-main2').value.trim();
    const main2Mins = document.getElementById('training-main2-mins').value;
    const main2Link = document.getElementById('training-main2-link').value.trim();

    const finalDesc = document.getElementById('training-final').value.trim();
    const finalMins = document.getElementById('training-final-mins').value;
    const finalLink = document.getElementById('training-final-link').value.trim();

    const mainQuartet1 = getQuartetStringFromSlots('main-q1');
    const mainQuartet2 = getQuartetStringFromSlots('main-q2');
    const mainQuartet3 = getQuartetStringFromSlots('main-q3');

    const main2Quartet1 = getQuartetStringFromSlots('main2-q1');
    const main2Quartet2 = getQuartetStringFromSlots('main2-q2');
    const main2Quartet3 = getQuartetStringFromSlots('main2-q3');

    const finalQuartet1 = getQuartetStringFromSlots('final-q1');
    const finalQuartet2 = getQuartetStringFromSlots('final-q2');
    const finalQuartet3 = getQuartetStringFromSlots('final-q3');

    const notes = document.getElementById('training-notes').value.trim();
    
    let tIndex = trainings.findIndex(tr => tr.date === dateStr);
    
    const warmupBoardFull = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-warmup-full'] || [])) : [];
    const warmupBoardHalf = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-warmup-half'] || [])) : [];
    
    const athleticBoardFull = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-athletic-full'] || [])) : [];
    const athleticBoardHalf = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-athletic-half'] || [])) : [];
    
    const mainBoardFull = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-mainPhase-full'] || [])) : [];
    const mainBoardHalf = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-mainPhase-half'] || [])) : [];

    const main2BoardFull = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-main2Phase-full'] || [])) : [];
    const main2BoardHalf = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-main2Phase-half'] || [])) : [];
    
    const finalBoardFull = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-finalPhase-full'] || [])) : [];
    const finalBoardHalf = window.trainingBoardsState ? JSON.parse(JSON.stringify(window.trainingBoardsState['board-finalPhase-half'] || [])) : [];

    let sessionToSave;
    if (tIndex !== -1) {
        trainings[tIndex].type = type;
        if (logistic) {
            trainings[tIndex].logistic = logistic;
        } else {
            delete trainings[tIndex].logistic;
        }
        trainings[tIndex].warmup = { desc: warmupDesc, mins: warmupMins, link: warmupLink, boardFull: warmupBoardFull, boardHalf: warmupBoardHalf };
        trainings[tIndex].athleticPhase = { desc: athleticDesc, mins: athleticMins, link: athleticLink, boardFull: athleticBoardFull, boardHalf: athleticBoardHalf };
        trainings[tIndex].mainPhase = { desc: mainDesc, mins: mainMins, link: mainLink, boardFull: mainBoardFull, boardHalf: mainBoardHalf, quartet1: mainQuartet1, quartet2: mainQuartet2, quartet3: mainQuartet3 };
        trainings[tIndex].main2Phase = { desc: main2Desc, mins: main2Mins, link: main2Link, boardFull: main2BoardFull, boardHalf: main2BoardHalf, quartet1: main2Quartet1, quartet2: main2Quartet2, quartet3: main2Quartet3 };
        trainings[tIndex].finalPhase = { desc: finalDesc, mins: finalMins, link: finalLink, boardFull: finalBoardFull, boardHalf: finalBoardHalf, quartet1: finalQuartet1, quartet2: finalQuartet2, quartet3: finalQuartet3 };
        trainings[tIndex].quartet1 = mainQuartet1 || main2Quartet1 || finalQuartet1 || '';
        trainings[tIndex].quartet2 = mainQuartet2 || main2Quartet2 || finalQuartet2 || '';
        trainings[tIndex].quartet3 = mainQuartet3 || main2Quartet3 || finalQuartet3 || '';
        trainings[tIndex].notes = notes;
        sessionToSave = trainings[tIndex];
    } else {
        const newSession = {
            id: Date.now(),
            date: dateStr,
            type: type || 'Allenamento',
            ...(logistic ? { logistic: logistic } : {}),
            roster: {}, 
            warmup: { desc: warmupDesc, mins: warmupMins, link: warmupLink, boardFull: warmupBoardFull, boardHalf: warmupBoardHalf },
            athleticPhase: { desc: athleticDesc, mins: athleticMins, link: athleticLink, boardFull: athleticBoardFull, boardHalf: athleticBoardHalf },
            mainPhase: { desc: mainDesc, mins: mainMins, link: mainLink, boardFull: mainBoardFull, boardHalf: mainBoardHalf, quartet1: mainQuartet1, quartet2: mainQuartet2, quartet3: mainQuartet3 },
            main2Phase: { desc: main2Desc, mins: main2Mins, link: main2Link, boardFull: main2BoardFull, boardHalf: main2BoardHalf, quartet1: main2Quartet1, quartet2: main2Quartet2, quartet3: main2Quartet3 },
            finalPhase: { desc: finalDesc, mins: finalMins, link: finalLink, boardFull: finalBoardFull, boardHalf: finalBoardHalf, quartet1: finalQuartet1, quartet2: finalQuartet2, quartet3: finalQuartet3 },
            quartet1: mainQuartet1 || main2Quartet1 || finalQuartet1 || '',
            quartet2: mainQuartet2 || main2Quartet2 || finalQuartet2 || '',
            quartet3: mainQuartet3 || main2Quartet3 || finalQuartet3 || '',
            notes: notes
        };
        trainings.push(newSession);
        trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
        sessionToSave = newSession;
    }
    
    localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
    
    let savedSuccessfully = false;
    
    // Prova ad usare le File System Access API se supportate
    if (window.showDirectoryPicker) {
        try {
            let directoryHandle = await getDirectoryHandle();
            let hasPermission = false;
            
            if (directoryHandle) {
                // Controlla se abbiamo già i permessi di scrittura
                const status = await directoryHandle.queryPermission({ mode: 'readwrite' });
                if (status === 'granted') {
                    hasPermission = true;
                } else if (status === 'prompt') {
                    const reqStatus = await directoryHandle.requestPermission({ mode: 'readwrite' });
                    if (reqStatus === 'granted') {
                        hasPermission = true;
                    }
                }
            }
            
            if (!hasPermission) {
                if (confirm("Per salvare in automatico le schede di allenamento, seleziona la cartella 'schede di allenamento' sul tuo computer.")) {
                    directoryHandle = await window.showDirectoryPicker();
                    await saveDirectoryHandle(directoryHandle);
                    hasPermission = true;
                }
            }
            
            if (hasPermission && directoryHandle) {
                const filename = "scheda_allenamento_" + dateStr + ".json";
                const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(JSON.stringify(sessionToSave, null, 2));
                await writable.close();
                savedSuccessfully = true;
                if(window.showToast) window.showToast("Scheda salvata automaticamente in 'schede di allenamento'!", "success");
            }
        } catch (err) {
            console.warn("File System Access API non concessa o errore, eseguo fallback con download standard.", err);
        }
    }
    
    // Fallback: se le API non sono supportate o l'utente ha annullato/negato i permessi, esegui il download standard
    if (!savedSuccessfully) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sessionToSave, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "scheda_allenamento_" + dateStr + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        if(window.showToast) window.showToast("Scheda scaricata! Spostala nella cartella 'schede di allenamento'.", "info");
    }
    
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
    const container = document.getElementById('training-session-form-container');
    if (container) {
        // Target printable width for portrait A4 at 96 DPI is approx 720px
        const printableWidth = 720;
        
        // Remove existing print style if any
        const oldStyle = document.getElementById('print-scale-style');
        if (oldStyle) oldStyle.remove();
        
        // Measure the natural width of the container
        const width = Math.max(container.scrollWidth, container.offsetWidth) || 1000;
        
        if (width > printableWidth) {
            const scale = printableWidth / width;
            const printStyle = document.createElement('style');
            printStyle.id = 'print-scale-style';
            printStyle.innerHTML = `
                @media print {
                    #training-session-form-container {
                        zoom: ${scale} !important;
                        width: ${width}px !important;
                        max-width: ${width}px !important;
                    }
                    @supports not (zoom: 1) {
                        #training-session-form-container {
                            transform: scale(${scale}) !important;
                            transform-origin: top left !important;
                        }
                    }
                }
            `;
            document.head.appendChild(printStyle);
        }
    }
    window.print();
}

window.importTrainingSession = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedSession = JSON.parse(e.target.result);
            if (!importedSession.date || !importedSession.mainPhase) {
                if(window.showToast) window.showToast("File non valido.", "error");
                return;
            }
            
            // Delete old session with same date if exists to replace
            trainings = trainings.filter(t => t.date !== importedSession.date);
            if (window.unremoveDate) window.unremoveDate(importedSession.date);
            trainings.push(importedSession);
            trainings.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            localStorage.setItem('futsal_portal_trainings', JSON.stringify(trainings));
            
            if(window.showToast) window.showToast("Scheda importata con successo!", "success");
            
            renderTrainingProgramList();
            if(window.renderTrainingHistory) renderTrainingHistory();
            if(window.renderAttendanceBoard) renderAttendanceBoard(); 
            
            // Open the imported session
            window.openTrainingForm(importedSession.date);
        } catch (err) {
            console.error(err);
            if(window.showToast) window.showToast("Errore durante l'importazione del file.", "error");
        }
        event.target.value = ''; // Reset input
    };
    reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', () => {
    const tDateInput = document.getElementById('training-date');
    if (tDateInput) {
        tDateInput.addEventListener('change', () => {
            if (window.renderQuartetDropdowns) window.renderQuartetDropdowns();
        });
    }
});


