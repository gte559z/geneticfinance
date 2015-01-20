window.markov = window.markov || {};
window.markov.State = window.markov.State || {};

/**
 * Represents a Node/State to be used in a MarkovChain, per 
 * {@code markov.MarkovChain}. 
 * <br><br>
 * 
 * This class takes an N length array of probabilities, summing to 1, which 
 * dictate the odds of this object dispatching from the N lenght array of 
 * emissionValues.
 * 
 * @param emissionInformation is an object with two key fields:
 * {
 *      <code>emissionProbabilities</code>: array of probabilities suming to 1, 
 *          corresponding to the values.
 * 
 *      <code>emissionValues</code>: array of values or callback functions. 
 * }
 */
window.markov.State = function(emissionInformation) {
    if (emissionInformation.emissionValues.length !== emissionInformation.emissionProbabilities.length) {
        throw new Error("markov.State: emissionProbabilies and emssionValues must be of the same length");
    }

    this._emissionProbabilities = emissionInformation.emissionProbabilities;
    this._emissionValues = emissionInformation.emissionValues;
};


var markovStatePrototype = window.markov.State.prototype;

/**
 * Emits a value given the current state and upon evaluating emissionProbabilities.
 */
markovStatePrototype.emitNextValue = function() {
    var indexToEmitFrom = this.determineIndexToEmitFrom(this._emissionProbabilities);
    var value = this._emissionValues[indexToEmitFrom];
    
    return value instanceof Function ? value() : value;
};



/**
 * Utility method that determins the next index to emit value state from,
 * per the emission probabilies passed. 
 */
markovStatePrototype.determineIndexToEmitFrom = function(emissionProbabilies) {
    var i;
    var index = 0;
    var randomNumber = Math.random();
    var cumulativeProbability = 0;

    for (i = 0; i < emissionProbabilies.length; i++) {
        cumulativeProbability = cumulativeProbability + emissionProbabilies[i];
        if (randomNumber < cumulativeProbability) {
            index = i;
            break;
        }
    }

    return index;
}