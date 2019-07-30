import { Breeder } from './breeder';
import { Agent } from '../agent/agent';

describe('Breeder', () => {
    let breeder: Breeder;

    beforeEach(() => {
        breeder = new Breeder();
    });

    describe('Create Population', () => {

        it('generates a population of agents', () => {
            const numAgents = 10;
            breeder.createPopulation(numAgents);
            expect(breeder.population.length).toBeGreaterThan(0);
        });
    });

    describe('Compute Fitness', () => {
        it('ranks agents based on a fitness', () => {
            const agentA = new Agent('aaa');
            const agentB = new Agent('bbb');
            expect(agentB.getFitness()).toBeGreaterThan(agentA.getFitness());
        });
    });

    describe('Rank Population', () => {
        it('ranks the agents in the group', () => {
            const agentA = new Agent('aa');
            const agentB = new Agent('bb');
            const agentC = new Agent('cc');
            const agentX = new Agent('xx');
            const agentY = new Agent('yy');
            const agentZ = new Agent('zz');
            breeder.population = [agentZ, agentB, agentX, agentC, agentY, agentA];
            const rankedPopulation = breeder.rankPopulation();
            expect(rankedPopulation).toEqual([agentA, agentB, agentC, agentX, agentY, agentZ]);
        });
    });

    describe('Select new generation', () => {
        it('selects the correct number of agents for the next generation', () => {
            const numAgents = 25;
            const maxPopulationSize = 15;

            breeder.createPopulation(numAgents);
            const selectedPopulation = breeder.selectNextGeneration(maxPopulationSize);
            expect(selectedPopulation.length).toBe(maxPopulationSize);
        });
    });

    describe('Crossover population (mate)', () => {
        it('breeds the current population, resulting in more agents than what we started with', () => {
            const numAgents = 25;
            breeder.createPopulation(numAgents);
            const bredPopulation = breeder.matePopulation();
            expect(bredPopulation.length).toBeGreaterThan(numAgents);
        });
    });

    describe('Mutate population', () => {
        it('can mutate a population based on a chance', () => {

        });
    });

});