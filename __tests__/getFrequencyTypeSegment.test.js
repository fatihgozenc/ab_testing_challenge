const FrequencyChecker = require('../dist/getFrequencyTypeSegment')
const path = require('path')
const windowScripts = require('../utils/windowScripts')

const testPage = `file:${path.join(__dirname, 'test.html')}`
let frequencyChecker, frequency;

beforeEach(async () => {
  await page.goto(testPage, {waitUntil: 'domcontentloaded'});
  // Adds cx object upfront for emulation
  await page.addScriptTag({content: windowScripts.cxScript});
  frequencyChecker = new FrequencyChecker()
});

describe('FrequencyChecker', () => {

  it('Page with segment ids returns frequencyTypeSegment correctly', async () => {
    // Adds kameleoon object upfront for emulation
    await page.addScriptTag({content: windowScripts.kameleoonScript('highfrequencyUser')});
    frequency = await frequencyChecker.getFrequencyTypeSegment(testPage)
    expect(frequency).toBe('highfrequencyUser');
  });

  it('Page without segment ids populates and returns frequencyTypeSegment correctly', async () => {
    frequency = await frequencyChecker.getFrequencyTypeSegment(testPage)
    expect(frequency).toBe('lowfrequencyUser');
  });

  it('Checks page if its FrequencyTypeSegment matches with given parameter', async () => {
    // Adds kameleoon object upfront for emulation
    await page.addScriptTag({content: windowScripts.kameleoonScript('highfrequencyUser')});
    let frequency = await frequencyChecker.isFrequencyTypeSegment(testPage, 'highfrequencyUser')
    expect(frequency).toBe(true);
  });

  it('Checks page if its FrequencyTypeSegment not matches with given parameter', async () => {
    // Adds kameleoon object upfront for emulation
    await page.addScriptTag({content: windowScripts.kameleoonScript('lowfrequencyUser')});
    let frequency = await frequencyChecker.isFrequencyTypeSegment(testPage, 'highfrequencyUser')
    expect(frequency).toBe(false);
  })

  it('Checks page without segment ids, if its FrequencyTypeSegment matches with given parameter', async () => {
    let frequency = await frequencyChecker.isFrequencyTypeSegment(testPage, 'lowfrequencyUser')
    expect(frequency).toBe(true);
  });

  it('Checks page without segment ids, if its FrequencyTypeSegment not matches with given parameter', async () => {
    let frequency = await frequencyChecker.isFrequencyTypeSegment(testPage, 'highfrequencyUser')
    expect(frequency).toBe(false);
  });
  
})