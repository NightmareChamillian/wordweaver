//use a CONTAINER to embed the canvas
const ourTable = [];
const ourRow = [];

function setup() {
  console.log("hiii bestie!");
  for(let x=0;x<15;x++){
    ourRow[x] = 32;

  }
  var spaceTesty = "!!!";
  console.log("code test: " + spaceTesty.charCodeAt(1));

  ourTable.push(ourRow);

  var ourCanv = createCanvas(604, 1404);//, document.getElementById("theLoom"));
  ourCanv.parent('canvasHolder');
}

var ourString;
var numIterations = 0;

//First-time setup for color weaving
function doWeave(){
  

  if(numIterations >0){ //don't do setup again
    weaveAgain();
  }
  numIterations +=1;

  ourString = document.getElementById("textInput").value;
  
  
  
  if(ourString.length >=15){
    ourString = ourString.substring(0, 15)
    for(let x=0; x<15; x++){
      ourTable[0][x] = ourString.charCodeAt(x);
      //console.log(ourString.charCodeAt(x));
    }
    document.getElementById("feedback").innerHTML = "Text received! <br> Beginning with: \""+ ourString
  +"\"<br><br> <button onclick=\"weaveAgain()\">Iterate once more!</button> <br><br>";
    draw();
    return;
  }

  
  console.log("TODO: SUPPORT FOR OTHER NUMBERS OF LETTERS!!!!!");
  // var spacing = 15 - ourString.length;
  // if(ourString.length % 2 == 1){ //odd number- no "split required"

  // } //else { //even number

  // }


  //document.getElementById("feedback").innerHTML = "Text received! <br> Beginning with: \""+ ourString
 // +"\"<br><br> <button onclick=\"weaveAgain()\">Iterate once more!</button> <br><br>";
  //draw();
}

function colorizeChar(ourCode){
  //alphanumerics: 97 is lowercase A, 65 uppercase? <- it's normally HEXADECIMAL, dummy
  //33 is excm
  if(ourCode == 32){//space bar
    return(color(219,219,219));
  }

  var colR, colB, colG;
  if(ourCode < 33 && ourCode > 126){ //normal ASCII keyboard inputs. 93 of them
    colR = ourCode * 12;
    colB = ourCode * 8;
    colG = ourCode *80;
    colR = colR % 255;
    colB = colB % 255;
    colG = colG % 255;
    return(color(colR,colB,colG));
  }

  
}



function weaveAgain(){
  if(numIterations >=35){
    return;
  }
  numIterations+=1;
  console.log("weaving again!" + numIterations);
}

function draw() {
  background(255);

  //working with 15 total blocks
  for(let rows = 0; rows<numIterations; rows++){
    

    //begin individual row rendering
    for(let cols = 0; cols <15; cols++){
      noStroke();
      fill(color(192, 0, 215)); //use a bright magenta for shapes for now
      square(cols * 40, rows * 40, 40);
      //end individual row rendering
    }

  }


  //draw horizontal lines
  lineColor = color(50,50,50);
  stroke(lineColor);
  strokeCap(SQUARE);
  strokeWeight(4);
  for(let spac = 2; spac<605; spac+=40){
    line(spac, 0, spac, 1404);
  }

  //draw vertical lines
  lineColor = color(50,50,50);
  stroke(lineColor);
  strokeCap(SQUARE);
  strokeWeight(4);
  for(let spac = 2; spac<1405; spac+=40){
    line(0, spac, 604, spac);
  }
}
