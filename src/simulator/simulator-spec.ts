import { Simulator } from './simulator';

describe('Simulator', () => {
    let simulator: Simulator;
    const agentConfig = [
        { dna: 'test' },
        { dna: 'dasfagw' },
        { dna: 'foo' },
        { dna: 'another test' },
        { dna: 'testy' },
        { dna: 'testycle' },
        { dna: 'tasty' },
        { dna: 'tasty1' },
        { dna: 'tasty2' },
        { dna: 'risk aversion' },
        { dna: 'what' },
        { dna: 'extra spicy' },
        { dna: 'toodles' },
        { dna: 'imaginary' },
        { dna: 'discrete' },
        { dna: 'conjecture' },
        { dna: 'sensitivity' },
        { dna: 'sapce' },
        { dna: 'host' },
        { dna: 'on' },
        { dna: 'hotdog' },
        { dna: 'lettuce' },
        { dna: 'bob' },
        { dna: 'silence' },
        { dna: 'hi' },
    ];

    beforeEach(() => {
        simulator = new Simulator();
        simulator.breeder.createPopulation(20, agentConfig);
    });

    it('initialized a new breeder with a population', () => {
        expect(simulator.breeder.population.length).toBeGreaterThan(0);
    });

    it('simulates one generation', () => {
        simulator.simulateGeneration();
    });
});