import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {deleteLog, setCurrent} from "../../state/log/logSlice";
import M from "materialize-css/dist/js/materialize.min.js";

const LogItem = ({log}) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteLog(log._id));
    M.toast({html: "Log Deleted"});
  };

  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-log-modal"
          className={`modal-trigger ${
            log.attention ? "red-text item-text" : "blue-text item-text"
          }`}
          onClick={() => dispatch(setCurrent(log))}
        >
          {log.message}
        </a>
        <br />
        <div className="item-container">
          <span className="grey-text info">
            <span className="black-text item-text">ID #{log.id}</span>{" "}
            <span className="item-text">last updated by </span>
            <span className="black-text item-text">{log.tech}</span>
            <span className="item-text"> on </span>
            <Moment format="MMMM Do YYYY HH:mm" className="item-text">
              {log.date}
            </Moment>
          </span>
          <a href="#" onClick={onDelete} className="secondary-content">
            <i className="material-icons grey-text delete-icon">delete</i>
          </a>
        </div>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default LogItem;
