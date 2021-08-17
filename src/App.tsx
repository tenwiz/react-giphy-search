import React, { useState, useEffect } from "react";
import "./App.css";

const PAGE_COUNT = 5;
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(1);
  const [giphyItems, setGiphyItems] = useState<any>([]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  useEffect(() => {
    const searchGiphyFromAPI = async (searchTerm: string) => {
      if (!searchTerm) return;
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?" +
          new URLSearchParams({
            api_key: "XJpBRQXQzg7XxYayYa3Mwh3fBUHcoMNU",
            q: searchTerm,
            limit: PAGE_COUNT.toString(),
            offset: `${PAGE_COUNT * pages}`,
          })
      ).then((res) => res.json());

      if (!!response.data.length) {
        setGiphyItems(response.data);
      }
    };
    searchGiphyFromAPI(searchTerm);
  }, [searchTerm, pages]);

  const handlePreviousPage = () => {
    const newPage = pages - 1;
    if (newPage === 0) {
      setPages(1);
    } else {
      setPages(newPage);
    }
  };

  const handleNextPage = () => {
    const newPage = pages + 1;
    setPages(newPage);
  };

  return (
    <div className="App">
      <header className="App-header">React Giphy Search</header>
      <div>
        <label htmlFor="search-giphy">Search Giphy</label>
        <input
          type="text"
          name="search-giphy"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <div>
        <button onClick={handlePreviousPage}>Previous Page</button>
        <span>{pages}</span>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
      <div>
        {giphyItems.map((item: any) => (
          <img
            key={item.id}
            src={item.images.fixed_height.url}
            alt={item.title}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
