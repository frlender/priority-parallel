


var mergeFactory = function(mergeObj){
	return function(results,cb){
		// copy initial so that one mergeObj can be used for multiple priority functions
		var accum = JSON.parse(JSON.stringify(mergeObj.initial));
		for(var i=0;i<results.length;i++){
			if(results[i]){
				accum = mergeObj.merge(accum,results[i]);
				if(mergeObj.condition(accum)){
					cb(accum);
					return
				}
			}else{
				cb(null);
				return;
			}
		}
		cb(accum);
	}

}

module.exports = function(tasks,mergeObj,cb){
	var results = new Array(tasks.length);
	var finished = false;
	var merge = mergeFactory(mergeObj);
	tasks.forEach(function(task,i){
		task(function(res){
			if(!finished){
				results[i] = res;
				// console.log(results);
				merge(results,function(finalRes){
					if(finalRes){
						finished = true;
						cb(finalRes);
					}
				});
			}
		});
	});
}
