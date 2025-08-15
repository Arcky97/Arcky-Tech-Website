export const getInitialsFromName = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('');
};