/**
 * How to implement Abstract Factory?
 *
 * 1. Declare base products classes/interfaces for each product
 *  in the catalog.
 *
 * Base products:
 *  - MastodonCar
 *  - RhinoCar
 *
 * 2. Implement concrete products classes that inherits/implements
 *  base products classes/interfaces, the number of concrete prodcuts
 *  will depend on the number of families.
 *
 * Concrete products:
 *  - MastodonSedanCar
 *  - MastodonHatchbackCar
 *  - RhinoSedanCar
 *  - RhinoHatchbackCar
 *
 * 3. Declare abstract factory class/interface that declare creation
 *  methods for each base product. The return value could be the base
 *  products types or concrete products types.
 *
 * Abstract Factory:
 *   - CarFactory
 *      * createMastodonCar(): MastodonCar
 *      * createRhinoCar(): RhinoCar
 *
 * 4. Create concrete factories that implements/inherits from the
 *  abstract factory behaviour and implements all the products creation
 *  methods. The number of concrete factories will depend of the number
 *  of product families.
 *
 * Concrete Factories:
 *  - SedanCarFactory
 *  - HatchbackCarFactory
 *
 */

// STEP 1
interface MastodonCar {
  useGPS(): void
}

interface RhinoCar {
  useGPS(): void
}

// STEP 2
class MastodonSedanCar implements MastodonCar {
  useGPS(): void {
    console.log('[SEDAN] Mastodon GPS')
  }
}

class MastodonHatchbackCar implements MastodonCar {
  useGPS(): void {
    console.log('[HATCHBACK] Mastodon GPS')
  }
}

class RhinoSedanCar implements RhinoCar {
  useGPS(): void {
    console.log('[SEDAN] Rhino GPS')
  }
}

class RhinoHatchbackCar implements RhinoCar {
  useGPS() {
    console.log('[HATCHBACK] Rhino GPS')
  }
}

// STEP 3
interface CarAbstractFactory {
  createMastodon(): MastodonCar
  createRhino(): RhinoCar
}

// STEP 4
class SedanCarFactory implements CarAbstractFactory {
  createMastodon(): MastodonCar {
    return new MastodonSedanCar()
  }

  createRhino(): RhinoCar {
    return new RhinoSedanCar()
  }
}

class HatchbackCarFactory implements CarAbstractFactory {
  createMastodon(): MastodonCar {
    return new MastodonHatchbackCar()
  }

  createRhino(): RhinoCar {
    return new RhinoHatchbackCar()
  }
}

function appCarFactory(factory: CarAbstractFactory) {
  console.log('--- [TS] Calling appAbstractFactory ---\n')
  if (!factory) {
    console.log('--- No factory provided ---')
    return
  }

  const mastodon: MastodonCar = factory.createMastodon()
  const rhino: RhinoCar = factory.createRhino()

  mastodon.useGPS()
  rhino.useGPS()
}

/**
 * You could change the Factory as you wish since
 * all of them implement the same behaviour.
 */
appCarFactory(new HatchbackCarFactory())
appCarFactory(new SedanCarFactory())

type FactoryType = 'sedan' | 'hatchback'
function createFactory(type: FactoryType): CarAbstractFactory {
  const factories = {
    sedan: SedanCarFactory,
    hatchback: HatchbackCarFactory,
  }

  const Factory = factories[type]
  return new Factory()
}

/**
 * Instead of using new() operator, we abstract the
 * factories creation and we just indicate the type
 * as a parameter
 */
appCarFactory(createFactory('hatchback'))
appCarFactory(createFactory('sedan'))

export {}
