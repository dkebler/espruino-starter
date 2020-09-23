import wifi from 'Wifi'
import ping from 'Ping'
// import { isIP } from 'net'
import { promisify, to, isIP } from './util.js'

let reporter

class Wifi {
  constructor(opts) {
    this.opts = opts
    this._reconnect = opts.reconnect!=null ? opts.reconnect : 5  // reconnect delay or disable
    this.api = wifi
    this.state = 'disconnected'
    this._getHostByName=promisify(wifi.getHostByName)
    this._pingHost=promisify(ping,{errorFirst:true})
    this._pingIP=promisify(wifi.ping)
    this._timed = null

    wifi.on('connected',()=>{
      console.log('ESP connected to AP')
      // this.pingMonitor = setInterval(()=>{
      //   wifi.ping(this.status.gw,res=>{
      //     if (res) console.log(res.timeout ? 'ping failed - gateway was unreachable' : `pinged gateway in ${res.respTime} ms`)
      //     else console.log('ping issue no response in callback')
      //   },2000)
      // })
      this.state = 'connected'
      this.emit('connected', this.status )
      // wifi.setHostname(_opts.hostname || 'esp32')
      // this.log()
      if (this.opts.report) this.report(this.opts.report)
    })

    wifi.on('disconnected',() => {
      // clearInterval(this.pingMonitor)
      console.log('ESP disconnected from AP')
      this.state = 'disconnected'
      this.emit('disconnected', this.status )
      this.reconnect()
      // this.log()
      this.report()
    })

  } // end constructor

  get status () {
    return Object.assign(wifi.getIP(),wifi.getDetails(),wifi.getStatus())
  }

  get connected () {
    let connected = this.status.ssid && this.status.station ==='connected'
    if (connected) this.state==='connected'
    console.log(connected,'wifi state',this.status)
    return connected
  }

  persist () {
    wifi.save()
  }

  restore () {
    wifi.restore()
  }

  clear () {
    wifi.save('clear')
  }

  log (){
    console.log('--------- Wifi ----------')
    console.log(this.status)
    console.log('-------------------------')
  }

  reconnect() {
    // console.log('reconnecting',!this._timed, !this.connected)
    if (this._reconnect && !this._timed && !this.connected) {
      this.state = 'reconnecting'
      console.log('attempting reconnect in',this._reconnect)
      setTimeout(()=>{this.connect()},this._reconnect*1000)
    }
    else console.log('wifi reconnect is disabled, reconnect will NOT be attempted')
  }

  async disconnect() {
    return new Promise( resolve => {
      // console.log('disconnecting, connected now?', this.connected)
      if (this.connected) {
        console.log('forcing disconnect now')
        let i = 0
        // sometimes disconnect callback is never called
        let timed = setInterval(() =>{  // keeps trying
          console.log('disconnect timeout')
          console.log(this.status)
          if (!this.connected) {
            console.log('disconnect callback failed but device is disconnected!!!')
            wifi.emit('disconnected')
            clearInterval(timed)
            resolve(!this.connected)
          } else {
            i++
            console.log('continuing to wait for disconnect')
            if (i===10) {
              clearInterval(timed)
              console.log('gave up on disconnect after 10 tries')
              resolve(false)
            }
          }
        },5000)
        wifi.disconnect(() =>{
          clearInterval(timed)
          console.log('wifi disconnect callback')
          resolve(!this.connected)
        })
      }
    })
  }

  connect (opts) {
    this.opts = Object.assign(this.opts,opts)
    this.state = 'connecting'

    console.log('determining wifi status')
    if (this.connected) {
      console.log('already connected to', this.status.ssid)
      wifi.emit('connected')
    }
    else {
      // console.log('not connected...connecting',this.opts)
      console.log('not connected...connecting')
      this._timed = setTimeout(async () =>{
        console.log(this.connected, 'timed out trying to connect')
        this._timed = null
        if (this.connected) {
          console.log('connect callback failed but device is connected!!!')
          wifi.emit('connected')
        }
        else {
          this.reconnect()
        }
      },5000)
      wifi.connect(this.opts.ssid, {password: this.opts.password}, err => {
        console.log('wifi connect callback')
        clearTimeout(this._timed)
        this._timed = null
        if (err) {
          console.log('wifi connection error', err)
          wifi.emit('disconnected')
        }
      })
    }
  }


  report (sec) {
    if (sec && sec>0) {
      this.reporter = setInterval(this.log,sec*1000)
    }
    else {
      if (this.reporter) clearInterval(reporter)
    }
  }

  async nslookup(name) {
    if (isIP(name)) return name
    let [err,ip] = await to(this._getHostByName(name))
    if (err)  return null
    else return ip
  }

  async ping (name) {
    if (!name) return null
    // console.log('pinging', name, this._pingIP)
    let [err,res] = await to(isIP(name) ? this._pingIP(name) : this._pingHost({address:name}))
    if (err)  {
      console.log('ping error',err)
      return null
    }
    else return isIP(name) ? res.respTime : res.avg
  }
}

export {Wifi}
export default Wifi
