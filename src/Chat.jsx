import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesRef = collection(db, "messages");
  const bottomRef = useRef(null);

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({...doc.data(), id: doc.id});
      });
      setMessages(msgs);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    await addDoc(messagesRef, {
      text,
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp()
    });
    setText("");
  };

  return (
    <div>
      <h3>Чат</h3>
      <div style={{height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px"}}>
        {messages.map(msg => (
          <div key={msg.id} style={{margin: "5px 0", backgroundColor: msg.uid === user.uid ? "#DCF8C6" : "#FFF", padding: "5px", borderRadius: "5px"}}>
            <b>{msg.email}</b>: {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input 
          type="text" 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Введите сообщение" 
          style={{width: "80%"}}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}