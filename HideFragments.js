
//fragments array
let Fragments = [];//random position array
let fragPos;//class display
let letter = [];//birthday letter array

//letter position
let letterPosX;
let letterPosY;//where the letter shows


/////////////////Fragments position/////////////////
class HideFragments {
  constructor(_x, _y) {
    this.PosX = _x;
    this.PosY = _y;
    this.moonSize = windowHeight / 4 * 3;
    // this.moonSize = windowHeight / 4;
    this.length = 100;
  }

  update() {
    //////////ChatGPT teachs me this because the random position always be outside of the moon.
    // 随机生成一个在圆内的点 Randomly produce a dot inside the moon circle
    let angle = random(TWO_PI); // 0 到 2π 的随机角度
    let r = sqrt(random(1)) * this.moonSize / 2; // 保持点均匀分布在圆内 Keep dots evenly distribute in circle
    // let r = sqrt(random(1)) * this.moonSize; // 保持点均匀分布在圆内 Keep dots evenly distribute in circle
    this.PosX = windowWidth / 2 + r * cos(angle);
    this.PosY = windowHeight / 2 + r * sin(angle);
  }

  display() {
    push();
    noFill();
    noStroke();//difficulty!
    square(this.PosX, this.PosY, this.length);

    Fx = this.PosX;//for mousePressed
    Fy = this.PosY;
    Flen = this.length;
    centerFrag = createVector(Fx + this.length / 2, Fy + this.length / 2);
    pop();
  }
}