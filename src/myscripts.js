function copyText() {
    let inputText = document.getElementById('textInput').value;
    document.getElementById('displayText').innerText = inputText;

    const resultElement = document.getElementById('result');

    let isTextEmoji = isEmoji(inputText) ? 'is' : 'is not';
    let textUniCode = getUniCode(inputText);
    let analyzedEmoji = analyzeEmoji(inputText);

    resultElement.innerText = `"${inputText}" ${isTextEmoji} an emoji.\nLength: ${inputText.length}.\nUnicode: ${textUniCode}\n\nEmoji Characters\n${analyzedEmoji}`;

}

function isEmoji(text) {
    const emojiRegex = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}]{1}$/u;
    return emojiRegex.test(text);
}

function getUniCode(text) {
    return Array.from(text)
        .map(char => {
            const codePoint = char.codePointAt(0).toString(16).toUpperCase();
            return `U+${codePoint.padStart(4, '0')}`;
        })
        .join(' ');
}

function analyzeEmoji(emojiText){
    const characters = Array.from(emojiText);

    const characterInfo = characters.map(char => {
        const codePoint = char.codePointAt(0).toString(16).toUpperCase();
        return `U+${codePoint.padStart(4, '0')}: ${char}`;
    }).join('\n');
    
    return characterInfo;
}