//Variables generales
var canvas = document.getElementById("lienzo");
var contexto = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 70;
var dx = 2;
var dy = -2;
var radiusBall = 5;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Mover con el raton
document.addEventListener("mousemove", mouseMoveHandler, false);

// Puntuacion y vidas
var score = 0;
var lives = 3;

//Variables para los ladrillos
var brickRowCount = 3;
var brickColCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;

//Desplazar los ladrillos
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//Bucle para crear los ladrillos
var c, r;
var bricks = [];

for (c = 0; c < brickColCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks [c][r] = {x:0, y:0, status:1}
    }                       //status:1 = visible / Para romper ladrillos
}

function keyDownHandler(e) {
    if (e.keyCode == 37) {
        leftPressed = true;
    } else {
        if (e.keyCode == 39){
            rightPressed = true;
        }
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 37) {
        leftPressed = false;
    } else {
        if (e.keyCode == 39) {
            rightPressed = false;
        }  
    }
}

//Funcion mover con raton
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawPaddle() {
    contexto.beginPath();
    contexto.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    contexto.fillStyle = "#4a4b88";
    contexto.fill();
    contexto.closePath();
}
function drawBall() {
    contexto.beginPath();
    contexto.arc(x,y,radiusBall,0,2*Math.PI);
    contexto.fillStyle = "#4a4b88";
    contexto.fill();
    contexto.closePath();
}
function drawBricks() {
    for (c=0; c<brickColCount; c++) {
        for (r=0; r<brickRowCount; r++) {
            
            if (bricks[c][r].status == 1) {
                
            //Espacios de los ladrillos
            var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            //Pintar ladrillos
            contexto.beginPath();
            contexto.rect(brickX, brickY, brickWidth, brickHeight);
            contexto.fillStyle = "#880404";
            contexto.fill();
            contexto.closePath;
            }
        }
    }
}
//Deteccion de colisiones de los ladrillos
function collisionDetection() {
    for (c=0; c<brickColCount; c++) {
        for (r=0; r<brickRowCount; r++) {
            //var b detecta la posicion de los ladrillos
            var b = bricks [c][r];
            if (b.status == 1) {
                
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    //Detecta si la pelota choca con el ladrillo, cambia la direcion  
                    //de la pelota y cambia el b.status a 0 por lo que no se dibuja
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickColCount * brickRowCount) {
                        alert("Has ganado!!!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Dibujar la puntuacion
function drawScore() {
    contexto.font = "16px Arial";
    contexto.fillStyle = "#4a4b88";
    contexto.fillText("Score: "+ score, 8, 20);
}

function drawLives() {
    contexto.font = "16px Arial";
    contexto.fillStyle = "#4a4b88";
    contexto.fillText("Lives: "+ lives,canvas.width-65, 20);
}

function draw() {
    //Limpia lo que hay en pantalla al refrescar
    contexto.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    x = x+dx;
    y = y+dy;
    //Control de colisiones con paredes (bola)
    if (x + dx > canvas.width - radiusBall || x + dx < radiusBall) {
        dx = -dx;
    }
    if (y +dy < radiusBall) {
        dy = -dy;
    } else {
        if (y + dy > canvas.height - radiusBall) {
          if (x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
          } else { 
              lives--; 
              if (!lives) {
                alert("GAME OVER");
                document.location.reload(); 
              } else {
                  x = canvas.width/2;
                  y = canvas.height - 60;
                  dx = 2;
                  dy = -2;
                  paddleX = (canvas.width - paddleWidth)/2;
              }
            }
        }
    }
    //Control de colisiones con paredes (tabla)
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX = paddleX + 5;
    }
    if (leftPressed && paddleX > 0) {
        paddleX = paddleX - 5;
    }
}
//ejecuta la funcion draw cada 10ms
setInterval(draw, 10);
/* contexto.beginPath();
  /*comenzar camino*/
/* contexto.rect(20,40,50,30);
  contexto.fillStyle = "#0000ff";
  contexto.fill();
  contexto.closePath();
  /*Cerrar camino*/    