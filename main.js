song_1 = "";
song_2 = "";


leftwristx = 0;
leftwristy = 0;

rightwristx = 0;
rightwristy = 0;

leftwristscore = 0;
rightwristscore = 0;
song_1_status = "";
song_2_status = ""; 
function preload() {
    song_1 = loadSound("avenger.mp3");
    song_2 = loadSound("harry_potter.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet("video", modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftwristscore = results[0].pose.keypoints[9].score;
        
        rightwristscore = results[0].pose.keypoints[10].score;
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("left wrist x =" + leftwristx + "left wrist y =" + leftwristy);
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("right wrist x =" + rightwristx + "right wrist y =" + rightwristy);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song_1_status = song_1.isPlaying();
    song_2_status = song_2.isPlaying();
    fill("red");
    stroke("black");
   if(rightwristscore > 0.2)
   {
    circle(rightwristx, rightwristy, 20);
    song_2.stop();
    if(song_1_status == false)
    {
        song_1.play();
        document.getElementById("song_name").innerHTML = "song playing is Avengers song";
    
    }

   }
    if (leftwristscore > 0.2) {
        circle(leftwristx, leftwristy, 20);
        song_1.stop();
        if(song_2_status == false)
        {
            song_2.play();
            document.getElementById("song_name").innerHTML = "Harry Potter song is playing";

        }
    }
}
