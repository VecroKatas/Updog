function Beam(){
  this.x = 0, this.y = 0, this.coord = 0;
  this.horizontal = false, this.beamed = false;
  this.maxTime = .75, this.timer = 0, this.telegraph = .75;

  this.start = function(){
    this.beamed = false;
    this.horizontal = (random(0, 1) < .5);

    if (this.horizontal){
      this.coord = leftx - 30;
      this.x = 0;
      this.y = heart.y - 2.5 * heartScale;
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
        rect(this.coord, this.y - scl /2, 2 * scl, 2 * scl);
      else
        rect(this.x - scl / 2, this.coord, 2 * scl, 2 * scl);
    }
    else{
      fill(255,0,0);
      if (this.horizontal)
        rect(this.x, this.y, w, scl);
      else
        rect(this.x, this.y, scl, h);
    }
  }

  this.update = function() {
    if (frameCount % 15 == 0) {
      this.timer += .25;
    }
  }

  this.BEAMED = function() {
    this.beamed = true;
  }

  this.timerReset = function(){
    this.timer = 0;
  }
}