import {useDispatch} from "react-redux";
import {deleteTech} from "../../state/tech/techSlice";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";

const TechItem = ({tech: {_id, firstName, lastName}}) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTech(_id));
    M.toast({html: "Technician deleted from the list"});
  };

  return (
    <li className="collection-item">
      <div>
        {firstName} {lastName}
        <a href="#" className="secondary-content" onClick={onDelete}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};
TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
};
export default TechItem;
