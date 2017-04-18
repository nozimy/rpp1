module.exports =  function (baseUrl, routes) {
    var Table = require('cli-table');
    var table = new Table({ head: ["", "Path"] });
    console.log('\nAPI for ' + baseUrl);
    console.log('\n********************************************');

    for (var key in routes) {
        if (routes.hasOwnProperty(key)) {
            var val = routes[key];
            if(val.route) {
                val = val.route;
                var _o = {};
                _o[val.stack[0].method]  = [baseUrl + val.path];    
                table.push(_o);
            }       
        }
    }

    console.log(table.toString());
    return table;
};


----------------------------------------------------------------------
In Express 4 you can follow this useful guide: list-all-rest-endpoints

I have adapted this for my needs. I've used express.Router() and registered my routes like this:

var questionsRoute = require('./BE/routes/questions');
app.use('/api/questions', questionsRoute);
var questionsRoute = require('./BE/routes/questions');
app.use('/api/questions', questionsRoute);

then i call it in my server.js like this:

var server = app.listen(process.env.PORT || 5000, function () {
    require('./BE/utils/document')('/api/questions', questionsRoute.stack);
});