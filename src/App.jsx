import React, { useState } from "react";
import Auth from "./Auth";
import Chat from "./Chat";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 20}}>
      {!user ? <Auth onUser={setUser} /> : <Chat user={user} />}
    </div>
  );
}