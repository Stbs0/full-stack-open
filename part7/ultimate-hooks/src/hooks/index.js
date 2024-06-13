import { useState, useEffect } from "react";
import axios from "axios";
export const useResource = (url) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setResources(res.data))
      .catch((error) => console.log(error));
  }, []);

  const service = {
    create: async (obj) => {
      const res = (await axios.post(url, obj)).data;
      setResources([...resources, res]);
    },
  };
  return [resources, service];
};
export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};
