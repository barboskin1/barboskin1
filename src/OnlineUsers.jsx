import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function OnlineUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "onlineUsers"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      setUsers(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h4>🟢 Онлайн:</h4>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
