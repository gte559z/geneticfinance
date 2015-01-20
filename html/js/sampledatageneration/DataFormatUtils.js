window.acl.dataformat = window.acl.dataformat || {};

/**
 * Utility function that takes an array of numeric data and converts it a format
 * accepted by the Google datat table. 
 */
window.acl.dataformat.convertToGoogleFormat = function(data, data2) {

    var formattedData = [
        ["", "Fake Stock Data", "Genome"]
    ];
    
    var i = 0;
    for (i; i < data.length; i++) {
        formattedData.push(["" + i, data[i], data2[i]]);
    }

    return formattedData;
};


window.acl.dataformat.convertGenomeSequenceToDataArray = function(data) {

    var formattedData = [];

    var i = 0;
    for (i; i < data.length; i++) {
        var j = 0;
        var object = data[i];
        for (j; j < object.spaceInGenome; j++) {
            formattedData.push(object.value);
        }

    }

    return formattedData;
};