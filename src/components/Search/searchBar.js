import React from "react";

const SearchBar = (props) => {

  return (
    <form className="mx-5 my-5" >
    <div className="form-group mx-5">
      <div className="input-group" >
  
        <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          placeholder='Search for an Employee'
          id="search"
        />
      </div>
    </div>
  </form>
  );
}
export default SearchBar;