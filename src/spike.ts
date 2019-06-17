import { HelperService } from './helper-service';
import _ from 'lodash';

export class StringGeneratorComponent {

    answerString: string = 'Hello World';
    simulationRunningMode: string = 'step';
    numGenerationsToSimulate: number = 1000;
    numAgents: number = 50;
    mutationRate: number = 0.01;
    totalGenerations: number = 0;

    currentGeneration: any[] = [];

    constructor(private helperService: HelperService) {
        this.resetSimulation();
    }

    runSimulation() {
        if (this.currentGeneration.length === 0) {
            this.currentGeneration = this.helperService.createPopulationOfStrings(this.numAgents, this.answerString.length);
        }
        if (this.simulationRunningMode === 'step') {
            this.currentGeneration = this.runSpecificNumberOfSimulations(1, this.currentGeneration);
        } else if (this.simulationRunningMode === 'continuous') {
            this.currentGeneration = this.runSpecificNumberOfSimulations(this.numGenerationsToSimulate, this.currentGeneration);
        }
    }

    resetSimulation() {
        this.answerString = 'Hello-World!';
        this.simulationRunningMode = 'step';
        this.numAgents = 250;
        this.numGenerationsToSimulate = 1000;
        this.mutationRate = 0.1;
        this.totalGenerations = 0;
        this.currentGeneration = [];
    }

    runSpecificNumberOfSimulations(numSimulations: number, generation: string[]) {
        let currentSimulation = 0;
        const intervalHandle = setInterval(() => {
            if (currentSimulation === numSimulations) {
                clearInterval(intervalHandle);
            }
            generation = this.simulateSingleGeneration(generation);
            if (this.hasFoundAnswer(generation, this.answerString)) {
                // console.log(`Found in ${currentSimulation} # of generations.`);
                clearInterval(intervalHandle);
            }
            this.currentGeneration = generation;
            currentSimulation++;
            this.totalGenerations++;
        }, 100);
        return generation;
    }

    // runSimlation(numSimulations?: number) {
    //   let generation = this.helperService.createPopulationOfStrings(250, this.answerString.length);
    //   if (!numSimulations) {
    //     console.log('no param');
    //     // do {
    //     //   generation = this.simulateSingleGeneration(generation);
    //     // } while (!this.hasFoundAnswer(generation, this.answer));
    //   } else {
    //     console.log('param', numSimulations);
    //     for (let i = 0; i < numSimulations; i++) {
    //       generation = this.simulateSingleGeneration(generation);
    //       this.currentGeneration = generation;
    //       if (this.hasFoundAnswer(generation, this.answerString)) {
    //         console.log(`Found in ${i} # of generations.`);
    //         break;
    //       }
    //     }
    //   }
    // }

    hasFoundAnswer(population: string[], answer: any): boolean {
        const answers = population.filter((agent) => {
            return agent === answer;
        });
        return answers.length > 0;
    }

    simulateSingleGeneration(population: string[]): string[] {
        let nextGeneration = [];
        nextGeneration = this.mate(population);
        nextGeneration = this.rankPopulation(nextGeneration);
        nextGeneration = this.prunePopulation(nextGeneration);
        const quarterOfNextGeneration = nextGeneration.length * 0.25;
        const numChildrenToTake = Math.floor(quarterOfNextGeneration);
        const numAdultsToKill = Math.floor(quarterOfNextGeneration);
        const bestChildren = nextGeneration.slice(0, numChildrenToTake);
        const prunedPopulation = population.slice(0, population.length - numAdultsToKill);
        nextGeneration = prunedPopulation.concat(bestChildren);
        nextGeneration = this.rankPopulation(nextGeneration);
        // console.log(`Best 3 matches: ${nextGeneration[0]} ${nextGeneration[1]} ${nextGeneration[2]}`);
        return nextGeneration;
    }

