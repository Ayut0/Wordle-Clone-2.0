import { answerWords } from "../Words/answerWords.js";

// console.log(answerWords);
// let targetWord;
let targetWord;

let randomNum = Math.floor(Math.random() * answerWords.length);
targetWord = answerWords[randomNum].toUpperCase();
console.log(targetWord);

export const chosenWord = targetWord;

document.addEventListener("DOMContentLoaded", ()=>{
})


// const getRandomWord = () =>{
//     //Get the word from json file
//     fetch("./Words/answerWords.json")
//     .then(response =>{
//         return response.json();
//     })
//     .then(data => {
//         //Generate the random number
//         let randomNum = Math.floor(Math.random() * data.length);
//         //Pick the random word from json file
//         targetWord = data[randomNum];
//         // return targetWord;
//         console.log(targetWord);
//     })
//     .catch(error =>{
//         console.error(error);
//     })

//     return targetWord;
// }

// getRandomWord();


// let result = document.querySelector("#textArea");
// const showOnField = (text) =>{
//     result.textContent = text;
// }

// showOnField(targetWord);

// console.log(getRandomWord());
