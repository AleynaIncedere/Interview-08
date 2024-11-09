import React, { useState } from "react";
import './styles.css'; 

function App() {
  return (
    <div className="App">
      <ValidatedForm />
    </div>
  );
}

const ValidatedForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState([
    { username: "NamıkKorona1", password: "1234567" },
  ]);
  const [message, setMessage] = useState(""); 

  const handleUsernameChange = (e) => {
    if (e.target.value.length <= 20) {
      setUsername(e.target.value);
    } else {
      setMessage("Username cannot be longer than 20 characters.");
    }
  };

  const handlePasswordChange = (e) => {
    if (e.target.value.length <= 20) {
      setPassword(e.target.value);
    } else {
      setMessage("Password cannot be longer than 20 characters.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(""); 

    if (username.length < 6 || password.length < 6) {
      setMessage("Username and password must be at least 6 characters.");
      return;
    }

    const existingAccount = accounts.find(
      (account) => account.username === username && account.password === password
    );

    if (existingAccount) {
      setMessage(`Welcome, ${username}!`);
      setUsername("");
      setPassword("");
    } else {
      setAccounts((prevAccounts) => [
        ...prevAccounts,
        { username, password },
      ]);
      setMessage("Account created successfully! You can now login.");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Login</h3>
      <input
        value={username}
        type="text"
        placeholder="Username"
        onChange={handleUsernameChange}
      />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <button type="submit">Submit</button>

      {message && (
        <p className={message.includes("must") || message.includes("longer") ? "error-message" : "success-message"}>
          {message}
        </p>
      )}
    </form>
  );
};

export default App;
