const enterInput = document.getElementById('enter-input');
const resultInput = document.getElementById('result-input');
const resultButton = document.getElementById('result-button');

const removeChar = (str) => { // str = 'У ПОпА БЫЛа СобАка';
  const separators = ["?", "!", ":", ";", ",", ".", " ", "\t"];
  const lowerCaseString = str.toLowerCase();
  const symbols = lowerCaseString.split(''); // ["у", " ", "п", "о", "п", "а", " ", "б", "ы", "л", "а", " ", "с", "о", "б", "а", "к", "а"]  
  
  let letters = {};
  let start = 0;
  let words = [];
  let result;

  symbols.forEach(function (letter, i) { // заполним words словами из входной строки по сепаратору
    if (separators.indexOf(letter) != -1) {
      words.push(lowerCaseString.substr(start, i - start));
      start = i + 1;
    }
    // words = [у, попа, была];
  });
  words.push(lowerCaseString.substr(start)); // words = [у, попа, была, собака];

  words.forEach(function (word) {   // добавим в letters повторяющиеся буквы (words[0] = 'у'; words[1] = 'попа'; words[2] = 'была'; words[3] = 'собака';)
    word.split('').forEach(function (letter, i) { // [у] [п,о,п,а ] [б,ы,л,а] [с,о,б,а,к,а]
      if (!letters[letter] && word.indexOf(letter, i + 1) !== -1) {
        letters[letter] = 1;
      }
    });
  });
  // letters = {п: 1, а: 1};
  
  result = symbols.filter(function (symbol) { // проходим по всем буквам строки и удаляем те, что находятся в letters
    return !letters[symbol];
  }).join(''); //  ["у", " ", "о", " ", "б", "ы", "л", " ", "с", "о", "б", "к"] -> 'у о был собк'
  
  return result;
};

const getResultHandler = (evt) => { // обработчик получения результата
  const enterString = enterInput.value;
  evt.preventDefault();
  resultInput.value = removeChar(enterString);
}

resultButton.addEventListener('click', getResultHandler); // по клику на кнопку get result
document.addEventListener('keydown', (keyEvt) => { // по нажатию enter
  if (keyEvt.keyCode === 13) {
    getResultHandler(keyEvt);
  }
})