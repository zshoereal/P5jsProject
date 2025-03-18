//Zhenzhen Xie 2025/01/13

//Instructions: It's a interactable moon. This moon includes all time secrects. This project provides a personal date with time, moon and flower.

//Operation Manual: Move your mouse to detect a fully present dog and click!

//Inspiration: Cabbibo's projects!!!! They are all legend! I also combined my projects of creative clock and collection sketch.

//Reference:
//ChatGPT-help me fix up some logic error that I can't understand. I've marked them out.
//(p5.js Web Editor | blossom flower w/ bee, no date). Avaliable at: https://editor.p5js.org/gmpfood/sketches/A21LyrTya
//I build up my flower based on this one!! Thanks for help stranger TT

let audioContextOn = false;
let backgroundSound;//muuuussssic
let eatSound;
let flowerSound;

function preload() {
  soundFormats('mp3', 'ogg');
  backgroundSound = loadSound('sound/background3.mp3');
  eatSound = loadSound('sound/short.mp3');
  flowerSound = loadSound('sound/long.mp3');
}



//for mousePressed "simple" button position
let Flen;//equal this.length
let Fx;//equal this.PosX
let Fy;//equal this.PosY
let centerFrag;

//Eatting array
let EatX = [];
let EatY = [];

//rolling index
let i = 0;//for letter fragments show up in order

//mouse pointer + moon eater
let originalD = 50;//mouse pointer diameter
let mousePos;

//declare variables for visual
let moonY;
let moonX;
let time;
let moonSize;
// let circleSize = 50;
let dogX;
let dogY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  delay = delayNum;


  textAlign(CENTER);
  //user must start audio context
  getAudioContext().suspend();

  backgroundSound.loop();//constantly play from starting

  letter = ["     ", "You eat a pice of moon, a piece of time.", "You also plant a fragment flower at the same time.", "The flower will blossom, breath and fill up the moon\nfiil up the time. ", "Your effect is your cause.", "And your cause is also your effect.", "You make what you choose\nand choose what you make", "in the river of time"];//mythology
  // for loop to add new position into position array
  for (let num = 0; num < letter.length; num++) {
    /////////ChatGPT help me correct the random position out of circle
    let fragment = new HideFragments(0, 0);  // 初始化时坐标为 (0,0)Initialize coordinates are (0,0)
    fragment.update();  // 立刻更新到随机位置Update to a random location instantly
    Fragments.push(fragment);

  }

  mousePos = createVector(0, 0);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let silenceCount = 150;
let guidanceX;
let guidanceY;

