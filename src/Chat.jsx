import React, { useEffect, useState } from "react";
import { 
  collection, query, orderBy, onSnapshot, addDoc, serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase"; // импорт настроенного Firestore
import { getAuth } from "firebase/auth";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    if (!user) {
      alert("Пожалуйста, авторизуйтесь чтобы отправлять сообщения");
      return;
    }

    await addDoc(collection(db, "messages"), {
      text: input,
      userId: user.uid,
      userName: user.displayName || "Anon",
      createdAt: serverTimestamp(),
    });

    setInput("");
  }

  return (
    <div>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map(msg => (
          <div key={msg.id}>
            <b>{msg.userName}:</b> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введите сообщение"
          style={{ width: "80%" }}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
