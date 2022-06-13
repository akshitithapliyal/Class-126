song = "";
scoreRightwrist = 0;
scoreLeftwrist = 0;
rightwrist_X = 0;
rightwrist_Y = 0;
leftwrist_X = 0;
leftwrist_Y = 0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded(){
    console.log("poseNet is intialized and starting");
}

function gotposes(results){
    console.log(results);
    if(results.length > 0){
        scoreRightwrist= results[0].pose.keypoints[10].score;
       
        scoreLeftwrist= results[0].pose.keypoints[9].score;
        console.log("rightwristscore = "+scoreRightwrist+" leftwristscore" + scoreLeftwrist);
        rightwrist_X= results[0].pose.rightwrist.x;
        rightwrist_Y= results[0].pose.rightwrist.y;
        leftwrist_X= results[0].pose.leftwrist.x;
        leftwrist_Y= results[0].pose.leftwrist.y;
        console.log("rightwristX = "+rightwrist_X+" rightwristY = "+rightwrist_Y);
        console.log("leftwristX = "+leftwrist_X+" leftwristY = "+leftwrist_Y);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill(0, 320, 60);
    stroke(0, 30, 35);
    if(scoreLeftwrist>0.2){
        circle(leftwrist_X,leftwrist_Y,20);
        numlwy=Number(leftwrist_Y);
        new_lwy=floor(numlwy * 2);
        lwy=new_lwy/1000;
        document.getElementById("volume").innerHTML="volume is "+ lwy;
        song.setVolume(lwy);
    }
    if(scoreRightwrist>0.2){
        circle(rightwrist_X,rightwrist_Y,20);
        if(rightwrist_Y>0&&rightwrist_Y<=100){
            document.getElementById("speed").innerHTML="speed is 0.5";
            song.rate(0.5);
        } else if(rightwrist_Y>100&&rightwrist_Y<=200){
            document.getElementById("speed").innerHTML="speed is 1x";
            song.rate(1);
    }
    else if(rightwrist_Y>200&&rightwrist_Y<=300){
        document.getElementById("speed").innerHTML="speed is 1.5";
        song.rate(1.5);
}else if(rightwrist_Y>300&&rightwrist_Y<=400){
    document.getElementById("speed").innerHTML="speed is 2";
    song.rate(2);
}else if(rightwrist_Y>400&&rightwrist_Y<=500){
    document.getElementById("speed").innerHTML="speed is 2.5";
    song.rate(2.5);
}
}
}

    function playy(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
