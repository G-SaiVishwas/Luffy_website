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
      // Send user message to the backend
      const response = await fetch('http://localhost:5000/chat', { // Ensure this matches your backend URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMessage }),
      });

      if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
      }

      const { botResponse } = await response.json();

      // Display bot response
      simulateBotResponse(botResponse);
  } catch (error) {
      console.error('Error:', error);
      simulateBotResponse('Sorry, there was an error processing your message.');
  }
}

// Simulate bot response in the chat window with a delay
function simulateBotResponse(botMessage) {
  const chatWindow = document.getElementById('chatWindow');

  setTimeout(() => {
      const botBubble = document.createElement('div');
      botBubble.style.cssText = 'margin-bottom: 10px; text-align: left;';
      botBubble.innerHTML = `<span style="background: #e0e0e0; color: #333; padding: 8px 12px; border-radius: 15px; display: inline-block;">${botMessage}</span>`;
      chatWindow.appendChild(botBubble);
      chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
  }, 1000);
}
