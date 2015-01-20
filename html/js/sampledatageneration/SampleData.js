window.acl = window.acl || {};
window.acl.utilities = window.acl.utilities || {};
window.markov = window.markov || {};

window.acl.utilities.generateACumulativeChainOfData = function(chain, sizeOfDataNeeded) {

    var data = [chain.getNextValue()];
    var i = 1;

    for (i; i < sizeOfDataNeeded; i++) {
        data.push(data[i - 1] + chain.getNextValue());
    }

    return data;
};

/**
 * 
 */
window.acl.utilities.generateThreeStateRandomMarkovChainData = function(numberOfDataPoints) {
    var states = [];
    states.push(new markov.State({
        emissionProbabilities: [0.6, 0.2, 0.2],
        emissionValues: [1, - 1, 0]
    }));
    states.push(new markov.State({
        emissionProbabilities: [0.2, 0.6, 0.2],
        emissionValues:  [1, - 1, 0]
    }));
    states.push(new markov.State({
        emissionProbabilities: [0.33, 0.33, 0.33],
        emissionValues:  [1, - 1, 0]
    }));

    var transitionMatrix = createTransitionStateMatrix(states.length);

    var chain = new acl.MarkovChain(transitionMatrix, states);

    return acl.utilities.generateACumulativeChainOfData(chain, numberOfDataPoints);
};


function createTransitionStateMatrix(numberOfStates) {
    var matrix = [];

    for (var i = 0; i < numberOfStates; i++) {

        // Gather random data. 
        var tempRow = [];
        var sum = 0;
  
        for (var j = 0; j < numberOfStates; j++) {
            tempRow.push(Math.random());
            sum = sum + tempRow[j];
        }

        // Normalize the state transitions so that they sum to 1
        var normalizedData = [];
        for (j = 0; j < numberOfStates; j++) {
            normalizedData.push(tempRow[j] / sum);
        }

        matrix.push(normalizedData);
    }

    return matrix;
};