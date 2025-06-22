export const embedPlaceholder = (input: string, session?: any) => {
  const userName = session?.name || "Unknown";
  const user = {id: "123"};
  const replacement: Record<string, any> = {
    "{user id}": user?.id,
    "{user mention}": `<@${user?.id}>`,
    "{user name}": userName,
    "{user global}": "Arcky",
    "{user avatar}": "https://cdn.discordapp.com/avatars/835094939724808232/a_da7ad6d4f18ec24ae0b4041b94786c4a.gif",
    "{user color}": "#f97316",
    "{level}": "11",
    "{server name}": "Henri's Server",
    "{server icon}": "https://cdn.discordapp.com/icons/1263545537303416863/e45db2bd3caf6d813feddbfd171bb982.png"
  };

  return input.replace(/\{[^}]+\}/g, (match) => {
    return replacement[match] || match;
  });
};