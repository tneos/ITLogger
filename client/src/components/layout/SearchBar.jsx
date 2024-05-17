import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {searchLogs} from "../../state/log/logSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const text = useRef("");

  // Search action
  const onChange = e => {
    dispatch(searchLogs(text.current.value));
  };

  return (
    <nav style={{marginBottom: "3rem"}} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search Logs"
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};
export default SearchBar;
