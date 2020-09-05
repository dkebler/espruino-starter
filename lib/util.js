function promisify(f,opts={}) {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
        if (opts.errorFirst) {
          if (err) reject(err)
          else resolve(result)
        }
        else resolve(err)
      }
      args.push(callback) // append our custom callback to the end of f arguments
      f.call(this, ...args) // bind the original function
    })
  }
}

import isIP from 'is-ip'

export { isIP, promisify }
