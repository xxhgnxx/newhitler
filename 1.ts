// let a = function getV1() {
//
//   console.log("得到了个数据V1")
// }
//
//
//
//
//
// setTimeout(a, 1000)

function getVal1(n: number, cb: Function) {
  setTimeout(cb(n + 1), 10000);
};

//  10s之后返回 n+1
getVal1(3, (x: number) => {
  console.log(x);
});
