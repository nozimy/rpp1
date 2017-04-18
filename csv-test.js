var Region = require('./models/region-model').Region;
for (var i=0; i<200; i++) {
    Region.findOneAndRemove({"region_num": i}, function (err, region) {
      if (err) return handleError(err);
      //region.remove();
      //console.log(region.region_num, region.name, region.region_center, region.okrug);
    });
}

function handleError(err){
	console.log(err);
}