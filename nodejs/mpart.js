var M = {
    v:'V',
    f:function(){
        console.log(this.v);
    }
}

module.exports = M; // M이 가리키는 객체를 모듈 밖에서 사용할 수 있도록 하겠다.