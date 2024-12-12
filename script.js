// Menambahkan suara
const eatSound = new Audio("sound1.mp3"); // Path ke file makan
const gameOverSound = new Audio("sound2mati.mp3"); // Path ke file gameover

// Event untuk mendeteksi tabrakan atau makanan
document.addEventListener("keydown", directionHandler);

function directionHandler(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar tubuh ular
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "yellow" : "darkyellow";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkyellow";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Gambar makanan
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "darkred";
    ctx.stroke();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Gerakan ular
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Logika tembus dinding
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY < 0) snakeY = canvas.height - box;
    if (snakeY >= canvas.height) snakeY = 0;

    // Jika ular makan makanan
    if (snakeX === food.x && snakeY === food.y) {
        eatSound.play(); // Mainkan suara makan
        score += 10;
        document.getElementById("score").textContent = `Score: ${score}`;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Cek tabrakan dengan tubuh ular
    if (collision(newHead, snake)) {
        gameOverSound.play(); // Mainkan suara game over
        clearInterval(game);
        alert("Game Over! Your score is " + score);
        location.reload();
    }

    snake.unshift(newHead);
}
