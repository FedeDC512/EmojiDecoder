const themeToggle = document.getElementById('theme-toggle');

function loadSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    themeToggle.checked = prefersDark;
}

loadSystemTheme();
  
themeToggle.addEventListener('change', function() {
  const theme = this.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
});

let zwjEmojis = [];
let emojiData = new Map();

async function loadEmojiData() {
    if (emojiData.size > 0) return;

    const response = await fetch('unicode/emoji-test.txt');
    const text = await response.text();

    // Filters lines that do not begin with # and extracts emoji and description
    const lines = text.split('\n').filter(line => !line.startsWith('#') && line.trim() !== '');
    
    lines.forEach(line => {
        const [codePointPart, qualifierPart] = line.split(';').map(part => part.trim());
        const descriptionSection = line.split('#')[1]?.trim();
        const codePoints = codePointPart.split(' ').map(code => parseInt(code, 16));
        const emoji = String.fromCodePoint(...codePoints);
        if (descriptionSection) {
            const descriptionParts = descriptionSection.split(' ');
            const description = descriptionParts.slice(2).join(' ');  // Skips the emoji and version (E1.0)
            emojiData.set(emoji, description);
        }
    });
}

async function loadZwjEmojis() {
    if (zwjEmojis.length > 0) return

    const response = await fetch('unicode/emoji-zwj-sequences.txt');
    const text = await response.text();

    // Filters lines that do not begin with # and extracts emoji within the brackets ()
    const lines = text.split('\n').filter(line => !line.startsWith('#'));
    zwjEmojis = lines.map(line => {
        const match = line.match(/\((.*?)\)/);
        return match ? match[1] : null;
    }).filter(zwjEmoji => zwjEmoji !== null);
}

async function randomEmoji() {
    await loadZwjEmojis();
    const randomIndex = Math.floor(Math.random() * zwjEmojis.length);
    const zwjEmoji = zwjEmojis[randomIndex];
    document.getElementById('textInput').value = zwjEmoji;
    copyText();
}

async function loadAllEmojis() {
    loadZwjEmojis();
    loadEmojiData();
}

window.onload = loadAllEmojis();

function copyText() {
    let inputText = document.getElementById('textInput').value;
    document.getElementById('displayText').innerText = "Your Text: " + inputText;
    if (emojiData.has(inputText) || zwjEmojis.includes(inputText)){
        document.getElementById('displayText').innerText = "Your Emoji: " + inputText;
    }

    const resultElement = document.getElementById('result');
    const debugText = document.getElementById('debugText');

    let textUniCode = getUniCode(inputText);
    let analyzedEmoji = analyzeEmoji(inputText);

    //debugText.innerText = `"Debug: ${inputText}" ${isTextEmoji} an emoji.\nLength: ${inputText.length}.\nUnicode: ${textUniCode}\n${JSON.stringify(emojiData)}`;
    debugText.innerText = `Debug: ${textUniCode}`;

    let count = 1;
    resultElement.innerHTML = "";
    for (const [key, value] of Object.entries(analyzedEmoji)) {
        let description = emojiData.get(value) || 'no description available';
        if (getUniCode(value) === 'U+200D') {
            description = `invisible joiner (ZWJ)
            <a href="https://en.wikipedia.org/wiki/Zero-width_joiner" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
            </a>`;
        } else if (getUniCode(value) === 'U+FE0F') {
            description = `emoji display modifier (VS16)
            <a href="https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
            </a>`;
        } else if (getUniCode(value) === 'U+FE0E') {
            description = `text display modifier (VS15)
            <a href="https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
            </a>`;
        }

        description = description.charAt(0).toUpperCase() + description.slice(1);
        console.log(`${key}: ${value} - ${description}`);

        resultElement.innerHTML += `<tr>
                <th>${key}</th>
                <th>${value}</th>
                <td>${getUniCode(value)}</td>
                <td class="flex gap-2">${description}</td>
              <tr>`
        count++;
    }

}

function getUniCode(text) {
    return Array.from(text)
        .map(char => {
            const codePoint = char.codePointAt(0).toString(16).toUpperCase();
            return `U+${codePoint.padStart(4, '0')}`;
        })
        .join(' ');
}

function analyzeEmoji(emojiText) {
    const characters = Array.from(emojiText);

    let count = 1;
    const characterMap = characters.reduce((map, char) => {
        //const codePoint = char.codePointAt(0).toString(16).toUpperCase();
        map[count] = char;
        count++;
        return map;
    }, {});

    return characterMap;
}