    prunePopulation(population: any) {

        let tempArray = population.slice(0);
        tempArray = _.uniq(tempArray);
        const numDuplicates = population.length - tempArray.length;
        if (numDuplicates > 0) {
            console.log(`removed ${numDuplicates} duplicates. ${tempArray.length} are left.`);
        }
        return tempArray;
    }

    rankPopulation(population: any) {
        const tempArray = population.slice(0);
        const answerArray = this.answerString.split('');
        const answerHash = this.helperService.getHash(this.answerString);
        // console.log('temp array', tempArray);
        tempArray.sort((a: any, b: any) => {
            let aHashDelta = 0;
            for (let i = 0; i < a.length; i++) {
                if (answerArray[i]) {
                    aHashDelta += Math.abs(this.helperService.getHash(answerArray[i]) - this.helperService.getHash(a[i]));
                } else {
                    aHashDelta += 30;
                }
            }
            let bHashDelta = 0;
            for (let i = 0; i < b.length; i++) {
                if (answerArray[i]) {
                    bHashDelta += Math.abs(this.helperService.getHash(answerArray[i]) - this.helperService.getHash(b[i]));
                } else {
                    bHashDelta += 30;
                }
            }
            return aHashDelta - bHashDelta;
        });
        // console.log('temp array end', tempArray);
        return tempArray;
    }

    mate(population: string[]): string[] {
        let nextGeneration: any[] = [];
        for (let index = 0; index < population.length; index += 2) {
            const parentOne = population[index];
            let endIndex = 0;
            do {
                endIndex = this.helperService.getRandomInt(0, population.length - 1);
            }
            while (index === endIndex);
            const parentTwo = population[endIndex];
            const children = this.breed(parentOne, parentTwo);
            nextGeneration = nextGeneration.concat(children);
        }
        return nextGeneration;
    }

    breed(parentOne: string, parentTwo: string): string[] {
        const p1Binary = this.helperService.stringToBinary(parentOne).join('');
        const p2Binary = this.helperService.stringToBinary(parentTwo).join('');
        const children = this.swapDna(p1Binary, p2Binary);
        return children;
    }

    swapDna(parentOneBinary: string, parentTwoBinary: string): string[] {
        const numBytesToSwap = Math.floor((parentOneBinary.length / 8) / 2);
        const endBitSwapIndex = 8 * numBytesToSwap;
        const startBitSwapIndex = 0;

        let p1Right, p1Left, p2Right, p2Left, child1Dna, child2Dna;
        p1Right = parentOneBinary.slice(endBitSwapIndex);
        p1Left = parentOneBinary.slice(startBitSwapIndex, endBitSwapIndex);
        p2Right = parentTwoBinary.slice(endBitSwapIndex);
        p2Left = parentTwoBinary.slice(startBitSwapIndex, endBitSwapIndex);
        const chanceToCrossLeft = this.helperService.getRandomInt(0, 1);
        if (chanceToCrossLeft) {
            child1Dna = p2Right + p1Right;
            child2Dna = p2Left + p1Left;
        } else {
            child1Dna = p1Left + p2Left;
            child2Dna = p1Right + p2Right;
        }

        const child1DnaMutated = this.mutate(child1Dna, this.mutationRate);
        const child2DnaMutated = this.mutate(child2Dna, this.mutationRate);
        const child1 = this.helperService.binaryToString(child1DnaMutated);
        const child2 = this.helperService.binaryToString(child2DnaMutated);
        return [child1, child2];
    }

    mutate(dna: string, rateOfMutation: number): string {
        const mutatedDna = dna.split('');
        for (let index = 0; index < mutatedDna.length; index++) {
            const mutationIndex = Math.random();
            if (mutationIndex < rateOfMutation) {
                if (mutatedDna[index] === '0') {
                    mutatedDna[index] = '1';
                } else {
                    mutatedDna[index] = '0';
                }
            }
        }
        return mutatedDna.join('');
    }

    convertToChar(num: number): string {
        const c = String.fromCharCode(num);
        return `${c}${c}${c}${c}${c}${c}${c}${c}`;
    }


}
