let r;
let factor = 0;
let factor2 = 0;
let factor3 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = height / 2 - 16;

  setupAudio();
}

function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r/2);
  return v;
}

function draw() {
	let speed = map(mouseX, 0,height,100,5000);
	updateAudio();
	 blendMode(BLEND);
  background(0);
  const total = int(map(ampEase, width, 0, 0, 200));
  factor += ampEase/speed;
    factor2 += ampEase/(speed/2);
     factor3 += ampEase/(speed/3);

	println(ampEase);
  strokeWeight(0.2);
  push()
  blendMode(ADD);
  translate(width / 2, height / 2);
  scale(2);
  stroke(255);

  noFill();
  ellipse(0, 0, r * 2);


  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);
    line(a.x, a.y, b.x, b.y);
  }
  pop()

  push();
    blendMode(ADD);
  translate(width /2, height / 2);
  scale(3);
  stroke(255);

  noFill();
  ellipse(0, 0, r );


  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor2, total);
    line(a.x, a.y, b.x, b.y);
  }
  pop();

  push();
    blendMode(ADD);
  translate(width /2, height / 2);

  stroke(255);

  noFill();
  ellipse(0, 0, r );


  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor2, total);
    line(a.x, a.y, b.x, b.y);
  }
}



// Audio stuff
let mic, amp = 0.0,
	ampStereo = {
		l: 0.0,
		r: 0.0
	},
	ampEase = 0.0;

function setupAudio() {
	mic = new p5.AudioIn();
	mic.start();
}

function updateAudio() {
	amp = mic.getLevel() * 1000; // mixed channels
	ampStereo.l = mic.amplitude.getLevel(0) * 500; // left channel
	ampStereo.r = mic.amplitude.getLevel(1) * 500; // right channel
	ampEase = ease(amp, ampEase, 0.075); // smooth 'amp'
}
