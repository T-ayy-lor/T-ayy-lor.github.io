let video;
let faceMesh;
let faces = [];
let triangles;

let lipsExterior = [267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61, 185, 40, 39, 37, 0];
let lipsInterior = [13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 191, 80, 81, 82];

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
  background(0);

  if (faces.length > 0) {
    let face = faces[0];

    // ---- Calculate the bounding box for the lips (using lipsExterior) ----
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (let i = 0; i < lipsExterior.length; i++) {
      let keypoint = face.keypoints[lipsExterior[i]];
      if (keypoint.x < minX) minX = keypoint.x;
      if (keypoint.y < minY) minY = keypoint.y;
      if (keypoint.x > maxX) maxX = keypoint.x;
      if (keypoint.y > maxY) maxY = keypoint.y;
    }
    let lipsWidth = maxX - minX;
    let lipsHeight = maxY - minY;

    // ---- Determine the scale factor to zoom in on the lips ----
    // Adjust the multiplier (here 0.2) as needed for your desired zoom level.
    let scaleFactor = min(width / lipsWidth, height / lipsHeight) * 0.2;

    // Calculate the center of the lips bounding box.
    let lipsCenterX = minX + lipsWidth / 2;
    let lipsCenterY = minY + lipsHeight / 2;

    push();
    // Translate to the lips' center, apply scaling, then translate back.
    translate(lipsCenterX, lipsCenterY);
    scale(scaleFactor);
    translate(-lipsCenterX, -lipsCenterY);

    // --- Create the clipping mask for the lips ---
    drawingContext.save();
    drawingContext.beginPath();
    for (let i = 0; i < lipsExterior.length; i++) {
      let keypoint = face.keypoints[lipsExterior[i]];
      if (i === 0) {
        drawingContext.moveTo(keypoint.x, keypoint.y);
      } else {
        drawingContext.lineTo(keypoint.x, keypoint.y);
      }
    }
    drawingContext.closePath();
    drawingContext.clip();

    // Draw the video. With the transformation above, the video is now scaled 
    // (zoomed in) about the lips’ center. The lips will still move naturally
    // as you move.
    image(video, 0, 0);

    // Remove the clipping mask.
    drawingContext.restore();
    pop();
  }
}
