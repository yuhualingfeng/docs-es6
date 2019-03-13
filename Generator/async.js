/**
 * js中异步操作分几种实现方式
 * 1.回调函数   缺点:多层嵌套出现'回调函数地狱'    
 * 2.Promise
 */


 
/**
 * 异步方式1 回调函数
 */
 function task1(){
     const fs = require('fs');
     fs.readFile('../README.md','utf-8',function(error,data){
        if(error){
            console.log(error);
        }
        console.log(data);
     });
 }
 task1();

 /**
 * 异步方式1 回调函数缺陷演示
 */

 function task2(){
     const fs = require('fs');
     fs.readFile('../README.md','utf-8',function(error,data){
        if(error){
            console.log(error);
        }
        fs.readFile('../README.md','utf-8',function(error1,data1){
            if(error1){
                console.log(error1);
            }
            console.log(data+data1);
         });
     });
 }
 //task2();

 /**
  * 异步方式2 Promise  优点:异步任务更清晰  缺点:代码冗余
  */
 function task3(){
    const readFile = require('fs-readfile-promise');
    readFile('../package.json').then(function(data){
        console.log(data.toString());
    }).then(function(){
        return readFile('../package.json');
    }).then(function(data){
        console.log(data.toString());
    });
 }
 //task3();


 /**
  * 异步方式3 Generator
  */
 function task4(){
     function* gen(){
        const fetch = require('node-fetch');
        let data = yield fetch('https://api.github.com/users/yuhualingfeng');
        console.log(data);
        return data;         
     }

     let g = gen();
     let result = g.next();
     result.value.then(function(data){
        return data.json();
     }).then(function(data){
        g.next(data);
     });

 }
 // task4();

 /**
  *Generator 函数的流程管理
  *
  */
 function task5(){
     const fs = require('fs');
     const thunkify = require('thunkify');
     const readFileThunk = thunkify(fs.readFile);

     function* gen(){
         let result1 = yield readFileThunk('../package.json');
         console.log(result1.toString());
         let result2 = yield readFileThunk('../README.MD');
         console.log(result2.toString());
     }

     const g = gen();
     const r1 = g.next();


     r1.value(function(error,data){
         if(error){
             throw new Error(error);
         }
         const r2 = g.next(data);
         r2.value(function(error,data){
             if(error){
                 throw new Error(error);
             }
             g.next(data);
         })

     })

 }
 // task5();

 /**
  *Thunk 函数的自动流程管理
  *
  */
 function task6(){
    const fs = require('fs');
    const thunkify = require('thunkify');
    const readFileThunk = thunkify(fs.readFile);

    function* gen(){
        let result1 = yield readFileThunk('../package.json');
        console.log(result1.toString());
        let result2 = yield readFileThunk('../README.MD');
        console.log(result2.toString());
    }

    // 自动化函数
    function run(gen){ 
        let g = gen();
        function next(error,data){
            let result =  g.next(data);
            if(result.done){
                return ;
            }else{
               result.value(next);
            }
        }

        next(); 
    }

    run(gen);

 }
//  task6();









