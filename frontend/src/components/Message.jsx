import PropTypes from "prop-types";

const Message = ({ variant = "info", children }) => {
  const variantClasses = {
    info: "bg-blue-100 text-blue-700 border border-blue-300",
    success: "bg-green-100 text-green-700 border border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    danger: "bg-red-100 text-red-700 border border-red-300",
  };

  return (
    <div
      className={`mt-4 p-4 rounded-lg shadow-md ${
        variantClasses[variant] || variantClasses.info
      }`}
    >
      {children}
    </div>
  );
};

Message.propTypes = {
  variant: PropTypes.oneOf(["info", "success", "warning", "danger"]),
  children: PropTypes.node.isRequired,
};

// defining default values for props in component.
// Message.defaultProps = {
//   variant: "info",
// };

export default Message;
