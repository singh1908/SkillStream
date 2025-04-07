import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send } from "lucide-react";

const faqPairs = [
  {
    questions: ["hello", "hi", "hey", "hii", "yo", "hola"],
    answer: "Hey there! 👋 How can I help you today?",
  },
  {
    questions: ["how are you", "how are you doing", "how's it going"],
    answer: "I'm doing great! Let me know how I can assist you.",
  },
  {
    questions: [
      "what can you do",
      "your features",
      "what are your features",
      "help",
    ],
    answer:
      "I can help you with notes sharing 📚, quizzes 📝, and video content 🎥 on the LMS platform.",
  },
  {
    questions: [
      "notes",
      "notes sharing",
      "share notes",
      "can i get notes",
      "download notes",
    ],
    answer:
      "Yes! You can upload and access notes from your dashboard under the 'Notes' section.",
  },
  {
    questions: ["quiz", "quizzes", "take quiz", "start quiz", "attempt quiz"],
    answer:
      "Sure! Go to the 'Quiz' section to attempt quizzes assigned by your teachers.",
  },
  {
    questions: [
      "video",
      "videos",
      "video sharing",
      "watch video",
      "view lectures",
    ],
    answer:
      "You can watch and share educational videos from the 'Videos' section of the platform.",
  },
  {
    questions: ["support", "help center", "need help", "contact support"],
    answer:
      "If you're facing issues, reach out to our support team via the 'Help Center' or email us.",
  },
  {
    questions: ["bye", "goodbye", "see you", "later"],
    answer: "Goodbye! Feel free to chat again anytime. 😊",
  },
];

const getAnswer = (input) => {
  const normalized = input.toLowerCase().trim();
  for (const pair of faqPairs) {
    if (pair.questions.some((q) => normalized.includes(q))) {
      return pair.answer;
    }
  }
  return null;
};


const ChatbotPopup = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

const sendMessage = async () => {
  if (!input.trim()) return;
  
  const userMsg = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);
  
  const localResponse = getAnswer(input);
  
  if (localResponse) {
    const botMsg = { sender: "bot", text: localResponse };
    setMessages((prev) => [...prev, botMsg]);
  } else {
    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await res.json();
      const botMsg = { sender: "bot", text: data.response || "Hmm... I'm not sure." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg = { sender: "bot", text: "❌ Error reaching the AI server." };
      setMessages((prev) => [...prev, errorMsg]);
    }
  }
  
  setInput("");
};
  

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {" "}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:bg-blue-700 transition"
      >
        {" "}
        <Bot size={28} />{" "}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-80 h-[450px] bg-white rounded-2xl shadow-2xl border mt-4 flex flex-col overflow-hidden"
          >
            <div className="bg-blue-600 text-white px-4 py-3 text-lg font-bold flex justify-between items-center">
              <span>LMS Chatbot</span>
              <button
                onClick={toggleChat}
                className="text-white hover:opacity-80"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${
                    msg.sender === "user"
                      ? "text-right text-blue-600"
                      : "text-left text-green-600"
                  }`}
                >
                  <div className="inline-block bg-white border px-3 py-2 rounded-lg shadow-sm">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded px-3 py-2 focus:outline-none"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotPopup;