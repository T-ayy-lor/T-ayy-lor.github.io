let video;
let bodyPose;
let poses = [];
let connections;

function preload() {
  bodyPose = ml5.bodyPose("MoveNet");
}

function gotPoses(results) {
  poses = results;
}

function mousePressed() {
  console.log(poses);
}

function setup() {
  createCanvas(600, 480);
  video = createCapture(VIDEO);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();
  console.log(connections);
}

function draw() {
  background(220);
  image(video, 0, 0);

  if (poses.length > 0) {
    let pose = poses[0];

    // let x = pose.nose.x;
    // let y = pose.nose.y;
    // fill(255, 0, 0);
    // circle(x, y, 20);

    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let keypoint = pose.keypoints[i];
    //   fill(0, 0, 255);
    //   noStroke();
    //   if (keypoint.confidence > 0.1) {
    //     circle(keypoint.x, keypoint.y, 12);
    //   }
    // }

    for (let i = 0; i < connections.length; i++) {
      let connection = connections[i];
      let a = connection[0];
      let b = connection[1];
      let keyPointA = pose.keypoints[a];
      let keyPointB = pose.keypoints[b];

      let confA = keyPointA.confidence;
      let confB = keyPointB.confidence;

      if (confA > 0.1 && confB > 0.1) {
        stroke(0, 255, 0);
        strokeWeight(4);
        line(keyPointA.x, keyPointA.y, keyPointB.x, keyPointB.y);
      }
    }
  }


}
