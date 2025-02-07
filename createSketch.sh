#!/bin/bash
# This script creates a folder for a new p5.js sketch with a corresponding HTML file.

# Check if a sketch name was provided as an argument
if [ -z "$1" ]; then
    echo "Usage: ./createSketch.sh <sketchName>"
    exit 1
fi

SKETCH_NAME=$1

# Create a folder with the sketch name
mkdir "$SKETCH_NAME"

# Create the HTML file with p5.js linked
cat > "$SKETCH_NAME/$SKETCH_NAME.html" <<EOF
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$SKETCH_NAME</title>
    <link rel="stylesheet" href="../style.css">
  </head>
  <body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  <script src="sketch.js"></script>
  </body>
</html>
EOF

# Create the sketch.js file with basic p5.js code
cat > "$SKETCH_NAME/sketch.js" <<EOF
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
EOF

echo "Created folder '$SKETCH_NAME' with $SKETCH_NAME.html and sketch.js."