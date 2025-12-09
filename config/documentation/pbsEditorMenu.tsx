import { HomeIcon } from "@heroicons/react/24/outline";

export const pbsEditorMenu = {
  name: "pbs-editor",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "Arcky's PBS Editor",
  subItems: [
    {
      path: "update-history",
      text: "Update History"
    },
    {
      path: "pages",
      text: "Editor Pages",
      noPage: true,
      subItems: [
        {
          path: "home",
          text: "Home"
        },
        {
          path: "abilities",
          text: "Abilities"
        },
        {
          path: "berry-plants",
          text: "Berry Plants"
        },
        {
          path: "encounters",
          text: "Encounters"
        },
        {
          path: "items",
          text: "Items"
        },
        {
          path: "map-metadata",
          text: "Map Metadata"
        },
        {
          path: "moves",
          text: "Move"
        },
        {
          path: "pokemon",
          text: "Pokémon"
        },
        {
          path: "pokemon-forms",
          text: "Pokémon Forms"
        },
        {
          path: "trainers",
          text: "Trainers"
        },
        {
          path: "trainer-types",
          text: "Trainer Types"
        },
        {
          path: "types",
          text: "Types"
        }
      ]
    },

  ]
}