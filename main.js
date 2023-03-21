

let spaceStillDown = false;
let timerIsReady = false;
let counter = 0;
//let timerText = document.getElementsByClassName("time");
const timerText = document.getElementsByClassName("time")[0];
const logo = document.getElementsByClassName("logo")[0];
const header = document.getElementsByClassName("header")[0];
const list = document.getElementsByClassName("list")[0];
const ao5 = document.getElementsByClassName("ao5")[0];
const ao12 = document.getElementsByClassName("ao12")[0];

let timerIsRunning = false;
let timerCounter = 0;
let timeText;
let interval = setInterval(timerCount, 10);
clearInterval(interval);
//creating an array of buttons for the list
let buttonsArray = [];
let numberOfRows = 0;

//li list
let liList = [];

//time array
let timeArray = [];
//timer text array
let timerTextArray = [];
//ao5 array
let ao5Array = [];
let ao5TextArray = [];
//ao12 array
let ao12Array = [];
let ao12TextArray = [];

//best variables
let bestTime = "-";
let bestAo5 = "-";
let bestAo12 = "-";

//scramble
let firstScramble = newScramble();
let currentScramble = firstScramble;
let previousScramble = "";
let nextScramble = newScramble();
const scrambleText = document.querySelector(".scramble");
const previousScrambleButton = document.querySelector(".previousButton");
const nextScrambleButton = document.querySelector(".nextButton");
scrambleText.innerHTML = currentScramble;
let previousIsClicked = true;
//scrable array
let scrambleArray = [];

//Making the timer
document.addEventListener("keydown",function(event){
    //If the spacebar is held down
    if (event.keyCode===32){
      //When the space bar is held down, it adds 1 to the timer (every frame update?)
      counter++;
      //output the counter to console to check
      console.log(counter);

      //The timer font should turn red, if the counter is less than 5
      if (counter<5){
        //Adds redText class
        timerText.classList.add("redText");
      } else {
        //If the timer isnt running
        if (!timerIsRunning){
          //Adds greenText class and centered class
          timerText.classList.add("greenText");
          timerText.classList.add("centered");
          //The rest of the screen becomes blank, adds hidden class
          logo.classList.add("hidden");
          header.classList.add("hidden");
          list.classList.add("hidden");
          ao5.classList.add("hidden");
          ao12.classList.add("hidden");
          //The text is also set to 0.00
          timerText.innerHTML = "0.00";
        } else {
          //timer is running, so it must stop next time space key is pressed
          //stops the timer
          //console.log("stopped");
          clearInterval(interval);

          //Text is set to hundreths
          if (timerCounter/6000>=1){
            //console.log("minutes");
        
            //the seconds after a minute is written 1:01:00 not 1:1:00
            //So I must check if the remainder is less than 1000 (or 10 seconds)
            //If yes, add a '0' string before the remaning seconds
            if((timerCounter%6000)<1000){
              //if less than 10 seconds add a 0 before the seconds
              timeText = (Math.floor((timerCounter/6000))).toString() //minutes
              +":"+
              "0"+
              ((timerCounter%6000)/100);//seconds
            } else {
              timeText = (Math.floor((timerCounter/6000))).toString() //minutes
              +":"+
              ((timerCounter%6000)/100);//seconds
            }
          } else {
            //otherwise, just show the seconds
            timeText = (timerCounter/100).toString();
          }
          
          if (timerCounter%10==0){
            //if multiple of 10 add a 0 at the end
            timeText
          }

          //4 seconds should be 4.10 not 4.1
          if (timerCounter%10==0){
            //if multiple of 10 add a 0 at the end
            timeText+="0";
          }

          //sets the text of the timerText
          timerText.innerHTML = timeText;

          //timer is not longer running
          timerIsRunning=false;

          //now everything must be reset back
          counter = 0;
          //removes added classes
          timerText.classList.remove("centered");
          logo.classList.remove("hidden");
          header.classList.remove("hidden");
          list.classList.remove("hidden");
          ao5.classList.remove("hidden");
          ao12.classList.remove("hidden");
          
          //Creates a new row
          addListRow();

          //testing that the scroll works if the list is filled up
          /*
          for(let i=0; i<50;i++){
            addListRow();
          }
          */
         
          

          //Reset the time
          timerCounter=0;
        }

        
      }
    }
});
document.addEventListener("keyup",function(event){
  //If the spacebar is up
  if (event.keyCode===32){
    console.log("key is up");
    //When the space bar is up, it checks if the counter is less than 5
    //if less than 5, counter resets and font colour goes back to normal (from red)
    if (counter<5){
      counter=0;
      timerText.classList.remove("redText");
    } else {
        //Timer is running
        timerIsRunning=true;
        //the font goes back to black
        timerText.classList.remove("greenText");
        timerText.classList.remove("redText");

        //The timer starts
        interval = setInterval(timerCount, 10);
    }
  }
});

