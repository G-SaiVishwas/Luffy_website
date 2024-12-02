document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");
  const userMessageInput = document.getElementById("userMessage");
  const chatOutput = document.getElementById("chatOutput");
  const chatWindow = document.getElementById("chatWindow");
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = generateUserId();
    localStorage.setItem("userId", userId);
  }

  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
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

    // Clear the input
    userMessageInput.value = "";

    // Scroll to bottom
    scrollToBottom();

    try {
      const response = await fetch("https://server-luffy.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const { botResponse } = await response.json();
      appendMessage("bot", botResponse);

      // Scroll to bottom after bot response
      scrollToBottom();
    } catch (error) {
      appendMessage("bot", "An error occurred. Please try again.");
      scrollToBottom();
    }
  }

  function appendMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.className =
      sender === "user" ? "user-message" : "bot-message";
    messageElement.textContent = text;
    chatOutput.appendChild(messageElement);
  }

  function generateUserId() {
    return Math.random().toString(36).substr(2, 9);
  }

  sendButton.addEventListener("click", sendMessage);

  userMessageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });
});
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseMarkdown(text) {
    // Bold: **text** or *text*
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Code: `code`
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Lists and other complex markdown can be added here
    
    return text;
}

function appendMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.className = sender === "user" ? "user-message" : "bot-message";
    
    // Sanitize first, then parse markdown
    const sanitizedText = escapeHtml(text);
    const parsedText = parseMarkdown(sanitizedText);
    
    // Use innerHTML to render HTML tags
    messageElement.innerHTML = parsedText;
    
    chatOutput.appendChild(messageElement);
    scrollToBottom();
}
