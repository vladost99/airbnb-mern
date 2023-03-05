import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    setValue,
    handleInput,
  };
};
