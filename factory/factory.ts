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
interface BaseCar {
  showCost(): void
}

// STEP 2
class MastodonCar implements BaseCar {
  showCost(): void {
    console.log('[MASTODON] Car Cost: 300,000 MXN')
  }
}

class RhinoCar implements BaseCar {
  showCost(): void {
    console.log('[RHINO] Car Cost: 100,000 MXN')
  }
}

// STEP 3
interface CarFactory {
  makeCar(): BaseCar
}

// STEP 4
class MastodonCarFactory implements CarFactory {
  makeCar(): BaseCar {
    return new MastodonCar()
  }
}

class RhinoCarFactory implements CarFactory {
  makeCar(): BaseCar {
    return new RhinoCar()
  }
}

function appFactory(factory: CarFactory) {
  console.log('--- [TS] Calling appFactory ---\n')
  if (!factory) {
    console.log('--- No factory provided ---')
    return
  }

  const car: BaseCar = factory.makeCar()
  car.showCost()
}

/**
 * We could change the kind of factory to use
 * since all of them implement the same behaviour.
 */
appFactory(new MastodonCarFactory())
appFactory(new RhinoCarFactory())

type FactoryType = 'mastodon' | 'rhino'
function createFactory(type: FactoryType) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  }

  const FactoryClass = factories[type]
  return new FactoryClass()
}

/**
 * Instead of using new() operator, we abstract the
 * factories creation and we just indicate the name
 */
appFactory(createFactory('mastodon'))
appFactory(createFactory('rhino'))

export {}
