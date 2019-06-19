import { Agent } from './agent';
import { HelperService } from '../helpers/helper-service';

describe('Agent', () => {
    let agent: Agent;
    const helperService: HelperService = new HelperService();

    beforeEach(() => {
        agent = new Agent(helperService);
    });

    it('has DNA', () => {
        expect(agent.dna).toBeDefined();
        expect(agent.dna).not.toBeNull();
    });
});