function timerCount(){
  //adds a hundreth each time
  //timerCounter+=0.01;
  //this have me a bug where the number is 11.999999999 instead of 12 and etc.
  //so instead I add 1 and divide by 100 to show hundreths
  timerCounter++;
  //console.log(timerCounter);

  //The timer looks nicer when it only shows tenths instead of hundreths
  //So i will only show 1 decimal when the counter is counting
  //However, it is still counting in hundreths and will display it once the timer stops 
  timerCounterTenths=Math.floor(timerCounter/10);
  //console.log(timerCounterTenths);

  //Must account for minutes:
  //If the timerCounter / 600 is 1 or greater, change the text by showing minutes ':' and leftover seconds
  if (timerCounterTenths/600>=1){
    //console.log("minutes");

    //the seconds after a minute is written 1:01:00 not 1:1:00
    //So I must check if the remainder is less than 100 (or 10 seconds)
    //If yes, add a '0' string before the remaning seconds
    let zero = "";
    if((timerCounterTenths%600)<100){
      //if less than 10 seconds add a 0 before the seconds
      zero = "0";
    }
    timeText = (Math.floor((timerCounterTenths/600))).toString() //minutes
    +":"+
    zero+
    ((timerCounterTenths%600)/10);//seconds

  } else {
    //otherwise, just show the seconds
    timeText = (timerCounterTenths/10).toString();
  }

  //6 seconds is written 6:0 not 6
  //So, if time is a multiple of 10, then add .0 at the end
  if ((timerCounterTenths)%10==0){
    timeText+=".0";
  }


  //sets the text of the timerText
  timerText.innerHTML = timeText;
}

function addListRow(){
  console.log("new row added");
  //create variables
  const ul = document.querySelector("#ulList");

  //creating a new li and adding it to the list
  liList.length++;
  console.log("row: "+numberOfRows.toString());

  //liList[numberOfRows]=document.createElement('li');

  liList[numberOfRows] = document.createElement("li");

  //giving it the class
  liList[numberOfRows].classList.add("sessionMiddleGrid");
  console.log(liList[numberOfRows]);
  //appending new li to the ul
  ul.prepend(liList[numberOfRows]);

  //increasing array length
  //buttonsArray.length+=4;
  //creating new buttons
  for (let i = 0; i < 4; i++){
    buttonsArray.push(document.createElement("button"));
    //the button index in the array is at number of rows * 4, because 4 buttons in each row, + i
    buttonsArray[i+(numberOfRows*4)].innerHTML=i.toString();
    //Adding classes
    buttonsArray[i+(numberOfRows*4)].classList.add("button2","listItem");
    //Adding onclick
    buttonsArray[i+(numberOfRows*4)].setAttribute("onclick","buttonClick("+(i+(numberOfRows*4)).toString()+")");
  }

  //appending the button children to the new li
  for (let i = 0; i < 4; i++){
    liList[numberOfRows].appendChild(buttonsArray[i+(numberOfRows*4)]);
  }
  /*
  buttonsArray.forEach(element => {
    liList[0].appendChild(element);
  });
  */
  //Stores the times in an array
  timeArray[numberOfRows] = timerCounter;
  timerTextArray[numberOfRows] = timeText;
  
  //Sets the values and text to the buttons
  //Num
  buttonsArray[0+(numberOfRows*4)].innerHTML=(numberOfRows+1).toString();
  //Time
  buttonsArray[1+(numberOfRows*4)].innerHTML=timeText.toString();
  
  //Calculate the averages
  calculateAverages();

  //check bests
  checkBests();

  //Save the scramble
  scrambleArray[numberOfRows]=currentScramble;

  //get a new scramble
  nextButtonClick();


  //adding 1 to the row counter
  numberOfRows++;
}


