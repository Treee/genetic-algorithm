export declare class Agent {
    dna: any;
    constructor(_dna?: string);
    mutate(mutationRate: number): string;
    mateWith(otherAgent: Agent): Agent;
    getFitness(): number;
    getHash(): number;
    private stringToBinary;
    private resolveBinaryOctet;
    private swapDna;
    private binaryToString;
    private unicodeToChar;
    getRandomCharacter(): string;
    private getRandomInt;
}
//# sourceMappingURL=agent.d.ts.map