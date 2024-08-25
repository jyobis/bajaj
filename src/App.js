import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('{"data":["M","1","334","4","B"]}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase', label: 'Highest lowercase alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      // Replace 'YOUR_BACKEND_API_URL' with your actual API endpoint
      const result = await axios.post('YOUR_BACKEND_API_URL/bfhl', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let output = '';
    selectedOptions.forEach(option => {
      switch (option.value) {
        case 'numbers':
          output += `Numbers: ${response.numbers.join(',')}\n`;
          break;
        case 'alphabets':
          output += `Alphabets: ${response.alphabets.join(',')}\n`;
          break;
        case 'highest_lowercase':
          output += `Highest lowercase alphabet: ${response.highest_lowercase_alphabet.join(',')}\n`;
          break;
        default:
          break;
      }
    });

    return output.trim();
  };

  return (
    <div className="App">
      <div className="input-container">
        <label htmlFor="api-input">API Input</label>
        <input
          id="api-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
        />
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response-container">
          <div className="filter-container">
            <Select
              isMulti
              options={options}
              onChange={setSelectedOptions}
              placeholder="Multi Filter"
              className="multi-select"
            />
          </div>
          <div className="filtered-response">
            <h3>Filtered Response</h3>
            <pre>{renderFilteredResponse()}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;