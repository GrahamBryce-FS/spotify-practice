import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState("");

  const handleChange = (event) => {
    console.log("event.target.value:", event.target.value);
    setTerm(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // "Enter" key is pressed
      handleChange(event);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search up a band!"
          value={term}
          onChange={handleChange}
          onKeyDown={handleKeyDown} 
        />
        <button className="searchBtn"type="submit">Search</button>
        {/* <h1>{term}</h1> */}
      </form>
    </>
  );
}

export default SearchBar;