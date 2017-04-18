var fs = require('fs');
var parse = require('csv-parse');
var Region = require('./models/region-model').Region;

var parser = parse({delimiter: '\t'}, function(err, data){
//   console.log(data);
//   console.log('parser.count, parser.lines, parser.empty_line_count, parser.skipped_line_count');
//   console.log(parser.count, parser.lines, parser.empty_line_count, parser.skipped_line_count);

    for (var i = 0; i < data.length; i++) {
    //Переписать в др файл с др delimiter
    // var str_line = data[i][0].toString()+";"+data[i][1].toString()+";"+data[i][2].toString()+";"+data[i][3].toString()+ '\n';
    // fs.appendFileSync(__dirname+'/regionsnew.csv',str_line, 'utf8')
        var region = {
            region_num: data[i][0],
            name: data[i][1],
            region_center: data[i][2],
            okrug: data[i][3]
        }
        Region.createNew(region, function(err, result){
              if (err) {
                console.log(err);
              } else {
                console.log(result);
              }
            });  
        }
});

fs.createReadStream(__dirname+'/regions1.csv', {encoding:'utf8'}).pipe(parser);

