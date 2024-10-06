const adjectives = [
    '편안한', 
    '행복한', 
    '즐거운',
    '귀여운',
    '용감한',
    '뛰어난',
    '똑똑한',
    '엉뚱한',
    '근사한',
    '침착한',
    '신중한',
    '다정한'
];
const animals = [
    '토끼', 
    '리트리버', 
    '고양이',
    '쿼카',
    '너구리',
    '래서판다',
    '다람쥐',
    '모래여우',
    '뱁새',
    '펭귄',
    '호박벌',
    '파랑어치',
    '햇병아리',
    '알파카'
];

const getRandomElem = <T>(arr: T[]): T => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

export const generateName = (): string => {
    const adjective = getRandomElem(adjectives);
    const animal = getRandomElem(animals);
    return `${adjective} ${animal}`;
};
