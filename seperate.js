let O = [];
let aa = 0 , c = 0 ;
  let r = 2,count =0,R=20;


function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 4; i++) {
    O[i] = new orb(random(width), random(height));
  }
}

function draw() {
  background(0,10); // trail length
 r = map(sin(c),-1,1,2,50);
 R=60 ;

// fill(25,208,30);          // color all together
    noStroke()
//     stroke(2);
  aa = map(mouseX,0,width,100,10);
  for (let i = 0; i < O.length; i++) {
    O[i].run(O, aa,r);
  }



  let x = sin(c)*150 +width/2;
  let y = cos(c)*150 +height/2;
    if(count%1==0){       // freq of pareticle emission
  O.push(new orb(x, y));
}

  if (O.length>200) {       //
    O.splice(1,2);

}
  c += 0.01 ;
  count+=1;
}

class orb {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r =r;
    this.maxspeed = 10;    // Maximum speed
    this.maxforce = 0.5; // Maximum steering force
  }

  run(O,aa_) {
    this.flock(O,aa_);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(O,aa_) {
    let sep = this.separate(O,aa_); // Separation
    sep.mult(0.5);
    this.applyForce(sep);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  render() {
    fill(25,180,300);
    //noStroke()
    stroke(2);
    //ellipse(this.position.x, this.position.y, R,R/2);   // make all of them of the same size
    ellipse(this.position.x, this.position.y, this.r,this.r);
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  separate(O,aa_) {
    let desiredseparation = aa_;
    let steer = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < O.length; i++) {
      let d = p5.Vector.dist(this.position, O[i].position);
      if ((d > 0) && (d < desiredseparation)) {
        let diff = p5.Vector.sub(this.position, O[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    if (count > 0) {
      steer.div(count);
    }
    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

}
