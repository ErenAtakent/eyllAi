const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Kullanıcının mesajını göster
  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user-message");
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);

  userInput.value = "";

  // Bot cevabı (şimdilik sabit)
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot-message");
    botMsg.textContent = "ErenAI: Seni dinliyorum Eylül 💕";
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 800);
}
