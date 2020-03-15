
	let xOff = 0.0
	let a =0 ;
function setup() {
	createCanvas(windowWidth, windowHeight);

	setupAudio();
}

function draw() {
	updateAudio();
		 blendMode(BLEND)
	background(0,5);
	noFill();
	stroke(255);

//fft[100]
   for(let k = 10 ; k<=250;k+=10){

	let y = sin(a)*height/2+height/2;
	  	fill(k,125,k,25)
   	  ellipse(map(k,120,0,10,width),y, fft[k]*2,fft[k]*2);
   	   	fill(100,k,100,20);
   	  	ellipse(map(k,0,120,10,width),height-y, fft[k],fft[k]);

   }

   blendMode(DIFFERENCE)
			xOff += amp / 1000;
			let n = noise(xOff) * width
	//	stroke(255);
	strokeWeight(0.5);

//	rect(0, height - n, width, 50); //rect

	a += amp/100;
}

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
	fftRaw = new p5.FFT(0.85, numBins);
	fftRaw.setInput(mic);
}

function updateAudio() {
	fftRaw.analyze();
	amp = mic.getLevel() * 1000; // average mixed amplitude
	ampStereo.l = mic.amplitude.getLevel(0) * 500; // average left amplitude
	ampStereo.r = mic.amplitude.getLevel(1) * 500; // average right amplitude

	//ampEase = ease(amp, ampEase, 0.075); // smooth 'amp'
	waveform = fftRaw.waveform(); // array (-1, 1)
	fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)); // array (0, 255)
}
