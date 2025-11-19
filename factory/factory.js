/**
 * How to implement Factory Method?
 *
 * 1. Declare base product class/interface, this will be returned by
 *  factory class and their sub classes.
 *
 * Base product:
 *  - BaseCar
 *
 * 2. Implement concrete products sub classes that inherits/implements
 *  the base product class/interface.
 *
 * Concrete products:
 *  - MastodonCar
 *  - RhinoCar
 *
 * 3. Declare base factory class/interface that returns objects that match
 *  the base product, not the concrete ones.
 *
 * Base factory:
 *  - CarFactory
 *
 * 4. Implement concrete factories sub classes that inherits/implements
 *  the base factory class/interface. These classes will return concrete
 *  products in their factory method.
 *
 * Concrete factories:
 *  - MastodonCarFactory
 *  - RhinoCarFactory
 *
 */

// STEP 1
class BaseCar {
  showCost() {
    throw new Error('Method not implemented!')
  }
}

// STEP 2
class MastodonCar extends BaseCar {
  showCost() {
    console.log('[MASTODON] Car Cost: 300,000 MXN')
  }
}

class RhinoCar extends BaseCar {
  showCost() {
    console.log('[RHINO] Car Cost: 100,000 MXN')
  }
}

// STEP 3
class CarFactory {
  makeCar() {
    throw new Error('Method not implemented!')
  }
}

// STEP 4
class MastodonCarFactory extends CarFactory {
  makeCar() {
    return new MastodonCar()
  }
}

class RhinoCarFactory extends CarFactory {
  makeCar() {
    return new RhinoCar()
  }
}

function appFactory(factory) {
  if (!factory) {
    console.log('--- No factory provided ---')
    return
  }

  const car = factory.makeCar()
  car.showCost()
}

appFactory(new MastodonCarFactory())
appFactory(new RhinoCarFactory())

function createFactory(type) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  }

  const FactoryClass = factories[type]
  return new FactoryClass()
}

/**
 * Instead of using new() operator, we abstract the
 * factories creation and we just indicate the type
 * as a parameter
 */
appFactory(createFactory('mastodon'))
appFactory(createFactory('rhino'))
