export const makeId = (length: number) => {
    let result = "";
    const character = "abcdefghijklmnopqrstuvwxyz123456789";
    const charLength = character.length;
    for (let i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
};
