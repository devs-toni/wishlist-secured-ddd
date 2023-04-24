import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActionIcon = ({ icon, clas, func, id }) => {
  return (
    <FontAwesomeIcon
      className={clas}
      icon={icon}
      onClick={() => func(id) ? func : {}}
    />
  )
}

ActionIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  clas: PropTypes.string.isRequired,
  func: PropTypes.func,
  id: PropTypes.string
}

export default ActionIcon;