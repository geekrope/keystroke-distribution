function getToken(char) {
    if (char.length === 1 && char.match(/[а-яА-ЯёЁa-zA-Z0-9]/)) {
        return 0;
    }
    if (char === ' ') {
        return 1;
    }
    if (char === '\n') {
        return 2;
    }
    if (['.', ',', '-', ':', ';', '?', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '"'].includes(char)) {
        return 3;
    }

    return -1
}