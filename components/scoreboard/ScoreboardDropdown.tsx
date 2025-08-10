"use client"
import { useEffect, useState } from "react"
import Select from "react-select";

export default function ScoreboardDropdown() {
  //const [options, setOptions] = useState([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchAllSpecies() {
      try {
        const res = await fetch("/api/scoreboard");
        if (!res.ok) throw new Error('Failed to fetch');
        //const data = await res.json();
        //setOptions(data);
      } catch (error) {
        setError("An error occured while fetching Species Files from the server.");
        console.error("Error fetching Species Files:", error);
      }
    }

    fetchAllSpecies();

  }, []);
  
  if (error) {
    return <p className="text-red-500">{error}</p>
  }
  return (
    <div>
      <Select
      />
    </div>
  )
}