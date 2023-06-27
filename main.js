// DefiniÃ§Ã£o do baralho de cartas

let deck = [

    { name: 'Carta 1', cost: 2, force: 3 },
    
    { name: 'Carta 2', cost: 3, force: 2 },
    
    // Adicione as demais cartas do baralho aqui...
    
    { name: 'Carta 12', cost: 4, force: 4 }
    
    ];
    
    
    // ObtenÃ§Ã£o das referÃªncias dos elementos HTML relevantes
    
    const endTurnButton = document.getElementById('end-turn-btn');
    
    const playerHand = document.getElementById('player-hand');
    
    const computerHand = document.getElementById('computer-hand');
    
    
    // VariÃ¡veis de controle das rodadas
    
    let currentRound = 1;
    
    let playerControlledLocations = 0;
    
    let computerControlledLocations = 0;
    
    
    // FunÃ§Ã£o para inicializar as mÃ£os dos jogadores com as cartas do baralho
    
    function initializeHands() {
    
    const shuffledDeck = shuffleArray(deck); // Embaralhar as cartas do baralho
    
    
    // Distribuir as cartas para as mÃ£os dos jogadores
    
    const playerCards = shuffledDeck.slice(0, 4);
    
    const computerCards = shuffledDeck.slice(4, 8);
    
    
    playerCards.forEach((card) => {
    
    const playerCard = createCardElement(card, 'player');
    
    playerHand.appendChild(playerCard);
    
    });
    
    
    computerCards.forEach((card) => {
    
    const computerCard = createCardElement(card, 'computer');
    
    computerHand.appendChild(computerCard);
    
    });
    
    }
    
    
    // FunÃ§Ã£o para criar um elemento de carta HTML com base nos dados da carta
    
    function createCardElement(card, player) {
    
    const cardElement = document.createElement('div');
    
    cardElement.classList.add('card');
    
    cardElement.textContent = card.name;
    
    
    if (player === 'player') {
    
    cardElement.classList.add('player-card');
    
    cardElement.dataset.owner = 'player';
    
    } else if (player === 'computer') {
    
    cardElement.classList.add('computer-card');
    
    cardElement.dataset.owner = 'computer';
    
    }
    
    
    return cardElement;
    
    }
    
    
    
    // FunÃ§Ã£o para embaralhar um array utilizando o algoritmo de Fisher-Yates
    
    function shuffleArray(array) {
    
    for (let i = array.length - 1; i > 0; i--) {
    
    const j = Math.floor(Math.random() * (i + 1));
    
    [array[i], array[j]] = [array[j], array[i]];
    
    }
    
    return array;
    
    }
    
    
    // FunÃ§Ã£o para finalizar o turno atual e avanÃ§ar para a prÃ³xima rodada
    
    function endTurn() {
    
    if (currentRound === 6) {
    
    endGame(); // Chamamos a funÃ§Ã£o para finalizar o jogo quando chegarmos Ã  6Âª rodada
    
    } else {
    
    currentRound++;
    
    startNewRound();
    
    }
    
    }
    
    
    // FunÃ§Ã£o para iniciar uma nova rodada
    
    function startNewRound() {
    
    console.log(`--- Rodada ${currentRound} ---`);
    
    distributeNewCard();
    
    distributeEnergy();
    
    
    // Atualize a interface para exibir a nova rodada
    
    // ...
    
    
    // Verifique o controle dos locais pelos jogadores
    
    checkLocationsControl();
    
    
    // Verifique o objetivo do jogo
    
    checkGameObjective();
    
    
    console.log('Rodada', currentRound);
    
    }
    
    // FunÃ§Ã£o para atualizar a interface do jogo
    
    function updateInterface() {
    
    // Atualize as informaÃ§Ãµes da rodada
    
    const roundElement = document.getElementById('current-round');
    
    roundElement.textContent = `Rodada: ${currentRound}`;
    
    
    // Atualize as informaÃ§Ãµes dos locais controlados
    
    const playerControlledElement = document.getElementById('player-controlled');
    
    const computerControlledElement = document.getElementById('computer-controlled');
    
    playerControlledElement.textContent = `Locais controlados pelo jogador: ${playerControlledLocations}`;
    
    computerControlledElement.textContent = `Locais controlados pelo computador: ${computerControlledLocations}`;
    
    
    // Outras atualizaÃ§Ãµes da interface...
    
    }
    
    
    // FunÃ§Ã£o para distribuir uma nova carta para cada jogador
    
    function distributeNewCard() {
    
    const newPlayerCard = drawRandomCard();
    
    const newComputerCard = drawRandomCard();
    
    
    const playerCardElement = createCardElement(newPlayerCard, 'player');
    
    const computerCardElement = createCardElement(newComputerCard, 'computer');
    
    
    playerHand.appendChild(playerCardElement);
    
    computerHand.appendChild(computerCardElement);
    
    
    console.log('Novas cartas distribuÃ­das:', newPlayerCard.name, newComputerCard.name);
    
    }
    
    
    // FunÃ§Ã£o para sacar uma carta aleatÃ³ria do baralho
    
    function drawRandomCard() {
    
    const randomIndex = Math.floor(Math.random() * deck.length);
    
    const randomCard = deck.splice(randomIndex, 1)[0]; // Remove a carta do baralho
    
    return randomCard;
    
    }
    
    
    // FunÃ§Ã£o para distribuir energia para os jogadores no inÃ­cio de cada rodada
    
    function distributeEnergy() {
    
    const playerEnergy = currentRound;
    
    const computerEnergy = currentRound;
    
    
    console.log(`Jogador recebeu ${playerEnergy} de energia.`);
    
    console.log(`Computador recebeu ${computerEnergy} de energia.`);
    
    }
    
    
    // FunÃ§Ã£o para verificar o controle dos locais pelos jogadores
    
    function checkLocationsControl() {
    
    const location1Cards = document.querySelectorAll('#location-1 .card[data-placed="true"]');
    
    const location2Cards = document.querySelectorAll('#location-2 .card[data-placed="true"]');
    
    const location3Cards = document.querySelectorAll('#location-3 .card[data-placed="true"]');
    
    const player1Force = Array.from(location1Cards).reduce((total, card) => total + parseInt(card.dataset.force, 10), 0);
    
    const player2Force = Array.from(location2Cards).reduce((total, card) => total + parseInt(card.dataset.force, 10), 0);
    
    const player3Force = Array.from(location3Cards).reduce((total, card) => total + parseInt(card.dataset.force, 10), 0);
    
    const player1Control = player1Force > player2Force && player1Force > player3Force;
    
    const player2Control = player2Force > player1Force && player2Force > player3Force;
    
    const player3Control = player3Force > player1Force && player3Force > player2Force;
    
    if (player1Control) {
    
    playerControlledLocations++;
    
    console.log('O jogador controla o Local 1.');
    
    }
    
    if (player2Control) {
    
    playerControlledLocations++;
    
    console.log('O jogador controla o Local 2.');
    
    }
    
    if (player3Control) {
    
    playerControlledLocations++;
    
    console.log('O jogador controla o Local 3.');
    
    }
    
    if (playerControlledLocations > computerControlledLocations) {
    
    console.log('O jogador venceu a partida!');
    
    } else if (playerControlledLocations < computerControlledLocations) {
    
    console.log('O computador venceu a partida!');
    
    } else {
    
    // Em caso de empate no nÃºmero de locais controlados
    
    const playerTotalForce = player1Force + player2Force + player3Force;
    
    const computerTotalForce = computer1Force + computer2Force + computer3Force;
    
    if (playerTotalForce > computerTotalForce) {
    
    console.log('O jogador venceu a partida pelo desempate!');
    
    } else if (playerTotalForce < computerTotalForce) {
    
    console.log('O computador venceu a partida pelo desempate!');
    
    } else {
    
    console.log('A partida terminou em empate!');
    
    }
    
    }
    
    }
    
    
    // FunÃ§Ã£o para verificar o objetivo do jogo
    
    function checkGameObjective() {
    
    if (currentRound === 6) {
    
    checkLocationsControl();
    
    }
    
    }
    
    
    // FunÃ§Ã£o para finalizar o jogo
    
    function endGame() {
    
    console.log('*** Fim do jogo ***');
    
    console.log('Deseja jogar novamente? (Sim/NÃ£o)');
    
    const playAgain = prompt('Deseja jogar novamente? (Sim/NÃ£o)');
    
    
    if (playAgain.toLowerCase() === 'sim') {
    
    resetGame(); // Reinicia o jogo
    
    } else {
    
    console.log('Obrigado por jogar! AtÃ© a prÃ³xima!');
    
    }
    
    }
    
    
    // FunÃ§Ã£o para reiniciar o jogo
    
    function resetGame() {
    
    // Reinicia as variÃ¡veis e elementos do jogo
    
    currentRound = 1;
    
    playerControlledLocations = 0;
    
    computerControlledLocations = 0;
    
    playerHand.innerHTML = '';
    
    computerHand.innerHTML = '';
    
    deck = [
    
    { name: 'Carta 1', cost: 2, force: 3 },
    
    { name: 'Carta 2', cost: 3, force: 2 },
    
    // Adicione as demais cartas do baralho aqui...
    
    { name: 'Carta 12', cost: 4, force: 4 }
    
    ];
    
    
    initializeHands();
    
    
    console.log('*** Novo jogo iniciado ***');
    
    console.log('Boa sorte!');
    
    console.log('--- Rodada 1 ---');
    
    }
    
    
    // FunÃ§Ã£o para gastar energia para colocar uma carta em um local vÃ¡lido
    
    function spendEnergy(player, cardElement) {
    
    const energyCost = parseInt(cardElement.dataset.cost, 10);
    
    const currentEnergy = parseInt(player.dataset.energy, 10);
    
    const placedCards = player.getElementsByClassName('card[data-placed="true"]');
    
    if (currentEnergy >= energyCost && placedCards.length < 4) {
    
    player.dataset.energy = currentEnergy - energyCost;
    
    cardElement.dataset.placed = 'true';
    
    console.log(`Carta ${cardElement.dataset.name} colocada em um local vÃ¡lido.`);
    
    } else if (placedCards.length >= 4) {
    
    console.log('NÃ£o Ã© possÃ­vel colocar mais de 4 cartas em um local.');
    
    } else {
    
    console.log('Energia insuficiente para colocar a carta em um local vÃ¡lido.');
    
    }
    
    // Implemente a lÃ³gica para gastar energia e colocar uma carta em um local
    
    // ...
    
    }
    
    
    // Adicione um ouvinte de evento ao botÃ£o de finalizar turno
    
    endTurnButton.addEventListener('click', endTurn);
    
    
    // Adicione um ouvinte de evento para aÃ§Ãµes do jogador (colocar carta em um local)
    
    playerHand.addEventListener('click', function(event) {
    
    const cardElement = event.target.closest('.card');
    
    if (cardElement) {
    
    const player = event.target.closest('.player');
    
    spendEnergy(player, cardElement);
    
    }
    
    });
    
    
    // Inicialize as mÃ£os dos jogadores no inÃ­cio do jogo
    
    initializeHands();
    
    
    console.log('*** Novo jogo iniciado ***');
    
    console.log('Boa sorte!');
    
    console.log('--- Rodada 1 ---');