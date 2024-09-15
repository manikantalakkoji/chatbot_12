document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById("userInput").value.toLowerCase();
    if (userInput === "") return;

    appendMessage("You", userInput, "user");
    document.getElementById("userInput").value = "";

    setTimeout(() => {
        processInput(userInput);
    }, 500);
}

function appendMessage(sender, message, className) {
    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");
    messageElement.classList.add(className);
    messageElement.innerHTML = `<strong>${sender}:</strong> <span class="message-text">${message}</span>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
    chatbox.scrollTo({
        top: chatbox.scrollHeight,
        behavior: 'smooth'
    });
}

function processInput(userInput) {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('bot-message', 'typing');
    typingIndicator.innerHTML = '<strong>Bot:</strong> Typing...';
    document.getElementById('chatbox').appendChild(typingIndicator);

    setTimeout(() => {
        document.querySelector('.typing').remove();

        if (userInput.includes('hey') || userInput.includes('hello') || userInput.includes('hi')) {
            speak(getRandomMessage(greetingMessages));
        } else if (userInput.includes('bye') || userInput.includes('goodbye')) {
            speak(getRandomMessage(farewellMessages));
        } else if (userInput.includes('how are you') || userInput.includes('how are you doing')) {
            speak(getRandomMessage(howAreYouMessages));
        } else if (userInput.includes("open google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        } else if (userInput.includes("open youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening YouTube...");
        } else if (userInput.includes("open facebook")) {
            window.open("https://facebook.com", "_blank");
            speak("Opening Facebook...");
        } else if (userInput.includes('what is') || userInput.includes('who is') || userInput.includes('what are')) {
            const searchQuery = userInput.replace(" ", "+");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
            const finalText = `Here's what I found about "${userInput}"`;
            speak(finalText);
        } else {
            const searchQuery = userInput.replace(" ", "+");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
            const finalText = `I couldn't find a specific command for "${userInput}", so I searched the web for you.`;
            speak(finalText);
        }
    }, 1500);
}

function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
}

// Arrays for dynamic responses
const greetingMessages = [
    "Hello! How can I assist you today?",
    "Hi there! What can I do for you?",
    "Hey! Need any help?",
    "Greetings! How may I help you?"
];

const farewellMessages = [
    "Goodbye! Have a great day!",
    "See you later!",
    "Take care! Goodbye!",
    "Bye! Feel free to chat with me anytime."
];

const howAreYouMessages = [
    "I'm just a bot, but I'm functioning perfectly! How about you?",
    "I'm here and ready to help! How can I assist you?",
    "Doing great, thanks for asking! How can I assist you today?",
    "I'm all systems go! What can I do for you?"
];

function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
    appendMessage("Bot", message, "bot");
}
