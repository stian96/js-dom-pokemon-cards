const cardsContainer = document.querySelector('.cards'); 

// Function used to create a card for the grid.
const createCardElement = (pokemon) => {
    const li = document.createElement('li');
    li.className = 'card';

    const h2 = document.createElement('h2');
    h2.className = 'card--title';
    h2.textContent = pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.slice(1);

    const img = document.createElement('img');
    img.className = 'card--img';
    img.width = '256';
    img.src = pokemon.sprites.other['official-artwork'].front_default;
    const statsList = createStatsList(pokemon.stats);
    const games = getGamesPokemonHaveBeenIn(pokemon.game_indices);
    
    const gamesButton = document.createElement('button');
    gamesButton.className = 'card--button';
    gamesButton.textContent = 'Played in games';

    gamesButton.addEventListener('click', () => {
        openModal(pokemon.name, games);
    });

    li.appendChild(h2);
    li.appendChild(img);
    li.appendChild(statsList);
    li.appendChild(gamesButton);
    return li;
}

const createStatsList = (statsArray) => {
    const ul = document.createElement('ul');
    ul.className = 'card--text';

    statsArray.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.stat.name.toLocaleUpperCase()}: ${item.base_stat}`;
        ul.appendChild(li);
    });

    return ul;
}

const getGamesPokemonHaveBeenIn = (game_indices) => {
    const games = game_indices.map((game) => game.version.name);
    return games;
}

const openModal = (pokemonName, gamesArray) => {
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('.modal--title');
    const modalGameList = document.querySelector('.game--list');

    modalTitle.textContent = `${pokemonName.charAt(0).toLocaleUpperCase() + pokemonName.slice(1)} Played in`;
    modalGameList.innerHTML = '';

    gamesArray.forEach((game) => {
        const li = document.createElement('li');
        li.className = 'game--list--item';
        li.textContent = `Version: ${game}`;
        modalGameList.appendChild(li);
    });

    modal.style.display = 'block';
}

const createModal = () => {
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal';

    const modalContentDiv = document.createElement('div');
    modalContentDiv.className = 'modal--content';

    const closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.textContent = 'X';

    const titleH2 = document.createElement('h2');
    titleH2.className = 'modal--title';

    const gameListUl = document.createElement('ul');
    gameListUl.className = 'game--list';

    modalContentDiv.appendChild(closeSpan);
    modalContentDiv.appendChild(titleH2);
    modalContentDiv.appendChild(gameListUl);
    modalDiv.appendChild(modalContentDiv);
    
    document.body.appendChild(modalDiv);

    closeSpan.addEventListener('click', () => {
        modalDiv.style.display = 'none';
    });
}

// Create and append modal to DOM.
createModal();

// Create card elements for each game.
data.forEach((pokemon) => {
    const cardElement = createCardElement(pokemon);
    cardsContainer.appendChild(cardElement);
});
