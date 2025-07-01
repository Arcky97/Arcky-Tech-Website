"use client"
import Sidebar from "@/components/Sidebar"
import { HomeIcon } from "@heroicons/react/outline";
import { usePathname } from "next/navigation";

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const menuItems = [
    {
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
    },
    {
      name: "region-map",
      path: "",
      icon: <HomeIcon className="w-6 h-6"/>,
      text: "Arcky's Region Map",
      subItems: [
        {
          path: "features",
          text: "Features Overview"
        },
        {
          path: "update-history",
          text: "Update History"
        },
        {
          path: "installation",
          text: "Installation"
        },
        {
          path: "updating",
          text: "Updating"
        },
        {
          path: "basic-setup",
          text: "Basic Setup",
          subItems: [
            {
              path: "highlight-graphics",
              text: "Highlight Graphics"
            },
            {
              path: "unvisited-graphics",
              text: "Unvisited Graphics"
            },
            {
              path: "town-map-pbs-file",
              text: "Town_Map.txt PBS file",
              subItems: [
                {
                  path: "manual-editing",
                  text: "Manual PBS Editing"
                },
                {
                  path: "townmapgen-html-file",
                  text: "Townmapgen.html file"
                }
              ]
            },
            {
              path: "location-preview",
              text: "Location Preview"
            },
            {
              path: "extended-preview",
              text: "Extended Preview"
            }
          ]
        },
        {
          path: "plugin-setup",
          text: "Setup for other Plugins",
          subItems: [
            {
              path: "quest",
              text: "Quest Icons and Preview"
            },
            {
              path: "poke-gear",
              text: "Poke Gear Themes"
            },
            {
              path: "weather",
              text: "Weather Preview"
            },
            {
              path: "control-screen",
              text: "Set the Controls Screen"
            },
            {
              path: "berry",
              text: "Berry Icons and Preview"
            },
            {
              path: "roaming",
              text: "Roaming Icons"
            },
            {
              path: "modular-ui",
              text: "Modular UI Scenes"
            }
          ]
        },
        {
          path: "settings",
          text: "Settings File",
          subItems: [
            {
              path: "grid",
              text: "Grid Settings"
            },
            {
              path: "progress-counter",
              text: "Progress Counter Settings"
            },
            {
              path: "location",
              text: "Location Settings",
              subItems: [
                {
                  path: "no-unvisited-info",
                  text: "No Unvisted Location Info"
                },
                {
                  path: "fake-locations",
                  text: "Fake Locations"
                },
                {
                  path: "hidden-locations",
                  text: "Hidden Location Settings"
                },
                {
                  path: "location-search",
                  text: "Location Search Settings"
                },
                {
                  path: "highlight",
                  text: "Highlight Settings"
                },
                {
                  path: "decoration",
                  text: "Decoration Settings"
                },
                {
                  path: "region-district",
                  text: "Region District Settings"
                },
                {
                  path: "region-map-connecting",
                  text: "Region Map Connecting"
                }
              ]
            },
            {
              path: "fly",
              text: "Fly Settings"
            },
            {
              path: "mode",
              text: "Mode Settings"
            },
            {
              path: "music",
              text: "Music Settings"
            },
            {
              path: "ui",
              text: "UI Settings",
              subItems: [
                {
                  path: "map-ui",
                  text: "Map UI Settings"
                },
                {
                  path: "region-changing",
                  text: "Region Changing Settings"
                },
                {
                  path: "text-position",
                  text: "Text Position Settings"
                },
                {
                  path: "text-color",
                  text: "Text Color Settings"
                },
                {
                  path: "menu",
                  text: "Menu Settings"
                },
                {
                  path: "cursor",
                  text: "Cursor Settings"
                },
                {
                  path: "mouse-support",
                  text: "Mouse Support Settings"
                }
              ]
            },
            {
              path: "preview",
              text: "Preview Settings",
              subItems: [
                {
                  path: "general",
                  text: "General Preview Settings"
                },
                {
                  path: "button",
                  text: "Button Preview Settings"
                },
                {
                  path: "location",
                  text: "Location Preview Settings"
                },
                {
                  path: "extended",
                  text: "Extended Preview Settings"
                },
                {
                  path: "weather",
                  text: "Weather Preview Settings"
                },
                {
                  path: "quest",
                  text: "Quest Preview Settings"
                },
                {
                  path: "berry",
                  text: "Berry Preview Settings"
                },
                {
                  path: "roaming",
                  text: "Roaming Preview Settings"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "poke-market",
      path: "",
      icon: <HomeIcon className="w-6 h-6"/>,
      text: "Arcky's Poké Market",
      subItems: [
        {
          path: "features",
          text: "Feature Overview"
        },
        {
          path: "update-history",
          text: "Update History"
        },
        {
          path: "installation",
          text: "Installation"
        },
        {
          path: "setup",
          text: "Event Setup",
          subItems: [
            {
              path: "mart-event",
              text: "Mart Event Setup"
            },
            {
              path: "shelf-event",
              text: "Shelf Event Setup"
            },
            {
              path: "pbs-prizes",
              text: "BP and Coin Prizes"
            }
          ]
        },
        {
          path: "settings",
          text: "Settings and Setup File",
          subItems: [
            {
              path: "item-categories",
              text: "Item Categories",
              subItems: [
                {
                  path: "default",
                  text: "Default Item Categories"
                },
                {
                  path: "custom",
                  text: "Custom Item Categories"
                }
              ]
            },
            {
              path: "badges-items",
              text: "Badges for Items"
            },
            {
              path: "discounts",
              text: "Discounts"
            },
            {
              path: "bonus-items",
              text: "Bonus Items"
            },
            {
              path: "item-limits",
              text: "Item Limits"
            },
            {
              path: "bw-pokemart-screen",
              text: "BW Poké Market Screen"
            },
            {
              path: "item-purchase-counter",
              text: "Item Purchase Counter"
            },  
            {
              path: "speeches",
              text: "Speeches",
              subItems: [
                {
                  path: "seller-classes",
                  text: "Seller Classes",
                  subItems: [
                    {
                      path: "intro-text",
                      text: "IntroText",
                    },
                    {
                      path: "menu-text",
                      text: "MenuText",
                    },
                    {
                      path: "category-text",
                      text: "CategoryText"
                    },
                    {
                      path: "buy-item-amount",
                      text: "BuyItemAmount"
                    },
                    {
                      path: "buy-item",
                      text: "BuyItem"
                    },
                    {
                      path: "buy-out-of-stock",
                      text: "BuyOutOfStock"
                    },
                    {
                      path: "buy-thanks",
                      text: "BuyThanks"
                    },
                    {
                      path: "buy-bonus-mult",
                      text: "BuyBonusMult"
                    },
                    {
                      path: "not-enough-money",
                      text: "NotEnoughMoney"
                    },
                    {
                      path: "no-room-in-bag",
                      text: "NoRoomInBag"
                    },
                    {
                      path: "sell-item-amount",
                      text: "SellItemAmount"
                    },
                    {
                      path: "sell-item",
                      text: "SellItem"
                    },
                    {
                      path: "cant-sell-item",
                      text: "CantSellItem"
                    },
                    {
                      path: "menu-return-text",
                      text: "MenuReturnText"
                    },
                    {
                      path: "bill-check-out",
                      text: "BillCheckOut"
                    },
                    {
                      path: "purchase-count",
                      text: "PurchaseCount"
                    },
                    {
                      path: "everything-out-of-stock",
                      text: "EverythingOutOfStock"
                    },
                    {
                      path: "outro-text",
                      text: "OutroText",
                    }
                  ]
                },
                {
                  path: "shelf-classes",
                  text: "Shelf Classes",
                  subItems: [
                    {
                      path: "intro-shelf",
                      text: "IntroShelf"
                    },
                    {
                      path: "shelf-item-amount",
                      text: "ShelfItemAmount"
                    },
                    {
                      path: "shelf-change-item-amount",
                      text: "ShelfChangeItemAmount"
                    },
                    {
                      path: "shelf-out-of-stock",
                      text: "ShelfOutOfStock"
                    },
                    {
                      path: "not-enough-money",
                      text: "NotEnoughMoney"
                    },
                    {
                      path: "not-enough-money-item",
                      text: "NotEnoughMoneyItem" 
                    },
                    {
                      path: "not-enough-money-amount",
                      text: "NotEnoughMoneyAmount"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "graphic-transparancy",
      path: "",
      icon: <HomeIcon className="w-6 h-6"/>,
      text: "Arcky's Graphic Transparancy",
      subItems: [
        {
          path: "update-history",
          text: "Update History"
        },
        {
          path: "installation",
          text: "Installation"
        },
        {
          path: "setup",
          text: "Setup",
          subItems: [
            {
              path: "setup-event",
              text: "Setup Event"
            },
            {
              path: "setup-file",
              text: "Setup File"
            }
          ]
        }
      ]
    },
    {
      name: "vending-machine",
      path: "",
      icon: <HomeIcon className="w-6 h-6"/>,
      text: "Arcky's Vending Machine",
      subItems: [
        {
          path: "update-history",
          text: "Update History"
        },
        {
          path: "installation",
          text: "Installation"
        }
      ]
    }
  ];

  const menuItemToUse = pathname.startsWith('/documentation/') 
    ? menuItems.filter(menuItem => pathname.includes(menuItem.name))
    : menuItems.map(({ subItems, ...rest }) => rest )
  
  return (
    <div className="flex">
      <Sidebar menuItems={menuItemToUse} mainDocs={!pathname.startsWith('/documentation/')}/>
      <main className="flex-1 bg-gray-900">
        {children}
      </main>
    </div>
  );
}