import to from 'await-to-js'

function __promise(r) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {return r ? resolve('resolved'):reject('rejected')},3000)
  })
}

async function __await(r) {
  let [err,res] = await to(__promise(r))
    if (err)  console.log('awaited was rejected')
    else console.log('awaited was',res)
}

function __scope() {

let x = 1;
let a = true

if ( a ) {
  let x = 2
  console.log('in scope, should be 2=', x )
}
console.log('out scope, should be 1=', x )
}


function __restSpread() {
  function sum(x, y, z) {
    return x + y + z;
  }

  const numbers = [1, 2, 3];

  console.log(sum(...numbers));
  // expected output: 6

  console.log(sum.apply(null, numbers));
  // expected output: 6


  function sum(...theArgs) {
    return theArgs.reduce((previous, current) => {
      return previous + current;
    });
  }

  console.log(sum(1, 2, 3));
  // expected output: 6

  console.log(sum(1, 2, 3, 4));
  // expected output: 10


  function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a)
  console.log("b", b)
  console.log("manyMoreArgs", manyMoreArgs)
}

myFun("one", "two", "three", "four", "five", "six")

const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }

function rect ({ x, y, width, height, color }) {
  console.log('area',width*height)
}
rect({width:5,height:4})

}



function __destruct () {
  const x = [1, 2, 3, 4, 5]
  const [y, z] = x
  console.log(y,z)
  const user = {
    id: 42,
    displayName: 'jdoe',
    fullName: {
      firstName: 'John',
      lastName: 'Doe'
    }
  }

  function userId({id}) {
    return id
  }

  function whois({displayName, fullName: {firstName: name}}) {
    return `${displayName} is ${name}`
  }

  console.log(userId(user)) // 42
  console.log(whois(user))  // "jdoe is John"

  const props = [
    { id: 1, name: 'Fizz'},
    { id: 2, name: 'Buzz'},
    { id: 3, name: 'FizzBuzz'}
  ]

  const [,, { name }] = props

  console.log(name) // "FizzBuzz"

}

export {__scope, __promise,__await,__restSpread,__destruct}
