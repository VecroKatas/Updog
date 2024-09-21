function Heart() {
  this.x = 0;
  this.y = 0;
  this.speed = .3;
  this.xspeed = 0;
  this.yspeed = 0;
  this.alive = true;

  this.start = function(){
    this.x = w / 2 + heartScale;
    this.y = h / 2 + heartScale;
  }

  this.death = function(){
    console.log("BAAAAAAAAAAAAAAM ");
    this.alive = false;
    delete this;
  }

  this.dir = function(direction) {
    if (direction.x != 0 && direction.y != 0){
      this.xspeed = direction.x * .7;
      this.yspeed = direction.y * .7;
    }
    else{
      this.xspeed = direction.x;
      this.yspeed = direction.y;
    }
  }

  this.update = function() {
    this.x = this.x + this.xspeed * scl * this.speed;
    this.y = this.y + this.yspeed * scl * this.speed;

    this.x = constrain(this.x, leftx + 7 * heartScale, rightx - 4 * heartScale);
    this.y = constrain(this.y, topy + 7 * heartScale, bottomy - 3 * heartScale);

    beams.forEach(beam => {
      if (beam.beamed && (dist(this.x, this.y, this.x, beam.y) < 1.5 * scl || dist(this.x, this.y, beam.x, this.y) < 2 * scl)){
        this.death();
      } 
    })
  }

  this.show = function() {
    fill(255,0,0);

    let pattern = [
      [0, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0]
    ];

    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[i].length; j++) {
        if (pattern[i][j] === 1) {
          rect(this.x + (j - 3) * heartScale, this.y + (i - 3) * heartScale, heartScale, heartScale);
        }
      }
    }
  }
}