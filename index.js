document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userMessageInput = document.getElementById('userMessage');
    const chatOutput = document.getElementById('chatOutput');

    // Ensure sendButton exists and add event listener
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    } else {
        console.error('Send button not found');
    }

    async function sendMessage() {
        const userMessage = userMessageInput.value.trim();

        if (!userMessage) {
            console.log('No message provided');
            return;
        }

        console.log('User input:', userMessage);

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

            // Display response from the server
            chatOutput.innerHTML = data.botResponse;
        } catch (error) {
            console.error('Error:', error);
            chatOutput.innerHTML = 'An error occurred. Please try again later.';
        }
    }
});
