import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, sendMessage } = useChatStore();

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="w-80 h-96 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl rounded-lg flex flex-col p-4">
          <h3 className="font-bold mb-2">Assistant</h3>

          <div className="flex-1 overflow-y-auto mb-2 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-blue-100 dark:bg-blue-700 self-end"
                    : "bg-gray-200 dark:bg-gray-700 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border px-2 py-1 rounded-l dark:bg-gray-700 dark:text-white"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-1 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
