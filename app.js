import {Wifi} from './lib/wifi.js'
import { promisfyTest } from './lib/util.js'
// import {extendedFeaturesTest} from './lib/extended-features.js'
// import {server as wserver } from './lib/webserver.js'

let times = 0

class App {
  constructor(opts) {
    console.log('environment', process.env)
    this.opts = opts
    this.wifi = new Wifi(opts.wifi)
  }

  init () {
    this.wifi.on('connected', () =>{
      this.online()
    })
    this.wifi.on('disconnected', () => {
      this.offline()
    })
    this.wifi.connect()  // get connection started
  }

  async online () {
    console.log('application online at', this.wifi.status.ip)
    times++
    if (times < 4) {
      setTimeout(async ()=>{
        console.log('---------------- manually disconnect/reconnect test --------------', times)
        await this.wifi.disconnect()
        // console.log('disconnected?',await this.wifi.disconnect())
      },5000)
    } else console.log('done disconnect trial of 3 times')
    // await promisfyTest(true)
    // await promisfyTest()
    // await promisfyTest(true,true)
    // await promisfyTest(false,true)

    // console.log('extended features examples')
    // await extendedFeaturesTest()
    // example utility usage
    // console.log('utility helpers example, isIP and promisfy used by wifi ping')
    // console.log(isIP('10.0.0.1'),isIP('google.com'))
    //
    // this.wifi.api.ping(this.wifi.status.gw,val=>console.log(val,'ms'))
    // this.wifi.api.ping('10.0.0.1',function (res) {console.log(res.respTime,'ms')})
    // this.wifi.api.getStatus(function status(val) {console.log('status', val)})
    // console.log(await this.wifi.ping(this.wifi.status.gw))
    // console.log('ping gateway', await this.wifi.ping(this.wifi.status.gw),'ms')
    // console.log('ping gateway', await this.wifi.ping(this.wifi.status.gw),'ms')
    // console.log('ping google', await this.wifi.ping('google.com'),'ms')
    // console.log('lookup ip', await this.wifi.nslookup('esptest') )
    // console.log('ping gateway', await this.wifi.ping(this.wifi.status.gw))
    // console.log('pinging google.com', await this.wifi.ping('google.com') )

  }


  offline (){
    console.log('application offline')
  }

}

export default App
export { App }
