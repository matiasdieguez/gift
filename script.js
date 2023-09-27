// Definir las dimensiones del rompecabezas (en este caso, 3x3)
const numRows = 3;
const numCols = 3;

// Función para crear y mezclar el rompecabezas
function createAndShufflePuzzle() {
    const numbers = Array.from({ length: numRows * numCols }, (_, i) => i + 1);
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.innerHTML = "";

    // Mezclar los números aleatoriamente
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const tile = document.createElement("div");
            tile.className = "puzzle-tile bg-gray-300 border border-gray-500 w-16 h-16 flex justify-center items-center text-lg cursor-pointer";
            tile.dataset.row = i;
            tile.dataset.col = j;
            tile.textContent = shuffledNumbers[i * numCols + j];
            puzzleContainer.appendChild(tile);
        }
    }

    // Agregar manejador de eventos para las fichas del rompecabezas
    puzzleContainer.addEventListener("click", handleTileClick);

    // Ocultar la imagen del regalo
    document.getElementById("image-container").classList.add("hidden");
}

// Función para manejar el clic en una ficha del rompecabezas
function handleTileClick(event) {
    const tile = event.target;
    const emptyTile = document.querySelector(".empty");

    if (!tile.classList.contains("empty")) {
        // Obtener las coordenadas de la ficha clicada
        const row = parseInt(tile.dataset.row);
        const col = parseInt(tile.dataset.col);

        // Obtener las coordenadas de la ficha vacía
        const emptyRow = parseInt(emptyTile.dataset.row);
        const emptyCol = parseInt(emptyTile.dataset.col);

        // Verificar si la ficha clicada está junto a la ficha vacía
        if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
            // Intercambiar las fichas
            tile.textContent = "";
            tile.classList.add("empty");
            emptyTile.classList.remove("empty");
            emptyTile.textContent = tile.textContent;

            // Verificar si se resolvió el rompecabezas
            if (isPuzzleSolved()) {
                revealGift();
            }
        }
    }
}

// Función para verificar si el rompecabezas está resuelto
function isPuzzleSolved() {
    const tiles = Array.from(document.querySelectorAll(".puzzle-tile"));
    return tiles.every((tile, index) => parseInt(tile.textContent) === index + 1);
}

// Función para revelar el regalo
function revealGift() {
    document.getElementById("image-container").classList.remove("hidden");
}

// Inicializar el rompecabezas al cargar la página
createAndShufflePuzzle();

// Agregar manejador de eventos al botón "Revelar Regalo"
document.getElementById("reveal-button").addEventListener("click", revealGift);
