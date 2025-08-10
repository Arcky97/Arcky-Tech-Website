"use client"

import ColorButton from "@/components/ColorButton";
import ScoreboardDropdown from "@/components/scoreboard/ScoreboardDropdown";
//import { useState } from "react"

/*interface Species {
  owner: "player" | "oponent";
  species: string;
  state: "active" | "idle" | "defeated";
}*/

export default function Scoreboard() {
  //const [usedSpecies, setUsedSpecies] = useState<Species[]>([]);

  const addSpecies = () => {

  };

/*  const changeSpeciesState = () => {

  };

  const removeSpecies = () => {

  };*/

  return (
    <div className="flex flex-col mt-16 w-full items-center">
      <ScoreboardDropdown/>
      <div >

      </div>
      <div>
        <ColorButton
          color="blue-800"
          text="Add Row"
          action={addSpecies}
        />
      </div>
    </div>
  )
}