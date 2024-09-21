function Beam(){
  this.x = 0, this.y = 0, this.coord = 0;
  this.horizontal = false, this.beamed = false;
  this.maxTime = .4, this.timer = 0, this.telegraph = .4;

  let beamWidth = 0, beamHeight = 0;
  let maxBeamWidth = 3 * scl, maxBeamHeight = 3 * scl;
  let beamOpacity = 255;
  let easingAmount = .25;
  let stage = 0;
  let holdTime = 5;
  let holdCounter = 0;

  this.start = function(){
    this.beamed = false;
    this.horizontal = (random(0, 1) <= 0.5);

    if (this.horizontal){
      this.coord = leftx - 30;
      this.x = 0;
      this.y = heart.y - heartScale;
    }
    else{
      this.coord = topy - 30;
      this.x = heart.x - 1.5 * heartScale;
      this.y = 0;
    }
  }

  this.show = function() {
    if (!this.beamed){
      fill(0,250,154);
      if (this.horizontal)
        rect(this.coord, this.y - 3 * heartScale, 2 * scl, 2 * scl);
      else
        rect(this.x - scl / 2, this.coord, 2 * scl, 2 * scl);
    }
    else{
      if (this.horizontal){
        if (stage === 0) {
          beamHeight = easeIn(beamHeight, maxBeamHeight);
          if (beamHeight >= maxBeamHeight - 1) stage = 1;
        } else if (stage === 1) {
          holdCounter++;
          if (holdCounter >= holdTime) stage = 2; 
        } else if (stage === 2) {
          beamHeight = easeOut(beamHeight, 0);
          beamOpacity -= 5;
        }
        beamWidth = height;
      }
      else{
        if (stage === 0) {
          beamWidth = easeIn(beamWidth, maxBeamWidth);
          if (beamWidth >= maxBeamWidth - 1) stage = 1;
        } else if (stage === 1) {
          holdCounter++;
          if (holdCounter >= holdTime) stage = 2; 
        } else if (stage === 2) {
          beamWidth = easeOut(beamWidth, 0);
          beamOpacity -= 5;
        }
        beamHeight = height;
      }
      drawBeam(this.x, this.y, beamWidth, beamHeight, this.horizontal);
    }
  }

  this.update = function() {
    if (frameCount % 3 == 0) {
      this.timer += .05;
    }
  }

  this.BEAMED = function() {
    this.beamed = true;
  }

  this.timerReset = function(){
    this.timer = 0;
  }

  function drawBeam(x, y, beamW, beamY, horizontal) {
    fill(0, 255, 255, beamOpacity);
    if (horizontal)
      rect(x, y - beamY / 2 + 2 * heartScale, beamW, beamY);
    else
      rect(x - beamW / 2 + 2 * heartScale, y, beamW, beamY);
  }

  function easeIn(value, target) {
    let diff = target - value;
    return value + diff * easingAmount;
  }

  function easeOut(value, target) {
    let diff = value - target;
    return value - diff * easingAmount;
  }
}