function calculateAverages(){
    //calculating ao5 and ao12 using a for loop of 2 because same thing with different variables and values
    for (let j=0;j<2;j++){


      //variables average for loop
      let averageArray = []; //or12
      let averageTextArray = []; //or12
  
  
      let averageSize=5; //or 12
      let buttonIndex = 2; //or 3
      if (j==1){
        //variables average for loop
        averageSize=12;
        buttonIndex = 3;
      }
  
      //if averageSize or more items currently
      if(numberOfRows>averageSize-2){
        //console.log("5 or more");
        //calculate average
        //Cubing averages are not a simple mean,
        //the highest and lowest values are dropped
        //i will put all values in a new array to not change the original ones
        let tempTimes = [];
        for(let i=0; i<averageSize;i++){
          //console.log((timeArray[numberOfRows-4+i]).toString());
          //getting the averageSize most recent values into an array
          tempTimes[i]=timeArray[numberOfRows-averageSize+1+i];
        }
        
        console.log(tempTimes);
        
        //finding lowest number and setting to -1
        let lowestNum = tempTimes[0];
        let lowestNumIndex = 0;
        for(let i=1; i<averageSize;i++){ 
          if (tempTimes[i]<lowestNum){
            lowestNum=tempTimes[i];
            lowestNumIndex=i;
          }
        }
        console.log("lowest: "+lowestNum);
        tempTimes[lowestNumIndex]=-1;
        
        //finding highest number and setting to -1
        let highestNum = tempTimes[0];
        let highestNumIndex = 0;
        for(let i=1; i<averageSize;i++){ 
          if (tempTimes[i]>highestNum){
            highestNum=tempTimes[i];
            highestNumIndex=i;
          }
        }
        console.log("highest: "+highestNum);
        tempTimes[highestNumIndex]=-1;
  
  
        console.log(tempTimes);
        
  
        // I can find the mean with the highest and lowest values dropped
        
        let sum = 0;
        let newAverage = 0;
        for(let i=0; i<averageSize;i++){
          //adding the numbers and ignoring -1
          if(tempTimes[i]!=-1){
            sum+=tempTimes[i];
          }
          
        }
        //dividing the sum by averageSize-2
        newAverage = sum/(averageSize-2);
        //no decimal places and rounding
        //console.log("before: "+newAo5);
        newAverage = newAverage.toFixed(0);
        //console.log("after: "+newAo5);
  
        //storing the value in the array
        averageArray[numberOfRows]=newAverage;
        if (j==0){
          ao5Array[numberOfRows]=newAverage;
        } else {
          ao12Array[numberOfRows]=newAverage;
        }
  
        //this is hundreths, i need seconds, and i need to convert this to time text format with :
        let averageText = "";
        //using code from earlier to convert time to text
  
  
      //console.log(timerCounterTenths);
  
      //Must account for minutes:
      //If the timerCounter / 600 is 1 or greater, change the text by showing minutes ':' and leftover seconds
      if (newAverage/6000>=1){
        //console.log("minutes");
  
        //the seconds after a minute is written 1:01:00 not 1:1:00
        //So I must check if the remainder is less than 100 (or 10 seconds)
        //If yes, add a '0' string before the remaning seconds
        let zero = "";
        if((newAverage%6000)<1000){
          //if less than 10 seconds add a 0 before the seconds
          zero = "0";
        }
        averageText = (Math.floor((newAverage/6000))).toString() //minutes
        +":"+
        zero+
        ((newAverage%6000)/100);//seconds
  
      } else {
        //otherwise, just show the seconds
        averageText = (newAverage/100).toString();
      }
  
      //6 seconds is written 6:0 not 6
      //So, if time is a multiple of 10, then add .0 at the end
      if ((newAverage)%100==0){
        averageText+=".00";
      } else if ((newAverage)%10==0){
        averageText+="0";
      }
  
      //Now that the average time has been converted into text format,
      //I place that value in the array
        averageTextArray[numberOfRows]=averageText;
        //placing into exterior array
      if (j==0){
        ao5TextArray[numberOfRows]=averageText;
      } else {
        ao12TextArray[numberOfRows]=averageText;
      }
  
      } else {
        //if not at least averageSize numbers, the value is -
        averageArray[numberOfRows]="-";
        averageTextArray[numberOfRows]="-";
        //placing into exterior array
      if (j==0){
        ao5TextArray[numberOfRows]="-";
      } else {
        ao12TextArray[numberOfRows]="-";
      }
      }
  
      
      //setting the time text from array onto the button
      buttonsArray[buttonIndex+(numberOfRows*4)].innerHTML=(averageTextArray[numberOfRows]).toString();
      //setting the time text from array onto the middle text
      const ao5Text = document.getElementsByClassName("ao5")[0];
      const ao12Text = document.getElementsByClassName("ao12")[0];
      if (j==0){
        ao5Text.innerHTML="Ao5: "+((averageTextArray[numberOfRows]).toString());
      } else {
        ao12Text.innerHTML="Ao12: "+((averageTextArray[numberOfRows]).toString());
      } 
      

      
    }
}

