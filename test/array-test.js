let arr = [1,2,3];
console.log(arr.find(x=>x===4));

var str="dung.phamthe@mobifone.vn";
var nameMatch = str.match(/^([^@]*)@/);
var name = nameMatch ? nameMatch[1] : null;

console.log(name);
