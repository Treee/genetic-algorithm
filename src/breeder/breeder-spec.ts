import { Breeder } from './breeder';
import { Agent } from '../agent/agent';

describe('Breeder', () => {
    let breeder: Breeder;
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
        breeder = new Breeder();
    });

    describe('Create Population', () => {

        it('generates a population of agents', () => {
            const numAgents = 10;
            breeder.createPopulation(numAgents);
            expect(breeder.population.length).toBeGreaterThan(0);
        });

        it('generates a population from a template', () => {
            const agentTemplate = [
                { dna: 'testone' },
                { dna: 'another test' }
            ];

            const numAgents = 10;
            breeder.createPopulation(numAgents, agentTemplate);
            expect(breeder.population[0].dna).toEqual('testone');
            expect(breeder.population[1].dna).toEqual('another test');
            expect(breeder.population[5].dna).toEqual('');
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
            breeder.createPopulation(numAgents, agentConfig);
            const bredPopulation = breeder.matePopulation();
            expect(bredPopulation.length).toBeGreaterThan(numAgents);
        });
    });

    describe('Mutate population', () => {
        it('can mutate a population based on a chance', () => {

        });
    });

});