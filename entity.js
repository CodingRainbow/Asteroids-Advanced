function Entity(x, y, radius)
{
  this.id = -1;
  this.dead = false;
  this.pos = createVector(x, y);
  this.r = radius;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.accelMagnitude = 0;
}

Entity.prototype.registerId = function(id) {
  this.id = id;
}

Entity.prototype.setAccel = function(magnitude)
{
  this.accelMagnitude = magnitude;
}

Entity.prototype.edges = function() {
  if (this.pos.x > width + this.r) {
    this.pos.x = -this.r;
  } else if (this.pos.x < -this.r) {
    this.pos.x = width + this.r;
  }
  if (this.pos.y > height + this.r) {
    this.pos.y = -this.r;
  } else if (this.pos.y < -this.r) {
    this.pos.y = height + this.r;
  }
}

Entity.prototype.setRotation = function(rot) {
  this.rotation = rot;
}

// TODO: Maybe move this to a shape class of some kind so that every entity stores a class that holds all the geometry?
Entity.prototype.collides = function(entity) {
  var dx = this.pos.x - entity.pos.x;
  var dy = this.pos.y - entity.pos.y;
  var dr = this.r + entity.r;
  return dx * dx + dy * dy <= dr * dr;
}

Entity.prototype.collision = function() {}

Entity.prototype.update = function() {
  if (this.dead) {
    return true;
  }

  this.heading += this.rotation;
  // Accelerate using the heading and the accelMagnitude
  var force = p5.Vector.fromAngle(this.heading);
  force.mult(this.accelMagnitude);
  this.vel.add(force);

  this.pos.add(this.vel);
  this.edges();
}

Entity.prototype.render = function() {
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.heading);
  fill(0);
  stroke(255);
  ellipse(this.pos.x, this.pos.y, this.r);
  pop();
}
