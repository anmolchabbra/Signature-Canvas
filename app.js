const canvas = document.getElementById('signatureCanvas');
const context = canvas.getContext('2d');

let isDrawing = false;

//Adding event listener for mouse interactions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Function to start drawing when the mouse is pressed down
function startDrawing(e) {
  // Set isDrawing to true when the mouse is pressed down
  isDrawing = true;
  // Call the draw function to begin drawing
  draw(e);
}

function stopDrawing(e) {
  isDrawing = false;
  // Start a new path to separate consecutive lines
  context.beginPath();
}

function draw(e) {
  if (!isDrawing) return;

  //Set up the drawing style
  context.lineWidth = 2;
  context.lineCap = 'round';
  context.strokeStyle = 'black';

  //Draw line
  context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  context.stroke();

  //Begin a new path to start a new line
  context.beginPath();
  //Moves the drawing point to the current mouse position, preparing for the next line.
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)

}

//Function to clear canvas
function clearCanvas() {
  //Clear the entire canvas by filing it with transparent color
  context.clearRect(0, 0, canvas.width, canvas.height);
}

//function to download signature in various formats
function downloadSignature() {
  const selectedFormat = document.getElementById('downloadFormat').value;
  const dataURL = canvas.toDataURL(`image/${selectedFormat}`);
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = `signature.${selectedFormat}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}