function checkBests(){
  //variables
  const bestTimeButton = document.getElementsByClassName("bestTime")[0];
  const bestAo5Button = document.getElementsByClassName("bestAo5")[0];
  const bestAo12Button = document.getElementsByClassName("bestAo12")[0];


 // console.log(ao5Array);
  //console.log(ao5TextArray);
  //index
  

  /*
  let bestAo5Index = 5-1;
  let bestAo12Index = 12-1;

  //If there is at least 1 time
  if(timeArray.length>0){
    //checking time
    bestTime=timeArray[0];

    //must keep track of index
    let index = 0;
    timeArray.forEach(num => {
      
      if(num<bestTime){
        //if a time is the smallest, it will become the new best
        bestTime=num;
        bestTimeIndex=index;
      }
      index++;
    });
  //change button text
  bestTimeButton.innerHTML=timerTextArray[bestTimeIndex].toString();
  }

  //If there is at least 1 ao5
  if(ao5Array.length>4){
    console.log("checking ao5");
    //checking time
    bestAo5=ao5Array[4];

    //must keep track of index
    let index = 4;
    ao5Array.forEach(num => {
      console.log("num is:" +num);
      console.log("bestAo5 is:" +num);
      if(num<bestAo5){
        //if a time is the smallest, it will become the new best
        console.log("a new best is found")
        bestAo5=num;
        bestAo5Index=index;
        console.log("new best is: "+bestAo5);
      }
      index++;
    });
  //change button text
  console.log("The text is: "+ao5TextArray[bestAo5Index].toString())
  bestAo5Button.innerHTML=ao5TextArray[bestAo5Index].toString();
  }
  */


let bestSize = 0;

//arrays
let lengthArray = [timeArray.length,ao5Array.length,ao12Array.length];
let arrays = [timeArray,ao5Array,ao12Array];
let textArrays = [timerTextArray,ao5TextArray,ao12TextArray];
let buttonsArray = [bestTimeButton,bestAo5Button,bestAo12Button];
let bestSizeArray = [0,4,11];
 for(let i = 0; i<3;i++){
  //If there is at least bestSize time
  if(lengthArray[i]>bestSizeArray[i]){
    //checking time
    bestTime=timeArray[bestSize];

    //must keep track of index
    let index = bestSizeArray[i];
    for(let j = bestSizeArray[i]; j<lengthArray[i];j++){
      

      if(arrays[i][j]<bestTime){
        //if a time is the smallest, it will become the new best
        bestTime=arrays[i][j];
        bestSizeArray[i] =index;
      }
      index++;
    }
    /*
    timeArray.forEach(num => {
      if (num!="-"){
        
      }
    });*/
  //change button text
  buttonsArray[i].innerHTML=textArrays[i][bestSizeArray[i]];
  }
  
  }
 }
  
