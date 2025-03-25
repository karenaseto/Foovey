import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function getMealType(hour) {
  if (hour < 10) return "breakfast";
  if (hour < 12) return "brunch";
  if (hour < 15) return "lunch";
  if (hour < 17) return "a snack";
  if (hour < 21) return "dinner";
  return "a sweet treat";
}

const cuisineOptions = [
  "Chinese", "Vietnamese", "Thai", "Mexican", "Japanese", "Korean",
  "Indian", "Italian", "French", "Spanish", "Turkish", "Ethiopian",
  "Arab", "Fusion", "Argentine", "Fast food", "American"
];

function Home() {
  const [meal, setMeal] = useState("");
  const [name, setName] = useState("Mark");
  const [location, setLocation] = useState("📍 Berkeley, CA");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    setMeal(getMealType(hour));
  }, []);

  const filteredOptions = cuisineOptions.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/results?cuisine=${encodeURIComponent(search.trim())}`);
    }
  };

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
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            {showDropdown && (
              <ul
                className="dropdown"
                onMouseDown={(e) => e.preventDefault()} // keep dropdown open while clicking
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSearch(option); // autofill input
                        setShowDropdown(false);
                        handleSearch(); // go to results
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

export default Home;
