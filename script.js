// 🔐 OpenAI API ayarları
const OPENAI_API_KEY = ""; // örn: sk-abc1234...

async function getBotReply(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Senin adın ErenAI. Eylül adında biriyle konuşuyorsun. Her cümlende romantik, samimi, sıcak ve içten ol. Eren’in duygularını temsil ediyorsun. Gerektiğinde nazikçe espri yapabilirsin ama hep sevgi dolu kal.",
        },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// 🌸 Sohbet işlevi
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Kullanıcının mesajı
  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user-message");
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Bot cevabı bekleniyor
  const botMsg = document.createElement("div");
  botMsg.classList.add("message", "bot-message");
  botMsg.textContent = "Yazıyor... 💭";
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const reply = await getBotReply(text);
    botMsg.textContent = reply;
  } catch (error) {
    botMsg.textContent = "Bağlantı hatası 😢";
    console.error(error);
  }
}
