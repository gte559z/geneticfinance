window.acl = window.acl || {};
window.acl.SegmentAnalysis = window.acl.SegmentAnalysis || {};


acl.SegmentAnalysis.getMaximalSegments = function(serialData) {

    // Normalize the differnce to be -1, 0 or 1
    var getNormalizedScore = function(value) {

        if (value === 0) {
            return value;
        }

        var isNegative = value < 0;
        var normalized = value / value * isNegative ? -1 : 1;
        
        return normalized;
    };

    var scores = [0];

    for (var i = 1; i < serialData.length; i++) {
        var difference = serialData[i] - serialData[i - 1];

        scores.push(getNormalizedScore(difference));
    }

    return scores;
};