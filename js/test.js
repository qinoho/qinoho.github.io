let a = []

let aProxy = new Proxy(a, {
  set: function (target, property, value, reciver) {
    // target[property] = value
    Reflect.set(target, property, value, reciver)
    
    return true;
  }
})

aProxy.push(1)

// console.log(a.push(1,2))
// aProxy.pop(1)
// aProxy[0] = 1


// let list = []
// const listProxy = new Proxy(list, {
//     set(target, property, value) {
//         console.log('set', property, value) //property指下标 value值
//         target[property] = value
//         return true //表示设置成功
//     }
// })

// listProxy.push(100)