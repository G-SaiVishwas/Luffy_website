// Ensure that the DOM has fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Get the button element
    const sendButton = document.getElementById('sendButton');

    // Ensure the sendButton is found
    if (sendButton) {
        sendButton.onclick = sendMessage;
    } else {
        console.error('Send button not found');
    }
});

async function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;

    if (!userMessage) {
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

        const data = await response.json();

        if (response.ok) {
            console.log('Server says:', data.botResponse);
            document.getElementById('chatOutput').innerHTML = data.botResponse;
        } else {
            console.error('Error:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
