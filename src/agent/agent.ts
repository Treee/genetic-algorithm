import { HelperService } from "../helpers/helper-service";

export class Agent {
    helperService: HelperService;
    dna: string;

    constructor(_helperService: HelperService, _dna: string = '') {
        this.helperService = _helperService;
        this.dna = _dna;
    }

}