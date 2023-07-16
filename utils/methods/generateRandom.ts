export function generateRandomLetters(length: number) {
    let randomLetters = '';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const lettersLength = letters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * lettersLength);
      randomLetters += letters.charAt(randomIndex);
    }
  
    return randomLetters;
  }