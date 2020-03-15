let factor = 1000,
	xOff = 0.0,
	lineY = 0,
	flipC = 1,
	flip = true;

rot = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
	setupAudio();
	rectMode(CENTER);
}

function draw() {
	nSide = 3;
	updateAudio();

	push();
	translate(width / 2, height / 2);
	blendMode(BLEND);
	noStroke();
	fill(0, 10);
	rect(0, 0, width, height);
	noFill();
	pop();



	blendMode(BLEND);
	xOff += amp / 1000;
	let n = noise(xOff) * width,
		n2 = noise(xOff * 2) * width,
		n3 = noise(xOff * 3) * width;
	let freq = int(map(mouseX, 0, width, 2, 50));
	if(flipC % freq === 0) {
		flip = !flip;
	}
	if(flip) {
		stroke(0);
		fill(255);
	} else {
		stroke(255);
		fill(0);

	}
	push();
	translate(n, height / 2);
	rotate(rot);
	polygon(0, 0, ampEase * 2, nSide); // main polys
	pop();

	push();
	translate(width-n, height / 2);
	rotate(-rot);
   polygon(0, 0, ampEase * 2, nSide); // main polys
	pop();


	blendMode(DIFFERENCE);
	stroke(255, map(ampEase, 0, factor, 0, 255));
	strokeWeight(0.5);
	fill(255);
    rect(width / 2, n, width, 10); // rect
	rect(width / 2, height - n, width, 10); //rect

	// rect(width / 2, n2, width, 10);
	// rect(width / 2, height - n2, width, ampEase * 10);  // rect

	// rect(width / 2, n3, width, 10);
	// rect(width / 2, height - n3, width, ampEase * 100);

	fill(255);
	//rect(random(width), random(height), random(width/2), random(width/2));

	flipC++;
	rot += ampEase / map(mouseY,0,height,0,1000);

}


function polygon(x_, y_, r_, n_) { // CREATES POLYGON WITH ANY NUM OF SIDES
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
