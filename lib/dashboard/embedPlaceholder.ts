export const embedPlaceholder = (input: string) => {
  const replacement: Record<string, string> = {
    "{server name}": "Kyrac Server"
    ,"{new line}": "\n"
  };

  return input.replace(/\{[^}]+\}/g, (match) => {
    return replacement[match] || match;
  });
};