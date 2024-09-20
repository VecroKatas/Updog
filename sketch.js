var heart;
var scl = 10;
var heartScale = scl / 4;
var direction;
var boxWidth = 300, boxHeight = 200;
var w = 700, h = 700;
var leftx = (w - boxWidth) / 2, rightx = (w - boxWidth) / 2 + boxWidth;
var topy = (h - boxHeight) / 2, bottomy = (h - boxHeight) / 2 + boxHeight;
var beams = [];
var timer = 0, interval = 60;

function setup() {
  createCanvas(w, h);
  heart = new Heart();
  direction = createVector(0, 0);
  frameRate(60);
  heart.start();
}

function draw() {
  if (frameCount % interval == 0){
    interval = random(15, 45);
  }
  if (frameCount % 60 == 0){
    timer++;
  }

  background(51);
  heart.update();
  drawBorders();
  heart.show();
  BEAM();
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
  text('Timer: ' + timer + ' s.', 20, 20);
}

function keyPressed() {
  directionChange(1);
}

function keyReleased(){
  directionChange(-1);
}

function directionChange(key){
  if (keyCode === UP_ARROW || keyCode === 87) {
    direction.y -= 1 * key;
  } 
  if (keyCode === DOWN_ARROW || keyCode === 83) {
    direction.y += 1 * key;
  }
  if (keyCode === RIGHT_ARROW || keyCode === 68) {
    direction.x += 1 * key;
  }
  if (keyCode === LEFT_ARROW || keyCode === 65) {
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

function BEAM(){
  if (frameCount % 60 == 0) {
    console.log('MIKU MIKU BEAAAAAAMMMMMMMMMMMMMMM');
    createBeam();
  }
}

function createBeam(){
  var beam = new Beam();
  beam.start();
  beams.push(beam);
}