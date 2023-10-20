const canvas = document.querySelector("canvas"); // Sélectionne le canvas dans le HTML
const ctx = canvas.getContext('2d'); // Obtient le contexte de rendu 2D pour le canvas
const startButton = document.getElementById("start-button");
let box = 20; // La taille d'une unité de la grille du jeu
let snake = [];

snake[0] = { x: 10 * box, y: 10 * box }; // Position initiale de la tête du serpent

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, // Position initiale de la nourriture (aléatoire)
    y: Math.floor(Math.random() * 15 + 1) * box
};

let gameStarted = false; // Variable pour indiquer si le jeu a commencé
let score = 0; // Score initial
let d; // Direction du serpent (LEFT, UP, RIGHT, DOWN)
let snakeVisible = false;
let elementVisible = false;


document.addEventListener("keydown", direction); // Écoute les événements de touche
// Gestionnaire d'événement pour le bouton "Start"
startButton.addEventListener("click", startGame);

function startGame() {
    if (!gameStarted) {
        startButton.style.display = "none"; // Masque le bouton "Start"
        snakeVisible = true;
        elementVisible = true;
        gameStarted = true; // Marque le jeu comme ayant commencé
    }
}

function direction(event) {
    if(gameStarted){
        let key = event.keyCode;
        if (key == 37 && d != "RIGHT") {
            d = "LEFT";
        } else if (key == 38 && d != "DOWN") {
            d = "UP";
        } else if (key == 39 && d != "LEFT") {
            d = "RIGHT";
        } else if (key == 40 && d != "UP") {
            d = "DOWN";
        }
    }
   
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas à chaque mise à jour
    if (snakeVisible) {
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? "green" : "white"; // Couleur de la tête en vert, du corps en blanc
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
    }
    if(elementVisible){
        ctx.fillStyle = "orange";
        ctx.fillRect(food.x, food.y, box, box); // Dessine la nourriture
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText(score, 2 * box, 1.6 * box); // Affiche le score
    }


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) { // Vérifie si le serpent mange la nourriture
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box, // Génère une nouvelle position pour la nourriture
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } else {
        snake.pop(); // Si le serpent ne mange pas, supprime la dernière partie du corps
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX > 19 * box || snakeY > 19 * box || collision(newHead, snake)) {
        clearInterval(game); // Arrête le jeu en cas de collision avec le mur ou soi-même
    }
    snake.unshift(newHead); // Ajoute la nouvelle tête du serpent
}



function collision(head, array) {
    for (let j = 0; j < array.length; j++) {
        if (head.x == array[j].x && head.y == array[j].y) {
            return true; // Vérifie s'il y a une collision entre la tête et le corps du serpent
        }
    }
    return false;
}

let game = setInterval(draw, 100); // Démarre la boucle de jeu (rafraîchit le canvas toutes les 100 ms)