function draw() {
  background(0);//black background

  if (audioContextOn) {
    //create different scene
    background(0);
    frameRate(60);

    moonY = windowHeight / 2;//moon hanging on the sky
    moonX = windowWidth / 2;//make moon begins in center
    moonSize = windowHeight / 4 * 3;

    letterPosX = windowWidth / 2;
    letterPosY = windowHeight / 2;//be in the center

    ///////////////////////////moon visual//////////////////////
    push();
    fill(255);//white
    stroke(255, 255, 100, 80);//light yellow
    strokeWeight(10);//halo
    circle(moonX, moonY, moonSize);//moon
    // circle(windowWidth/2,windowHeight/2, moonSize);//moon
    pop();

    ///////////eating notch/////////
    for (let index = 0; index < EatX.length; index++) {
      // EatParts[index].display();
      push();
      fill(0);//black
      circle(EatX[index], EatY[index], 100);
      pop();
    }

    //////////flower////////////////////
    if (delayOn == false) {
      // console.log(delayOn);
    } else {
      if (delayOn == true) {
        delay--;
      }
    }

    if (delay < 0) {
      let flower = new Flower(flowerX, flowerY);
      flowerArray.push(flower);
      flowerSound.play();
      console.log(flowerArray.length);
      delay = delayNum;
      delayOn = false;
    }

    for (let num = 0; num < flowerArray.length; num++) {
      flowerArray[num].display();
    }

    //bottom filter
    filter(BLUR, 2.5);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////mouse moving detection////////////////
    //to control the transparency of guidance
    if (silenceCount > 150) {
      silenceCount = 150;
    } else {
      silenceCount++;
    }


    if (silenceCount < 5) {
      console.log("here");
    }

    //console.log('silenceCount', silenceCount);
    guidanceX = windowWidth / 2;
    guidanceY = 50;
    push();
    textStyle(ITALIC);
    textSize(16);
    textAlign(CENTER);//super silly method about showing guidance when mouse is not moving
    fill(255, 255, 255, silenceCount); //white
    text('Move your mouse to find something!\nClick when you think the dog is fully black.', guidanceX, guidanceY);
    pop();


    //////////array rolling//////////
    push();
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(16);
    fill(0);//black
    stroke(255);//white
    strokeWeight(1);
    text((letter[i]), letterPosX, letterPosY);//showing letter
    fragPos = Fragments[i];//showing position
    fragPos.display();
    pop();

    //////////mouse pointer///////////moon eater/////////////
    mousePos.x = mouseX;
    mousePos.y = mouseY;
    let distance = p5.Vector.sub(mousePos, centerFrag);
    let opacity = 250 - distance.mag();

    //////////head
    push();
    noStroke();
    fill(250 - opacity, opacity);//black change depend on the distance
    let biteSize = PI / 8;//mouth size
    let startAngle = biteSize
    let endAngle = TWO_PI - startAngle;//learn from P5.JS reference of arc
    dogX = mouseX;
    dogY = mouseY;
    arc(dogX, dogY, 100, 100, startAngle, endAngle, PIE);//head
    line(dogX, dogY, dogX + 45, dogY - 19);//close mouth
    pop();

    ////////eye
    push();
    stroke(255);//white
    strokeWeight(2);
    fill(0);//black
    circle(dogX, dogY - 25, 10);
    pop();

    ////////////ear
    push();
    translate(dogX, dogY - 50);
    rotate(45);//idk how to draw an oblique ellipse
    fill(0);//black filling
    noStroke();
    ellipse(0, 50, 20, 40);
    pop();

    ////////////nose
    push();
    stroke(0);//black stroke
    strokeWeight(2);
    fill(255);//white filling
    circle(dogX + 40, dogY - 30, 10);//nose
    triangle(dogX + 44, dogY - 19, dogX + 41, dogY - 9, dogX + 35, dogY - 14);//teeth
    pop();
    //////////////////////////Mouse Pointer///////////Dog//////////////////////////


  } else {
    //create different scene
    background(255);
    text("Click to Start", width / 2, height / 2);
    console.log('Click to Start');
  }


}

let flowerPx = [];
let flowerPy = [];//to schedual the record of mouse click history and avoid replacing flower position within delay

function mousePressed() {
  //get the permission
  if (!audioContextOn) {
    audioContextOn = true;
    userStartAudio();
  }

  //When Mouse click on the fragment position
  if (mouseX >= Fx &&
    mouseX <= (Fx + Flen) &&
    mouseY >= Fy &&
    mouseY <= (Fy + Flen)) {
    i = i + 1;//rolling down the whole letter by clicking
    fragPos.update();

    //to get the location of eating notch
    EatX.push(mouseX);
    EatY.push(mouseY);

    //play music when click
    eatSound.play();

    //flower for filling the eating notch
    flowerX = mouseX;
    flowerY = mouseY;
    flowerW = random(5, 50);//random width
    flowerR = random(180, 255);//random color
    flowerG = random(180, 255);
    flowerB = random(180, 255);
    petal = int(random(6, 17));//random petal number
    delayOn = true;
    console.log(delayOn);
  }

  if (i >= letter.length) {
    i = 0;//repeat
  }
}




function mouseMoved() {

  //to control the transparency of guidance
  if (silenceCount < 0) {
    silenceCount = 0;
  } else {
    silenceCount = silenceCount - 2;
  }

}


/////////////////////////////////Becky's full screen code
function keyPressed() {
  //toggle fullscreen on or off
  if (key == 'f') {

    //get current full screen state https://p5js.org/reference/#/p5/fullscreen
    let fs = fullscreen();

    //switch it to the opposite of current value
    console.log("Full screen getting set to: " + !fs);
    fullscreen(!fs);
  }

}