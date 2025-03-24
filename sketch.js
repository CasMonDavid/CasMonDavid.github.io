class Bola {
  constructor(x,y,d,vX,vY,r,g,b){
    this.x = x;
    this.y = y;
    this.d = d;
    this.vX = vX;
    this.vY = vY;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toca(objetivo){
    if ((this.x-(this.d/2)) < objetivo.x + objetivo.w &&
        (this.x+(this.d/2)) > objetivo.x &&
        (this.y-(this.d/2)) < objetivo.y + objetivo.h &&
        (this.y+(this.d/2)) > objetivo.y) {
      return true;
    }
    return false;
  }
}
let pelota = new Bola(500,200,15,5,5,255,255,255);

class Entidad {
  constructor(x,y,w,h,vY){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vY = vY;
  }

  toca(objetivo){
    if (this.x < objetivo.x + objetivo.w && 
      this.x + this.w > objetivo.x   &&
      this.y < objetivo.y + objetivo.h && 
      this.y + this.h > objetivo.y) {
      return true;
    }
    return false;
  }
}
let jugador1 = new Entidad(30,30,10,50,5);
let jugador2 = new Entidad(960,30,10,50,5);
let jugadores = [jugador1,jugador2];

let muros = [
  {
    "x":0,
    "y":0,
    "w":2,
    "h":400,
    "pared": 1
  },{
    "x":0,
    "y":0,
    "w":1000,
    "h":2,
    "pared": -1
  },{
    "x":999,
    "y":0,
    "w":2,
    "h":400,
    "pared": 2
  },{
    "x":0,
    "y":397,
    "w":1000,
    "h":2,
    "pared": -2
  }
]

let puntuacion = [0,0];
let puntos_para_ganar = 3;
let nuevos_puntos_para_ganar = 3;
let frames = 0;
let segundos = 0;

let pause = false;
let gameover = false;
let ganador = "";

let coloresBtn = ["#02F0E0","#359B94"]

let canvasWidth=1000;
let canvasHeight=600;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(60);
}

function draw() {
  //JUEGO EN PAUSA?
  if (pause && !gameover){
    background(0);
    strokeWeight(2);

    stroke(255,255,255);
    fill(0);
    rect(0,400,1000,200,20);

    //PELOTA
    stroke(255);
    fill(255);
    circle(pelota.x,pelota.y,pelota.d);

    //MUROS
    stroke("#FA2D3B");
    fill("#FA2D3B");
    muros.forEach(pared => {
      //rect(pared.x,pared.y,pared.w,pared.h);
    });

    //LINEA PUNTEADA
    stroke(255);
    fill(255);
    for(let i=0;i<=20;i++){
      square(495,0+(19*i),10)
    }

    //JUGADORES
    stroke(255);
    fill(255);
    jugadores.forEach(jugador => {
      rect(jugador.x,jugador.y,jugador.w,jugador.h);
    });

    //PUNTUACION
    textSize(50);
    fill(0);
    stroke(255);
    strokeWeight(4);
    text(puntuacion[0], 225, 450);
    text(puntuacion[1], 725, 450);

    text("Pausa [ P ]", 10, 580);

    actualizar();
  }else{
    pintar_pausa();
  }

  //JUEGO TERMINADO?
  isWin();
}

function actualizar(){
  //TIEMPO
  tiempo();

  //MOVIMIENTO DE LA PELOTA
  pelota.x+=pelota.vX;
  pelota.y+=pelota.vY;

  //VERIFICA EL CONTACTO CON LOS MUROS CON LA PELOTA
  muros.forEach(pared => {
    if (pelota.toca(pared)){
      if (pared.pared<0){
        pelota.vY = pelota.vY*(-1);
      }
      if (pared.pared==2){
        pelota.x = 500;
        pelota.y = 200;
        pelota.vX = getRandomInt(1,3)!=2? pelota.vX : pelota.vX*(-1);
        pelota.vY = getRandomInt(1,3)!=2? pelota.vY : pelota.vY*(-1);
        puntuacion[0]+=1;
        ganador = "JUGADOR 1";
      }
      if (pared.pared==1){
        pelota.x = 500;
        pelota.y = 200;
        pelota.vX = getRandomInt(1,3)!=2? pelota.vX : pelota.vX*(-1);
        pelota.vY = getRandomInt(1,3)!=2? pelota.vY : pelota.vY*(-1);
        puntuacion[1]+=1;
        ganador = "JUGADOR 2";
      }
    }
  });

  //VERIFICA EL CONTACTO DE LA PELOTA CON LOS JUGADORES
  jugadores.forEach(jugador => {
    if (pelota.toca(jugador)){
      pelota.vX = pelota.vX*(-1);
    }
  });

  //VERIFICA EL CONTACTO DE LOS JUGADORES CON LOS MUROS
  jugadores.forEach(jugador => {
    muros.forEach(pared => {
      if (jugador.toca(pared)){
        if (pared.pared == -2){
          jugador.y-=jugador.vY;
        }
        if (pared.pared == -1){
          jugador.y+=jugador.vY;
        }
      }
    });
  });

  //MOVIMIENTO DE LOS JUGADORES
  movimientoJugadores();
}

