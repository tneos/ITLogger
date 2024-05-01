import React, {useState, useEffect} from "react";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/logs");
    console.log(res);
    const data = await res.json();

    console.log(data);
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  console.log(loading);

  if (loading) {
    return <h4>Loading..</h4>;
  }

  return (
    <ul className="collection-with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No Logs to show..</p>
      ) : (
        logs.map(log => <li>{log.message}</li>)
      )}
    </ul>
  );
};
export default Logs;
