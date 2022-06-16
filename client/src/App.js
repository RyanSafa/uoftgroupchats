import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState("");
  useEffect(() => {
    fetch("api")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return <div>{backendData.test}</div>;
}

export default App;