function tiempo(){
  frames+=1;
  if (frames>59){
    frames=0;
    segundos+=1;
  }
  if (segundos>=20){
    if (pelota.vX < 10){
      if (pelota.vX > 0){
        pelota.vX+=1;
      }else{
        pelota.vX-=1;
      }
    }
    segundos=0;
  }
}

function isWin(){
  puntuacion.forEach(pts => {
    if (pts >= puntos_para_ganar){
      pintar_final();
      gameover = true;
    }
  });
}

function configurarJuego(){
  stroke("#F0C635");
  fill("#E2F035");
  rect(10,520,350,70,10);

  textSize(30);
  fill("#F0E8A1");
  stroke(0);
  text("Configurar puntuación", 10, 505);

  textSize(20);
  fill(0);
  stroke(0);
  strokeWeight(0);
  text("Puntos para ganar: "+puntos_para_ganar, 20, 545);
  text("Modificar a: [ - ] "+nuevos_puntos_para_ganar+" [ + ]", 20, 575);

  guardarModificacion()
}

function guardarModificacion(){
  fill("#02F0E0");
  stroke("#02F0E0");
  rect(230,532,110,50,20);

  textSize(18);
  fill(0);
  stroke(0);
  strokeWeight(1);
  text("REINICIAR", 239, 561);
}

function pintar_pausa(){
  stroke(0);
  fill(0);
  rect(0,0,1000,600)

  textSize(50);
  fill(0);
  stroke(255);
  strokeWeight(4);
  text("PAUSA", 410, 150);
  textSize(30);
  text("Presiona [ P ] para reanudar el juego", 245, 250);

  configurarJuego();
}

function pintar_final(){
  stroke(0);
  fill(0);
  rect(0,0,1000,600)

  textSize(50);
  fill(0);
  stroke(random(50,255),random(50,255),random(50,255));
  strokeWeight(4);
  text("Juego terminado", 320, 150);
  textSize(45);
  stroke(255);
  text("¡¡Ganó el "+ganador+"!!", 270, 200);

  configurarJuego();
}

function movimientoJugadores(){
  //JUGADOR 1
  if (keyIsDown(87) === true){
    jugadores[0].y-=jugadores[0].vY; 
  }
  if (keyIsDown(83) === true){
    jugadores[0].y+=jugadores[0].vY; 
  }

  //JUGADOR 2
  if (keyIsDown(UP_ARROW) === true){
    jugadores[1].y-=jugadores[1].vY; 
  }
  if (keyIsDown(DOWN_ARROW) === true){
    jugadores[1].y+=jugadores[1].vY; 
  }
}

function reiniciar(){
  puntuacion = [0,0];
  pause = true;
  gameover = false;
  ganador = "";

  frames = 0;
  segundos = 0;

  pelota.x = 500;
  pelota.y = 200;
  pelota.vX = getRandomInt(1,3)!=2? getRandomInt(5,8) : getRandomInt(5,8)*(-1);
  pelota.vY = getRandomInt(1,3)!=2? getRandomInt(5,8) : getRandomInt(5,8)*(-1);

  jugador1.x = 30;
  jugador1.y = 30;

  jugador2.x = 960;
  jugador2.y = 30;

  puntos_para_ganar = nuevos_puntos_para_ganar;
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function mouseClicked() {
  if (mouseX >= 230 &&
      mouseX <= (230+110) &&
      mouseY >= 532 &&
      mouseY <= (532+50)){
    if (!pause || gameover){
      reiniciar();
    }
  }
}

function keyReleased() {
  if (keyCode === 80) {
    pause = !pause;
  }
  if (keyCode === 187 || keyCode === 107){
    if (!pause || gameover){
      nuevos_puntos_para_ganar += 1;
    }
  }
  if ((keyCode === 189 || keyCode === 109) && nuevos_puntos_para_ganar > 1){
    if (!pause || gameover){
      nuevos_puntos_para_ganar -= 1;
    }
  }
}