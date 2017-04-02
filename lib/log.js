var winston = require('winston');
var ENV = process.env.NODE_ENV;

/* can be much more flexible!!! than that todo: Improve logging system.
use new winston.logger.add('category1',{console:{level:'info',etc.},file:{}})
var winston = require('winston');
var category1 = winston.loggers.get('category1');
*/
function getLogger(module) {

    var path = module.filename.split('\\').slice(-2).join('\\');
    //console.log(path);
    var exceptionslog = new winston.transports.File({
        label: path,
        filename: 'logs/exceptions.log'
    });
    var consolelog = new winston.transports.Console({
        //timestamp: true, // function() { return new Date().toString() }
        colorize: true,
        level: (ENV == 'development') ? 'debug' : 'error',
        label: path
    });

    if (path.match(/www(\.js)?$/)) {

    return new winston.Logger({
        transports: [
            consolelog,

            new winston.transports.File({
                name: 'www-logfile',
                filename: 'logs/www-log.log',
                level: 'error',
                label: path
            })

        ]/*,
        exceptionHandlers: [
            exceptionslog,
            consolelog
        ]*/
    });

    } else if (path.match(/app(\.js)?$/)) {

        return new winston.Logger({
            transports: [
                consolelog,

                new winston.transports.File({
                    name: 'app-logfile',
                    filename: 'logs/app-log.log',
                    level: 'error',
                    label: path
                })
            ]/*,
            exceptionHandlers: [
                exceptionslog,
                consolelog
            ]*/
        });
    } else {

        return new winston.Logger({
            transports: [
                consolelog,
                new winston.transports.File({
                    name: 'all-other-logs',
                    filename: 'logs/all-other-log.log',
                    level: 'error',
                    label: path
                    //handleExceptions: true,
                    //humanReadableUnhandledException: true
                })
            ],
            exceptionHandlers: [
                exceptionslog,
                consolelog
            ]
        });
    }
}

module.exports = getLogger;