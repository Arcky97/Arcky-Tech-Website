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
          text: "Abilities",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-abilities",
              text: "Import Abilities"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#ability-selection",
              text: "Ability Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#description",
              text: "Description"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#ability-overwrite",
              text: "Ability Overwrite"
            }
          ]
        },
        {
          path: "berry-plants",
          text: "Berry Plants",
          subItems: [
                        {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-berry-plants",
              text: "Import Berry Plants"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#berry-plant-selection",
              text: "Berry Plant Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#hours-per-stage",
              text: "Hours per Stage"
            },
            {
              path: "#drying-per-hour",
              text: "Drying per Hour"
            },
            {
              path: "#yield",
              text: "Yield"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#berry-plant-overwrite",
              text: "Berry Plant Overwrite"
            }
          ]
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
          path: "town-map",
          text: "Town Map"
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
    {
      path: "import",
      text: "Importing Entries"
    }
  ]
}