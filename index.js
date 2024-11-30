console.log("Script loaded");
document.getElementById("send-btn").onclick = () => {
    console.log("Send button clicked");
    sendMessage();
};

async function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    console.log("User input:", userMessage);
    try {
        const response = await fetch("https://server-luffy.onrender.com/chat", {
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
