const {obfuscate} = require('javascript-obfuscator');

const inputBox = document.getElementById("input");
const outputBox = document.getElementById("output");
const obfuscateButton = document.getElementById("obfuscate-button");

obfuscateButton.addEventListener("click", function() {
  const inputCode = inputBox.value;
  const obfuscatedCode = obfuscate(inputCode).getObfuscatedCode();
  outputBox.value = obfuscatedCode;
});
