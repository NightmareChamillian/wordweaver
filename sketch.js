//use a CONTAINER to embed the canvas
const ourTable = [];
const ourRow = [];
//settings variables
var colMultR, colMultB, colMultG;
var ignoreWhite;
var pareMode
var genMode

function setup() {
  console.log("hiii bestie!");
  for(let x=0;x<15;x++){
    ourRow[x] = color(219,219,219);

  }
  var spaceTesty = "!!!";
  console.log("code test: " + spaceTesty.charCodeAt(1));

  ourTable.push(ourRow);

  var ourCanv = createCanvas(604, 1404);//, document.getElementById("theLoom"));
  ourCanv.parent('canvasHolder');

  refreshSettings();
}

function refreshSettings(){
  colMultR = document.getElementById("inputR").value;
  colMultG = document.getElementById("inputG").value;
  colMultB = document.getElementById("inputB").value;
  ignoreWhite = document.getElementById("procWhiteCheck").checked;
  pareMode = document.getElementById("parChoices").value;
  genMode = "avg";//document.getElementById("genChoices").value;
}

var ourString;
var numIterations = 0;

//First-time setup for color weaving
function doWeave(){
  

  if(numIterations > 0){ //don't do setup again
    weaveAgain();
    return;
  }
  numIterations +=1;

  ourString = document.getElementById("textInput").value;
  
  
  
  if(ourString.length >=15){
    ourString = ourString.substring(0, 15)
    for(let x=0; x<15; x++){
      ourTable[0][x] = colorizeChar(ourString.charCodeAt(x));
      //console.log(ourString.charCodeAt(x));
    }
    //exit early in this specific case
    document.getElementById("feedback").innerHTML = "Text received! <br> Beginning with: \""+ ourString
  +"\"<br><br> <button onclick=\"weaveAgain()\">Iterate once more!</button> <br><br>" + 
  "<button onclick=\"weaveFinish()\">Iterate until finish</button><br><br>";
    draw();
    return;
  }

  
  //console.log("TODO: SUPPORT FOR OTHER NUMBERS OF LETTERS!!!!!");
  var spacing = 15 - ourString.length;
  console.log(spacing);
  var spaceCount = 0;

  if(ourString.length % 2 == 1){ //odd number- no "split required"
    spacing/=2;
    //spacing prior
    for(let s1=0;s1<spacing;s1++){
      ourTable[0][spaceCount] = color(219,219,219);
      spaceCount++;  }
    //string itself
    for(let s2=0; s2<ourString.length; s2++){
      ourTable[0][spaceCount] = colorizeChar(ourString.charCodeAt(s2));
      spaceCount++;  }
    //spacing after
    for(let s3=0;s3<spacing;s3++){
      ourTable[0][spaceCount] = color(219,219,219);
      spaceCount++;
    }
    //console.log(ourTable[0]);
    //console.log(ourTable[0].length);

  } else { //even number
    spacing -=1;
    spacing/=2;
    //spacing prior
    for(let s1=0;s1<spacing;s1++){
      ourTable[0][spaceCount] = color(219,219,219);
      spaceCount++;  }
    //string part 1
    for(let s2=0; s2<ourString.length/2; s2++){

      ourTable[0][spaceCount] = colorizeChar(ourString.charCodeAt(s2));

      spaceCount++;  }
    ourTable[0][spaceCount] = color(219,219,219);
    spaceCount++;

    for(let s3=ourString.length/2; s3<ourString.length; s3++){
      ourTable[0][spaceCount] = colorizeChar(ourString.charCodeAt(s3));
      spaceCount++;
    }

    //spacing after
    for(let s4=0;s4<spacing;s4++){
      ourTable[0][spaceCount] = color(219,219,219);
      spaceCount++;
    }
  }
  console.log(ourTable[0]);

  document.getElementById("feedback").innerHTML = "<br>Text received! <br> Beginning with: \""+ ourString
  +"\"<br><br> <button onclick=\"weaveAgain()\">Iterate once more!</button>" + 
  "<button onclick=\"weaveFinish()\">Iterate until finish</button><br><br>";
    draw();

}

