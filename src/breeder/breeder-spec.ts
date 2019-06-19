import { Breeder } from './breeder';
import { HelperService } from '../helpers/helper-service';
import { Agent } from '../agent/agent';

describe('Breeder', () => {
    let breeder: Breeder;
    const helperService: HelperService = new HelperService();

    beforeEach(() => {
        breeder = new Breeder(helperService);
    });

    it('has a population of agents', () => {
        expect(breeder.population).toBeDefined();
        expect(breeder.population).not.toBeNull();
    });

    it('generates a population of agents', () => {
        const numAgents = 10;
        breeder.createPopulation(numAgents);
        expect(breeder.population.length).toBeGreaterThan(0);
    });

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