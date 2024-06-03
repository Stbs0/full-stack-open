/* eslint-disable react/prop-types */
const CountryInfo = ({ country }) => {
    console.log(country)
  if (country.length === 0 || country.length > 1) return;
  console.log("hall")
  return (
    <div>
      <div>
        <h1>{country[0].name.common} </h1>
        <p> Capital {country[0].capital} </p>
        <p> area {country[0].area} </p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country[0].languages).map((lang) => {
            return <li key={lang}> {lang} </li>;
          })}
        </ul>
        <img src={country[0].flags.png} alt="" />
      </div>
    </div>
  );
};
export default CountryInfo;
