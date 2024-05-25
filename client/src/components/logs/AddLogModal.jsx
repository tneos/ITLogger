import React, {useState} from "react";
import TechSelectOptions from "../techs/TechSelectOptions";
import {useDispatch, useSelector} from "react-redux";
import {addLog} from "../../state/log/logSlice";
import M from "materialize-css/dist/js/materialize.min.js";

const AddLogModal = () => {
  const dispatch = useDispatch();
  const {logs} = useSelector(state => state.log);
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({html: "Please enter technician's name and a message"});
    } else {
      const newLog = {
        id: logs.length + 1,
        message,
        attention,
        tech,
        date: new Date(),
      };

      dispatch(addLog(newLog));

      M.toast({html: `Log added by ${tech}`});
    }

    // Clear fields
    setMessage("");
    setTech("");
    setAttention(false);
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={e => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  name="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#" onClick={onSubmit} className="modal-close waves-effect blue waves-light btn">
          Enter
        </a>
      </div>
    </div>
  );
};

// Inline component style
const modalStyle = {
  width: "75%",
  height: "75%",
};
export default AddLogModal;
