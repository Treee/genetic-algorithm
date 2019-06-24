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

    it('has a fitness score based on the dna', () => {
        const agentA = new Agent('aaa');
        const agentB = new Agent('bbb');
        const agentAFitness = agentA.getFitness();
        const agentBFitness = agentB.getFitness();
        expect(agentAFitness).toBeLessThan(agentBFitness);
    });

    it('can mutate the dna based on a given mutation rate', () => {
        const agentA = new Agent('aaa');
        const mutatedAgent = agentA.mutate(1);
        expect(mutatedAgent).not.toEqual(agentA.dna);
    });

    it('can mate two agents', () => {
        const parentA = new Agent('aaaaa');
        const parentB = new Agent('zzzzz');
        const child = parentA.mateWith(parentB);
        expect(child).toBeDefined();
        expect(child).not.toBeNull();
        expect(child).not.toEqual(parentA);
        expect(child).not.toEqual(parentB);
    });

    it('returns an agent with some of the parents genes', () => {
        const parentA = new Agent('aaaaa');
        const parentB = new Agent('zzzzz');
        const child = parentA.mateWith(parentB);
        expect(child.dna.indexOf('a')).toBeGreaterThanOrEqual(0);
        expect(child.dna.indexOf('z')).toBeGreaterThanOrEqual(0);
    });

});