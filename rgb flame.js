let kMax;
let step;
let n = 8; // number of blobs
let radius = 0; // diameter of the circle
let inter = 0.1; // difference between the sizes of two blobs
let maxNoise = 500;
 let t =10 ;

let noiseProg = (x) => (x);

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colorMode(HSB, 1);
	angleMode(DEGREES);
  noFill();
	//noLoop();
	kMax = random(0.6, 2.0);
	step = 0.0001;
	noStroke();
}

function draw() {
	kMax = 1.5
	step = .01;
	n= 10 ;
	maxNoise = 750;

	blendMode(BLEND);
  background(0);
	blendMode(ADD);
  t = frameCount/500
  for (let i = n; i > 0; i--) {
		let alpha = pow(1 - noiseProg(i / n), 2);
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * noiseProg(i / n);

		fill(255, 50, 0, alpha*255);
    blob(size, width/2, height/2, k, t - i * step, noisiness);

		fill(0, 255, 150, alpha*255);
   blob(size, width/2-100, height/2, k, t - i * step + 1, noisiness);

		fill(0, 0, 255, alpha*255);
    blob(size, width/2+100, height/2, k, t - i * step + 2, noisiness);

  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 12;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;

    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }

		r1 = cos(theta)+1;
		r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}


	// for(let i = 0; i < fft.length; i++) {
	// 	let freq = fft[i]; // (0, 255);
	// 	let x = map(i, 0, fft.length, 0, width);
	// 	let w = width / fft.length;
	// 	rect(x, height, w, -freq);
	// }


/* AUDIO INIT */
let mic, fftRaw, fft = [],
	waveform = [],
	amp = 0.0,
	ampStereo = {
		l: 0.0,
		r: 0.0
	},
	ampEase = 0.0,
	numBins = 512,
	bands = 12;

function setupAudio() {
	userStartAudio();
	mic = new p5.AudioIn();
	mic.start();
	fftRaw = new p5.FFT(0.75, numBins);
	fftRaw.setInput(mic);
}

function updateAudio() {
	fftRaw.analyze();
	amp = mic.getLevel() * 1000; // average mixed amplitude
	ampStereo.l = mic.amplitude.getLevel(0) * 500; // average left amplitude
	ampStereo.r = mic.amplitude.getLevel(1) * 500; // average right amplitude
	ampEase = ease(amp, ampEase, 0.075); // smooth 'amp'
	waveform = fftRaw.waveform(); // array (-1, 1)
	fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)); // array (0, 255)
}
