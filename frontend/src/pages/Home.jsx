import { useState } from "react";
import "./Home.css";

export default function Home() {
  const idleButtonClass = "idle";
  const idleButtonMessage = "Envoyer votre message";

  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [buttonClass, setButtonClass] = useState(idleButtonClass);
  const [buttonMessage, setButtonMessage] = useState(idleButtonMessage);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_BACKEND_URL}/sendmail`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, sujet, message }),
    })
      .then((response) => {
        if (response.status === 200) {
          setEmail("");
          setSujet("");
          setMessage("");
        }
        return response.json();
      })
      .then((data) => {
        setButtonClass(data.status);
        setButtonMessage(data.message);

        setTimeout(() => {
          setButtonClass(idleButtonClass);
          setButtonMessage(idleButtonMessage);
        }, 5000);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Contactez-nous</h1>

      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor="email">
        Sujet
        <input
          type="text"
          name="sujet"
          id="sujet"
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
        />
      </label>

      <label htmlFor="email">
        Message
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <input type="submit" className={buttonClass} value={buttonMessage} />
    </form>
  );
}
