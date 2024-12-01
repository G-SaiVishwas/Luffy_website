document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");
    const userMessageInput = document.getElementById("userMessage");
    const chatOutput = document.getElementById("chatOutput");
    const clearChatButton = document.getElementById("clearChatButton");

    let chatData = JSON.parse(localStorage.getItem("chatData")) || {
        sessionId: null,
        fullConversationHistory: [],
        userInfo: {},
    };

    if (!chatData.userInfo.name) {
        const userName = prompt("What's your name?");
        if (userName) chatData.userInfo.name = userName;
    }

    function renderFullConversationHistory() {
        chatOutput.innerHTML = "";
        chatData.fullConversationHistory.forEach((message) => {
            const messageElement = document.createElement("div");
            messageElement.className =
                message.sender === "user" ? "user-message" : "bot-message";
            messageElement.textContent = message.text;
            chatOutput.appendChild(messageElement);
        });
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    renderFullConversationHistory();

    async function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (!userMessage) return;

        const userMessageEntry = {
            sender: "user",
            text: userMessage,
            timestamp: new Date().toISOString(),
        };
        chatData.fullConversationHistory.push(userMessageEntry);
        localStorage.setItem("chatData", JSON.stringify(chatData));
        renderFullConversationHistory();
        userMessageInput.value = "";

        try {
            const response = await fetch("https://server-luffy.onrender.com/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userMessage,
                    sessionId: chatData.sessionId,
                    conversationHistory: chatData.fullConversationHistory,
                    userInfo: chatData.userInfo,
                }),
            });

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const data = await response.json();
            const botMessageEntry = {
                sender: "bot",
                text: data.botResponse,
                timestamp: new Date().toISOString(),
            };
            chatData.fullConversationHistory.push(botMessageEntry);
            chatData.sessionId = data.sessionId || chatData.sessionId;
            localStorage.setItem("chatData", JSON.stringify(chatData));
            renderFullConversationHistory();
        } catch (error) {
            console.error("Error:", error);
            chatData.fullConversationHistory.push({
                sender: "bot",
                text: "An error occurred. Please try again later.",
                timestamp: new Date().toISOString(),
            });
            localStorage.setItem("chatData", JSON.stringify(chatData));
            renderFullConversationHistory();
        }
    }

    sendButton.addEventListener("click", sendMessage);
    userMessageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });

    clearChatButton?.addEventListener("click", () => {
        chatData = { sessionId: null, fullConversationHistory: [], userInfo: chatData.userInfo };
        localStorage.setItem("chatData", JSON.stringify(chatData));
        renderFullConversationHistory();
    });
});
