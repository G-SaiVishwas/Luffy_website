// URL of your backend server
const SERVER_URL = "https://server-luffy.onrender.com/chat"; // Replace with your Render backend URL

async function sendMessage() {
    // Get user input from the text field
    const userMessage = document.getElementById("user-input").value;

    try {
        // Send a POST request to the backend
        const response = await fetch(SERVER_URL, {
            method: "POST",console.log("Script loaded");
document.getElementById("send-btn").onclick = () => {
    console.log("Send button clicked");
    sendMessage();
};

async function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    console.log("User input:", userMessage);
    try {
        const response = await fetch("https://your-server-url/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userMessage }),
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Response received:", data);
        document.getElementById("chat-response").innerText = data.reply;
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to send the message. Please try again.");
    }
}

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userMessage }),
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Display the response in the chat response area
        document.getElementById("chat-response").innerText = data.reply;
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to send the message. Please try again.");
    }
}

// Attach the sendMessage function to the send button
document.getElementById("send-btn").onclick = sendMessage;
