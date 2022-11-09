import { chosenWord } from "./getWord.js";
// import { chosenWord } from "../getWordApi.js";
// console.log(chosenWord);

import { resultModalContainer } from "./modal.js";
import { resultModalOverRay } from "./modal.js";

const keys = document.querySelectorAll("#key");
let guessBoxes = document.querySelectorAll(".guessWord");

export const tiles = guessBoxes;
export const keyBtn = keys;


let guessCount = 0;

//It possibly receives six words, so all the words should be stored during the game
//Each Word will be array
//First array: user's guess
//Second array: each word
//Put them into array
let usersGuessedWords = [[]];
let nextBox = 1;

//Give id to all the boxes
(()=>{
    const guessBoxesArray = [...guessBoxes]

    for(let i = 0; i<guessBoxesArray.length; i++){
        guessBoxesArray[i].setAttribute("id", i + 1);
    }
})();


//keyboard type
document.addEventListener("keydown", (e)=>{
    // console.log(e);
    let inputKey = e.key;
    if(inputKey === "Enter"){
        return compareWords();
    }

    if (inputKey === "Backspace") {
        return deleteUserGuessHandler();
    }
    let alphabetKeysInput = inputKey.match(/[a-z]/gi);

    //Validate to check if the pressed keys are alphabet
    if(!alphabetKeysInput || alphabetKeysInput.length > 1){
        return
    }else{
        let upperCaseInput = inputKey.toUpperCase();
        updateUsersGuessHandler(upperCaseInput);
    }
});

//Get how many words the user guesses
const getCurrentWordsArrayHandler = () =>{
    const numberOfWords = usersGuessedWords.length;
    return usersGuessedWords[numberOfWords - 1]
};


//update screen
const updateUsersGuessHandler = (letter) =>{
    //Get current words array from the function getCurrentWordsHandler
    const currentWordsArray = getCurrentWordsArrayHandler();

    if(currentWordsArray && currentWordsArray.length < 5){
        currentWordsArray.push(letter);

        const availableBox = document.getElementById(String(nextBox));
        nextBox += 1;

        availableBox.textContent = letter;

    }
};

//Get User's input from their clicking
keys.forEach(key => {
    key.addEventListener("click", ()=>{
        let clickedKey = key.innerHTML;

        updateUsersGuessHandler(clickedKey);
    })
});

//Delete letter
const deleteUserGuessHandler =()=>{
    const currentWordsArray = getCurrentWordsArrayHandler();
    const deletedLetter = currentWordsArray.pop();

    //Reassign the word without removed letter
    usersGuessedWords[usersGuessedWords.length - 1] = currentWordsArray;

    //Get the space that removed letter is used to be
    const lastLetter = document.getElementById(String(nextBox - 1));

    //Update the screen
    lastLetter.textContent = '';
    //Available that box
    nextBox -= 1;
}

const deleteBtn = document.querySelector("#deleteBtn");

deleteBtn.addEventListener("click", deleteUserGuessHandler);
// document.addEventListener("keypress", (e) => {
//   if (e.key === "Backspace") {
//       console.log(e);
//     deleteUserGuessHandler();
//   }
// });

//Change the color
const gray = "grayed";
const green = "greened";
const yellow = "yellowed";

const changeColor = (letter, index)=>{

    if(chosenWord[index] === letter){
        return green;
    }else if(chosenWord.includes(letter)){
        return yellow;
    }else{
        return gray;
    }
}

//Compare user's guess and the answer
const enterBtn = document.querySelector("#enterBtn");

const compareWords = ()=>{
    const currentWordsArray = getCurrentWordsArrayHandler();

    //Error check
    if(currentWordsArray.length !== 5 ){
        alert("Word must have five letters");
        return;
    }

    const currentUsersWord = currentWordsArray.join('');

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        "X-RapidAPI-Key": "74c9739105msheedf91b7419898ep10751cjsnb693886e8b4c",
      },
    };

    fetch(`https://wordsapiv1.p.rapidapi.com/words/${currentUsersWord}`, options)
    //   .then((response) => response.json())
      .then((response) => {
        if(!response.ok){
            throw Error();
        }
        const firstLetterId = guessCount * 5 + 1;
        const animationInterval = 300;

        currentWordsArray.forEach((letter, index) =>{
            setTimeout(()=>{
                console.log(currentWordsArray);
                console.log(letter);
                // console.log(index)
                console.log([...chosenWord]);
                const boxColor = changeColor(letter, index);
                const letterNum = firstLetterId + index;
                const letterEl = document.getElementById(letterNum);
                letterEl.classList.add("flip");
                letterEl.classList.add(`${boxColor}`);

            }, animationInterval * index)
        });

        guessCount += 1;

        usersGuessedWords.push([]);
        // Result modal
        {(currentUsersWord === chosenWord) && createResultModal(guessCount, chosenWord);}

        if (usersGuessedWords.length === 7 && currentUsersWord !== chosenWord) {
          //Fail Modal
          return createFailModal(chosenWord);
        }
      })
      .catch(() => {
          alert(`Ops, ${currentUsersWord} doesn't exist`);
          //Shake the boxes
        });

}

enterBtn.addEventListener("click", compareWords);
document.addEventListener("keypress", (e)=>{
    {(e.key === "Enter") && compareWords}
})

//Success modal
const createResultModal = (guessCount, chosenWord) => {
    resultModalOverRay.classList.add("active");
    const resultModalBody = document.createElement("div");
    resultModalBody.classList.add("resultModal");
    const resultModalInner = document.createElement("div");
    resultModalInner.classList.add("resultModal__inner");
    const resultModalTitle = document.createElement("div");

    const guessCountCheck = (guessCount)=>{
       return guessCount >= 2 ? "guesses" : "guess" ;
    }

    //Change the message by guesses

    const message = () =>{
        if(guessCount === 1){
            return "Genius!"
        }else if(guessCount ===2){
            return "Brilliant!"
        }else if(guessCount === 3){
            return "Excellent"
        }else if(guessCount === 4){
            return "Great job!";
        }else if(guessCount === 5){
            return "Good!";
        }

        return "Nice!"
}

    const resultModalContent = `
    <span>${message()}</span>
      <h3>Result</h3>
      <div class="result">
          <span>Answer:&nbsp;${chosenWord}</span>
          <span>You took ${guessCount}/6 ${guessCountCheck(guessCount)}</span>
      </div>
    `;
  resultModalTitle.innerHTML = resultModalContent;
  resultModalBody.appendChild(resultModalInner);
  resultModalInner.appendChild(resultModalTitle);
  resultModalContainer.append(resultModalBody);
};

//Fail modal
const createFailModal = (chosenWord)=>{
    resultModalOverRay.classList.add("active");
    const failModalBody = document.createElement("div");
    failModalBody.classList.add("failModal");
    const failModalInner = document.createElement("div");
    failModalInner.classList.add("failModal__inner");
    const failModalTitle = document.createElement("div");

    const failModalContent = `
    <span>Don't worry !!</span>
      <h3>Result</h3>
      <div class="result">
          <span>Answer:${chosenWord}</span>
      </div>
    `;
    failModalTitle.innerHTML = failModalContent;
    failModalBody.appendChild(failModalInner);
    failModalInner.appendChild(failModalTitle);
    resultModalContainer.append(failModalBody);
}
