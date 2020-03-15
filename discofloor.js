var cells = [];
var cellW = 15;
var cellH = 15;
var nbCellW;
var nbCellH;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSB, 1);

  nbCellW = floor(width / cellW);
  nbCellH = floor(height / cellH);

  for (var i = 0; i < nbCellW*nbCellH; i ++) {
    cells.push(createVector(0, 0));
  }
}

function  draw() {
	//map

  for(let i = 0; i < fft.length; i++) {
  let freq = fft[i]; // (0, 255);
  let x = map(i, 0, fft.length, 0, width);
  let w = width / fft.length;
  rect(x, height, w, -freq);
}
  var deltaMouse = createVector(mouseX - pmouseX, mouseY - pmouseY);
  for (var i = 0; i < nbCellW; i ++) {
    for (var j = 0; j < nbCellH; j ++) {
      var k = i+j*nbCellW;
      var x =  cellW * i + cellW/2;
      var y =  cellH * j + cellH/2;
      var d = Math.max(1, dist(width/2, height/2, x, y));

      deltaMouse.normalize();
      deltaMouse.mult(1/(d*30));
      cells[k].add(deltaMouse);
      cells[k].limit(10);

      var h = map(cells[k].heading(), -PI, PI, 0, 1);
      var b = min(cells[k].mag()*100, 10);
      fill(h, 1, b);

      rect(x, y, cellW, cellH);

      cells[k].mult(.97);
    }
  }
}

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
