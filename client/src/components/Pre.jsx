import PropTypes from "prop-types";

function Pre(props) {
  return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}

Pre.propTypes = {
  load: PropTypes.bool.isRequired, // Specify that load is a required boolean
};

export default Pre;
