import wifi from 'Wifi'
import { isIP, promisify } from './util.js'

let reporter

class Wifi {
  constructor(opts) {
    this.opts = opts
  }

  persist () {
    wifi.save()
  }

  clear () {
    wifi.save('clear')
  }

  log (){
    console.log('--------- Wifi ----------')
    console.log(this.status)
    console.log('-------------------------')
  }

  get status () {
    return Object.assign(wifi.getIP(),wifi.getDetails(),wifi.getStatus())
  }

  report (sec) {
    if (sec && sec>0) {
      this.reporter = setInterval(this.log,sec*1000)
    }
    else {
      if (this.reporter) clearInterval(reporter)
    }
  }

  async ping (ip) {
    if (!isIP(ip)) ip = await promisify(wifi.getHostByName)(ip)
    if (!ip) return null
    return await promisify(wifi.ping)(ip)
  }

  connect (opts) {
    let _opts = Object.assign({},this.opts,opts)
    wifi.setHostname(_opts.hostname || 'esp32')
    // if (_opts.static) {
    //   console.log('setting static IP', opts.static)
    //   wifi.setIP(opts.static)
    // }

    wifi.on('connected',()=>{
      console.log('ESP connected to AP')
      this.emit('connected', wifi.getStatus() )
      this.log()
      if (opts.report) this.report(opts.report)
    })

    wifi.on('disconnected',() => {
      console.log('ESP disconnected from AP')
      this.emit('disconnected', wifi.getStatus() )
      this.log()
      this.report()
    })

    const state = wifi.getStatus()
    console.log('determining wifi status')
    if (state.ssid === _opts.ssid & state.station ==='connected' ) {
      console.log('already connected to', state.ssid)
      wifi.emit('connected')
    }
    else {
      console.log('not connected...connecting')
      wifi.connect(_opts.ssid, {password: _opts.password}, function(err) {
        if (err) console.log('wifi connection error', err)
      })
    }
  }

}

export {Wifi}
export default Wifi
