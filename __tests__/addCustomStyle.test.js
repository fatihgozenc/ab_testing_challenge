const path = require('path')
const testPage = `file:${path.join(__dirname, 'test.html')}`

beforeEach(async () => {
  await page.goto(testPage, {waitUntil: 'domcontentloaded'});
  await page.addScriptTag({
    path: `${path.join(__dirname, '../dist/addCustomStyle.js')}`
  });
});

describe('Styler', () => {

  it('Page loaded correctly and should be titled "Test"', async () => {
    await expect(page.title()).resolves.toMatch('Test');
  });
  
  it('Inserts style tag with given ID', async () => {
    await page.evaluate(() => {
      const styler = new Styler()
      styler.addCustomStyle(
        'testId', 
        'body', 
        '{background-color: rgb(255, 0, 0)}'
      )
    })
    const insertedTagId = await page.$eval('#testId', e => e.id)
    expect(insertedTagId).toBe(`testId`)
  })

  it('Inserts style attributes correctly', async () => {
    await page.evaluate(() => {
      const styler = new Styler()
      styler.addCustomStyle(
        'testId', 
        'body', 
        '{background-color: rgb(255, 0, 0)}'
      )
    })
    const insertedTagContent = await page.$eval('#testId', e => e.innerText)
    expect(insertedTagContent).toBe(`body{background-color: rgb(255, 0, 0)}`)
  })

  it('Inserted attributes work correctly', async () => {
    await page.evaluate(() => {
      const styler = new Styler()
      styler.addCustomStyle(
        'testId', 
        'body',`{
          background-color: rgb(255, 0, 0); 
          margin: 20px; 
          display: flex;
        }`)
    })
    const insertedAttributes = await page.$eval('body', e => [
      getComputedStyle(e).backgroundColor, 
      getComputedStyle(e).margin,
      getComputedStyle(e).display
    ])
    expect(insertedAttributes[0]).toBe(`rgb(255, 0, 0)`)
    expect(insertedAttributes[1]).toBe(`20px`)
    expect(insertedAttributes[2]).toBe(`flex`)
  })

  it('Validates attributes correctly', async () => {
    try {
      await page.evaluate(() => {
        const styler = new Styler()
          styler.addCustomStyle(
            'testId', 
            'body', 
            `{
              background-color: red;
              margin: random;
            }`
          )
      })
    } catch (err){
      expect(err.message)
        .toMatch(`margin: random isn't valid.`)
    }
  })
  
  it('Inserts style tag with given mediaQuery', async () => {
    await page.evaluate(() => {
      const styler = new Styler()
      styler.addCustomStyle(
        'testId', 
        'body', 
        '{background-color: rgb(255, 0, 0)}',
        'max-width: 768px'
      )
    })
    const insertedTagId = await page.$eval('#testId', e => e.innerText)
    expect(insertedTagId).toBe(`@media (max-width: 768px){body{background-color: rgb(255, 0, 0)}}`)
  })

  it('Inserted mediaQuery works correctly', async () => {
    await page.evaluate(() => {
      const styler = new Styler()
      styler.addCustomStyle(
        'testId', 
        'body', 
        '{background-color: rgb(255, 0, 0)}',
        'min-width: 1400px'
      )
    })
    const insertedAttribute = await page.$eval('body', e => [
      getComputedStyle(e).backgroundColor, 
    ])
    expect(insertedAttribute).not.toBe(`rgb(255, 0, 0)`)
  })
  
})