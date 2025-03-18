//Flowe variables
let delay;//the gap between click and flower
let delayNum = 150;//delay time 
let delayOn = false;
let fillOpacity = 100;
let strokeOpacity;
let flowerW;//width
let flowerX;
let flowerY;
let flowerR;//color
let flowerG;
let flowerB;
let flowerArray = [];
let petal;

/////////////////////////Flowers/////////////////////////////
class Flower {
  constructor(_x, _y) {
    this.posX = _x;
    this.posY = _y;
    this.opacity = 0;
    this.width = flowerW;
    this.height = 0;
    this.time = 0;
    this.deltaTime = 0;
    this.R = flowerR;
    this.G = flowerG;
    this.B = flowerB;
    this.petal = petal;
  }
  display() {
    //time control the flower height and opacity
    this.time = this.time + 1;
    this.height = this.time * 0.1;
    this.opacity = this.time * 0.1;
    let dt = deltaTime * 0.001;
    this.deltaTime += dt;
    let sinTime = sin(this.deltaTime);
    let flowerBreathing = map(sinTime, -1, 1, 30, 60);

    //flower breathing
    if (this.height > 30) {
      this.height = flowerBreathing;
    }

    //flower opacity
    if (this.opacity > fillOpacity) {
      this.opacity = fillOpacity;
    }
    strokeOpacity = this.opacity - 30;

    //blossom flower data
    push();

    translate(this.posX, this.posY);
    rotate(frameCount * 0.01);
    stroke(255, 255, 255, strokeOpacity);//white
    strokeWeight(15);
    //flower color
    fill(this.R, this.G, this.B, 90);
    ellipseMode(CORNER);
    //petal
    for (let i = 0; i < this.petal; i++) {
      ellipse(0, 0, this.width, this.height);
      rotate(TWO_PI / this.petal);
    }
    pop();

  }
}
