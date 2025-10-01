import React, { useState, useEffect } from "react";
import "./Search.css";

const Search = () => {
  const [fin, setFin] = useState(""); // this is the input field
  const [eng, setEn] = useState(null); // this is the API response
  const [message, setMessage] = useState(null);

  // useEffect to fetch data when 'fin' changes
  useEffect(() => {
    const fetchData = async () => {
      if (fin.trim() === "") {
        setEn(null);
        setMessage(null);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/words/${fin}`);
        const result = await response.json();

        if (result.eng) {
          setEn(result.eng);
          setMessage(null);
        }
      } catch (error) {
        setMessage("Virhe haettaessa sanaa");
      }
    };

    fetchData();
  }, [fin]); // dependency array includes 'fin'

  return (
    <div>
      <h1>Etsi sana:</h1>
      <label>
        Suomi:
        <input
          type="text"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
          placeholder="Kirjoita sana suomeksi"
        />
      </label>
      <label>
        Englanti:
        <input type="text" value={eng || ""} readOnly />
      </label>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default Search;
