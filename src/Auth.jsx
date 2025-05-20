import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function Auth({ setUser }) {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Ошибка авторизации", error);
    }
  };

  return (
    <div>
      <button onClick={signIn}>Войти через Google</button>
    </div>
  );
}

export default Auth;
