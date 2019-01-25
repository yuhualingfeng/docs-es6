
/**
 * task1
 * 基本概念
 */

function task1(){
    function* helloWorldGenerator(){
        yield 'hello';
        yield 'world';
        return 'ending';
    }    
    let hw = helloWorldGenerator();
    console.log(hw.next());
    console.log(hw.next());
    console.log(hw.next());
    console.log(hw.next());
}
// task1();


/**
 * task2
 * 暂缓执行函数
 */
function task2(){
    function* f(){
        console.log('execute');
    }
    let generator = f();

    setTimeout(function(){
        generator.next();
    },2000);
}
//task2();

/**
 * task3
 * yield*,for of 的使用
 */
function task3(){
    let array = [1,[[2,3],4,5],6];

    function* f(arr){
        for(let i in arr){
            let item = arr[i];
            if(typeof item == 'number'){
                yield item;
            }else{
                yield* f(item);
            }
        }
        
    }

    for(let i of f(array)){
        console.log(i);
    }

}
//task3();

function task4(){
    function* f(){
        for(let i = 0;i<10;i++){
            let result = yield i;
            if(result){
                i = 4;
            }
        }
    }

    let generator = f();
    for(let i = 0;i<10;i++){
        if(i==1){
           console.log(generator.next(true));
        }else{
            console.log(generator.next());
        }
    }
}
task4();







