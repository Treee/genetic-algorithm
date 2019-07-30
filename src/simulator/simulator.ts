import { Breeder } from "../breeder/breeder";

export class Simulator {
    breeder: Breeder;

    constructor() {
        this.breeder = new Breeder();
        this.reinitializeBreeder();
    }

    reinitializeBreeder() {
        this.breeder = new Breeder();
        this.breeder.createPopulation(20);
        this.breeder.population = this.breeder.rankPopulation();
    }

    simulateGeneration() {
        let currentGeneration = this.breeder.selectNextGeneration(20);
        currentGeneration = this.breeder.matePopulation();
        // mutate todo


        currentGeneration = this.breeder.rankPopulation();
        return currentGeneration;
    }
}