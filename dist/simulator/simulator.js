"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var breeder_1 = require("../breeder/breeder");
var Simulator = /** @class */ (function () {
    function Simulator() {
        this.breeder = new breeder_1.Breeder();
        this.reinitializeBreeder();
    }
    Simulator.prototype.reinitializeBreeder = function () {
        this.breeder = new breeder_1.Breeder();
        this.breeder.createPopulation(20);
        this.breeder.population = this.breeder.rankPopulation();
    };
    Simulator.prototype.simulateGeneration = function () {
        var currentGeneration = this.breeder.selectNextGeneration(20);
        currentGeneration = this.breeder.matePopulation();
        // mutate todo
        currentGeneration = this.breeder.rankPopulation();
        return currentGeneration;
    };
    return Simulator;
}());
exports.Simulator = Simulator;
//# sourceMappingURL=simulator.js.map