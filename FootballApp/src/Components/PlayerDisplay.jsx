import React, { useState } from "react";

function PlayerDisplay() {
  const [isopen, SetIsopen] = useState(false);
  const [player, setPlayer] = useState("");

  const players = [
    { id: 1, name: "Lionel Messi", club: "Inter Miami", flag: "AR" },
    { id: 2, name: "Cristiano Ronaldo", club: "Al Nassr", flag: "🇵🇹" },
    { id: 3, name: "Kevin De Bruyne", club: "Man City", flag: "🇧🇪" },
    { id: 4, name: "Kylian Mbappe", club: "Real Madrid", flag: "FR" },
  ];

  function toggledrop() {
    SetIsopen(!isopen);
  }

  function handledrop(name) {
    setPlayer(name);
    SetIsopen(false);
  }

  return (
    <>
      <div>
        <input type="search" name="" id="" placeholder="Enter Player Name" />
        <button>X</button>
        <p>Kylian Mbappe</p>
      </div>
      <div>
        <label htmlFor="">Select Player</label>
        <button onClick={toggledrop}>
          {player || "choose a player"}
          <span>{">"}</span>
        </button>

        {isopen && (
          <ul>
            {players.map((p) => (
              <li key={p.id} onClick={() => handledrop(p.name)}>
                {p.flag} {p.name} - {p.club}
              </li>
            ))}
          </ul>
        )}

        <p>Selected Player : {player}</p>
      </div>
    </>
  );
}

export default PlayerDisplay;
