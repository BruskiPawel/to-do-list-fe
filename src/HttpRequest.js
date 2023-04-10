import { useEffect, useState } from "react";

const HttpsRequest = () => {
  const [data, setData] = useState();

  useEffect(() => {
     fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        console.log(data);
      })
      .catch((error) => console.error(error));
  },[]);

  return (
    <div>
    </div>
  );
};
export default HttpsRequest;
