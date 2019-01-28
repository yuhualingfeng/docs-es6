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
 //task1();

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
 task4();








