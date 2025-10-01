import React, { useState } from "react";
import "./Add.css";

const Add = () => {
  const [fin, setFin] = useState(""); // syötetty suomen sana
  const [eng, setEng] = useState(""); // syötetty englannin sana
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWordPair = { fin, eng: eng };
    try {
      const response = await fetch("http://localhost:3000/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWordPair),
      });
      if (response.ok) {
        setMessage("Word added successfully!");
        setFin("");
        setEng("");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setMessage("Error adding word. Please try again." + error.message);
      return;
    }
  };

  return (
    <div>
      <h1>Lisää sana:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Suomi:
          <input
            type="text"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            required
          />
        </label>
        <label>
          Englanti:
          <input
            type="text"
            value={eng}
            onChange={(e) => setEng(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Lisää" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Add;
