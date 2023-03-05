import React from "react";

const FormElement = ({ children, title, subtitle, errorMessage = "" }) => {
  return (
    <>
      <h2 className="text-2xl mt-4">{title}</h2>
      <p className="text-gray-500 text-sm">{subtitle}</p>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {children}
    </>
  );
};

export default FormElement;
