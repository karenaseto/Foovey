import { useEffect, useState } from "react";
import "./App.css";

function getMealType(hour) {
  if (hour < 10) return "breakfast";
  if (hour < 12) return "brunch";
  if (hour < 15) return "lunch";
  if (hour < 17) return "a snack";
  if (hour < 21) return "dinner";
  return "a sweet treat";
}

const cuisineOptions = [
  "Chinese",
  "Vietnamese",
  "Thai",
  "Mexican",
  "Japanese",
  "Korean",
  "Indian",
  "Italian",
  "French",
  "Spanish",
  "Turkish",
  "Ethiopian",
  "Arab",
  "Fusion",
  "Argentine",
  "Fast food",
  "American",
];

function App() {
  const [meal, setMeal] = useState("");
  const [name, setName] = useState("Mark");
  const [location, setLocation] = useState("📍 Berkeley, CA");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setMeal(getMealType(hour));
  }, []);

  const filteredOptions = cuisineOptions.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="foovey-brand">Foovey</div>

      <div className="app new-layout">
        <h1 className="headline">Let's go get {meal}, {name}!</h1>

        <div className="search-container">
          <label className="search-label">What are we craving?</label>
          <div className="dropdown-wrapper">
            <input
              type="text"
              placeholder="Type or select cuisine..."
              value={search}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
              onChange={(e) => setSearch(e.target.value)}
            />
            {showDropdown && (
              <ul className="dropdown">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSearch(option);
                        setShowDropdown(false);
                      }}
                    >
                      {option}
                    </li>
                  ))
                ) : (
                  <li className="no-match">Cuisine not found</li>
                )}
              </ul>
            )}
          </div>
          <span className="location">{location}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
