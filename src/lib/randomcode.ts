export function generateCode(): string {
    const length = 6; 
    const result: string[] = [];
    const charset = [
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), 
        ...Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i)), 
    ];

    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        const index = randomValues[i] % charset.length;
        result.push(charset[index]);
    }
    
    return result.join('');
}
