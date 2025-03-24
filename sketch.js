class bola {
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

let pelota = new bola(500,200,15,5,5,255,255,255);

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
    "pared": 0
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
    "pared": 0
  }
]

let canvasWidth=1000;
let canvasHeight=600;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);

  stroke(255,255,255);
  fill(0);
  rect(0,400,1000,200,20);

  //PELOTA
  stroke(255,255,255);
  fill(0);
  circle(pelota.x,pelota.y,pelota.d);

  //MUROS
  stroke("#FA2D3B");
  fill("#FA2D3B");
  muros.forEach(pared => {
    rect(pared.x,pared.y,pared.w,pared.h);
  });

  actualizar();
}

function actualizar(){
  pelota.x+=pelota.vX;
  pelota.y+=pelota.vY;

  muros.forEach(pared => {
    if (pelota.toca(pared)){
      if (pared.pared==0){
        pelota.vY = pelota.vY*(-1);
      }
    }
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}