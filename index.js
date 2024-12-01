document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");
    const userMessageInput = document.getElementById("userMessage");
    const chatOutput = document.getElementById("chatOutput");

    let userId = localStorage.getItem("userId");
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem("userId", userId);
    }

    async function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (!userMessage) return;

        const messageData = {
            userId,
            userMessage,
        };

        // Display user's message immediately
        appendMessage("user", userMessage);

        try {
            const response = await fetch("https://server-luffy.onrender.com/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageData),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const { botResponse } = await response.json();
            appendMessage("bot", botResponse);
        } catch (error) {
            appendMessage("bot", "An error occurred. Please try again.");
        }
    }

    function appendMessage(sender, text) {
        const messageElement = document.createElement("div");
        messageElement.className = sender === "user" ? "user-message" : "bot-message";
        messageElement.textContent = text;
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function generateUserId() {
        return Math.random().toString(36).substr(2, 9);
    }

    sendButton.addEventListener("click", sendMessage);
    userMessageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });
});
