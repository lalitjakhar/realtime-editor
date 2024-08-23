import PropTypes from "prop-types";
import Avatar from "react-avatar";

const Client = ({ username }) => {
  return (
    <div className="client">
      <Avatar name={username} size={50} round="14px" />
      <span className="userName">{username}</span>
    </div>
  );
};

Client.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Client;
