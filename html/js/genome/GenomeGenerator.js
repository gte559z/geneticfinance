window.acl = window.acl || {};
window.acl.utilities = window.acl.utilities || {};


/**
 * Utility method that generates a sequence of {@code BasePair}s summing to the 
 * numeric length passed as an argument.
 */
window.acl.utilities.generateGenome = function(lengthOfGenome) {
    var lengthOfGenome = lengthOfGenome || Math.round(Math.random() * 365);

    var genome = [];
    var cumulativeLength = 0;

    while (cumulativeLength < lengthOfGenome) {
        var basePairLength = acl.utilities.generateGenome.generateRandomLength (lengthOfGenome);
        cumulativeLength += basePairLength;
        genome.push(new BasePair(acl.utilities.generateGenome.generateRandomTrend(), basePairLength));
    }

    return genome;
};

window.acl.utilities.generateGenome.generateRandomLength = function(genomeSize) {
    genomeSize = genomeSize || 365;
    return Math.round(Math.random() * (genomeSize / 2));
};

window.acl.utilities.generateGenome.generateRandomTrend = function() {
    return Math.round(Math.random() * 2) - 1;
};

window.acl.utilities.generateGenome.getMaxLengthOfGenome = function() {
    return 365;
};
