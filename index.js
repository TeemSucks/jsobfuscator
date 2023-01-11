const inputBox = document.getElementById("input");
const outputBox = document.getElementById("output");
const obfuscateButton = document.getElementById("obfuscate-button");

const obfuscate = (code) => {
    // rename variables and functions
    const variableRenamer = (code) => {
        const variableNames = code.match(/\b[a-zA-Z_$][a-zA-Z_$0-9]*\b/g);
        if (variableNames) {
            const usedNames = new Set();
            const renameMap = new Map();
            for (const name of variableNames) {
                let newName;
                do {
                    newName = Math.random().toString(36).slice(2);
                } while (usedNames.has(newName));
                usedNames.add(newName);
                renameMap.set(name, newName);
            }
            for (const [originalName, newName] of renameMap) {
                code = code.split(originalName).join(newName);
            }
        }
        return code;
    }
    code = variableRenamer(code);

    // add junk code
    const junkCodeInjector = (code) => {
        const junkStatements = [
            'console.log("Hello, world!");',
            'alert("Hi there!");',
            'console.warn("This is a warning.");',
            'console.error("An error has occurred.");',
            'while(true);',
            'eval("");',
            'Function("while(true);")();'
        ];
        const junkStatement = junkStatements[Math.floor(Math.random() * junkStatements.length)];
        const codeLines = code.split("\n");
        for (let i = 0; i < codeLines.length; i++) {
            if (Math.random() < 0.2) {
                codeLines.splice(i, 0, junkStatement);
            }
        }
        return codeLines.join("\n");
    }
    code = junkCodeInjector(code);

    //Encoding
    const encodeCode = (code) => {
        return btoa(unescape(encodeURIComponent(code)));
    }
    code = encodeCode(code);

    //split and Scramble
    const scrambleCode = (code) => {
        const codeArr = code.split("");
        for(let i = codeArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = codeArr[i];
            codeArr[i] = codeArr[j];
            codeArr[j] = temp;
        }
        return codeArr.join("");
    }
    code = scrambleCode(code);

    return code;
}

obfuscateButton.addEventListener("click", function() {
  const inputCode = inputBox.value;
  const obfuscatedCode = obfuscate(inputCode);
  outputBox.value = obfuscatedCode;
});
