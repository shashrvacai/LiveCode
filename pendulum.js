var a,a_vel = 0, l,m, x, y, movable,lastPos = [], pointsToKeep = [], centerX, centerY;
var scaleOfPendulum, lastSecond, lastMillis;

function setup() {
  createCanvas(windowWidth,windowHeight);
  a = PI;
  centerX = width/2;
  centerY = 0
  scaleOfPendulum = min(height,width)*.01
  l = scaleOfPendulum*30
  setupAudio();
}

function draw() {

	updateAudio()
//	println(fft[100])
  update();
  //moveSeconds();
  background(51,10);
  //
  pendy(100,100);
  pendy(50,10,1);
  pendy(5,255);

}

function pendy(l_,b_,c_){
   l = scaleOfPendulum*l_
  var angle = p5.Vector.fromAngle(a,l);
  x = centerX+angle.x+fft[l_];
  y = centerY+angle.y+ fft[l_];


  headPoint = new createAngledVector(x,y,calcTrueA(a),abs(a_vel));
  pointsToKeep.push(headPoint);
  if(pointsToKeep.length>10){
    pointsToKeep.shift();
  }
  for (var i = 0; i < pointsToKeep.length; i++) {
    var color = pointsToKeep[i].a*255;
    var color2 = pointsToKeep[i].a_vel*255;
    if(c_==1){
   stroke(color,255-color2,b_,(i+1)/pointsToKeep.length*60);
    }else{
      stroke(color,color2,b_,(i+1)/pointsToKeep.length*60);
    }
    strokeWeight(scaleOfPendulum*6*(i+1)/pointsToKeep.length)
    point(pointsToKeep[i].x,pointsToKeep[i].y);

  }
  point(x,y);

}

function moveSeconds(){
  if(lastSecond != second()){
    lastSecond = second();
    lastMillis = millis();
  }

  a = second()  * PI / 6 + 2*PI/60/100*(millis()-lastMillis);
}

function update(){
  a_vel = a_vel - sin(a-PI/2)/l;
  a_vel = a_vel ;
  a = a + a_vel;
}

function calcTrueA(angle){
  if(angle<=0){

		 while(angle<=-PI){
    angle = angle+2*PI;
  	}
    trueA = 2*PI+angle;

  } else {
		while(angle>PI){
    angle = angle-2*PI;
  }
    trueA = angle;
  }
  return trueA;
}

function createAngledVector(x,y,a,a_vel){
  this.x = x;
  this.y = y;
  this.a = a;
  this.a_vel = a_vel;
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
	fftRaw = new p5.FFT(0.75, numBins);
	fftRaw.setInput(mic);
}

function updateAudio() {
	fftRaw.analyze();
	amp = mic.getLevel() * 1000; // average mixed amplitude
	ampStereo.l = mic.amplitude.getLevel(0) * 500; // average left amplitude
	ampStereo.r = mic.amplitude.getLevel(1) * 500; // average right amplitude

	waveform = fftRaw.waveform(); // array (-1, 1)
	fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)); // array (0, 255)
}
