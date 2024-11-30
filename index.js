// Function to handle the message sending process
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatWindow = document.getElementById('chatWindow');
    const userMessage = userInput.value.trim();

    if (!userMessage) return; // Do nothing if input is empty

    // Append user message
    const userBubble = document.createElement('div');
    userBubble.style.cssText = 'margin-bottom: 10px; text-align: right;';
    userBubble.innerHTML = `<span style="background: #0056b3; color: white; padding: 8px 12px; border-radius: 15px; display: inline-block;">${userMessage}</span>`;
    chatWindow.appendChild(userBubble);

    userInput.value = ''; // Clear input field
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom

    try {
        // Make a POST request to the server
        const response = await fetch('https://server-luffy.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        // Append bot response
        const botBubble = document.createElement('div');
        botBubble.style.cssText = 'margin-bottom: 10px; text-align: left;';
        botBubble.innerHTML = `<span style="background: #e0e0e0; color: #333; padding: 8px 12px; border-radius: 15px; display: inline-block;">${data.botResponse}</span>`;
        chatWindow.appendChild(botBubble);

        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
    } catch (error) {
        console.error('Error:', error);

        // Show error message in the chat window
        const errorBubble = document.createElement('div');
        errorBubble.style.cssText = 'margin-bottom: 10px; text-align: left;';
        errorBubble.innerHTML = `<span style="background: #f8d7da; color: #721c24; padding: 8px 12px; border-radius: 15px; display: inline-block;">Sorry, there was an error processing your message.</span>`;
        chatWindow.appendChild(errorBubble);
    }
}
