import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TechItem from "./TechItem";
import {getTechs} from "../../state/tech/techSlice";

const TechListModal = () => {
  const dispatch = useDispatch();
  const {techs, loading} = useSelector(state => state.tech);

  useEffect(() => {
    dispatch(getTechs());
    // eslint-disable-next-line
  }, []);

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
