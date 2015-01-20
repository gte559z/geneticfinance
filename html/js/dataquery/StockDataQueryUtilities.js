window.acl = window.acl || {};
window.acl.utilities = window.acl.utilities || {};


window.acl.utilities.generateQueryUrl = function(configuration){
    var symbol = configuration.symbol;

    return 'http://www.quandl.com/api/v1/datasets/WIKI/' + symbol + '.csv?sort_order=asc&exclude_headers=true&trim_start=2011-11-01&trim_end=2014-1-30&column=4&collapse=daily';
};