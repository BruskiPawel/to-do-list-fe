import { useState } from "react";

const useHTTP = (url, method, header, body, applyData, responseHandler) => {
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    try {
      const response = await fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: header ? header : null,
      });
      console.log("jestem w use HTTP" + response);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      responseHandler(response);
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };
  return { error, sendRequest };
};
export default useHTTP;
