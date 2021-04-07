export default class DrilldownOptions {
  /**
   * The speed of the transition
   * @type {number}
   */
  public speed: number = 100

  /**
   * The class of the parent element
   * @type {string}
   */
  public parentClass: string = 'drilldown__parent'

  /**
   * The class of the back button element
   * @type {string}
   */
  public backClass: string = 'drilldown__back'

  /**
   * The class of the sub navigation element
   * @type {string}
   */
  public subClass: string = 'drilldown__sub'

  /**
   * The class of the active sub navigation element
   * @type {string}
   */
  public subActiveClass: string = 'drilldown__sub--active'

  /**
   * Get a options object with the given values out of an object
   *
   * @param customOptions
   * @returns {DrilldownOptions}
   */
  public static getOptions (customOptions: any): DrilldownOptions {
    const options = new DrilldownOptions()

    if (customOptions) {
      for (const property in options) {
        if (Object.prototype.hasOwnProperty.call(options, property) && customOptions[property] !== undefined) {
          options[property] = customOptions[property]
        }
      }
    }

    return options
  }
}