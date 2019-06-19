import { Agent } from './agent';
import { HelperService } from '../helpers/helper-service';

describe('Agent', () => {
    let agent: Agent;
    const helperService: HelperService = new HelperService();

    beforeEach(() => {
        agent = new Agent();
    });

    it('has DNA', () => {
        expect(agent.dna).toBeDefined();
        expect(agent.dna).not.toBeNull();
    });

    it('has a fitness score based on the dna', () => {
        const agentA = new Agent('aaa');
        const agentB = new Agent('bbb');
        const agentAFitness = agentA.getFitness();
        const agentBFitness = agentB.getFitness();
        expect(agentAFitness).toBeLessThan(agentBFitness);
    });

});