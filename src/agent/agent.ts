export class Agent {
    dna: any;

    constructor(_dna: string = '') {
        this.dna = _dna;
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
}