import { Agent } from './agent';

describe('Agent', () => {
    let agent: Agent;
    beforeEach(() => {
        agent = new Agent();
    });

    it('has DNA', () => {
        expect(agent.dna).toBeDefined();
        expect(agent.dna).not.toBeNull();
    });
});