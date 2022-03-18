module.exports = {
  /**
   * getRating(str)
   *
   * Extracts a product rating as a number, from a string in the format of "4.1 out of 5 stars"
   *
   * @param {string} str - string containing a product rating
   *
   * @return {number|null} - returns extracted product rating 4.5 (number) or null if the rating cannot be extracted
   *
   */
  getRating: (str) => Number(str?.split(' ')?.[0]) || null,

  /**
   * evalText(page, node = null, selector = null, inner = false)
   *
   * Retrieves the value of a given element retrieved by selector
   *
   * @param {object} page - Puppeteer page instance
   * @param {object|null} [node=null] - ElementHandle instance of current node in scope
   * @param {string|null} [selector=null] - CSS selector for an element contained within the supplied Node
   * @param {boolean|null} [inner=false] - Set this to true to return innerText rather than textContent
   * @param {boolean|null} [xpath=false] - Set this to true if the selector is xpath, rather than CSS
   *
   * @return {string|null} The text content of the element found else null
   */
  evalText: async (
    page, node = null, selector = null, inner = false, xpath = false,
  ) => {
    const el = await module.exports.buildSelector(page, node, selector, xpath);
    if (el) {
      /* istanbul ignore next */ return page.evaluate((n, i) => (
        (i ? (n.innerText.trim()) : (n.textContent.trim()) || null)
      ), el, inner);
    }
    return null;
  },

  /**
   * evalAttribute(page, node = null, attribute = null, selector = null)
   *
   * Retrieves the value of a given attribute from a given selector
   *
   * @param {object} page - Puppeteer page instance
   * @param {object|null} [node=null] - ElementHandle instance of current node in scope
   * @param {string|null} [attribute=null] - Element attribute to retrieve value of
   * @param {string|null} [selector=null] - CSS selector for an element contained within the supplied Node
   * @param {boolean|null} [xpath=false] - Set this to true if the selector is xpath, rather than CSS
   *
   * @return {string|null} String if attribute value found else null
   *
   */
  evalAttribute: async (
    page, node = null, attribute = null, selector = null, xpath = false,
  ) => {
    const el = await module.exports.buildSelector(page, node, selector, xpath);
    if (el) {
      /* istanbul ignore next */ return page.evaluate((n, a) => {
        if (a) return n.getAttribute(a) ? n.getAttribute(a).trim() : null;
        return n.textContent ? n.textContent.trim() : null;
      }, el, attribute);
    }
    return null;
  },

  /**
   * evalLink(page, node = null, selector = null)
   *
   * Retrieves the href of an element from a given selector
   *
   * @param {object} page - Puppeteer page instance
   * @param {object|null} [node=null] - ElementHandle instance of current node in scope
   * @param {string|null} [selector=null] - CSS selector for an element contained within the supplied Node
   *
   * @return {string|null} String if link value found else null
   *
   */
  evalLink: async (
    page, node = null, selector = null,
  ) => module.exports.evalAttribute(page, node, 'href', selector),

  buildSelector: async (page, node, selector, xpath = false) => {
    try {
      if (page?.constructor?.name !== 'Page') return null; // check for a puppeteer page instance
      let el = node;
      if (module.exports.isString(node)) {
        // if "node" is a string (i.e. CSS or xpath selector), try and convert it to a node
        el = xpath ? (await page.$x(node))[0] : await page.$(node); // check if "node" is a xpath/css selector
      }
      if (el?.constructor?.name !== 'ElementHandle' && module.exports.isString(selector)) {
        // if we don't have a "node", but we have a "selector"
        el = xpath ? (await page.$x(selector))[0] : await page.$(selector);
      } else if (el?.constructor?.name === 'ElementHandle' && module.exports.isString(selector)) {
        // if we have a "node" and a "selector"
        // if it's an xpath selector, check if the first character is a full-stop, if not prepend it
        // (otherwise the selector in this case won't behave as expected)
        const sel = xpath && selector.charAt(0) !== '.' ? `.${selector}` : selector;
        el = xpath ? (await el.$x(sel))[0] : await el.$(sel);
      }
      return el || null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return null;
    }
  },

  isString: (str) => Object.prototype.toString.call(str) === '[object String]',
};
