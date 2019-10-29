import EventEmitter from 'wolfy87-eventemitter'
export default class Renderer extends EventEmitter {
  constructor (myCtx) {
    super()
    const self = this
    self.ctx = myCtx
    self.style = {} // just mock
    // self._initContext(myCtx);
  }

  getContext (type) {
    if (type === '2d') {
      return this.ctx
    }
  }
}
