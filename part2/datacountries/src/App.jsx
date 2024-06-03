import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CountriesList from "./components/CountriesList";
import CountryInfo from "./components/CountryInfo";
function App() {
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(null);
  const [allData, setAllData] = useState([]);
  const [show, setShow] = useState({});

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        setAllData(res.data);
      });
  }, []);
  // TODO: finish the countrylist
  const handleShow = (country) => {
    // const name =country.name.common
    const c = { name: false };
    setShow(...c);
    setShowCountry(country);
  };
  //  console.log(value)
  //  console.log(allData)

  //     if (filtered.length > 10) {
  //       setComment("Too many matches, specify another filter")
  //     } else if(filtered.length > 1){
  //             setComment(filtered.map((a)=>{
  //               return a.name.common
  //             }));

  //     }

  const handleChange = (e) => {
    // setValue(e.target.value);
    if (e.target.value === "") {
      setCountries([]);
      return;
    }
    const filter = allData.filter((count) => {
      return count.name.common.toLowerCase().startsWith(e.target.value);
    });

    setCountries(filter);
  };

  return (
    <div>
      <p>
        find countries <input type="text" onChange={handleChange} />{" "}
      </p>
      <CountriesList
        countries={countries}
        handleShow={handleShow}
        showCountry={showCountry}
        show={show}
      />
      <CountryInfo country={countries} />
    </div>
  );
}

export default App;
