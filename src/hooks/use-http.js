import { useState } from "react";

const useHTTP = (DATA, body, applyData, responseHandler) => {
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    try {
      const response = await fetch(DATA.URL, {
        method: DATA.METHOD,
        body: body ? JSON.stringify(body) : null,
        headers: DATA.HEADER ? DATA.HEADER : null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData == null ? responseHandler() : applyData(data);
      
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };
  return { error, sendRequest };
};
export default useHTTP;
