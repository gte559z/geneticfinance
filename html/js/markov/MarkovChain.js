window.acl = window.acl || {};
window.acl.MarkovChain = window.acl.MarkovChain || {};

/**
 * MarkovChain is used to be generate a sample dataset given {@code acl.State}s
 * and state transition probabilities.
 * 
 * An instance of {@code MarkovChain} will maintain it's current state and dispatch 
 * new values per {@code #getNextValue}.
 * 
 * @param transitionMatrix a N x N matrix (where N is the number of states in the
 *  arrayOfStates parameter.
 * @param arrayOfStates an array of length N of {@code acl.State}s.
 */
window.acl.MarkovChain = function(transitionMatrix, arrayOfStates) {
    if (!(this instanceof acl.MarkovChain)) {
        throw new Error("Error creating new acl.MarkovChain. Must call with" + " 'new' opperator.");
    }

    this.transitionMatrix = transitionMatrix;
    this.arrayOfStates = arrayOfStates;
    this.currentStateIndex = 0;
};

// Add methods to prototype directly
var markovChainPrototype = window.acl.MarkovChain.prototype;

markovChainPrototype.getNextValue = function() {
    var stateToEmitFrom = this._retriveStateToEmitFrom();

    return stateToEmitFrom.emitNextValue();
};

/**
 * Helper routine that will evaluate, based on the transition matrix and 
 * states provided, what the next {@code markov.State} object should be to emit 
 * from. 
 */
markovChainPrototype._retriveStateToEmitFrom = function() {
    var randomNumber = Math.random();
    var cumulativeProbability = 0;
    var relevantRow = this.transitionMatrix[this.currentStateIndex];
    
    var i = 0;
    for (i; i < relevantRow.length; i++) {
        cumulativeProbability = cumulativeProbability + relevantRow[i];
        if (cumulativeProbability >= randomNumber) {
            this.currentStateIndex = i;
            break;
        }
    }

    var stateToEmitFrom = this.arrayOfStates[this.currentStateIndex];
    if (!stateToEmitFrom instanceof markov.State) {
        throw new Error("getNextValue: Incorrect 'type' of State.");
    }

    return stateToEmitFrom;
};
