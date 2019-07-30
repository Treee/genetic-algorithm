import { Agent } from '../agent/agent';
export declare class Breeder {
    population: Agent[];
    constructor();
    createPopulation(numAgents: number): void;
    rankPopulation(customCompareFn?: (a: any, b: any) => number): Agent[];
    compare(a: Agent, b: Agent): number;
    selectNextGeneration(maxPopulationSize: number, customSelectFn?: () => Agent[]): Agent[];
    matePopulation(customCrossoverFn?: () => Agent[]): Agent[];
}
//# sourceMappingURL=breeder.d.ts.map