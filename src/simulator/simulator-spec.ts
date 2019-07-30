import { Simulator } from './simulator';

describe('Simulator', () => {
    let simulator: Simulator;

    beforeEach(() => {
        simulator = new Simulator();
    });

    it('initialized a new breeder with a population', () => {
        expect(simulator.breeder.population.length).toBeGreaterThan(0);
    });

    it('simulates one generation', () => {

    });
});