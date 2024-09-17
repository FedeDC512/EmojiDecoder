const themeToggle = document.getElementById('theme-toggle');
const resultElement = document.getElementById('result');
const descriptionText = document.getElementById('descriptionText');
const inputTextbox = document.getElementById('textInput');
const dataTable = document.getElementById('dataTable');
const displayText = document.getElementById('displayText');
const decodeButton = document.getElementById('decodeButton');

let zwjEmojis = [];
let emojiData = new Map();

window.onload = loadAllEmojis();
loadSystemTheme();

inputTextbox.addEventListener('input', (event) => {
    decodeButton.disabled = !event.target.value;
});

function loadSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    themeToggle.checked = prefersDark;
}
  
themeToggle.addEventListener('change', function() {
  const theme = this.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
});

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

async function loadAllEmojis() {
    loadZwjEmojis();
    loadEmojiData();
}

function randomEmoji() {
    const randomIndex = Math.floor(Math.random() * zwjEmojis.length);
    const zwjEmoji = zwjEmojis[randomIndex];

    inputTextbox.value = zwjEmoji;
    inputTextbox.dispatchEvent(new Event('input'));

    copyText();
}

function copyText() {
    const inputText = inputTextbox.value;
    if (emojiData.has(inputText) || zwjEmojis.includes(inputText)){
        displayText.innerHTML = `<span class="font-semibold">Your Emoji:</span><br> <span class="text-xl">${inputText}</span>`;
    } else {
        displayText.innerHTML = `<span class="font-semibold">Your Text:</span><br> ${inputText}`;
    }

    let analyzedEmoji = analyzeEmoji(inputText);

    let textDescription = emojiData.get(inputText) || 'no description available';
    textDescription = textDescription.charAt(0).toUpperCase() + textDescription.slice(1);
    descriptionText.innerHTML = `<span class="font-semibold">Description:</span><br> ${textDescription}`;

    let count = 1;
    resultElement.innerHTML = "";
    for (const [key, value] of Object.entries(analyzedEmoji)) {
        let description = emojiData.get(value) || 'no description available';
        if (getUniCode(value) === 'U+200D') {
            description = `invisible joiner (ZWJ)
            <a href="https://en.wikipedia.org/wiki/Zero-width_joiner" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
            </a>`;
        } else if (getUniCode(value) === 'U+FE0F') {
            description = `emoji display modifier (VS16)
            <a href="https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
            </a>`;
        } else if (getUniCode(value) === 'U+FE0E') {
            description = `text display modifier (VS15)
            <a href="https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
            </a>`;
        }

        description = description.charAt(0).toUpperCase() + description.slice(1);
        //console.log(`${key}: ${value} - ${description}`);

        resultElement.innerHTML += `<tr>
                <th>${key}</th>
                <th class="text-lg">${value}</th>
                <td>${getUniCode(value)}</td>
                <td class="flex gap-2 items-center">${description}</td>
              <tr>`
        count++;
    }

    dataTable.classList.remove('hidden');
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