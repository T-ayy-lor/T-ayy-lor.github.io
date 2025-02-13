let video;
let handPose;
let hands = [];
let connections;

function preload() {
  handPose = ml5.handPose();
}

function gotHands(results) {
  hands = results;
}

function mousePressed() {
  console.log(hands);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handPose.detectStart(video, gotHands);
  connections = handPose.getConnections();
}

function draw() {
  background(220);
  image(video, 0, 0);

  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        for (let i = 0; i < connections.length; i++) {
          let pointAIndex = connections[i][0];
          let pointBIndex = connections[i][1];
          let pointA = hand.keypoints[pointAIndex];
          let pointB = hand.keypoints[pointBIndex];
          stroke(0, 255, 0);
          strokeWeight(2);
          line(pointA.x, pointA.y, pointB.x, pointB.y);
        }
      }
    }

    for (let hand of hands) {
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
