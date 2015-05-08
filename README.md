# priority-parallel
##### Execute an array of asynchronous tasks in parallel and harvest results by its task's priority. Can be used in both back- and front- end.

The priority of a task is simply its position in the array. The first task has the highest priority while the last has the least. When the results are collected, priority-parallel first checks if the result of the first task meets a condition function. If the result passes the condition function, it is piped to callback function. All the other results returned by lower priority tasks are ignored no matter whether they are returned either before or after the first result. If the result does not pass the condition, it is pushed to a results array. Priority-parallel then collects the result of the second task and checks if a merge of the first result and second result meets the condition function. If pass, the merged results are sent to callback and all the other results are ignored. If not pass, iterate the process until reaching the result of the last task. Then all results are merged and sent to callback whether or not the condition function is met.

###API
```
var priority = require('priority-parallel')
priority(tasks,mergeOptions,callback)
```
`priority` takes three parameters:

##### tasks

An array of tasks. A task is function that takes a callback function as the only argument:
```
var task = function(callback){
  // do something
  callback(result);
}
```
##### mergeOptions

An object that defines the merge function, the condition function and an initial value. The initial value is anologous to the initial value in a reduce function. If the results returned are number, the initial value usually takes `0`. If array, it usually takes `[]`.
```
var mergeOptions = {
   initial: ..., //usually 0 or []
   merge: function(accum, result){
      // merge accum and result to get the next accum
   },
   condition: function(accum){
     // check if accum meet certain criterion
   }
}
```
##### callback

The callback of the priority function takes only one parameter which is the final result. The final result is the final value of `accum` as in the merge function.

```
priority(tasks,mergeOptions,function(finalResult){
  ...
})
```
### Examples
Here shows a trivial example that asynchronously fetch some numbers and add them based on priority unitil the sum reaches some threshold.
```
var priority = require('priority-parallel')

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

var mergeOptions = {
  initial:0,
  merge: function(accum,result){
    return accum+result;
  },
  condition: function(accum){
    return accum>=5
  }
}

priority(tasks, mergeOptions, function(finalRes){
  console.log(finalRes);
}
// The finalRes should be 5.
```
