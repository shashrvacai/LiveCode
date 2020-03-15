let pSides = 5,
	gap = 20,
	theta = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	setupAudio();
	rectMode(CENTER);
}

function draw() {
	updateAudio();

	pSides = 6,
	gap = 10 ;

	push(); // background
	translate(width / 2, height / 2);
	fill(0, 55);
	rect(0, 0, width, height);
	pop();


	theta = map(sin(ampEase), 0, 500, -TWO_PI,TWO_PI);

	push();
	noFill();
	stroke(255);
	translate(width/2,height/2);
	for(let i = width ; i > 0 ; i-= gap) {
		rotate(theta);
		polygon(0,0,i,pSides);
	}
	pop();

		push();
	noFill();
	stroke(255);
	translate(width/2,height/2);
	for(let i = width ; i > 0 ; i-= gap) {
		rotate(-theta);
		polygon(0,0,i,pSides);
	}
	pop();
//	println(ampEase);


}


function polygon(x_, y_, r_, n_) {
	let angle = TWO_PI / n_;
	beginShape();
	for(let a = 0; a < TWO_PI; a += angle) {
		let sx = x_ + cos(a) * r_;
		let sy = y_ + sin(a) * r_;
		vertex(sx, sy);
	}
	endShape(CLOSE);
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
