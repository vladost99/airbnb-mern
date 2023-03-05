import React from "react";

const Button = ({ disabled = false, className, children, ...rest }) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={"primary " + className}
      style={{ backgroundColor: disabled ? "#bb7784" : "" }}
    >
      {children}
    </button>
  );
};

export default Button;
