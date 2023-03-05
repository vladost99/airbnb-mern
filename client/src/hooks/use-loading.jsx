import { useState } from "react";

export default (value = false) => {
  const [loading, setLoading] = useState(value);
  const [errorMessage, setErrorMessage] = useState("");
  return { loading, setLoading, errorMessage, setErrorMessage };
};
