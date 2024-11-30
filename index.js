document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userMessageInput = document.getElementById('userMessage');
    const chatOutput = document.getElementById('chatOutput');

    if (!sendButton || !userMessageInput || !chatOutput) {
        console.error('Required DOM elements not found.');
        return;
    }

    sendButton.addEventListener('click', sendMessage);

    async function sendMessage() {
        const userMessage = userMessageInput.value.trim();

        if (!userMessage) {
            console.log('No message provided');
            return;
        }

        console.log('User input:', userMessage);

        // Append user's message to the chat window
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'user-message';
        userMessageElement.textContent = userMessage;
        chatOutput.appendChild(userMessageElement);

        // Clear the input box
        userMessageInput.value = '';

        // Scroll chat window to the bottom
        chatOutput.scrollTop = chatOutput.scrollHeight;

        try {
            const response = await fetch('https://server-luffy.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userMessage }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Server says:', data.botResponse);

            // Append bot's response to the chat window
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'bot-message';
            botMessageElement.textContent = data.botResponse;
            chatOutput.appendChild(botMessageElement);

            // Scroll chat window to the bottom
            chatOutput.scrollTop = chatOutput.scrollHeight;
        } catch (error) {
            console.error('Error:', error);

            // Append error message to the chat window
            const errorMessageElement = document.createElement('div');
            errorMessageElement.className = 'bot-message';
            errorMessageElement.textContent = 'An error occurred. Please try again later.';
            chatOutput.appendChild(errorMessageElement);
        }
    }
});
