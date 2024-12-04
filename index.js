document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");
  const surpriseButton = document.getElementById("surpriseButton");
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

      appendMessage("user", userMessage);
      userMessageInput.value = "";
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
          scrollToBottom();
      } catch (error) {
          appendMessage("bot", "An error occurred. Please try again.");
          scrollToBottom();
      }
  }

  function appendMessage(sender, text) {
      const messageElement = document.createElement("div");
      messageElement.className = sender === "user" ? "user-message" : "bot-message";

      const sanitizedText = escapeHtml(text);
      const parsedText = parseMarkdown(sanitizedText);

      messageElement.innerHTML = parsedText;
      chatOutput.appendChild(messageElement);

      // Apply animation
      messageElement.style.animation = "fadeIn 0.5s ease-in-out";
  }

  function generateUserId() {
      return Math.random().toString(36).substr(2, 9);
  }

  function escapeHtml(unsafe) {
      return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
  }

  function parseMarkdown(text) {
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      text = text.replace(/`(.*?)`/g, '<code>$1</code>');
      return text;
  }

  sendButton.addEventListener("click", sendMessage);

  userMessageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage();
      }
  });

  // Surprise Me Button Functionality
  const randomResponses = [
      "If you don’t take risks, you can’t create a future,",
"I don’t wanna conquer anything. It’s just that the person with the most freedom on the sea is the pirate king,",
"You want to keep everyone from dying? That’s naive. It's war. People die,",
"Forgetting is like a wound. The wound may heal but it has already left a scar,",
"Dying is not repaying a debt! That is not what he saved you for! Only weak men would die after someone spared their lives,",
"There is something mysterious about the life of a pirate,",
"Then just become stronger. I have my ambition; you have your ambition too. Which means you should just keep walking forward towards that goal,",
"You ready for this? I’m pretty strong,",
"If I get reincarnated… I wanna become a clam,",
"I’m gonna create a world where my friends can eat as much as they want,",
"That’s just how I look when I’m totally free,",
"I refuse your refusal,",
"I’m your captain now! We’ll be waiting for you. You better come,",
"I smell adventure,",
"Everybody ready? No matter what, I’ll keep you safe,",
"Get outta here! If you don’t, I’m gonna pound you,",
"I have Nakama who are not strong… But I still want them to be with me! So, I have to be stronger than anybody else… or else I’ll lose them all,",
"If you ask this old man anything about it here and now… Then I’ll quit being a pirate! I don’t want to go on a boring adventure like that,",
"We already came this far. Anyway, we’re gonna save you. And then, if you still want to die, you can die after we save you,",
"Don’t you dare make my navigator cry,",
"I don’t care who you are! I will surpass you,",
"Being alone is more painful than getting hurt,",
"I am going to save you even if it kills me,",
"You will wait out here for us, ok, Usopp? We’re gonna level that stupid house to the ground,",
"Leave the rest to me! I'll beat him no matter what! Tell everyone I've got this,",
"Power isn’t determined by your size, but the size of your heart and dreams,",
"If you hurt somebody… or if somebody hurts you, the same red blood will be shed,",
"Are we friends? Or are we foes? That kind of thing you decide for yourselves,",
"This place is now ours,",
"It’s not like ‘thanks’ are something I can eat,",
"Hero? No! We are pirates! I love heroes, but I don’t wanna be one,",
"No matter how hard or how impossible it is, never lose sight of your goal,",
"I’ve set myself to become the King of the Pirates… and if I die trying… then at least I tried,",
"Shut up and let’s do this,",
"Right! I’m ready too,",
"So, you don’t like to get hit, huh? Well, you’re about to have a very bad day,",
"Hey! I got an idea,",
"You could never beat me,",
"You came without fear. Don’t have any regrets, no matter what happens. This is the duel you wanted,",
"Hee hee hee! You can’t escape me now,",
"Hang on! I’m coming to help,",
"I decided to be King of the Pirates. I don’t care if I die for it,",
"I'm pretty sure I can't live without being helped,",
"One day, I’ll have a ship and a crew better than yours! And we’ll have the biggest hoard of treasure in the world,",
"The world’s greatest swordsman, that’s great! And it’s fitting since your new boss is going to be King of the Pirates! Anything else would make me look bad,",
"Being killed by marines or coming with me. Which one do you pick,",
"Shishishi! Blew ’em away,",
"Shanks, I want to fight,",
"Ooh, bet there are some strong guys here,",
"I don’t have to be a boss or a great pirate, do I? Whenever you guys are in trouble, call us! We'll come help you no matter what,",
"An island from a dream within a dream? I could never pass up a great adventure like this,",
"If you don’t want the negative reputation, you shouldn’t be a pirate,",
"I want to eat meat,",
"If you want to compare ambitions, mine is bigger,",
"Well, ya see… I’m gonna be the unbeatable pirate,",
"Why does that man have a pinwheel on his head,",
"That’s what I want at the end of my dream,",
"Pirates are pirates no matter where they go,",
"As long as you’re living, that’s enough. If you’re alive, you can fight again,",
"I will save the land of Wano and I will become the King of the Pirates,",
"Did you just dodge that one, Kaido?! Because it was gonna hurt,",
"I came here to whoop the whole lot of you! It’s an all-out war,",
"I’ve been to hell and back a few times already,",
"If you’re hungry, eat,",
"Screw the plan,",
"Never understand the true meaning of a pirate's flag,",
"Sorry, but it looks like I’m dead,",
"I still have my friends,",
"Let’s continue eating,",


  ];

  surpriseButton.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * randomResponses.length);
      appendMessage("bot", randomResponses[randomIndex]);
  });
});