function colorizeChar(ourCode){
  //alphanumerics: 97 is lowercase A, 65 uppercase? <- it's normally HEXADECIMAL, dummy
  //33 is excm
  if(ourCode == 32){//space bar
    return(color(219,219,219));
  }

  var colR, colB, colG;
  if(ourCode > 33 && ourCode < 126){ //normal ASCII keyboard inputs. 93 of them
    colR = ourCode * colMultR;
    colB = ourCode * colMultB;
    colG = ourCode * colMultG;
    colR = colR % 255;
    colB = colB % 255;
    colG = colG % 255;
    return(color(colR,colB,colG));
  }

  // colR = ourCode * 821;
  // colB = ourCode * 638;
  // colG = ourCode * 923;
  // colR = colR % 255;
  // colB = colB % 255;
  // colG = colG % 255;
}

// function getR(code){
//   return code * colMultR;
// }

// function getG(code){
//   return code * colMultG;
// }

// function getB(code){
//   return code * colMultB;
// }

//helper function for getting value of an element, includes looping
function getElemCol(index, array){
  
  
  //loop around if we're out of bounds
  if(index < 0)
    index +=15;
  if(index > 14)
    index -=15;
  
  if(!ignoreWhite){
    array.push(ourTable[numIterations - 1][index]);
    return ;
  }

  var theCol = ourTable[numIterations - 1][index];
  if(!(theCol.levels[0] == 219 && theCol.levels[1] == 219 && theCol.levels[2] == 219)){
    array.push(theCol);
  }

  
  

}

//helper function: get parents
function getPares(pareMode,ind){
  var pareSelection = [] 
  switch(pareMode){ //choose our parents
    case "mid":
     getElemCol(ind, pareSelection);

     break;
    case "lef":
       getElemCol(ind - 1, pareSelection);
     break;
    case "rit":
       getElemCol(ind + 1, pareSelection)
     break;
    case "ran": //random
     var ranSel = (Math.floor(Math.random() * 3)) -1;
     //console.log(ranSel);
       getElemCol(ind +  ranSel, pareSelection);
     
     break;
    case "ran2"://yes this has repeats, but i think that's a-okay
     
       getElemCol(ind +  Math.floor(Math.random() * 3) -1, pareSelection);
     
       getElemCol(ind +  Math.floor(Math.random() * 3) -1, pareSelection);
     break;
    case "midL":
       getElemCol(ind, pareSelection);
       getElemCol(ind - 1, pareSelection);
     break;
    case "midR":
       getElemCol(ind, pareSelection);
       getElemCol(ind + 1, pareSelection);
     break;
    case "lefRit":
       getElemCol(ind + 1, pareSelection);
       getElemCol(ind - 1, pareSelection);
     break;
    case "mirA":
      if(ind == 7){
          getElemCol(ind, pareSelection);
      }else if(ind <= 6){
        getElemCol(ind + 1, pareSelection);
      } else{
        getElemCol(ind - 1, pareSelection);
      }
      break;
    case"mirT":
      if(ind == 7){
          getElemCol(ind, pareSelection);
      }else if(ind <= 6){
        getElemCol(ind - 1, pareSelection);
      } else{
        getElemCol(ind + 1, pareSelection);
      }
      break;
    case "all":
       getElemCol(ind, pareSelection);
       getElemCol(ind + 1, pareSelection);
       getElemCol(ind - 1, pareSelection);
     break;
    case "jig":
      if(numIterations % 2 == 0){
        getElemCol(ind + 1, pareSelection);
      } else {
        getElemCol(ind - 1, pareSelection);
      }
      break;
    case "zig": //alternate between split apart and split together
      if(numIterations % 2 == 0){
        if(ind == 7){
            getElemCol(ind, pareSelection);
        }else if(ind <= 6){
          getElemCol(ind + 1, pareSelection);
        } else{
          getElemCol(ind - 1, pareSelection);
        }
      } else {
        if(ind == 7){
          getElemCol(ind, pareSelection);
        }else if(ind <= 6){
          getElemCol(ind - 1, pareSelection);
        } else{
          getElemCol(ind + 1, pareSelection);
        }
      }
      break;
    case "mod2":
      if(ind % 2 == 0){
        getElemCol(ind, pareSelection);
        getElemCol(ind - 1, pareSelection);
      } else {
        getElemCol(ind, pareSelection);
        getElemCol(ind+1, pareSelection);
      }
     break;
    case "chkr":
     if(ind % 2 == 0){
       getElemCol(ind + 1, pareSelection);
     } else {
       getElemCol(ind -1, pareSelection);
     }
    break;
    case "mod3":
     if(ind % 3 == 0){
       getElemCol(ind, pareSelection);
       getElemCol(ind+1, pareSelection);
       getElemCol(ind+2, pareSelection);
     } else if(ind % 3 == 1){
       getElemCol(ind, pareSelection);
       getElemCol(ind+1, pareSelection);
       getElemCol(ind-1, pareSelection);
     }
      else{
        getElemCol(ind, pareSelection);
        getElemCol(ind-1, pareSelection);
        getElemCol(ind-2, pareSelection);
      }
    break;
    default: //should never   happen but safety is always good
      getElemCol(ind, pareSelection);

     break;
  }

  return pareSelection;
}

