document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userMessageInput = document.getElementById('userMessage');
    const chatOutput = document.getElementById('chatOutput');
    
    // Retrieve or initialize chat data from local storage
    let chatData = JSON.parse(localStorage.getItem('chatData')) || {
        sessionId: null,
        conversationHistory: []
    };

    if (!sendButton || !userMessageInput || !chatOutput) {
        console.error('Required DOM elements not found.');
        return;
    }

    // Restore previous chat messages if they exist
    chatData.conversationHistory.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = message.sender === 'user' ? 'user-message' : 'bot-message';
        messageElement.textContent = message.text;
        chatOutput.appendChild(messageElement);
    });

    // Scroll to bottom initially
    chatOutput.scrollTop = chatOutput.scrollHeight;

    sendButton.addEventListener('click', sendMessage);
    userMessageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (!userMessage) {
            console.log('No message provided');
            return;
        }

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
                body: JSON.stringify({ 
                    userMessage,
                    sessionId: chatData.sessionId,
                    conversationHistory: chatData.conversationHistory
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Update chat data
            chatData = {
                sessionId: data.sessionId || chatData.sessionId,
                conversationHistory: data.conversationHistory
            };

            // Save to local storage
            localStorage.setItem('chatData', JSON.stringify(chatData));

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
            errorMessageElement.className = 'bot-message error-message';
            errorMessageElement.textContent = 'An error occurred. Please try again later.';
            chatOutput.appendChild(errorMessageElement);
        }
    }

    // Clear chat button functionality
    const clearChatButton = document.getElementById('clearChatButton');
    if (clearChatButton) {
        clearChatButton.addEventListener('click', clearChat);
    }

    async function clearChat() {
        // Clear local chat output
        chatOutput.innerHTML = '';

        // Clear local storage
        localStorage.removeItem('chatData');

        // Reset chat data
        chatData = {
            sessionId: null,
            conversationHistory: []
        };

        // Clear session on the server if we have a session ID
        if (chatData.sessionId) {
            try {
                await fetch('https://server-luffy.onrender.com/clear-history', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sessionId: chatData.sessionId }),
                });
                console.log('Chat history cleared');
            } catch (error) {
                console.error('Error clearing chat history:', error);
            }
        }
    }
});
