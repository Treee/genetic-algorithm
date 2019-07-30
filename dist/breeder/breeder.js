"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agent_1 = require("../agent/agent");
var Breeder = /** @class */ (function () {
    function Breeder() {
        this.population = [];
    }
    Breeder.prototype.createPopulation = function (numAgents) {
        this.population = [];
        for (var index = numAgents; index > 0; index--) {
            this.population.push(new agent_1.Agent());
        }
    };
    Breeder.prototype.rankPopulation = function (customCompareFn) {
        var tempPopulation = this.population.slice(0);
        // allow the ability to override the default ranking algorithm
        if (!!customCompareFn && typeof customCompareFn === 'function') {
            tempPopulation.sort(customCompareFn);
        }
        else {
            tempPopulation.sort(this.compare);
        }
        return tempPopulation;
    };
    Breeder.prototype.compare = function (a, b) {
        return a.getFitness() - b.getFitness();
    };
    Breeder.prototype.selectNextGeneration = function (maxPopulationSize, customSelectFn) {
        var tempPopulation = this.population.slice(0, maxPopulationSize);
        if (!!customSelectFn && typeof customSelectFn === 'function') {
            tempPopulation = customSelectFn();
        }
        return tempPopulation;
    };
    Breeder.prototype.matePopulation = function (customCrossoverFn) {
        var tempPopulation = this.population.slice(0);
        if (!!customCrossoverFn && typeof customCrossoverFn === 'function') {
            tempPopulation = customCrossoverFn();
        }
        else {
            var newChildren = [];
            for (var index = 0; index < tempPopulation.length - 1; index += 2) {
                var parentAIndex = index;
                var parentBIndex = index + 1;
                var child1 = tempPopulation[parentAIndex].mateWith(tempPopulation[parentBIndex]);
                var child2 = tempPopulation[parentBIndex].mateWith(tempPopulation[parentAIndex]);
                newChildren.push(child1);
                newChildren.push(child2);
            }
            tempPopulation = tempPopulation.concat(newChildren);
        }
        return tempPopulation;
    };
    return Breeder;
}());
exports.Breeder = Breeder;
//# sourceMappingURL=breeder.js.map