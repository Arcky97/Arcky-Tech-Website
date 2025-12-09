import { HomeIcon } from "@heroicons/react/24/outline";

export const doggoBotMenu = {
  name: "doggo-bot",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "Doggo Bot",
  subItems: [
    {
      path: "commands",
      text: "Commands",
      subItems: [
        {
          path: "premium",
          text: "Premium Commands",
        },
        {
          path: "moderation",
          text: "Moderation Commands",
          subItems: [
            {
              path: "embed",
              text: "Embed Commands",
              subItems: [
                {
                  path: "create",
                  text: "Embed Create"
                },
                {
                  path: "edit",
                  text: "Embed Edit"
                },
                {
                  path: "delete",
                  text: "Embed Delete"
                }
              ]
            },
            {
              path: "level-system",
              text: "Level System Commands",
              subItems: [
                {
                  path: "#multiplier",
                  text: "Multiplier Commands"
                },
                {
                  path: "#announce",
                  text: "Announce Commands"
                },
                {
                  path: "#blacklist",
                  text: "Blacklist Commands"
                },
                {
                  path: "#roles",
                  text: "Role Commands"
                },
                {
                  path: "xp",
                  text: "XP Commands"
                },
                {
                  path: "voice",
                  text: "Voice Commands"
                },
                {
                  path: "settings",
                  text: "Setting Commands"
                },
                {
                  path: "reset",
                  text: "Reset Commands"
                },
                {
                  path: "modify",
                  text: "Modify Commands"
                },
                {
                  path: "calculator",
                  text: "Calculator Commands"
                }
              ]
            },
            {
              path: "mod",
              text: "Mod Commands"
            },
            {
              path: "reaction-roles",
              text: "Reaction Role Commands"
            },
            {
              path: "settings",
              text: "Setting Commands"
            },
            {
              path: "setup",
              text: "Setup Commands"
            }
          ]
        },
        {
          path: "games",
          text: "Game Commands",
        },
        {
          path: "misc",
          text: "Misc Commands",
        }
      ]
    }
  ]
}