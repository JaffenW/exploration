const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  _status = PENDING
  constructor(fn) {
    this.success_callback = []
    this.fail_callback = []
    this.status = PENDING
    this.data = undefined
    this.err = undefined

    try {
      fn(MyPromise.resolve.bind(this), MyPromise.reject.bind(this))
    } catch (e) {
      MyPromise.reject.call(this, e)
    }
  }

  static resolve(data) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.data = data
    }
  }

  static reject(err) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.err = err
    }
  }

  then(successCallback, failCallback) {
    const onFulfilled = typeof successCallback === 'function' ? successCallback : value => value
    const onRejected = typeof failCallback === 'function' ? failCallback : (err) => { throw err }

    const promise2 = new MyPromise((resolve, reject) => {
      switch (this.status) {
        case PENDING:
          this.fail_callback.push(onRejected)
          this.success_callback.push(onFulfilled())
          break
        case FULFILLED:
          onFulfilled(this.data)
          break
        case REJECTED:
          onRejected(this.err)
          break
      }
    })

    return promise2
  }

  get status () {
    return this._status
  }

  set status (newStatus) {
    this._status = newStatus
    if (newStatus === FULFILLED) {
      this.success_callback.forEach(fn => {
        fn(this.data)
      })
    } else if (newStatus === REJECTED) {
      this.fail_callback.forEach(fn => {
        fn(this.err)
      })
    }
  }
}