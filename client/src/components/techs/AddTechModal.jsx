import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addTech} from "../../state/tech/techSlice";
import M from "materialize-css/dist/js/materialize.min.js";

const AddTechModal = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = () => {
    if (firstName === "" || lastName === "") {
      M.toast({html: "Please enter your first and last name"});
    } else {
      const newTech = {
        firstName,
        lastName,
      };
      dispatch(addTech(newTech));
      M.toast({html: `${firstName} ${lastName} was added on the list`});
    }

    // Clear fields
    setFirstName("");
    setLastName("");
  };

  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Technician</h4>

        <div className="row">
          <div className="input-field">
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <a href="#" onClick={onSubmit} className="modal-close waves-effect blue waves-light btn">
            Enter
          </a>
        </div>
      </div>
    </div>
  );
};

// Inline component style
const modalStyle = {
  width: "75%",
  height: "75%",
};
export default AddTechModal;
