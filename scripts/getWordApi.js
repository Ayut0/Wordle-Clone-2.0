let word;

function getNewWord() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      "X-RapidAPI-Key": `${process.env.API_KEY}`,
    },
  };

  fetch(
    "https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5",
    options
  )
    .then((response) => response.json())
    .then((res) => {
      word = res.word;
      console.log(word);
    })
    .catch((err) => console.error(err));
}

export const chosenWord = word;
getNewWord();
