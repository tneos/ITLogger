import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTechs} from "../../state/tech/techSlice";

const TechSelectOptions = () => {
  const dispatch = useDispatch();
  const {techs, loading} = useSelector(state => state.tech);
  const {techsData} = techs;

  // console.log(techs, techsData);
  useEffect(() => {
    dispatch(getTechs());
    // eslint-disable-next-line
  }, []);
  return (
    !loading &&
    techs.techsData &&
    techsData.map(tech => (
      <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
        {tech.firstName} {tech.lastName}
      </option>
    ))
  );
};
export default TechSelectOptions;
