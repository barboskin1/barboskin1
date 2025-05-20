import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input) return;
    await addDoc(collection(db, "messages"), {
      text: input,
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      createdAt: new Date(),
    });
    setInput("");
  };

  return (
    <div>
      <div style={{ height: 300, overflowY: "auto" }}>
        {messages.map(msg => (
          <div key={msg.id}>
            <b>{msg.displayName}: </b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
}

export default Chat;
