import React, { useState, useRef, useEffect } from "react";

const players = [
  { id: 1, name: "Lionel Messi", club: "Inter Miami", flag: "🇦🇷" },
  { id: 2, name: "Cristiano Ronaldo", club: "Al Nassr", flag: "🇵🇹" },
  { id: 3, name: "Kevin De Bruyne", club: "Man City", flag: "🇧🇪" },
  { id: 4, name: "Kylian Mbappe", club: "Real Madrid", flag: "🇫🇷" },
];

function PlayerDisplay() {
  const [isOpen, setIsOpen] = useState(false);
  const [player, setPlayer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handlePlayerSelect = (name) => {
    setPlayer(name);
    setIsOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h3>Player Selector</h3>

      <div style={styles.searchWrapper}>
        <input
          type="search"
          placeholder="Search player..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />

        {player && (
          <div style={styles.selectedPlayer}>
            <p>
              Selected: <strong>{player}</strong>
            </p>
            <button onClick={() => setPlayer("")}>Clear</button>
          </div>
        )}
      </div>

      <div ref={dropdownRef}>
        <label style={styles.label}>Select Player</label>
        <button onClick={toggleDropdown} style={styles.dropdownButton}>
          {player || "Choose a player"}{" "}
          <span style={{ float: "right" }}>▼</span>
        </button>

        {isOpen && (
          <ul style={styles.dropdownList}>
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((p) => (
                <li
                  key={p.id}
                  onClick={() => handlePlayerSelect(p.name)}
                  style={{
                    ...styles.dropdownItem,
                    backgroundColor: player === p.name ? "#f0f0f0" : "#fff",
                  }}
                >
                  {p.flag} {p.name} - {p.club}
                </li>
              ))
            ) : (
              <li style={styles.noPlayers}>No players found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    fontFamily: "sans-serif",
  },
  searchWrapper: {
    marginBottom: "1rem",
  },
  input: {
    padding: "8px",
    width: "100%",
    marginBottom: "8px",
    boxSizing: "border-box",
  },
  selectedPlayer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    display: "block",
    marginBottom: "4px",
  },
  dropdownButton: {
    padding: "8px",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  dropdownList: {
    border: "1px solid #ccc",
    marginTop: "4px",
    padding: 0,
    listStyle: "none",
    maxHeight: "150px",
    overflowY: "auto",
    background: "#fff",
    zIndex: 100,
    position: "absolute",
    width: "100%",
  },
  dropdownItem: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
  noPlayers: {
    padding: "8px",
    color: "#888",
  },
};

export default PlayerDisplay;
