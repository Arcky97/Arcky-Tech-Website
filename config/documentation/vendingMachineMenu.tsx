import { HomeIcon } from "@heroicons/react/outline";

export const vendingMachineMenu = {
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