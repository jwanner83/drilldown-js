import DrilldownOptions from './DrilldownOptions'

export default class Drilldown {
  /**
   * The root of the drilldown
   *
   * @type {HTMLElement}
   * @private
   */
  private readonly root: HTMLElement

  /**
   * The drilldown options object
   *
   * @type {DrilldownOptions}
   * @private
   */
  private readonly options: DrilldownOptions

  /**
   * Constructor which needs the root drilldown element and the options
   *
   * @param {HTMLElement} root
   * @param options
   */
  constructor (root: HTMLElement, options: any = null) {
    this.root = root
    this.options = DrilldownOptions.getOptions(options)

    this.setLevel(Array.from(this.root.querySelectorAll(`.${this.options.subClass}:not(.${this.options.subClass} .${this.options.subClass})`)))

    this.initiate()
  }

  /**
   * Drill up from the current sub navigation
   * @param {HTMLElement} currentSub
   */
  public up (currentSub: HTMLElement): void {
    // remove active class after transition to avoid visual bug
    this.root.addEventListener('transitionend', (): void => {
      currentSub.classList.remove(this.options.subActiveClass)
    }, { once: true })

    if (currentSub.dataset.drilldownLevel) {
      this.root.style.marginLeft = (Number.parseInt(currentSub.dataset.drilldownLevel) - 1) * 100 * -1 + '%'
    } else {
      this.root.style.marginLeft = '0%'
    }

    let height: string = 'auto'

    const parentSub: HTMLElement = this.getParentSub(currentSub)
    if (parentSub) {
      height = parentSub.offsetHeight + 'px'
    }

    this.root.style.height = height
  }

  /**
   * Drill down to the specific sub
   * @param {HTMLElement} sub
   */
  public down (sub: HTMLElement): void {
    sub.classList.add(this.options.subActiveClass)

    const level: number = Number.parseInt(sub.dataset.drilldownLevel)
    if (level > 1) {
      let currentSub: HTMLElement = sub

      // make sure all parent subs have the active class as well
      new Array(level - 1).fill(0).forEach(i => {
        const parentSub: HTMLElement = this.getParentSub(currentSub)

        if (parentSub) {
          parentSub.classList.add(this.options.subActiveClass)
          currentSub = parentSub
        }
      })
    }

    this.root.style.marginLeft = level * 100 * -1 + '%'

    if (sub) {
      this.root.style.height = sub.offsetHeight + 'px'
    }
  }

  /**
   * Activate the script after it has been deactivated
   */
  public activate (): void {
    this.options.deactivated = false
  }

  /**
   * Deactivate the script after it has been activated
   */
  public deactivate (): void {
    this.options.deactivated = true
  }

  /**
   * Destroy the drilldown.
   * Calling the reset method after destroying it will re-initiate the script
   */
  public destroy (): void {
    this.deactivate()

    this.root.style.transition = ''

    requestAnimationFrame((): void => {
      this.root.style.marginLeft = ''
      this.root.style.height = ''

      this.hideAllSubs()
    })
  }

  /**
   * Reset the drilldown to its initial position
   * @param {boolean} activate
   */
  public reset (activate: boolean = true): void {
    this.root.style.transition = ''

    requestAnimationFrame((): void => {
      this.root.style.marginLeft = ''
      this.root.style.height = ''

      this.hideAllSubs()

      requestAnimationFrame((): void => {
        this.initiate(false)

        activate && this.activate()
      })
    })
  }

  /**
   * Initialize the drilldown
   * @param {boolean} initializeEventListeners
   * @private
   */
  private initiate (initializeEventListeners: boolean = true) {
    // get all parent elements and activate the event listener
    const parents: Array<HTMLElement> = Array.from(this.root.querySelectorAll(`.${this.options.parentClass}`))
    parents.forEach(parent => {
      const sub: HTMLElement = parent.nextElementSibling as HTMLElement

      if (!sub || !sub.classList.contains(this.options.subClass)) {
        return
      }

      if (initializeEventListeners) {
        parent.addEventListener('click', (): void => {
          if (!this.options.deactivated) {
            this.down(sub)
          }
        })
      }

      // if the sub navigation of the parent contains a `data-drilldown-active` attribute, use it as starting point
      if ((parent.nextElementSibling as HTMLElement).dataset.drilldownActive !== undefined) {
        this.down(sub)
      }
    })

    if (initializeEventListeners) {
      // get all back elements and activate the event listener
      const backs: Array<HTMLElement> = Array.from(this.root.querySelectorAll(`.${this.options.backClass}`))
      backs.forEach((back: HTMLElement): void => {
        back.addEventListener('click', (): void => {
          if (!this.options.deactivated) {
            this.up(back.parentElement)
          }
        })
      })
    }

    // set the transition after the starting point has been set to avoid ugly visual bugs
    this.root.style.transition = this.options.speed + 'ms margin-left'
  }

  /**
   * Remove all active classes from all subs
   * @private
   */
  private hideAllSubs () {
    Array.from(this.root.querySelectorAll(`.${this.options.subClass}`)).forEach((sub: HTMLElement) => sub.classList.remove(this.options.subActiveClass))
  }

  /**
   * Get the parent sub from the given one
   *
   * @param {HTMLElement} sub
   * @returns {HTMLElement}
   * @private
   */
  private getParentSub (sub: HTMLElement) {
    const parentSub: HTMLElement = sub.closest(this.options.subClass)

    // if the parent sub is the root, th
    if (parentSub && parentSub === this.root) {
      return null
    }

    return parentSub
  }

  /**
   * Set the `data-drilldown-level` attributes for the sub navigations
   *
   * @param {Array<HTMLElement>} elements
   * @param {number} level
   * @private
   */
  private setLevel (elements: Array<HTMLElement>, level: number = 1) {
    elements.forEach(element => {
      element.dataset.drilldownLevel = level.toString()

      // select all sub navigations on one level. If level is 2 for example
      // item 1
      // -- item 2 (<- selected)
      // --- item 3
      // item 4
      // -- item 5 (<- selected)
      const not: Array<string> = new Array<string>(level + 2).fill(`.${this.options.subClass}`)
      const selector: string = `.${this.options.subClass}:not(${not.join(' ')})`

      this.setLevel(Array.from(element.querySelectorAll(selector)), level + 1)
    })
  }
}