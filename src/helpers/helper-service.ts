export class HelperService {

    lowestChar = 33;
    highestChar = 126;

    constructor() { }

    createPopulationOfStrings(numberOfAgents: number, initialStringLength: number): any[] {
        const population = [];
        for (let i = 0; i < numberOfAgents; i++) {
            population.push(this.createRandomString(initialStringLength));
        }
        return population;
    }

    createRandomString(numCharacters: number): string {
        const word = [];
        for (let index = 0; index < numCharacters; index++) {
            word.push(this.getRandomCharacter());
        }
        return word.join('');
    }

    getRandomCharacter(): string {
        const charCode = this.getRandomInt(this.lowestChar, this.highestChar);
        return String.fromCharCode(charCode);
    }

    // min and max are both inclusive
    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    resolveBinaryOctet(n: number): string {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + ' does not fit in a byte');
        }
        return ('000000000' + n.toString(2)).substr(-8);
    }

    stringToBinary(str: string): string[] {
        const result = [];
        for (let i = 0; i < str.length; i++) {
            result.push(this.resolveBinaryOctet(str.charCodeAt(i)));
        }
        return result;
    }

    binaryToString(binaryString: string): string {
        const string = [];
        for (let index = 0; index < binaryString.length; index += 8) {
            const byte = binaryString.slice(index, index + 8);
            const charCode = parseInt(byte, 2);
            const char = String.fromCharCode(charCode);
            string.push(this.unicodeToChar(char));
        }
        return string.join('');
    }

    unicodeToChar(text: string): string {
        return text.replace(/\\u[\dA-F]{4}/gi, this.getRandomCharacter());
    }

    getHash(string: string): number {
        let sum = 0;
        for (let index = 0; index < string.length; index++) {
            sum += string.charCodeAt(index);
        }
        return sum;
    }

}
