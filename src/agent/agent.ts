export class Agent {
    dna: any;

    constructor(_dna: string = '') {
        this.dna = _dna;
    }

    mutate(mutationRate: number): string {
        const mutatedDna = this.dna.slice(0);
        let mutatedDnaBinary = this.stringToBinary(mutatedDna).join('').split('');
        for (let index = 0; index < mutatedDnaBinary.length; index++) {
            const mutationIndex = Math.random();
            if (mutationIndex < mutationRate) {
                if (mutatedDnaBinary[index] === '0') {
                    mutatedDnaBinary[index] = '1';
                } else {
                    mutatedDnaBinary[index] = '0';
                }
            }
        }
        const reconstructedAgent = this.binaryToString(mutatedDnaBinary.join(''));
        return reconstructedAgent;
    }

    mateWith(otherAgent: Agent): Agent {
        let newDna = this.swapDna(otherAgent);
        return new Agent(newDna);
    }

    getFitness(): number {
        let fitness = 0;
        if (typeof this.dna === 'string') {
            fitness = this.getHash();
        }
        return fitness;
    }

    getHash(): number {
        let sum = 0;
        for (let index = 0; index < this.dna.length; index++) {
            sum += this.dna.charCodeAt(index);
        }
        return sum;
    }

    private stringToBinary(str: string): string[] {
        const result = [];
        for (let i = 0; i < str.length; i++) {
            result.push(this.resolveBinaryOctet(str.charCodeAt(i)));
        }
        return result;
    }

    private resolveBinaryOctet(n: number): string {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + ' does not fit in a byte');
        }
        return ('000000000' + n.toString(2)).substr(-8);
    }

    private swapDna(otherAgent: Agent): string {
        let tempThisAgentDna = this.dna.slice(0);
        const thisAgentDnaBinary = this.stringToBinary(tempThisAgentDna).join('');

        let tempOtherAgentDna = otherAgent.dna.slice(0);
        const otherAgentDnaBinary = this.stringToBinary(tempOtherAgentDna).join('');

        const numBytesToSwap = Math.floor((thisAgentDnaBinary.length / 8) / 2);
        const endBitSwapIndex = 8 * numBytesToSwap;
        const startBitSwapIndex = 0;

        let p1Right, p1Left, p2Right, p2Left, childDna;
        p1Right = thisAgentDnaBinary.slice(endBitSwapIndex);
        p1Left = thisAgentDnaBinary.slice(startBitSwapIndex, endBitSwapIndex);
        p2Right = otherAgentDnaBinary.slice(endBitSwapIndex);
        p2Left = otherAgentDnaBinary.slice(startBitSwapIndex, endBitSwapIndex);
        const chanceToCrossLeft = this.getRandomInt(0, 1);
        if (chanceToCrossLeft) {
            childDna = p2Right + p1Right;
        } else {
            childDna = p1Left + p2Left;
        }
        const child = this.binaryToString(childDna);
        return child;
    }

    private binaryToString(binaryString: string): string {
        const string = [];
        for (let index = 0; index < binaryString.length; index += 8) {
            const byte = binaryString.slice(index, index + 8);
            const charCode = parseInt(byte, 2);
            const char = String.fromCharCode(charCode);
            string.push(this.unicodeToChar(char));
        }
        return string.join('');
    }

    private unicodeToChar(text: string): string {
        return text.replace(/\\u[\dA-F]{4}/gi, this.getRandomCharacter());
    }

    getRandomCharacter(): string {
        const lowestChar = 33;
        const highestChar = 126;
        const charCode = this.getRandomInt(lowestChar, highestChar);
        return String.fromCharCode(charCode);
    }

    // min and max are both inclusive
    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}