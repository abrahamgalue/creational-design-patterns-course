/**
 * How to implement a Singleton?
 *
 * 1. Make the constructor private
 * 2. Create a static method who calls the private
 *   constructor and save the instance in a static variable
 */

class Singleton {
  static instance = undefined

  constructor(version) {
    this.version = version
  }

  static getInstance(version) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(version)
    }

    return Singleton.instance
  }
}

function appSingleton() {
  const singleton1 = Singleton.getInstance('v-1')
  const singleton2 = Singleton.getInstance('v-2')
  const singleton3 = Singleton.getInstance('v-3')

  console.log(singleton1 === singleton2)
  console.log(singleton1 === singleton3)
}

appSingleton()
