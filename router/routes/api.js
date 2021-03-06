/* ************************************************************************ */
/*
    Server API Routing -


    NOTE: The module arguments are required. And your code will use them to 
    access the Express application object, database object, and the root path 
    of the application.

    
*/
module.exports = function(app) {

    var db = app.get('db');

    var path = require('path');
    var fs = require('fs');

    // where the JSON data files are kept
    var dataLoc = path.join(app.get('approot'),'/data');

    /* ******************************************************************** */
    /*
        POST /api/seedall - Read all JSON files in /data and
        seed the appropriate collection(s).

        Usage:
            POST http://server:port/api/seedall

        NOTE: Any file name starting with '-' will be ignored.
    */
    app.post('/api/seedall', function(req, res) {
        console.log(getReqInfo(req));

        // no response sent, or even necessary during development
        if(res !== undefined) res.end();

        /*
            Read all files in the current folder, look for files
            with a '.json' extension but where the name does not
            start with '-'.
        */
        fs.readdirSync(dataLoc).filter(function(file) {
            return (file.indexOf('.') !== 0) && (file.indexOf('-') !== 0) && (file.slice(-5) === '.json');
        })
        .forEach(function(file) {
            seedCollection(file);
        });
    });

    /*
        POST /api/seed?filename - Read a named JSON files that should
        be found in /data use it to seed the appropriate collection.

        Usage:
            POST http://server:port/api/seed?modname=ModelName

    */
    app.post('/api/seed', function(req, res) {
        console.log(getReqInfo(req));
        // no response sent, or even necessary during development
        if(res !== undefined) res.end();
        seedCollection(req.query.modname + '.json');
    });

    /*
        POST /api/seed?filename - Read a named JSON files that should
        be found in /data use it to seed the appropriate collection.

        Usage:
            POST http://server:port/api/export?modname=ModelName

        Where: "ModelName" is the exact name of the model to be 
        exported.

    */
    app.post('/api/export', function(req, res) {
        console.log(getReqInfo(req));
        // no response sent, or even necessary during development
        if(res !== undefined) res.end();
        // use a file name that will be ignored by 'seed all' and
        // indicates that it contains exported data
        exportCollection(req.query.modname);
    });

    /*
        Seed a collection with data contained within a JSON file.
    */
    function seedCollection(file) {

        var collDef = require(path.join(dataLoc, file));

        console.log('seedCollection() - file = '+file);
        console.log('seedCollection() - model = '+collDef.model);
        console.log('seedCollection() - length = '+collDef.data.length);

        var model = db.conn.models[collDef.model];

        var docsLen = collDef.data.length;
        var docCount = 0;

        collDef.data.map(function(doc) {
            var doctmp = model(doc);
            doctmp.save(function (err, _doc) {
                if(err) throw err;
                docCount += 1;
                if(docCount === docsLen) {
                    console.log('seedCollection() - seed complete - '+collDef.model);
                }
            });
        });
    };

    /*
        Export data from a collection to a JSON file using a 
        model name.
    */
    function exportCollection(modelName) {

        var exportData = {};

        // Name the file so that it will be ignored by a seed 
        // all command.
        var file = '-' + modelName + '_export.json';
        var model = db.conn.models[modelName];

        model.find()
        .exec(function (err, docs) {
            if(err) throw err;

            exportData.model = modelName;
            exportData.data = JSON.parse(JSON.stringify(docs));

            fs.writeFile(path.join(dataLoc, file), JSON.stringify(exportData), function(err) {
                if(err) throw err;
                console.log('exportCollection() - data export complete '+file+' has '+exportData.data.length+' documents');
            });
        });
    };

    /*
    */
    function getReqInfo(req) {
        return '' + req.method + ' - ' + req.originalUrl;
    };


    /* ******************************************************************** */
    /*
        POST /api/signup - 
    */
    app.post('/api/signup', function(req, res) {
        console.log(getReqInfo(req));
        if(res !== undefined) res.end();
        res.send('<html lang="en"><head><title>HELLO WORLD - Test</title></head><body><h3>got POST /api/signup</h3></body></html>');
    });

    /*
        POST /api/login - 
    */
    app.post('/api/login', function(req, res) {
        console.log(getReqInfo(req));
        if(res !== undefined) res.end();
        res.send('<html lang="en"><head><title>HELLO WORLD - Test</title></head><body><h3>got POST /api/login</h3></body></html>');
    });

    /*
        POST /api/register - 
    */
    app.post('/api/register', function(req, res) {
        console.log(getReqInfo(req));
        if(res !== undefined) res.end();
        res.send('<html lang="en"><head><title>HELLO WORLD - Test</title></head><body><h3>got POST /api/register</h3></body></html>');
    });

    /*
        POST /api/confirm - 
    */
    app.post('/api/confirm', function(req, res) {
        console.log(getReqInfo(req));
        if(res !== undefined) res.end();
        res.send('<html lang="en"><head><title>HELLO WORLD - Test</title></head><body><h3>got POST /api/confirm</h3></body></html>');
    });
};
