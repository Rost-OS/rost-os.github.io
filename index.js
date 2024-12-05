const phrases = [
    "我想睡觉TAT",
    "该吃吃该喝喝，干嘛在乎其他事",
    "涵如白"
];

let currentPhraseIndex = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 150;
let deletingSpeed = 50;
let pauseBeforeDelete = 2000;
let pauseBeforeType = 500;

const typingElement = document.querySelector('.typing-text');
const moodEmoji = document.querySelector('.mood-emoji');
const defaultTitle = document.title;

function type() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, currentChar - 1);
        currentChar--;

        if (currentChar === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(type, pauseBeforeType);
            return;
        }

        setTimeout(type, deletingSpeed);
    } else {
        typingElement.textContent = currentPhrase.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, pauseBeforeDelete);
            return;
        }

        setTimeout(type, typingSpeed);
    }
}

const emojis = ['😊', '😴', '🤔', '😂', '🤨', '😎'];
moodEmoji.addEventListener('click', function () {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    this.textContent = emojis[randomIndex];
});

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = "你快回来இ௰இ";
    } else {
        document.title = "终于等到你QAQ";
        setTimeout(() => {
            document.title = defaultTitle;
        }, 3000);
    }
});

setTimeout(type, pauseBeforeType);