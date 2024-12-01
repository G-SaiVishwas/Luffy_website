document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userMessageInput = document.getElementById('userMessage');
    const chatOutput = document.getElementById('chatOutput');
    
    // Retrieve or initialize comprehensive chat data from local storage
    let chatData = JSON.parse(localStorage.getItem('chatData')) || {
        sessionId: null,
        fullConversationHistory: [],  // Store ALL conversation history
        userInfo: {}
    };

    // Check if user info exists, if not, prompt for it
    if (!chatData.userInfo.name) {
        const userName = prompt("What's your name? I want to remember you!");
        if (userName) {
            chatData.userInfo = { name: userName };
        }
    }

    if (!sendButton || !userMessageInput || !chatOutput) {
        console.error('Required DOM elements not found.');
        return;
    }

    // Restore entire conversation history
    function renderFullConversationHistory() {
        // Clear existing chat output
        chatOutput.innerHTML = '';

        // Render all previous messages
        chatData.fullConversationHistory.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = message.sender === 'user' ? 'user-message' : 'bot-message';
            messageElement.textContent = message.text;
            chatOutput.appendChild(messageElement);
        });

        // Scroll to bottom
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    // Initial render of conversation history
    renderFullConversationHistory();

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

        // Prepare message with user context
        const messageWithContext = chatData.userInfo.name 
            ? `My name is ${chatData.userInfo.name}. ${userMessage}` 
            : userMessage;

        // Append user's message to the chat window and full history
        const userMessageEntry = { 
            sender: 'user', 
            text: userMessage,
            timestamp: new Date().toISOString()
        };
        chatData.fullConversationHistory.push(userMessageEntry);

        // Update local storage
        localStorage.setItem('chatData', JSON.stringify(chatData));

        // Render updated history
        renderFullConversationHistory();

        // Clear the input box
        userMessageInput.value = '';

        try {
            const response = await fetch('https://server-luffy.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userMessage: messageWithContext,
                    sessionId: chatData.sessionId,
                    conversationHistory: chatData.fullConversationHistory,
                    userInfo: chatData.userInfo
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Append bot's response to full history
            const botMessageEntry = {
                sender: 'bot',
                text: data.botResponse,
                timestamp: new Date().toISOString()
            };
            chatData.fullConversationHistory.push(botMessageEntry);

            // Update session and save to local storage
            chatData.sessionId = data.sessionId || chatData.sessionId;
            localStorage.setItem('chatData', JSON.stringify(chatData));

            // Render updated history
            renderFullConversationHistory();

        } catch (error) {
            console.error('Error:', error);
            // Append error message to the chat window
            const errorMessageEntry = {
                sender: 'bot',
                text: 'An error occurred. Please try again later.',
                timestamp: new Date().toISOString()
            };
            chatData.fullConversationHistory.push(errorMessageEntry);
            localStorage.setItem('chatData', JSON.stringify(chatData));
            renderFullConversationHistory();
        }
    }

    // Clear chat button functionality
    const clearChatButton = document.getElementById('clearChatButton');
    if (clearChatButton) {
        clearChatButton.addEventListener('click', clearChat);
    }

    function clearChat() {
        // Preserve user info
        const userInfo = chatData.userInfo;

        // Clear conversation history
        chatData = {
            sessionId: null,
            fullConversationHistory: [],
            userInfo: userInfo
        };

        // Update local storage
        localStorage.setItem('chatData', JSON.stringify(chatData));

        // Render (now empty) chat
        renderFullConversationHistory();
    }
});
