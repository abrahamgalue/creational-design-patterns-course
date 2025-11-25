/**
 * How to implement Builder
 *
 * 1. Declare base builder base class/interface who will define
 *  the general steps for build products, each builder must
 *  implement functionality for these steps.
 *
 * Base builder:
 *  - CarProductionLine
 *
 * Build steps:
 *  - setAirBags
 *  - setColor
 *  - setEdition
 *  - resetProductionLine
 *
 * 2. Implement concrete builders subclasses that offer different
 *  versions of the build steps. These builders could create
 *  concrete products or base ones. Depends on what we need.
 *
 *  SedanProductionLine: build() -> {Mastodon|Rhino}Car | Car
 *  RhinoProductionLine: build() -> {Mastodon|Rhino}Car | Car
 *
 * 3. Implement Product classes, these ones could not inherit/implement
 *  from base class/interface.
 *
 *  For the problem we will make the builder returns the
 *  product base class.
 *
 *  Base product:
 *    - BaseCar
 *
 *  Concrete products:
 *    - MastodonSedanCar
 *    - RhinoSedanCar
 *
 * 4. Implement director class, this one will know the build
 *  process for each product, so we can create specific
 *  configurations for the products.
 *
 *  Product representations
 *      constructCvtEdition
 *      constructSignatureEdition
 */

// STEP 1
class CarProductionLine {
  /**
   * @param {number} howMany number of airbags to be set to car
   */
  setAirBags(howMany) {
    throw new Error('Method not implemented!');
  }

  /**
   * @param {string} color color to be set to car
   */
  setColor(color) {
    throw new Error('Method not implemented!');
  }

  /**
   * @param {string} edition sedan edition to be set to car
   */
  setEdition(edition) {
    throw new Error('Method not implemented!');
  }

  /**
   * Emulates how the production line receives a new
   * car to work.
   */
  resetProductionLine() {
    throw new Error('Method not implemented!');
  }
}

// STEP 2
class SedanProductionLine extends CarProductionLine {
  /**
   * For now the production line class is composed (creating) by the
   * different sedan car models. Ideally the line should receive the
   * sedan car instance as param, an aggregation relationship.
   *
   * @param {string} modelToCustomizeInLine car model to customize in the line
   */
  constructor({ modelToCustomizeInLine }) {
    super();
    this.setModelToBuild(modelToCustomizeInLine);
    this.resetProductionLine();
  }

  /**
   * @override setAirBags() method
   * @param {number} howMany airbags number
   * @returns {SedanProductionLine} production line working instance
   */
  setAirBags(howMany) {
    this.sedanCar.airBags = howMany;
    return this;
  }

  /**
   * @override setColor() method
   * @param {string} color car color
   * @returns {SedanProductionLine} production line working instance
   */
  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  /**
   * @override setEdition() method
   * @param {string} edition car edition
   * @returns {SedanProductionLine} production line working instance
   */
  setEdition(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  /**
   * @param {string} model car model to be build in line
   */
  setModelToBuild(model) {
    this.modelToCustomizeInLine = model;
  }

  /**
   * Emulates how the production line receives a new
   * sedan car to be customized for match the desired editions.
   */
  resetProductionLine() {
    this.sedanCar =
      this.modelToCustomizeInLine === 'mastodon'
        ? new MastodonSedanCar()
        : new RhinoSedanCar();
  }

  /**
   * Restart production line and returns customized sedan car instance
   * @returns {MastodonSedanCar | RhinoSedanCar} sedan car instance
   */
  build() {
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

// STEP 3
class BaseCar {
  constructor() {
    this._edition = '';
    this._model = '';
    this._airBags = 2;
    this._color = 'black';
  }

  /**
   * Base car airBags attribute setter
   * @param {number} howMany airbags number
   */
  set airBags(howMany) {
    this._airBags = howMany;
  }

  /**
   * Base car color attribute setter
   * @param {string} color car color
   */
  set color(color) {
    this._color = color;
  }

  /**
   * Base car edition attribute setter
   * @param {string} edition car edition
   */
  set edition(edition) {
    this._edition = edition;
  }

  /**
   * Base car model attribute setter
   * @param {string} model car model (sedan/hatchback)
   */
  set model(model) {
    this._model = model;
  }
}

class MastodonSedanCar extends BaseCar {
  constructor() {
    super();
    this.model = 'sedan';
  }
}

class RhinoSedanCar extends BaseCar {
  constructor() {
    super();
    this.model = 'sedan';
  }
}

// STEP 4
class Director {
  /**
   * Set the production line to be used for the director to build editions
   * @param {CarProductionLine} productionLine contains concrete customization steps implementation
   */
  setProductionLine(productionLine) {
    this.productionLine = productionLine;
  }
  
  constructCvtEdition() {
    this.productionLine
      .setAirBags(4)
      .setColor('blue')
      .setEdition('cvt');
  }

  constructSignatureEdition() {
    this.productionLine
      .setAirBags(8)
      .setColor('red')
      .setEdition('signature');
  }
}

function appBuilder(director) {
  console.log('--- [JS] Calling appBuilder ---\n');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  const mastodonSedanProductionLine = new SedanProductionLine({
    modelToCustomizeInLine: 'mastodon',
  });

  director.setProductionLine(mastodonSedanProductionLine);

  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan CVT ---\n');
  console.log(mastodonSedanCvt);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log('\n--- Mastodon Sedan Signature ---\n');
  console.log(mastodonSedanSignature);
}

appBuilder(new Director());