import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Add from "./components/Add";

function App() {
  // this state controls which page to show
  const [page, setPage] = useState("Add");

  const goToPage = (page) => (event) => {
    event.preventDefault();
    setPage(page);
  };
  const content = () => {
    if (page === "Add") {
      return <Add />;
    } else if (page === "Search") {
      return <Search />;
    }
  };
  const padding = {
    padding: 5,
  };

  return (
    <>
      <h1>Sanakirja -sovellus</h1>
      <a href="" onClick={goToPage("Search")} style={padding}>
        Hakulomake
      </a>
      <a href="" onClick={goToPage("Add")} style={padding}>
        Lisayslomake
      </a>

      {content()}
    </>
  );
}

export default App;
