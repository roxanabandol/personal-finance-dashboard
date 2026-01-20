import { create } from "zustand";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
}

interface ChatState {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  addMessage: (msg: ChatMessage) => void;
  sendMessage: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  input: "",
  setInput: (value) => set({ input: value }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  sendMessage: () => {
    const { input, addMessage } = get();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    addMessage(userMsg);

    set({ input: "" });

    let botReply = "Sorry, I don't understand yet.";

    if (input.toLowerCase().includes("total"))
      botReply = "Your total expenses are $1234.56";
    if (input.toLowerCase().includes("food"))
      botReply = "You spent $345 on Food this month";
    if (input.toLowerCase().includes("top"))
      botReply = "Top category is Entertainment";

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: botReply,
    };
    setTimeout(() => addMessage(botMsg), 500);
  },
}));