function getNewColVal(pareSelection,genMode){
  if(pareSelection.length == 0){
    return color(219,219,219);
  }
  var newCol  =[0,0,0];
  switch(genMode){
    case "avg":
      var counter = 0;
      var curColProce;
      for (let v=0;v<pareSelection.length;v++){
        curColProce = pareSelection[v];
        //console.log(curColProce.levels[0]);
        newCol[0]+=curColProce.levels[0];
        newCol[1]+=curColProce.levels[1];
        newCol[2]+=curColProce.levels[2];
        counter++;
      }
        
        newCol[0]/=counter;
        newCol[1]/=counter;
        newCol[2]/=counter;
      break;
    case "smal":
     var curColProce;
     var smal1 = 255;
     var smal2 = 255;
     var smal3 = 255;
     for (let v=0;v<pareSelection.length;v++){
      curColProce = pareSelection[v];
      if (smal1 >curColProce.levels[0]) smal1 = curColProce.levels[0];
      if (smal2 >curColProce.levels[1]) smal2 = curColProce.levels[1];
      if (smal3 >curColProce.levels[2]) smal3 = curColProce.levels[2];

     }
     newCol[0] = smal1;
     newCol[1] = smal2;
     newCol[2] = smal3;
     break;

    case "lar":
     var curColProce;
     var max1= 0;
     var max2= 0;
     var max3 = 0;
     for (let v=0;v<pareSelection.length;v++){
      curColProce = pareSelection[v];
      if (max1 <curColProce.levels[0]) max1 = curColProce.levels[0];
      if (max2 <curColProce.levels[1]) max2 = curColProce.levels[1];
      if (max3 <curColProce.levels[2]) max3 = curColProce.levels[2];

     }
     newCol[0] = max1;
     newCol[1] = max2;
     newCol[2] = max3;
     break;

    default: //just give the last of the array
      var curColProce;
      for (let v=0;v<pareSelection.length;v++){
        curColProce = pareSelection[v];}
      return curColProce;
      break;

  }

  return color(newCol[0],newCol[1],newCol[2]);
  //since a lot of the operations are in color space, but we're in value space,convert newCol back to value
  //var truVal = newCol[0]/
}

function weaveFinish(){
  for(let x=numIterations; x<35; x++){
    weaveAgain();
  }
}

function weaveAgain(){

  refreshSettings();

  colMultR = document.getElementById("inputR").value;
  colMultG = document.getElementById("inputG").value;
  colMultB = document.getElementById("inputB").value;

  if(numIterations >=35){
    return;
  }
  
  //console.log("weaving again! TODO: A LOT!" + numIterations);
  var newRow = []
  for(let x=0;x<15;x++){
    newRow[x] = color(219,219,219);
  }
  var newCol = color(219,219,219);

  //Primary loop:go through all pixels in new row, apply parent rule, applly generation rule
  for(let x=0;x<15;x++){
    //get parent selection
    var pareSelection = getPares(pareMode,x);
    newCol = getNewColVal(pareSelection,genMode);
    newRow[x] = newCol;

  }
  ourTable.push(newRow);
  numIterations+=1;
}

function draw() {
  background(255);

  //working with 15 total blocks
  for(let rows = 0; rows<numIterations; rows++){
    
    
    //begin individual row rendering
    for(let cols = 0; cols <15; cols++){
      noStroke();
        
      fill(ourTable[rows][cols]); //use a bright magenta for shapes for now
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
