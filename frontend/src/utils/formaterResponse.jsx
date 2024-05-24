import ansiRegex from 'ansi-regex';

const removeANSIEscapeSequences = (text) => {
  return text.replace(ansiRegex(), '');
};

export const parseTelnetResponse = (response) => {
const cleanedResponse = removeANSIEscapeSequences(response);
const lines = cleanedResponse.split('\n');
const nonEmptyLines = lines.filter((line) => line.trim() !== '');
const filesArray = [];
nonEmptyLines.forEach((line) => {
  const words = line.split(' ');
  const cleanedWords = words.filter((word) => word.trim() !== '' && word.trim() !== '$');
  cleanedWords.forEach((word) => {
    const cleanedWord = word.replace(/[$.]/g, '');
    filesArray.push(cleanedWord);
  });
});

return filesArray;
};