// Replace with your server's deployed URL
const SERVER_URL = "https://server-luffy.onrender.com/chat";

// Function to send a message to the server
async function sendMessage(userMessage) {
    try {
        // Send the user message to the backend
        const response = await fetch(SERVER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userMessage }),
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        // Parse the response JSON
        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error:", error);
        return "Sorry, something went wrong. Please try again later.";
    }
}

// Add an event listener to handle button clicks
document.getElementById("sendButton").onclick = async () => {
    // Get the user message from the input field
    const userMessage = document.getElementById("messageInput").value;

    // Display the user's message in the chat window
    displayMessage("You", userMessage);

    // Send the message to the backend and get the response
    const reply = await sendMessage(userMessage);

    // Display the server's reply in the chat window
    displayMessage("Bot", reply);

    // Clear the input field
    document.getElementById("messageInput").value = "";
};

// Function to display messages in the chat window
function displayMessage(sender, message) {
    const chatWindow = document.getElementById("chatWindow");
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the latest message
}
