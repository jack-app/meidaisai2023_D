export class KoiKoiClient {
    constructor(serverUrl) {
        this.socket = io(serverUrl);
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.updateStatus('Connected to server');
            this.gameActive = false;
        });

        this.socket.on('ask_act', (observation) => {
            console.log('Received game state:', observation);
            
            // ゲーム状態の表示を更新
            this.updateGameDisplay(observation);

          
            this.showActions(observation.legal_action);
        });

        this.socket.on('game_over', (data) => {
            console.log('Game over:', data);
            this.updateStatus(`Game Over! Winner: Player ${data.winner}`);
            this.gameActive = false;
            this.showGameOverScreen(data);
        });
    }
    
    showGameOverScreen(data) {
        const gameArea = document.getElementById('gameArea');
        
        // 結果データから必要な情報を抽出
        const winner = data.winner;
        const result = data.result || '';
        
        gameArea.innerHTML = `
            <div class="game-over-container">
                <h2>Game Over!</h2>
                <div class="result-box">
                    <h3>Winner: Player ${winner}</h3>
                    <p class="game-stats">${result}</p>
                    <div class="final-actions">
                        <button class="action-button" onclick="window.gameClient.startNewGame()">
                            Play Again
                        </button>
                        <button class="action-button secondary" onclick="window.gameClient.returnToSetup()">
                            Return to Setup
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    startNewGame() {
        // 既存のゲーム設定で新しいゲームを開始
        this.gameActive = true;
        this.enterRoom(this.lastPlayerName, this.roomId, this.lastMode, this.lastNumGames);
    }

    returnToSetup() {
        // セットアップ画面に戻る
        document.getElementById('setupForm').style.display = 'block';
        document.getElementById('gameArea').style.display = 'none';
    }
    
    updateGameDisplay(observation) {
        const gameArea = document.getElementById('gameArea');

        const formattedObservation = JSON.stringify(observation, null, 2)
        .replace(/\n/g, '<br>')
        .replace(/ /g, '&nbsp;');

        gameArea.innerHTML = `
            <div class="status" id="status"></div>
            <div class="game-info">
                <p>Turn: you</p>
                <p>State: ${observation.state}</p>
                <p>Your Score: ${observation.your_total_point}</p>
                <p>Opponent Score: ${observation.op_total_point}</p>
            </div>
            <div class="field">
                <h3>Field Cards</h3>
                ${this.formatCards(observation.field)}
            </div>
            <div class="hand">
                <h3>Your Hand</h3>
                ${this.formatCards(observation.your_hand)}
            </div>
            <div class="ful_observation">
                <h3>Full Observation Data:</h3>
                 ${formattedObservation}
            </div>
            <div id="actions"></div>
        `;
    }

    formatCards(cards) {
        if (!Array.isArray(cards)) return 'No cards';
        return cards.map(card => this.formatCard(card)).join(', ');
    }

    formatCard(card) {
        // cardがnullの場合の処理
    if (card === null) return 'Pass';
    
    // cardが配列の場合
    if (Array.isArray(card)) {
        const [number, suit] = card;
        return `${number}-${suit}`;
    }
    
    // cardがオブジェクトの場合
    if (typeof card === 'object' && 'number' in card && 'suit' in card) {
        return `${card.number}-${card.suit}`;
    }
    
    // その他の場合
    return String(card);
    }

    showActions(legalActions) {
        const actionsDiv = document.getElementById('actions');
        actionsDiv.innerHTML = '<h3>Available Actions</h3>';
        
        if (!Array.isArray(legalActions)) return;

        legalActions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'action-button';
            button.textContent = action === null ? 'Pass' : this.formatCard(action);
            button.onclick = () => this.performAction(action);
            actionsDiv.appendChild(button);
        });
    }

    performAction(action) {
        console.log('Performing action:', action);
        this.socket.emit('action', {
            room_id: this.roomId,
            action: action
        });
    }

    enterRoom(playerName, roomId, mode, numGames) {
        this.roomId = roomId;
        console.log('Entering room:', {
            room_id: roomId,
            player_name: playerName,
            mode: mode,
            num_games: numGames
        });
        
        this.socket.emit('enter_room', {
            room_id: roomId,
            player_name: playerName,
            mode: mode,
            num_games: numGames
        });
    }

    updateStatus(message) {
        const statusDiv = document.getElementById('status');
        if (statusDiv) {
            statusDiv.textContent = message;
        }
    }
}