// src/App.jsx
import React, { useState } from "react";
import Auth from "./Auth";
import Chat from "./Chat";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <Auth onUser={setUser} />
      ) : (
        <>
          <Chat />
        </>
      )}
    </div>
  );
}
