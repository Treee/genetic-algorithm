"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Agent = /** @class */ (function () {
    function Agent(_dna) {
        if (_dna === void 0) { _dna = ''; }
        this.dna = _dna;
    }
    Agent.prototype.mutate = function (mutationRate) {
        var mutatedDna = this.dna.slice(0);
        var mutatedDnaBinary = this.stringToBinary(mutatedDna).join('').split('');
        for (var index = 0; index < mutatedDnaBinary.length; index++) {
            var mutationIndex = Math.random();
            if (mutationIndex < mutationRate) {
                if (mutatedDnaBinary[index] === '0') {
                    mutatedDnaBinary[index] = '1';
                }
                else {
                    mutatedDnaBinary[index] = '0';
                }
            }
        }
        var reconstructedAgent = this.binaryToString(mutatedDnaBinary.join(''));
        return reconstructedAgent;
    };
    Agent.prototype.mateWith = function (otherAgent) {
        var newDna = this.swapDna(otherAgent);
        return new Agent(newDna);
    };
    Agent.prototype.getFitness = function () {
        var fitness = 0;
        if (typeof this.dna === 'string') {
            fitness = this.getHash();
        }
        return fitness;
    };
    Agent.prototype.getHash = function () {
        var sum = 0;
        for (var index = 0; index < this.dna.length; index++) {
            sum += this.dna.charCodeAt(index);
        }
        return sum;
    };
    Agent.prototype.stringToBinary = function (str) {
        var result = [];
        for (var i = 0; i < str.length; i++) {
            result.push(this.resolveBinaryOctet(str.charCodeAt(i)));
        }
        return result;
    };
    Agent.prototype.resolveBinaryOctet = function (n) {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + ' does not fit in a byte');
        }
        return ('000000000' + n.toString(2)).substr(-8);
    };
    Agent.prototype.swapDna = function (otherAgent) {
        var tempThisAgentDna = this.dna.slice(0);
        var thisAgentDnaBinary = this.stringToBinary(tempThisAgentDna).join('');
        var tempOtherAgentDna = otherAgent.dna.slice(0);
        var otherAgentDnaBinary = this.stringToBinary(tempOtherAgentDna).join('');
        var numBytesToSwap = Math.floor((thisAgentDnaBinary.length / 8) / 2);
        var endBitSwapIndex = 8 * numBytesToSwap;
        var startBitSwapIndex = 0;
        var p1Right, p1Left, p2Right, p2Left, childDna;
        p1Right = thisAgentDnaBinary.slice(endBitSwapIndex);
        p1Left = thisAgentDnaBinary.slice(startBitSwapIndex, endBitSwapIndex);
        p2Right = otherAgentDnaBinary.slice(endBitSwapIndex);
        p2Left = otherAgentDnaBinary.slice(startBitSwapIndex, endBitSwapIndex);
        var chanceToCrossLeft = this.getRandomInt(0, 1);
        if (chanceToCrossLeft) {
            childDna = p2Right + p1Right;
        }
        else {
            childDna = p1Left + p2Left;
        }
        var child = this.binaryToString(childDna);
        return child;
    };
    Agent.prototype.binaryToString = function (binaryString) {
        var string = [];
        for (var index = 0; index < binaryString.length; index += 8) {
            var byte = binaryString.slice(index, index + 8);
            var charCode = parseInt(byte, 2);
            var char = String.fromCharCode(charCode);
            string.push(this.unicodeToChar(char));
        }
        return string.join('');
    };
    Agent.prototype.unicodeToChar = function (text) {
        return text.replace(/\\u[\dA-F]{4}/gi, this.getRandomCharacter());
    };
    Agent.prototype.getRandomCharacter = function () {
        var lowestChar = 33;
        var highestChar = 126;
        var charCode = this.getRandomInt(lowestChar, highestChar);
        return String.fromCharCode(charCode);
    };
    // min and max are both inclusive
    Agent.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Agent;
}());
exports.Agent = Agent;
//# sourceMappingURL=agent.js.map