/* eslint-disable react/prop-types */
import CountryInfo from "./CountryInfo";
const CountriesList = ({ countries, handleShow, showCountry, show }) => {
  if (countries.length === 0) return;
  if (countries.length > 10) {
    console.log("tomany");
    return <p>to many, please specify</p>;
  }
  if (countries.length > 1 && countries.length <= 10) {
    console.log(countries);
    
    return (
      <div>
        {countries.map((country) => {
        
          console.log(country.name.common);
          return (
            <p key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShow(country)}>Show</button>
            </p>
          );
        })}

        {show ? <CountryInfo country={[showCountry]} /> : null}
      </div>
    );
  }
};
export default CountriesList;
