import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import {getLogs} from "../../state/log/logSlice";

const Logs = () => {
  const dispatch = useDispatch();
  const {logs, loading} = useSelector(state => state.log);

  console.log(logs, loading);

  useEffect(() => {
    dispatch(getLogs());

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No Logs to show..</p>
      ) : (
        logs.map(log => <LogItem log={log} key={log._id} />)
      )}
    </ul>
  );
};

export default Logs;
