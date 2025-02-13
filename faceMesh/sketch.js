let video;
let faceMesh;
let faces = [];
let triangles;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1 });
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
  triangles = faceMesh.getTriangles();
  console.log(triangles);
}

function draw() {
  background(220);
  image(video, 0, 0);

  if (faces.length > 0) {
    // draw skeleton
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      for (let j = 0; j < triangles.length; j++) {
        let indices = triangles[j];
        let pointAIndex = indices[0];
        let pointBIndex = indices[1];
        let pointCIndex = indices[2];
        let pointA = face.keypoints[pointAIndex];
        let pointB = face.keypoints[pointBIndex];
        let pointC = face.keypoints[pointCIndex];

        noFill();
        stroke(0, 255, 0);
        strokeWeight(0.5);
        triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y);
      }
    }

    // draw keypoints
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      for (let j = 0; j < face.keypoints.length; j++) {
        let keypoint = face.keypoints[j];
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 2);
      }
    }

    // draw mirrored skeleton
    push();
    translate(width, 0);
    scale(-1, 1);
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      for (let j = 0; j < triangles.length; j++) {
        let indices = triangles[j];
        let pointAIndex = indices[0];
        let pointBIndex = indices[1];
        let pointCIndex = indices[2];
        let pointA = face.keypoints[pointAIndex];
        let pointB = face.keypoints[pointBIndex];
        let pointC = face.keypoints[pointCIndex];

        noFill();
        stroke(0, 255, 0);
        strokeWeight(0.5);
        triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y);
      }
    }
    pop();

    // draw mirrored keypoints
    push();
    translate(width, 0);
    scale(-1, 1);
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      for (let j = 0; j < face.keypoints.length; j++) {
        let keypoint = face.keypoints[j];
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 2);
      }
    }
    pop();




  }
}
