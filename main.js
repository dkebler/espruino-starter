import opts from './options.yaml'
import {App} from './app.js'

// called on boot if production
function onInit(){
  setTimeout(function () {new App(opts).init()},process.env.PRODUCTION?200:5000)  // wait for terminal
}

setTimeout((process.env.PRODUCTION)?save:onInit,1000)
