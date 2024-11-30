async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();

    if (!userMessage) return;

    try {
        const response = await fetch('https://server-luffy.onrender.com/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userMessage }),
    mode: 'no-cors', // Temporary fix to bypass CORS
});


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);
        document.getElementById('chatWindow').innerText += `\nBot: ${data.botResponse}`;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    }
}
