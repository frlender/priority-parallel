# priority-parallel
Execute an array of asynchronous tasks in parallel and harvest results by its task's priority. 
The priority of a task is simply its position in the array. The first task has the highest priority while the last has the least. When the results are collected, priority-parallel first checks if the result of the first task meets a condition function. If the result passes the condition function, it is piped to callback function and all the other results returned by low priority tasks either before or after the first result are ignored. If the result does not pass the condition, it is pushed to a results array. Priority-parallel then collects the result of the second task and checks if a merge of the first result and second result meets the condition function. If pass, the merged results are sent to callback and all the other results returned are ignored. If not pass, iterate the process until reaching the result of the last task. Then all results are merged whether or not meet the condition function and sent to callback.

