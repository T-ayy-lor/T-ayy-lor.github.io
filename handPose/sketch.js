let video;
let faceMesh;
let faces = [];
let triangles;

function preload() {
  faceMesh = ml5.handPose();
}

function gotFaces(results) {
  faces = results;
}

function mousePressed() {
  console.log(faces);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getConnections();
}

function draw() {
  background(220);
  image(video, 0, 0);

  if (faces.length > 0) {
    for (let hand of faces) {
      if (hand.confidence > 0.1) {
        for (let i = 0; i < triangles.length; i++) {
          let pointAIndex = triangles[i][0];
          let pointBIndex = triangles[i][1];
          let pointA = hand.keypoints[pointAIndex];
          let pointB = hand.keypoints[pointBIndex];
          stroke(0, 255, 0);
          strokeWeight(2);
          line(pointA.x, pointA.y, pointB.x, pointB.y);
        }
      }
    }

    for (let hand of faces) {
      if (hand.confidence > 0.1) {
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];
          if (hand.handedness == "Left") {
            fill(255, 0, 0); // left hand red
          } else {
            fill(0, 0, 255); // right hand blueeeeeeeeeeee
          }
          noStroke();
          circle(keypoint.x, keypoint.y, 6);
        }
      }
    }
  }
}
