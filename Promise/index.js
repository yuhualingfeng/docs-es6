// 基本用法
function task1(){
    function timeout(ms){
        return new Promise((resolve,reject)=>{
            setTimeout(resolve,ms);
        })
    }
    timeout(2000).then((value)=>{
        console.log(value);
    });
}
// task1();


// 异常捕获
function task2(){
    const promise = new Promise((resolve,reject)=>{
        resolve(x + 2);
    });
    promise.then((value)=>{
        console.log(value);
    }).catch((error)=>{ 
        console.error(error);
    });

}
//task2();

// 始终执行,Promise.prototype.finally
function task3(){
    const promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1);
        },2000)
    });
    promise.then((value)=>{
        console.log(value);
    }).catch((error)=>{
        console.error(error);
    }).finally(()=>{
        console.log('始终执行');
    });
}
//task3();

// Promise.all
function task4(){
    const promise1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('promise1');
        },2000);
    });

    const promise2 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('promise2');
        },3000);

    });

    Promise.all([promise1,promise2]).then((result)=>{
        console.log(result);
    });

}
// task4();

// Promise.race
function task5(){
    const promise1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('promise1');
        },2000);
    });

    const promise2 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('promise2');
        },3000);

    });

    Promise.race([promise1,promise2]).then((result)=>{
        console.log(result);
    });
}

task5();