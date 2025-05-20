import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe(); // отписка при размонтировании
  }, []);

  return (
    <div>
      {messages.map((msg) => (
        <p key={msg.id}>
          <strong>{msg.user}:</strong> {msg.text}
        </p>
      ))}
    </div>
  );
}
