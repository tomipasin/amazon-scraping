const { expect } = require('chai');
const utils = require('./utils');

describe('Utils', () => {
  it('getRating', () => {
    expect(utils.getRating('4.5 out of 5 stars')).to.equal(4.5);
    expect(utils.getRating('14.1 out of 5 stars')).not.to.equal(4.1); 
    expect(utils.getRating('0 out of 5 stars')).not.to.equal(0);
    expect(utils.getRating(' ')).to.equal(null);
  });
});
