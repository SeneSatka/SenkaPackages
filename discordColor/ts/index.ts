export const discordColor = {
  build: (text: string) => {
    return `\`\`\`ansi\n${text}\n\`\`\``;
  },
  styles: {
    underline: (text: string): string => {
      return `__${text}__`;
    },
    italic: (text: string): string => {
      return `_${text}_`;
    },
    strikeThrough: (text: string): string => {
      return `~~${text}~~`;
    },
  },
  gray: (text: string): string => {
    return `[0;30m${text}[0;0m`;
  },
  red: (text: string): string => {
    return `[0;31m${text}[0;0m`;
  },
  green: (text: string): string => {
    return `[0;32m${text}[0;0m`;
  },
  yellow: (text: string): string => {
    return `[0;33m${text}[0;0m`;
  },
  blue: (text: string): string => {
    return `[0;34m${text}[0;0m`;
  },
  pink: (text: string): string => {
    return `[0;35m${text}[0;0m`;
  },
  cyan: (text: string): string => {
    return `[0;36m${text}[0;0m`;
  },
  white: (text: string): string => {
    return `[0;37m${text}[0;0m`;
  },
  background: {
    fireflyDarkBlue: (text: string): string => {
      return `[0;40m${text}[0;0m`;
    },
    orange: (text: string): string => {
      return `[0;41m${text}[0;0m`;
    },
    marbleBlue: (text: string): string => {
      return `[0;42m${text}[0;0m`;
    },
    greyishTurquoise: (text: string): string => {
      return `[0;43m${text}[0;0m`;
    },
    gray: (text: string): string => {
      return `[0;44m${text}[0;0m`;
    },
    indigo: (text: string): string => {
      return `[0;45m${text}[0;0m`;
    },
    lightGray: (text: string): string => {
      return `[0;46m${text}[0;0m`;
    },
    white: (text: string): string => {
      return `[0;47m${text}[0;0m`;
    },
  },
};
