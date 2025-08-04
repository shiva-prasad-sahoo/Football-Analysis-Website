import React, { useState, useRef, useEffect } from "react";

function PlayerDisplay() {
  const [isOpen, setIsOpen] = useState(false);
  const [player, setPlayer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const players = [
    { id: 1, name: "Lionel Messi", club: "Inter Miami", flag: "🇦🇷" },
    { id: 2, name: "Cristiano Ronaldo", club: "Al Nassr", flag: "🇵🇹" },
    { id: 3, name: "Kevin De Bruyne", club: "Man City", flag: "🇧🇪" },
    { id: 4, name: "Kylian Mbappe", club: "Real Madrid", flag: "🇫🇷" },
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePlayerSelect = (name) => {
    setPlayer(name);
    setIsOpen(false);
    setSearchTerm(""); // clear search on select
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h3>Player Selector</h3>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="search"
          placeholder="Search player..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            marginBottom: "8px",
            boxSizing: "border-box",
          }}
        />
        {player && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              Selected: <strong>{player}</strong>
            </p>
            <button onClick={() => setPlayer("")}>Clear</button>
          </div>
        )}
      </div>

      <div ref={dropdownRef}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Select Player
        </label>
        <button
          onClick={toggleDropdown}
          style={{
            padding: "8px",
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          {player || "Choose a player"}{" "}
          <span style={{ float: "right" }}>▼</span>
        </button>

        {isOpen && (
          <ul
            style={{
              border: "1px solid #ccc",
              marginTop: "4px",
              padding: "0",
              listStyle: "none",
              maxHeight: "150px",
              overflowY: "auto",
              background: "#fff",
              zIndex: 100,
              position: "absolute",
              width: "100%",
            }}
          >
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((p) => (
                <li
                  key={p.id}
                  onClick={() => handlePlayerSelect(p.name)}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    backgroundColor: player === p.name ? "#f0f0f0" : "white",
                  }}
                >
                  {p.flag} {p.name} - {p.club}
                </li>
              ))
            ) : (
              <li style={{ padding: "8px", color: "#888" }}>
                No players found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PlayerDisplay;
