function setup() {
  var ourCanv = createCanvas(600, 1400);
  let newCanvasY = (windowHeight)/2;
  ourCanv.position = (ourCanv.position.x, newCanvasY + 1700);
}

var testy;

function doWeave(){
  testy = document.getElementById("textInput").value;
  document.getElementById("feedback").innerHTML = testy;
  draw();
}

function draw() {
  background(220);
}
