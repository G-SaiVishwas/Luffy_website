document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    if (sendButton) {
        sendButton.onclick = async () => {
            const userMessage = userInput.value.trim();
            if (userMessage) {
                // Display user's message
                displayMessage(userMessage, "user-message");

                try {
                    const response = await fetch("https://server-luffy.onrender.com/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userMessage }),
                    });

                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                    const data = await response.json();
                    displayMessage(data.reply, "bot-reply");
                } catch (error) {
                    console.error("Error:", error);
                    displayMessage("Sorry, I couldn't process your message. Try again!", "bot-reply");
                }
            }

            userInput.value = ""; // Clear input field
        };
    } else {
        console.error("Send button not found in the DOM");
    }

    function displayMessage(message, type) {
        const p = document.createElement("p");
        p.textContent = message;
        p.className = type;
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});
