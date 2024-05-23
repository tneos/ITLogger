import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {searchLogs, getLogs} from "../../state/log/logSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const text = useRef("");

  // Search action
  const onChange = e => {
    console.log(text.current.value);
    dispatch(searchLogs(text.current.value));
  };

  // Clear input
  const onClose = () => {
    text.current.value = "";
    dispatch(getLogs());
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
            <i className="material-icons" onClick={onClose}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};
export default SearchBar;
