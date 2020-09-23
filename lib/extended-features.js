import to from 'await-to-js'

function __promise(r) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {return r ? resolve('resolved'):reject('rejected')},3000)
  })
}

async function __await(r) {
  console.log('await with `to` try catch.  Will always resolve')
  let [err,res] = await to(__promise(r))
    if (err)  return err
    else return res
}

function __scope() {
console.log('block scope')
let x = 1;
let a = true

if ( a ) {
  let x = 2
  console.log('in scope, should be 2=', x )
}
console.log('out scope, should be 1=', x )
}


function __restSpread() {
  console.log('rest and spread')

  function sum(x, y, z) {
    return x + y + z;
  }

  const numbers = [1, 2, 3];

  console.log('spread in argument, 6=',sum(...numbers));
  // expected output: 6

  function sum(...theArgs) {
    return theArgs.reduce((previous, current) => {
      return previous + current;
    });
  }

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
  console.log('area should be 20=',width*height)
}
rect({width:5,height:4})

}



function __destruct () {
  console.log('destructure assignment of arrays and objects')
  const w = [1, 2, 3, 4, 5]
  const [x, y, z] = w
  console.log('should be 5 =', y+z)
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

  console.log('should be 42=',userId(user)) // 42
  console.log('jdoe is John=',whois(user))  // "jdoe is John"

  const props = [
    { id: 1, name: 'Fizz'},
    { id: 2, name: 'Buzz'},
    { id: 3, name: 'FizzBuzz'}
  ]

  const [,, { name }] = props

  console.log('FizzBuzz=',name) // "FizzBuzz"

}

async function extendedFeaturesTest() {
console.log('async/await was', await __await())
console.log('async/await was', await __await(true))
__restSpread()
__destruct()
__scope()
}

export {extendedFeaturesTest, __scope, __promise,__await,__restSpread,__destruct}
