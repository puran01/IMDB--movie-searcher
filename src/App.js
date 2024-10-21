import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Page2 from './Page2';
import Movies from './Movies';

// Import index.css if necessary
import './index.css';

function App() {
  const [count, setCount] = useState(0);
  const myarr = ["item1", "item2", "item3", "item4"];
  const [clickedItem, setClickedItem] = useState(null);
  const handleclick = (item) => setClickedItem(item);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleform = (e) => {
    e.preventDefault();
    setInputValue(inputValue.toUpperCase());
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setInputValue('');
    setIsSubmitted(false);
  };

  const countWords = (text) => {
    if (!text) return 0;
    return text.length;
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Page2">New Page</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link> {/* Link to the Movies page */}
          </li>
        </ul>
      </nav>

      <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <div>
              <h2>Trial to check the functionality</h2>
              <button onClick={() => setCount(count + 1)}>
                <span>Number of times clicked: {count}</span>
              </button>

              <ol>
                <h2>Array of items</h2>
                {myarr.map(item => (
                  <h3 key={item}>
                    <li onClick={() => handleclick(item)} style={{ cursor: 'pointer' }}>
                      {item}
                    </li>
                  </h3>
                ))}
              </ol>

              {clickedItem && (
                <h2>Clicked item from the list is: {clickedItem}</h2>
              )}

              <div>
                <button onClick={fetchData}>Get a new joke!</button>
                {loading && <h3>Loading...</h3>}
                {error && <h3>Error...</h3>}

                {data && (
                  <>
                    <h3>Type: {data.type}</h3>
                    <h3>Setup: {data.setup}</h3>
                    <h3>Punchline: {data.punchline}</h3>
                  </>
                )}
              </div>

              <div>
                <form onSubmit={handleform}>
                  <textarea
                    rows={2}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your text here"
                  />
                  <br />
                  <button type="submit">Submit</button>
                  <button type="button" onClick={handleReset} className="reset-button">Reset</button>
                  <div>
                    {isSubmitted && (
                      <>
                        <p>Uppercase = {inputValue}</p>
                        <p>Count of words = {countWords(inputValue)}</p>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          } />

 {/* New Page Route */}
 <Route path="/Page2" element={<Page2 />} />

{/* Movies Route */}
<Route path="/movies" element={<Movies />} />
</Routes>
</div>
</Router>
  );
}

export default App;
