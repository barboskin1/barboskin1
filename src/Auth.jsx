import React, { useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { auth } from "./firebase";

export default function Auth({ onUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) onUser(user);
      else onUser(null);
    });
    return unsubscribe;
  }, [onUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (user) {
    return (
      <div>
        <h2>Добро пожаловать, {user.email}</h2>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br/>
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Есть аккаунт? Войти"}
      </button>
    </div>
  );
}