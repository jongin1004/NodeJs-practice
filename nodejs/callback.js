function a() {
    consolo.log('a');
}

// 익명함수, 변수로 받을 수 있음 = 함수는 값이 될 수 있다. 
let b = function () {
    console.log('b');
}

// callback 함수를 사용하여, 긴작업이 끝난 후에 callback 함수를 실행해라 
function slowfunc(callback) {
    console.log('긴~ 작업');
    callback();    
}

slowfunc(b);