function clearSession(){
  if (confirm("Clear Session?")) {
    //remove all children from session ul
    let ul = document.getElementById("ulList");
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    //clear bests
    bestButtonsArray=[document.getElementsByClassName("bestTime")[0],document.getElementsByClassName("bestAo5")[0],document.getElementsByClassName("bestAo12")[0]];
    for(let i=0;i<3;i++){
      bestButtonsArray[i].innerHTML="-";
    }

    //clear arrays
    timeArray=[];
    timerTextArray=[];
    ao5Array=[];
    ao5TextArray=[];
    ao12Array=[];
    ao12TextArray=[];
    liList=[];

    //clear rows
    numberOfRows=0;

    //clear middle text
    ao5.innerHTML="Ao5: -";
    ao12.innerHTML="Ao12: -";
  }
}

//when a button is clicked from the list, an index is passed on as a parameter
function buttonClick(buttonIndex){
  console.log(buttonIndex);
  //in first 2 columns, the index is 0 1, 4 5, 8 9
  //0 and 1 + 4*number of rows

  //remainder 4
  if (buttonIndex%4==0||buttonIndex%4==1){
    //if first 2 rows, show popup1
    
    //remove popup1 hidden tag
    document.querySelector(".popUp1").classList.remove("hidden");

    //change the time and number change
    //must access from the array, need the row index
    //can get first column button index, and divide by 4
    let firstColumnIndex = 0;
    if (buttonIndex%4==1){
      but
    }

  } else {
    //if there is a value in the button (not -)
    if(buttonsArray[buttonIndex].innerHTML!="-"){
      //show popup2
      document.querySelector(".popUp2").classList.remove("hidden");
    }
    
  }

  


}

function newScramble(){
  //console.log("new scramble");

  //18 possible letters
  //6 letters: F B R L U D
  //each has 3 subsets: nothing, prime, or 2
  //Ex.   F F' F2

  //choose random number between 0 and 5
  let previousNumber=7;
  let scramble="";
  let number = 8;
  let letter = "";
  for (let i = 0; i<20; i++){
      do {
        number = Math.floor((Math.random()*6));
      } while (number==previousNumber)
      //console.log(number);
      switch(number){
        case 0:
          letter="F";
          break;
        case 1:
          letter="B";
          break;
        case 2:
          letter="R";
          break;
        case 3:
          letter="L";
          break;
        case 4:
          letter="U";
          break;
        case 5:
          letter="D";
          break;
      }
      previousNumber=number;
    
    let number2 = Math.floor((Math.random()*3));
    switch(number2){
      case 0:
        letter += "";
        break;
      case 1:
        letter += "'";
        break;
      case 2:
        letter += "2";
        break;
    }
    scramble+=letter+" ";
  }
  console.log(scramble);

  return scramble;
}

function previousButtonClick(){
  console.log("previousButtonClicked");
  if (previousIsClicked==false){
  //store the current scramble in next scramble
  nextScramble=currentScramble;

  //set current scramble to previous
  currentScramble=previousScramble;
  //set text
  scrambleText.innerHTML=currentScramble;
  
  //make button in clicked state
  previousScrambleButton.classList.add("button1Clicked");
  previousScrambleButton.classList.remove("button1");
  

  //set to clicked
  previousIsClicked=true;
  }
}

function nextButtonClick(){
  console.log("nextButtonClicked");
  if (previousIsClicked==false){
    //there is no next scramble

    //store current scramble in previous
    previousScramble=currentScramble;

    //get new scramble
    currentScramble=newScramble();
    //set text
    scrambleText.innerHTML=currentScramble;
  } 
  else {
    //the previous button is pressed, there is a next scramble stored
    
    //set previous to current
    previousScramble=currentScramble;

    //set the current to next
    currentScramble=nextScramble;
    //set text
    scrambleText.innerHTML=currentScramble;

    //previous button becomes clickable
    previousIsClicked=false;
    previousScrambleButton.classList.remove("button1Clicked");
    previousScrambleButton.classList.add("button1");
  }
}
//






//pop up 1 clicks
function popUp1add2ButtonClick(){

}
function popUp1DNFClick(){
  
}
function popUp1BackClick(){
  
}
function popUp1DeleteClick(){
  
}



//pop up 2 clicks
function popUp2BackClick(){

}
