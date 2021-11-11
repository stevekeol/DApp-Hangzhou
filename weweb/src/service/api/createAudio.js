import './bridge'
import emitter from 'emitter'
import configFlags from './configFlags'

function createAudio (e, t) {
  var self = this,
    audioObj = new Audio(e, t)
  audioObj._getAppStatus = function () {
    return self.appStatus
  }
  audioObj._getHanged = function () {
    return self.hanged
  }
  this.onAppEnterBackground(function () {
    audioObj.pause()
  })
  return audioObj
}

var audioFlags = {},
  eventBus = new emitter()

ServiceJSBridge.subscribe('audioInsert', function (params, webviewId) {
  var audioId = params.audioId
  audioFlags[webviewId + '_' + audioId] = !0
  eventBus.emit('audioInsert_' + webviewId + '_' + audioId)
})

class Audio {
  constructor (audioId, webviewId) {
    if (typeof audioId !== 'string') {
      throw new Error('audioId should be a String')
    }
    this.audioId = audioId
    this.webviewId = webviewId
  }

  setSrc (data) {
    this._sendAction({
      method: 'setSrc',
      data: data
    })
  }

  play () {
    var status = this._getAppStatus()
    this._getHanged()
    status === configFlags.AppStatus.BACK_GROUND ||
      this._sendAction({
        method: 'play'
      })
  }

  pause () {
    this._sendAction({
      method: 'pause'
    })
  }

  seek (data) {
    this._sendAction({
      method: 'setCurrentTime',
      data: data
    })
  }

  _ready (fn) {
    audioFlags[this.webviewId + '_' + this.audioId]
      ? fn()
      : eventBus.on(
        'audioInsert_' + this.webviewId + '_' + this.audioId,
        function () {
          fn()
        }
      )
  }

  _sendAction (params) {
    var self = this
    this._ready(function () {
      ServiceJSBridge.publish(
        'audio_' + self.audioId + '_actionChanged',
        params,
        [self.webviewId]
      )
    })
  }
}

export default createAudio
