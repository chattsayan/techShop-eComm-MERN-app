const Message = ({ variant, children }) => {
  const variantClasses = {
    info: "bg-blue-100 text-blue-700 border border-blue-300",
    success: "bg-green-100 text-green-700 border border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    danger: "bg-red-100 text-red-700 border border-red-300",
  };

  return (
    <div className={`mt-4 p-4 rounded-lg shadow-md ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

// defining default values for props in component.
Message.defaultProps = {
  variant: "info",
};

export default Message;
