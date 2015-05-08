// prototype for understanding the algorithm. Simply run node prototype.js.
// No dependancy is required

//The algorithm is designed based on the fact that callback functions 
// in the same thread are executed one by one

var tasks = [];
tasks[0] = function(cb){
	setTimeout(function(){
		cb(2)
	},12);
};
tasks[1] = function(cb){
	setTimeout(function(){
		cb(3)
	},11);
};
tasks[2] = function(cb){
	setTimeout(function(){
		cb(7);
	},1);
};

var merge = function(results,cb){
	var merged = 0;
	for(var i=0;i<results.length;i++){
		if(results[i]){
			merged = merged + results[i];
			if(merged>=5){
				cb(merged);
				return
			}
		}else{
			cb(null);
			return;
		}
	}
	cb(merged);
}



priority_proto = function(tasks,mergeObj,cb){
	// prototype useful for understanding the algorithm
	var results = _.map(tasks,function(task){
		return null;
	});
	var finished = false;
	var merge = mergeFactory(mergeObj);


	tasks[0](function(res){	
		if(!finished){
			results[0] = res;
			merge(results,function(finalRes){
				if(finalRes){
					finished = true;
					cb(finalRes);
				}
			});
		}
	});

	tasks[1](function(res){
		if(!finished){
			results[1] = res;
			merge(results,function(finalRes){
				if(finalRes){
					finished = true;
					cb(finalRes);
				}
			});
		}
	});

	tasks[2](function(res){
		if(!finished){
			results[2] = res;
			merge(results,function(finalRes){
				if(finalRes){
					finished = true;
					cb(finalRes);
				}
			});
		}
	});

}

priority_proto(tasks,mergeObj,function(res){
	console.log(res);
});