function generateRandomNumber() {
    let randomNumber = '';
    for (let i = 0; i < 10; i++) {
      randomNumber += Math.floor(Math.random() * 10); // Random digit between 0 and 9
    }
    return randomNumber;
  }

module.exports = {
    generateRandomNumber,
}