// src/Chat.jsx
import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const dummy = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"), limit(100));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe();
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
  }

  return (
    <div>
      <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg) => (
          <p key={msg.id}>
            <b>{msg.displayName}:</b> {msg.text}
          </p>
        ))}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение"
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
