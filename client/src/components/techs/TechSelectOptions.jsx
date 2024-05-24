import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTechs} from "../../state/tech/techSlice";

const TechSelectOptions = () => {
  const dispatch = useDispatch();
  const {techs, loading} = useSelector(state => state.tech);

  useEffect(() => {
    dispatch(getTechs());
    // eslint-disable-next-line
  }, []);

  return (
    !loading &&
    techs.length > 0 &&
    techs.map(tech => (
      <option key={tech._id} value={`${tech.firstName} ${tech.lastName}`}>
        {tech.firstName} {tech.lastName}
      </option>
    ))
  );
};
export default TechSelectOptions;
