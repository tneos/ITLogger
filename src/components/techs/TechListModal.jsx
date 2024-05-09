import React, {useState, useEffect} from "react";
import TechItem from "./TechItem";

const TechListModal = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch array of logs and set component state when app loads
  const getTechs = async () => {
    setLoading(true);
    const res = await fetch("/techs");
    console.log(res.body);
    const data = await res.json();
    console.log(data);
    setTechs(data);
    setLoading(false);
  };

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  console.log(techs, loading);

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Technician List</h4>
        <ul className="collection">
          {!loading && techs.map(tech => <TechItem tech={tech} key={tech.id} />)}
        </ul>
      </div>
    </div>
  );
};
export default TechListModal;
