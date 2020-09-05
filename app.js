import {Wifi} from './lib/wifi.js'
import { promisify } from './lib/util.js'
import {__scope, __promise,__await,__restSpread, __destruct} from './lib/extended-features.js'
// import {server as wserver } from './lib/webserver.js'

class App {
  constructor(opts) {
    console.log('environment', process.env)
    this.opts = opts
    this.wifi = new Wifi(opts.wifi)
  }


  init () {
    this.wifi.on('connected', () =>{ this.online() })
    this.wifi.on('disconnected', () => { this.offline() })
    // console.log(this.wifi.log)
    this.wifi.connect(this.opts.wifi)
  }

  async online () {
    console.log('application online at', this.wifi.status.ip)
    // these are example functions demonstrating extentions
    console.log('extended features examples')
    __promise().then(res=>{console.log('promise return',res)}).catch(err => {console.log('promise return',err)})
    __promise(true).then(res=>{console.log('promise return',res)}).catch(err => {console.log('promise return',err)})
    __await()
    __await(true)
    __restSpread()
    __destruct()
    __scope()
    // example utility usage
    console.log('utility helpers example, isIP and promisfy used by wifi ping')
    console.log('ping gateway', await this.wifi.ping(this.wifi.status.gw))
    console.log('pinging google.com', await this.wifi.ping('google.com') )
  }


  offline (){
    console.log('application offline', this.wifi.status.ip)
  }

}

export default App
export { App }
