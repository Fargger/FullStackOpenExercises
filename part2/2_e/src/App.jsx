import { useState, useEffect } from 'react';
import countryService from './services/countries.js';

const Filter = ({filter, changeHandler}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        Find Countries <input value={filter} onChange={changeHandler}></input>
      </div>
    </form>
  );
};

const Result = ({countries, searchFilter}) => {
  // 选中的 country
  const [selected, setSelected] = useState(null);
  // 搜索（大小写不敏感）
  const filteredCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(searchFilter.toLowerCase())
  );
  useEffect(() => setSelected(null), [searchFilter]);

  // 搜索结果大于十条时，显示提示
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  
  // 单个结果时显示国家详情
  if (filteredCountries.length === 1 || selected) {
    // 优先使用selected；selected为null时使用filteredContries[0]
    const country = selected || filteredCountries[0];
    console.log(country);
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital && country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
        <img src={country.flags.svg} alt={country.name.common} width="150" />
      </div>
    );
  }
  
  return (
    <div>
      <h2>Search Result</h2>
      <ul>
        {filteredCountries.map(c => (
          <li key={c.cca3}>{c.name.common}
          <button onClick={() => setSelected(c)}>Show</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    countryService.getAll().then(data => {
      setCountries(data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setSearchFilter(e.target.value);
  };

  return (
    <>
      <Filter filter={searchFilter} changeHandler={handleFilterChange} />
      <Result countries={countries} searchFilter={searchFilter}/>
    </>
  );
}

export default App
