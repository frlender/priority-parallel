// run nodeuint test.js. require global installatin of nodeunit
var priority = require('../index.js');

var createPrioritySumInput = function(times,vals,thres){
	var input = {};
	var mergeObj = {
			initial:0,
			merge:function(accum,item){
				return accum + item;
			},
			condition:function(accum){
				return accum >=thres;
			}
	};
	var tasks = [];
		times.forEach(function(time,i){
			tasks.push(function(cb){
				setTimeout(function(){
					cb(vals[i]);
				},time);
			});	
		});
	input.tasks = tasks;
	input.mergeObj = mergeObj;
	return input;
}

exports.testPriority = {
	testSum1:function(test){
		// time, vals, thres
		var input = createPrioritySumInput([12,11,5],
			[2,3,7],5);
		priority(input.tasks,input.mergeObj,function(res){
			test.ok(res==5);
			test.done();
		});
	},

	testSum2:function(test){
		var input = createPrioritySumInput([12,5,18],
			[2,3,7],6);
		priority(input.tasks,input.mergeObj,function(res){
			test.ok(res==12);
			test.done();
		});
	},

	testSum3:function(test){
		var input = createPrioritySumInput([1,50,18],
			[7,2,8],9);
		priority(input.tasks,input.mergeObj,function(res){
			test.ok(res==9);
			test.done();
		});
	},

	testSum4:function(test){
		var input = createPrioritySumInput([1,50,18],
			[7,2,8],5);
		priority(input.tasks,input.mergeObj,function(res){
			test.ok(res==7);
			test.done();
		});
	}
}