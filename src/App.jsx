import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import Auth from "./Auth";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {user ? <Chat /> : <Auth setUser={setUser} />}
    </div>
  );
}

export default App;
