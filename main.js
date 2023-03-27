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

//need to keep track of the index for the popups
let bestTimeIndex = 0;
let bestAo5Index = 0;
let bestAo12Index = 0;

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

//must keep track of highest and lowest numbers in averages
let ao5Lowest = [];
let ao5Highest = [];
let ao12Lowest = [];
let ao12Highest = [];

//must keep track of indexes for the popups
let bestIndex= [0,0,0];

//must keep track of which times have a +2
let add2Array = [];
//must keep track of which times have a DNF
let DNFArray = [];
let DNFao5Array = [];
let DNFao12Array = [];

//Making the timer
document.addEventListener("keydown",function(event){
    //hide popups
    document.querySelector(".popUp1").classList.add("hidden");
    document.querySelector(".popUp2").classList.add("hidden");

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

          let timeText = convertToTimeText(timerCounter);
          /*
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
          */

          //converts the time to text and sets it to the innerHTML
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
          addListRow(timeText);

          //testing that the scroll works if the list is filled up
          /*
          for(let i=0; i<50;i++){
            addListRow();
          }
          */

          //Reset the time
          timerCounter=0;
        
          //hide the tempState (picture that shows when empty list)
          document.querySelector(".temp").remove();
          
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

function timerCount(timeText){
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

function addListRow(timeText){
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
  
  //+2Array and DNF array
  add2Array[numberOfRows]=-1;
  DNFArray[numberOfRows]=-1;
  
  //Calculate the averages
  calculateAverageAtRow(numberOfRows,0,2);

  //check bests
  checkBests();

  //Save the scramble
  scrambleArray[numberOfRows]=currentScramble;

  //get a new scramble
  nextButtonClick();

  //adding 1 to the row counter
  numberOfRows++;
}


function calculateAverageAtRow(rowIndex,start,end){
  //calculating ao5 and ao12 using a for loop of 2 because same thing with different variables and values
  for (let j=start;j<end;j++){

    //variables average for loop
    let averageArray = [ao5Array,ao12Array]; 
    let averageTextArray = [ao5TextArray,ao12TextArray]; 

    let averageSize= [5,12];
    let buttonIndex = [2,3];
    
    //to keep track of how many DNFs
    let DNFCounter = 0;
    let DNFArraysArray = [DNFao5Array,DNFao12Array];

    let averageToCheck=[ao5Array,ao12Array];
    //if averageSize or more times currently (ao5 only starts after 5 times and ao12 starts after 12 times)
    if(timeArray.length>=averageSize[j]){
      console.log("5 or more");
      //calculate average
      //Cubing averages are not a simple mean,
      //the highest and lowest values are dropped
      //i will put all values in a new array to not change the original ones
      let tempTimes = [];
      for(let i=0; i<averageSize[j];i++){
        //console.log((timeArray[numberOfRows-4+i]).toString());
        //getting the averageSize most recent values into an array
        //console.log("i",i);
        //console.log("rowIndex-averageSize[j]+i-1",rowIndex-averageSize[j]+i+1);
        //console.log("DNFArray[rowIndex-averageSize[j]+i]",DNFArray[rowIndex-averageSize[j]+i+1]);
        if (DNFArray[rowIndex-averageSize[j]+i+1]==-1){
          //if not DNF
          tempTimes[i]=timeArray[rowIndex-averageSize[j]+i];
        } else {
          // if DNF
          //console.log("i is DNF",i);
          DNFCounter++;
          tempTimes[i]=99999999;
        }
      }
      
      console.log("temptimes------------------------------------------", tempTimes);
      
      //finding lowest number and setting to -1
      let lowestNum = tempTimes[0];
      let lowestNumIndex = 0;

      for(let i=1; i<averageSize[j];i++){ 
        if (tempTimes[i]<lowestNum){
          lowestNum=tempTimes[i];
          lowestNumIndex=i;
        }
      }
      console.log("---------------------------------------lowest: "+lowestNum);
      tempTimes[lowestNumIndex]=0;
      
      //finding highest number and setting to -1
      let highestNum = tempTimes[0];
      let highestNumIndex = 0;
      for(let i=1; i<averageSize[j];i++){ 
        if (tempTimes[i]>highestNum){
          highestNum=tempTimes[i];
          highestNumIndex=i;
        }
      }
      //checking for DNFs
      //DNF will always be the highest (dropped)
      //If there are 2 or more DNFs, the average is invalid
     /* for(let i=rowIndex;i>rowIndex-averageSize[j];i--){
        console.log("DNF check",i);
        if (DNFArray[i]==1){
          //if DNF
          DNFCounter++;
          highestNum=tempTimes[i];
          highestNumIndex=i;
        }
      }*/
      console.log("----------------------------------highest: "+highestNum);
      tempTimes[highestNumIndex]=0;
      

      console.log(tempTimes);
      
      //store the highest and lowest for the popups when clicked
      if(averageSize[j]==5){
        ao5Lowest[numberOfRows]=lowestNumIndex;
        ao5Highest[numberOfRows]=highestNumIndex;
      } else {
        ao12Lowest[numberOfRows]=lowestNumIndex;
        ao12Highest[numberOfRows]=highestNumIndex;
      }

      // I can find the mean with the highest and lowest values dropped
      
      let sum = 0;
      let newAverage = 0;
      for(let i=0; i<averageSize[j];i++){
        //adding the numbers and ignoring -1
        if(tempTimes[i]!=0){
          sum+=tempTimes[i];
        }
        
      }
      //dividing the sum by averageSize-2
      newAverage = sum/(averageSize[j]-2);
      //no decimal places and rounding
      //console.log("before: "+newAo5);
      newAverage = newAverage.toFixed(0);
      //console.log("after: "+newAo5);

      //storing the value in the array
      averageArray[numberOfRows]=newAverage;
      averageToCheck[j][numberOfRows]=newAverage;

      //this is hundreths, i need seconds, and i need to convert this to time text format
      let averageText = convertToTimeText(newAverage);
      if (DNFCounter>=2){
        averageText = "";
      }





      
      //using code from earlier to convert time to text


    //console.log(timerCounterTenths);

    
  /*
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
    */
    
      //Now that the average time has been converted into text format,
      //I place that value in the array
      averageTextArray[j][rowIndex]=averageText;
      /*
      //placing into exterior array
      if (j==0){
        ao5TextArray[rowIndex]=averageText;
      } else {
        ao12TextArray[rowIndex]=averageText;
      }*/

    } else {
      //if not at least averageSize numbers, the value is -
      //placing into exterior array
      averageArray[j][rowIndex]="-";
      averageTextArray[j][rowIndex]="-";
      /*
      if (j==0){
        ao5TextArray[rowIndex]="-";
      } else {
        ao12TextArray[rowIndex]="-";
      }*/
    }


    console.log("DNFCounter=",DNFCounter);
    //however if 2 or more DNFs, the average text should become DNF
    if (DNFCounter>=2){
      averageTextArray[j][rowIndex]+="(DNF)";
      DNFArraysArray[j][rowIndex]=1;
    } else {
      DNFArraysArray[j][rowIndex]=-1;
    }
    let timeAsText = averageTextArray[j][rowIndex];
    console.log("timeAstext",timeAsText);
    //setting the time text from array onto the button
    buttonsArray[buttonIndex[j]+(rowIndex*4)].innerHTML=timeAsText;
    //setting the time text from array onto the middle text
    const ao5Text = document.getElementsByClassName("ao5")[0];
    const ao12Text = document.getElementsByClassName("ao12")[0];
    if (j==0){
      ao5Text.innerHTML="Ao5: "+timeAsText;
    } else {
      ao12Text.innerHTML="Ao12: "+timeAsText;
    }     
    console.log(j,"DNFArraysArray[j]",DNFArraysArray[j])  
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


  

  //The same thing repeats 3 times but with different variaables and values,
  //so instead of copying the same code 3 times with different variables and values
  //I used a for loop to avoid repetition

  //Should have used a function here and chosen the variables using
  //parameters instead of using arrays with variables and a for loop.
  //Arrays also work but it's really hard to follow and understand

  //let bestSize = 0;

  //arrays
  let lengthArray = [timeArray.length,ao5Array.length,ao12Array.length];
  let arrays = [timeArray,ao5Array,ao12Array];
  let textArrays = [timerTextArray,ao5TextArray,ao12TextArray];
  let buttonsArray = [bestTimeButton,bestAo5Button,bestAo12Button];
  let bestSizeArray = [0,4,11];
  
  let DNFArraysArray = [DNFArray,DNFao5Array,DNFao12Array];

  // console.log("besttime",bestTime);
  // console.log("besttao5",bestAo5);
  // console.log("besttao12",bestAo12);
  let bestTimeArray = [bestTime,bestAo5,bestAo12];
  for(let i = 0; i<3; i++){
    let DNFCounter=0;
    console.log("array i",arrays[i]);
    //console.log("hello");
    //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA time around",i);
    //If there is at least 1 bestSize time
    let bestIndexTemp = bestSizeArray[i];
    if(lengthArray[i]>bestSizeArray[i]){
      console.log("I GOT IN-----------------------------------------------",i);

      //checking time
      for(let k=bestSizeArray[i];k<lengthArray[i];k++){
        console.log("k",k);
        console.log("DNFArraysArray[i]",DNFArraysArray[i]);
        console.log("DNFArraysArray[i][k]",DNFArraysArray[i][k]);
        if ((DNFArraysArray[i][k])==-1){
          bestTimeArray[i]=arrays[i][k];
          break;
        } else {
          DNFCounter++;
        }
      }
      console.log("DNFCounter",DNFCounter);
      

      //must keep track of index
      //let index = bestSizeArray[i];
      
      for(let j = bestSizeArray[i]; j<lengthArray[i];j++){
        //console.log("////////////////////////////////",j);
        //if lowest number
        if(arrays[i][j]<bestTimeArray[i]){
          //if a number exists at dnf array
          //console.log("DNFArraysArray[i]",DNFArraysArray[i],DNFArraysArray[i].length,">","bestSizeArray[i]",bestSizeArray[i]);
          // if (DNFArraysArray[i][j]!=1){
          //   //if a number exists at dnf array index and not a dnf and lowest num
            
          // }



          //it becomes the new best
          bestTimeArray[i]=arrays[i][j];
          //bestSizeArray[i]=index;  
          bestIndexTemp=j;
        }
        
      }
      //change button text
      //console.log("++++++++++++++++++++++++++++++bestindextemp",bestIndexTemp);
      bestIndex[i]=bestIndexTemp;
      buttonsArray[i].innerHTML=textArrays[i][bestIndexTemp];
      //if all the times are DNF, change the best text to DNF
      if (DNFCounter==arrays[i].length-bestSizeArray[i]){
        buttonsArray[i].innerHTML="DNF";
      }

      // if (i=1){
      //   console.log("i is 1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      //   console.log("ao5Array",ao5Array);
      //   console.log("ao5ArrayText",ao5TextArray);
      //   console.log("bestAo5",bestAo5);
      //   console.log("bestIndexTemp",bestIndexTemp);
      //   console.log("DNFao5Array",DNFao5Array);
      // }
    }
  }
}  
function clearSession(){
  if (confirm("Clear Session?")) {
    //hide popups
    document.querySelector(".popUp1").classList.add("hidden");
    document.querySelector(".popUp2").classList.add("hidden");

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
    ao5Lowest=[];
    ao5Highest=[];
    ao12Lowest=[];
    ao12Highest=[];

    /*
    bestIndex = 0;
    bestAo5Index=0;
    bestAo12Index=0;*/

    //clear rows
    numberOfRows=0;

    //clear middle text
    ao5.innerHTML="Ao5: -";
    ao12.innerHTML="Ao12: -";

    //show the tempState (picture that shows when empty list)
    //creating li
    let tempLi = document.createElement("li");
    tempLi.classList.add("temp");
    document.querySelector(".sessionMiddleList").appendChild(tempLi);
    //creating img
    let tempImg = document.createElement("img");
    tempImg.setAttribute("src","cube2.png");
    tempImg.setAttribute("alt","cube");
    tempLi.appendChild(tempImg);
    //creating p
    let tempP = document.createElement("p");
    tempP.innerHTML="Press the spacebar to start the timer!";
    tempLi.appendChild(tempP);
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
    
    let firstColumnIndex = 0;
    //remove popup1 hidden tag
    document.querySelector(".popUp1").classList.remove("hidden");
    //hide popup2 (in case it was open)
    document.querySelector(".popUp2").classList.add("hidden");


    //change the time and number change
    //must access from the array, need the row index
    //can get first column button index, and divide by 4
    
    if (buttonIndex%4==1){
      //if first column, -1 then divide by 4 to get row
      firstColumnIndex = (buttonIndex-1)/4;
      //console.log("row is: "+firstColumnIndex);
    } else {
      //else just divide by 4 to get row
      firstColumnIndex = (buttonIndex)/4;
      //console.log("row is: "+firstColumnIndex);
    }
    //now that i have the row, i can set the proper values in the popup box
    //setting the best num and time
    document.querySelector(".popUp1SolveText").innerHTML=
    //first is the solve num
    "Solve "+
    (firstColumnIndex+1).toString()+
    //next is the time
    ": "+
    timerTextArray[firstColumnIndex];

    //now i need the scramble
    document.querySelector(".popUp1ScrambleText").innerHTML=
    "Scramble: "+
    scrambleArray[firstColumnIndex];


    //DNF and +2 button
    const add2Button = document.querySelector(".add2Button");
    const DNFButton = document.querySelector(".DNFButton");
    //give +2 and DNF buttons an index parameter
    add2Button.setAttribute("onclick","popUp1ChangeButtonClick("+firstColumnIndex+",0)");
    DNFButton.setAttribute("onclick","popUp1ChangeButtonClick("+firstColumnIndex+",1)");
    //set the button colours (if clicked or not)
    if (add2Array[firstColumnIndex]==-1){
      //is unclicked
      add2Button.classList.remove("button3Clicked");
      add2Button.classList.add("button3");
    } else {
      //is clicked
      add2Button.classList.remove("button3");
      add2Button.classList.add("button3Clicked");
    }
    if (DNFArray[firstColumnIndex]==-1){
      //is unclicked
      DNFButton.classList.remove("button3Clicked");
      DNFButton.classList.add("button3");
    } else {
      //is clicked
      DNFButton.classList.remove("button3");
      DNFButton.classList.add("button3Clicked");
    }
  } else {
    //else if last 2 rows, show popup2
    //if there is a value in the button (not -)
    if(buttonsArray[buttonIndex].innerHTML!="-"){
      //show popup2
      document.querySelector(".popUp2").classList.remove("hidden");
      //hide popup1 (in case it was open)
      document.querySelector(".popUp1").classList.add("hidden");
      
      //now i set the correct values
      let averageTimeText = "";
      //first I must know if it is an average of 5 or 12
      let averageNum = 5;
      //either in column with index 2 or 3 (last 2 columns)
      if (buttonIndex%4==2){
        //average of 5
        firstColumnIndex=(buttonIndex-2)/4;
        //getting the time
        averageTimeText = ao5TextArray[firstColumnIndex];
        //console.log(firstColumnIndex);
        //console.log(averageTimeText);
      } else {
        //average of 12
        averageNum=12;
        firstColumnIndex=(buttonIndex-3)/4;
        //getting the time
        averageTimeText = ao12TextArray[firstColumnIndex];
      }
      
      //now i set the proper values
       //average of
       document.querySelector(".popUp2AverageText").innerHTML=
      "Average of "
      +averageNum
      +": "
      +averageTimeText;

      //now i need the scrambles and times using a for loop
      let text = "Time List: ";
      let lowestAverageArray = ao5Lowest;
      let highestAverageArray = ao5Highest;
      console.log("ao5Lowest: "+ao5Lowest);


      if (averageNum==12){
        lowestAverageArray=ao12Lowest;
        highestAverageArray=ao12Highest;
      }
      let counter = 1;
      let numberOfLowestNums = 0;
      let numberOfHighestNums = 0;
      for (let i=averageNum-1;i>-1;i--){
        //add the scramble number and an enter
        text+="<br>"+counter.toString()+". ";
        counter++;

        //console.log("timeArray: "+timeArray[firstColumnIndex-i]);
        //console.log("lowest "+lowestAverageArray[firstColumnIndex]);

        //if highest number or lowest number
        if(i==lowestAverageArray[firstColumnIndex]&&
          numberOfLowestNums==0){
          //add a bracket
          text+="(";
          console.log("lowest");
          //numberOfLowestNums++;
        } else if (i==highestAverageArray[firstColumnIndex]&&
          numberOfHighestNums==0){
           //add a bracket
           text+="(";
           console.log("highest");
           //numberOfHighestNums++;
        }
        //time
        text+=timerTextArray[firstColumnIndex-i];

         //if highest number or lowest number
        if(i==lowestAverageArray[firstColumnIndex]&&
          numberOfLowestNums==0){
          //add a bracket
          text+=")";
          console.log("lowest");
          numberOfLowestNums++;
        } else if (i==highestAverageArray[firstColumnIndex]&&
          numberOfHighestNums==0){
           //add a bracket
           text+=")";
           console.log("highest");
           numberOfHighestNums++;
        }

        //add the scramble
        text+=" "+scrambleArray[firstColumnIndex-i];
      }
      console.log(text);
      document.querySelector(".popUp2ScrambleText").innerHTML=text;
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

//best buttons click
function bestTimeClick(){
  
  //if a time exists
  if(timerTextArray.length>=1){
    //if (averageTimeText.length>=averageNum){

    //popup1
    //remove popup1 hidden tag
    document.querySelector(".popUp1").classList.remove("hidden");
    //hide popup2 (in case it was open)
    document.querySelector(".popUp2").classList.add("hidden");

  
    //change the time
    //must access from the array, need the row index
    console.log(bestIndex[0]);

    document.querySelector(".popUp1SolveText").innerHTML=
    "Best Time: "+
    //the time number
    timerTextArray[bestIndex[0]];

    //now i need the scramble
    document.querySelector(".popUp1ScrambleText").innerHTML=
    "Scramble: "+
    scrambleArray[bestIndex[0]];
  }
}

function bestAverageClick(averageNum, averageTimeText, index){
  //if a best time exits
  if (averageTimeText.length>=averageNum){
    //show popup2
    document.querySelector(".popUp2").classList.remove("hidden");
    //hide popup1 (in case it was open)
    document.querySelector(".popUp1").classList.add("hidden");

    //now i set the proper values
    //average of
    document.querySelector(".popUp2AverageText").innerHTML=
    "Best Average of "
    +averageNum
    +": "
    +averageTimeText[bestIndex[index]];

    //now i need the scrambles and times using a for loop
    let text = "Time List: ";
    let lowestAverageArray = ao5Lowest;
    let highestAverageArray = ao5Highest;
    console.log("ao5Lowest: "+ao5Lowest);


    if (averageNum==12){
      lowestAverageArray=ao12Lowest;
      highestAverageArray=ao12Highest;
    }
    let counter = 1;
    for (let i=averageNum-1;i>-1;i--){
      //add the scramble number and an enter
      text+="<br>"+counter.toString()+". ";
      counter++;

      //console.log("timeArray: "+timeArray[firstColumnIndex-i]);
      //console.log("lowest "+lowestAverageArray[firstColumnIndex]);

      //if highest number or lowest number
      if(timeArray[bestIndex[index]-i]==lowestAverageArray[bestIndex[index]]||
        timeArray[bestIndex[index]-i]==highestAverageArray[bestIndex[index]]){
        //add a bracket
        text+="(";
        console.log("lowest or highest");
      }
      //time
      text+=timerTextArray[bestIndex[index]-i];

      //if highest number or lowest number
      if(timeArray[bestIndex[index]-i]==lowestAverageArray[bestIndex[index]]||
        timeArray[bestIndex[index]-i]==highestAverageArray[bestIndex[index]]){
        //add a bracket
        text+=")";
      }

      //add the scramble
      text+=" "+scrambleArray[bestIndex[index]-i];
    }
    console.log(text);
    document.querySelector(".popUp2ScrambleText").innerHTML=text;
  }
  
}




//pop up 1 clicks

//Add2 button click and DNF click are the same with different variables so I will
//use a function with parameters and structs(or object literals) to avoid writing the same code twice
let add2Variables = {
  //add2
  array: add2Array,
  button1: document.querySelector(".add2Button"),
  functions: 0,

  //DNF
  array2: DNFArray,
  button2: document.querySelector(".DNFButton"),
}

let DNFVariables = {
  //DNF
  array: DNFArray,
  button1: document.querySelector(".DNFButton"),
  functions:1,

  //add2
  array2: add2Array,
  button2: document.querySelector(".add2Button"),
}


function popUp1ChangeButtonClick(buttonIndex,buttonType){
  let changeButton = add2Variables;
  if (buttonType==1){
    changeButton = DNFVariables;
  }

  //need the index of the button clicked
  //when the button is clicked to open the popup, I will give the +2 and DNF button
  //an onclick to this function, and the buttonIndex as a parameter
  console.log("button index is: ",buttonIndex);


  //other button becomes unclicked
  if (changeButton.array2[buttonIndex]==1){
    changeButton.button2.classList.remove("button3Clicked");
    changeButton.button2.classList.add("button3");
    changeButton.array2[buttonIndex]=-1;
    //reset the other button (only 1 can be clicked at once)
    if (changeButton.functions==0){
      resetDNFtoTime(buttonIndex);
    } else {
      resetAdd2toTime(buttonIndex);
    }
  }


  //i need to keep track if the button is clicked or not (toggle +2)
  //i made an array called add2Array
  //everytime a row is made, the add2Array at that index should be set to -1

  console.log("add2Array: ",add2Array[buttonIndex]);
  console.log("DNFArray: ",DNFArray[buttonIndex]);

  //if -1 or unclicked, make it clicked
  if (changeButton.array[buttonIndex]==-1){
    changeButton.array[buttonIndex]*=-1;
    //becomes clicked
    changeButton.button1.classList.add("button3Clicked");
    changeButton.button1.classList.remove("button3");
    //add +2 or DNF to text and time 
    //call function
    if (changeButton.functions==0){
      add2toTime(buttonIndex);
    } else {
      DNFtoTime(buttonIndex);
    }
  } else {
    changeButton.array[buttonIndex]*=-1;
    //becomes unclicked
    changeButton.button1.classList.add("button3");
    changeButton.button1.classList.remove("button3Clicked");
    //reset +2 or DNF to text and time 
    if (changeButton.functions==0){
      resetAdd2toTime(buttonIndex);
    } else {
      resetDNFtoTime(buttonIndex);
    }
  }
  
  refreshTimes();
}

function add2toTime(buttonIndex){
  console.log("add2Time");

  console.log("before",timeArray[buttonIndex]);
  //add 200 to the time
  timeArray[buttonIndex]+=200;
  console.log("after",timeArray[buttonIndex]);
  
  console.log("before",timerTextArray[buttonIndex]);
  //now change the time text
  timerTextArray[buttonIndex]=
  //time
  convertToTimeText(timeArray[buttonIndex])
  //add (+2) to indicate that this is an edited time
  +"(+2)";
  console.log("after",timerTextArray[buttonIndex]);

  //set text on the button
  buttonsArray[buttonIndex*4+1].innerHTML=timerTextArray[buttonIndex];
  //set the text to the popUp1
  document.querySelector(".popUp1SolveText").innerHTML=  
  "Solve "+ (buttonIndex+1).toString()+": "+
  timerTextArray[buttonIndex];

  //now must calculate the averages and set update the list texts
  refreshTimes();
}


function resetAdd2toTime(buttonIndex){
  console.log("resetAdd2Time");

  console.log("before",timeArray[buttonIndex]);
  //subtract 200 to the time
  timeArray[buttonIndex]-=200;
  console.log("after",timeArray[buttonIndex]);
  
  console.log("before",timerTextArray[buttonIndex]);
  //now change the time text
  timerTextArray[buttonIndex]=convertToTimeText(timeArray[buttonIndex])
  console.log("after",timerTextArray[buttonIndex]);

  //set text on the button
  buttonsArray[buttonIndex*4+1].innerHTML=timerTextArray[buttonIndex];
  //set the text to the popUp1
  document.querySelector(".popUp1SolveText").innerHTML=  
  "Solve "+ (buttonIndex+1).toString()+": "+
  timerTextArray[buttonIndex];

  //now must calculate the averages and set update the list texts
  refreshTimes();
}
function DNFtoTime(buttonIndex){
  console.log("DNFtoTime");
  
  console.log("before",timerTextArray[buttonIndex]);
  //now change the time text
  timerTextArray[buttonIndex]=
  //time
  convertToTimeText(timeArray[buttonIndex])
  //add (+2) to indicate that this is an edited time
  +"(DNF)";
  console.log("after",timerTextArray[buttonIndex]);

  //set text on the button
  buttonsArray[buttonIndex*4+1].innerHTML=timerTextArray[buttonIndex];
  //set the text to the popUp1
  document.querySelector(".popUp1SolveText").innerHTML=  
  "Solve "+ (buttonIndex+1).toString()+": "+
  timerTextArray[buttonIndex];

  //now must calculate the averages and set update the list texts
  refreshTimes();
}
function resetDNFtoTime(buttonIndex){
  console.log("resetDNFtoTime");
  
  console.log("before",timerTextArray[buttonIndex]);
  //now change the time text
  timerTextArray[buttonIndex]=convertToTimeText(timeArray[buttonIndex])
  console.log("after",timerTextArray[buttonIndex]);

  //set text on the button
  buttonsArray[buttonIndex*4+1].innerHTML=timerTextArray[buttonIndex];
  //set the text to the popUp1
  document.querySelector(".popUp1SolveText").innerHTML=  
  "Solve "+ (buttonIndex+1).toString()+": "+
  timerTextArray[buttonIndex];

  //now must calculate the averages and set update the list texts
  refreshTimes();
}
function refreshTimes(){
  //calculate averages
  //i must use a for loop and check update all the rows

  //updating averages of 5
  for (let i = 4;i<timeArray.length;i++){
    calculateAverageAtRow(i,0,1);
  }
  //updating averages of 12
  for (let i = 11;i<timeArray.length;i++){
    calculateAverageAtRow(i,1,2);
  }
  
  //calculate bests
  checkBests();
}


function popUp1DNFClick(buttonIndex){
  //same thing as +2 click, with different variables
  //(i could have used a function that takes in the variables as parameters but too much thinking)

  //need the index of the button clicked
  //when the button is clicked to open the popup, I will give the DNF button
  //an onclick to this function, and the buttonIndex as a parameter
  console.log("DNF button index is: ",buttonIndex);

  const add2Button = document.querySelector(".add2Button");
  const DNFButton = document.querySelector(".add2Button");
  //i need to keep track if the button is clicked or not (toggle DNF)
  //i made an array called DNFArray
  //everytime a row is made, the DNFArray at that index should be set to -1


  console.log("DNFArray: ",DNFArray[buttonIndex]);
  //if -1 or unclicked, make it clicked
  if (DNFArray[buttonIndex]==-1){
    DNFArray[buttonIndex]*=-1;
    //becomes clicked
    DNFButton.classList.add("button3Clicked");
    DNFButton.classList.remove("button3");
    //add +2 to text and time 
    DNFtoTime();

  } else {
    DNFArray[buttonIndex]*=-1;
    //becomes unclicked
    DNFButton.classList.add("button3");
    DNFButton.classList.remove("button3Clicked");
    //reset DNF to text and time 
    resetDNFtoTime();

  }
  //add2 becomes unclicked if it was clicked
  if (add2Array[buttonIndex]==1){
    add2Button.classList.remove("button3Clicked");
    add2Button.classList.add("button3");
    add2Array[buttonIndex]=-1;
    //reset add2 to text and time 
    resetAdd2toTime();
  }

  refreshTimes();

}
function popUp1BackClick(){
  console.log("back1");
  //hide popup1
  document.querySelector(".popUp1").classList.add("hidden");
}
function popUp1DeleteClick(){
  
}



//pop up 2 clicks
function popUp2BackClick(){
  console.log("back2");
  //hide popup2 (in case it was open)
  document.querySelector(".popUp2").classList.add("hidden");
}


function averageTimerClick(averageNum, averageTimeText){
  //if a time exists
  console.log("averageNum",averageNum);
  console.log("length is ",averageTimeText.length);

  if (averageTimeText.length>=averageNum){
    //show popup2
    document.querySelector(".popUp2").classList.remove("hidden");
    //hide popup1 (in case it was open)
    document.querySelector(".popUp1").classList.add("hidden");

    //now i set the proper values
    //average of
    document.querySelector(".popUp2AverageText").innerHTML=
    "Current Average of "
    +averageNum
    +": "
    +averageTimeText[numberOfRows-1];

    //now i need the scrambles and times using a for loop
    let text = "Time List: ";
    let lowestAverageArray = ao5Lowest;
    let highestAverageArray = ao5Highest;
    console.log("ao5Lowest: "+ao5Lowest);


    if (averageNum==12){
      lowestAverageArray=ao12Lowest;
      highestAverageArray=ao12Highest;
    }
    let counter = 1;
    for (let i=numberOfRows-averageNum;i<numberOfRows;i++){
      //add the scramble number and an enter
      text+="<br>"+counter.toString()+". ";
      counter++;

      //console.log("timeArray: "+timeArray[firstColumnIndex-i]);
      //console.log("lowest "+lowestAverageArray[firstColumnIndex]);

      console.log("timeArray[i] ",timeArray[i],"lowestAverageArray[i]",lowestAverageArray[i]);
      console.log(lowestAverageArray);

      let numberOfLowestNums = 0;
      let numberOfHighestNums = 0;
      //if highest number or lowest number
      if(timeArray[i]==lowestAverageArray[numberOfRows-1]
        &&numberOfLowestNums==0){
        //add a bracket
        text+="(";
        console.log("lowest or highest");
      } else if(timeArray[i]==highestAverageArray[numberOfRows-1]
        &&numberOfHighestNums==0){
        //add a bracket
        text+="(";
        console.log("lowest or highest");
      } 
      //time
      text+=timerTextArray[i];

      if(timeArray[i]==lowestAverageArray[numberOfRows-1]
        &&numberOfLowestNums==0){
        //add a bracket
        text+=")";
        console.log("lowest or highest");
        //to make sure no duplicate brackets if more than one lowest value
        numberOfLowestNums++;
      } else if(timeArray[i]==highestAverageArray[numberOfRows-1]
        &&numberOfHighestNums==0){
        //add a bracket
        text+=")";
        console.log("lowest or highest");
        //to make sure no duplicate brackets if more than one highest value
        numberOfHighestNums++;
      } 

      //add the scramble
      text+=" "+scrambleArray[i];
    }
    console.log(text);
    document.querySelector(".popUp2ScrambleText").innerHTML=text;
  }

  
}

function convertToTimeText(time){
  let text = "";
  /*
  //Text is set to hundreths
  if (time/6000>=1){
    //console.log("minutes");

    //the seconds after a minute is written 1:01:00 not 1:1:00
    //So I must check if the remainder is less than 1000 (or 10 seconds)
    //If yes, add a '0' string before the remaning seconds
    if((time%6000)<1000){
      //if less than 10 seconds add a 0 before the seconds
      timeText = (Math.floor((time/6000))).toString() //minutes
      +":"+
      "0"+
      ((time%6000)/100);//seconds
    } else {
      timeText = (Math.floor((time/6000))).toString() //minutes
      +":"+
      ((time%6000)/100);//seconds
    }
  } else {
    //otherwise, just show the seconds
    timeText = (time/100).toString();
  }
  
  if (time%100==0){
    //if multiple of 100 add a 00 at the end
    timeText+=".00";
  } else 
  //4 seconds should be 4.10 not 4.1
  if (timerCounter%10==0){
    //if multiple of 10 add a 0 at the end
    timeText+="0";
  }
*/

 //Must account for minutes:
//If the timerCounter / 600 is 1 or greater, change the text by showing minutes ':' and leftover seconds
if (time/6000>=1){
  //console.log("minutes");

  //the seconds after a minute is written 1:01:00 not 1:1:00
  //So I must check if the remainder is less than 100 (or 10 seconds)
  //If yes, add a '0' string before the remaning seconds
  let zero = "";
  if((time%6000)<1000){
    //if less than 10 seconds add a 0 before the seconds
    zero = "0";
  }
  text = (Math.floor((time/6000))).toString() //minutes
  +":"+
  zero+
  ((time%6000)/100);//seconds

} else {
  //otherwise, just show the seconds
  text = (time/100).toString();
}

//6 seconds is written 6:0 not 6
//So, if time is a multiple of 10, then add .0 at the end
if ((time)%100==0){
  text+=".00";
} else if ((time)%10==0){
  text+="0";
}

  //returns text
  return(text);
}
