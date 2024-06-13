import { useState, useEffect } from "react";
import axios from "axios";
export const useCountry = () => {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState({});
//   const [message, setMessage] = useState(null);
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${value}`)
      .then((res) => {
        console.log(res)
        setCountry(res.data)}).catch(error=>console.log(error))
      
  }, [value]);

  return {
    setValue,
    country,
    // message,
    value
  };
};
