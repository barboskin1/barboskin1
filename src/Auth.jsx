// src/Auth.jsx
import React, { useEffect, useState } from "react";
import { signIn, signOutUser, onAuthChange } from "./firebase";

export default function Auth({ onUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      onUser(u);
    });
    return () => unsubscribe();
  }, [onUser]);

  if (!user) {
    return <button onClick={signIn}>Войти через Google</button>;
  }

  return (
    <div>
      <p>Привет, {user.displayName}</p>
      <button onClick={signOutUser}>Выйти</button>
    </div>
  );
}
