// Configuración del Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const circles = [];
const numCircles = 10; // Cantidad de círculos al inicio
let score = 0; // Contador de círculos eliminados

// Crear círculo con posición y velocidad aleatoria
function createCircle() {
    return {
        x: Math.random() * canvas.width, // Posición aleatoria en X
        y: -10, // Siempre inicia arriba
        radius: Math.random() * 20 + 10, // Tamaño entre 10 y 30px
        speed: Math.random() * 3 + 1, // Velocidad entre 1 y 4px por frame
        color: getRandomColor() // Color aleatorio
    };
}

// Generar colores aleatorios
function getRandomColor() {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Dibujar círculos en el Canvas
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar cada círculo
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
    });

    // Dibujar el contador en la esquina superior derecha
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Eliminados: " + score, canvas.width - 150, 30);
}

// Actualizar posición de los círculos
function updateCircles() {
    circles.forEach(circle => {
        circle.y += circle.speed;

        // Si el círculo sale de la pantalla, reiniciarlo arriba
        if (circle.y - circle.radius > canvas.height) {
            circle.y = -10;
            circle.x = Math.random() * canvas.width;
        }
    });
}

// Detectar clic y eliminar círculo
canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for (let i = circles.length - 1; i >= 0; i--) {
        const circle = circles[i];
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        
        if (distance < circle.radius) {
            circles.splice(i, 1); // Eliminar círculo
            circles.push(createCircle()); // Crear uno nuevo
            score++; // Aumentar contador
            break;
        }
    }
});

// Iniciar círculos
for (let i = 0; i < numCircles; i++) {
    circles.push(createCircle());
}

// Loop principal del juego
function gameLoop() {
    updateCircles();
    drawCircles();
    requestAnimationFrame(gameLoop);
}

gameLoop();
