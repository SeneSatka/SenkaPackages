export const discordColor = {
    build: (text) => {
        return `\`\`\`ansi\n${text}\n\`\`\``;
    },
    styles: {
        underline: (text) => {
            return `__${text}__`;
        },
        italic: (text) => {
            return `_${text}_`;
        },
        strikeThrough: (text) => {
            return `~~${text}~~`;
        },
    },
    gray: (text) => {
        return `[0;30m${text}[0;0m`;
    },
    red: (text) => {
        return `[0;31m${text}[0;0m`;
    },
    green: (text) => {
        return `[0;32m${text}[0;0m`;
    },
    yellow: (text) => {
        return `[0;33m${text}[0;0m`;
    },
    blue: (text) => {
        return `[0;34m${text}[0;0m`;
    },
    pink: (text) => {
        return `[0;35m${text}[0;0m`;
    },
    cyan: (text) => {
        return `[0;36m${text}[0;0m`;
    },
    white: (text) => {
        return `[0;37m${text}[0;0m`;
    },
    background: {
        fireflyDarkBlue: (text) => {
            return `[0;40m${text}[0;0m`;
        },
        orange: (text) => {
            return `[0;41m${text}[0;0m`;
        },
        marbleBlue: (text) => {
            return `[0;42m${text}[0;0m`;
        },
        greyishTurquoise: (text) => {
            return `[0;43m${text}[0;0m`;
        },
        gray: (text) => {
            return `[0;44m${text}[0;0m`;
        },
        indigo: (text) => {
            return `[0;45m${text}[0;0m`;
        },
        lightGray: (text) => {
            return `[0;46m${text}[0;0m`;
        },
        white: (text) => {
            return `[0;47m${text}[0;0m`;
        },
    },
};
