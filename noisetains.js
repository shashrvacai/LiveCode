f=0
b= 300 ;
vount = 0 ;

function setup(){
  createCanvas(windowWidth,windowHeight)
  setupAudio();
}

function draw(){
	updateAudio();
	v=vertex
	f++
	background(0,10)

	for(y=00;y<windowHeight;y+=75) {
	//	fill(0)
		 if (vount%2 ==0) {fill(0)} else{fill(255)}
		 blendMode(BLEND);
		stroke(255)
		beginShape()
		for(x=0;x<windowWidth;++x)
			v(x,y-(ampEase*3)/(1+pow(x-mouseX,4)/10e9)*noise(x/ampEase*3+f/500-y))
		v(x,1e4)
		endShape()
		vount +=1 ;
	}
	for( i= 50 ; i < width ;i +=150){
			for( j= 50 ; j < height ;j +=150){
		blendMode(DIFFERENCE)
		ellipse(i,j,10*ampEase,10*ampEase);
		ellipse(i,j,10*(ampEase/3),10*(ampEase/3));
			}
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

 
