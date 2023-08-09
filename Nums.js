import React, { useState } from 'react';
import axios from 'react';

function Nums() {
  const [mergedNumbers, setMergedNumbers] = useState([]);

  const handleFetchNumbers = async (urls) => {
    const promises = urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        return response.data.numbers;
      } catch (error) {
        console.error(`Error fetching numbers from ${url}:`, error);
        return [];
      }
    });

    try {
      const numbersArrays = await Promise.all(promises);
      const merged = [...new Set(numbersArrays.flat())].sort((a, b) => a - b);
      setMergedNumbers(merged);
    } catch (error) {
      console.error('Error merging numbers:', error);
    }
  };

  const handleFetchClick = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const urls = queryParams.getAll('http://20.244.56.144/numbers/rand');
    handleFetchNumbers(urls);
  };

  return (
    <div>
      <button onClick={handleFetchClick}>Fetch and Merge Numbers</button>
      <div>
        Merged Numbers: {mergedNumbers.map((number) =>` ${number}, `)}
      </div>
    </div>
  );
}

export default Nums;