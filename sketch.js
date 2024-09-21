var heart;
var scl = 10;
var heartScale = scl / 4;
var direction;
var boxWidth = 300, boxHeight = 200;
var w = 700, h = 700;
var leftx = (w - boxWidth) / 2, rightx = (w - boxWidth) / 2 + boxWidth;
var topy = (h - boxHeight) / 2, bottomy = (h - boxHeight) / 2 + boxHeight;
var beams = [];
var timer = 0, interval = 60, topTime = 0, frameCounter = 0;

function setup() {
  createCanvas(w, h);
  heart = new Heart();
  direction = createVector(0, 0);
  frameRate(50);
  heart.start();
}

function draw() {
  if (heart.alive){
    if (timer <= .1) {
      direction.x = 0;
      direction.y = 0;
    }
    
    if (frameCount % 2 == 0){
      timer += .04;
    }
    
    frameCounter++;

    background(51);
    heart.update();
    drawBorders();
    heart.show();
    BEAM(heart);
    beams.forEach(beam => {
      beam.update();
      if (beam.timer >= beam.telegraph && !beam.beamed){
        beam.BEAMED();
        beam.timerReset();
      }
      else if (beam.timer >= beam.maxTime) {
        beams.splice(beams.indexOf(beam), 1);
        delete beam;
      }
      beam.show();
    });
  
    textAlign(LEFT, TOP);
    textSize(30);
    text('Time: ' + timer.toFixed(2) + ' s.', 20, 20);
    text('Top time: ' + topTime.toFixed(2) + ' s.', 20, 45);
  }
  else {
    if (timer != 0 && timer > topTime) topTime = timer;
    timer = 0;
    beams.forEach(beam => {
      beams.splice(beams.indexOf(beam), 1);
      delete beam;
    });
  
    background(51);
    fill(255,0,0);
    textAlign(CENTER, CENTER);
    textSize(50);
    text('TOO BAD GET OWNED', width / 2, height / 2);
  }
}

function BEAM(){
  console.log(interval);
  if (frameCounter % interval == 0) {
    interval = floor(random(60 - timer, 70 - timer));
    frameCounter = 0;
    console.log('MIKU MIKU BEAAAAAAMMMMMMMMMMMMMMM');
    createBeam();
  }
}

function createBeam(){
  var beam = new Beam();
  beam.start();
  beams.push(beam);
}

function keyPressed() {
  if (heart.alive)
    directionChange(1);
}

function keyReleased(){
  if (heart.alive)
    directionChange(-1);
  if (!heart.alive) {
    setup();
  }
}

function directionChange(key){
  if (keyCode === UP_ARROW || keyCode === 87) {
    if (key == 1)
      direction.y -= 1 * key;
    else if (key == -1 && direction.y != 0)
      direction.y -= 1 * key;
  } 
  if (keyCode === DOWN_ARROW || keyCode === 83) {
    if (key == 1)
      direction.y += 1 * key;
    else if (key == -1 && direction.y != 0)
      direction.y += 1 * key;
  }
  if (keyCode === RIGHT_ARROW || keyCode === 68) {
    if (key == 1)
      direction.x += 1 * key;
    else if (key == -1 && direction.x != 0)
      direction.x += 1 * key;
  }
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    if (key == 1)
      direction.x -= 1 * key;
    else if (key == -1 && direction.x != 0)
      direction.x -= 1 * key;
  }

  if (direction.x > 0) direction.x = 1;
  else if (direction.x < 0) direction.x = -1;
  
  if (direction.y > 0) direction.y = 1;
  else if (direction.y < 0) direction.y = -1;

  heart.dir(direction);
}

function drawBorders(){
  fill(180);
  noStroke();
  rect(leftx, topy, boxWidth, scl);
  rect(leftx, topy, scl , boxHeight);
  rect(rightx, topy, scl , boxHeight);
  rect(leftx, bottomy, boxWidth + scl, scl);
}