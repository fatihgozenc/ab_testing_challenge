import puppeteer, { Page } from "puppeteer";

type Kameleoon = {
  API: {
    CurrentVisit:{
      customData: {
        Piano: string[]
      }
    }
  }
}

declare global {
  interface Window {
    Kameleoon: Kameleoon,
    cX: {
      getUserSegmentIds: ({}) => {},
      persistedQueryIdValue: string
    },
  }
}

class FrequencyChecker {
 
  constructor(public domain:string | null){
    this.domain = domain
  }
  
  getFrequencyTypeSegment = async (domain:string):Promise<string> => {
    // Testing suite runs one instance of Puppeteer in test script
    // To use it standalone, puppeteer needs to be initialized in the next 3 lines

    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto(domain, {waitUntil: 'networkidle2'})

    let piano, frequency;
    let kameleoon = await this.getKameleoon(page)
    // Kameleoon object exists
    if(typeof(kameleoon) === 'object'){
      piano = kameleoon.API.CurrentVisit.customData.Piano
      frequency = piano.filter(e => e.includes('frequency'))
      return frequency.toString()
    } else {
      // Else populate it then check again
      await this.populateKameleoon(page)
      let populatedKameleoon = await this.getKameleoon(page)
      if(typeof(populatedKameleoon) === 'object'){
        piano = populatedKameleoon.API.CurrentVisit.customData.Piano
        frequency = piano.filter(e => e.includes('frequency'))
        return frequency.toString()
      } else {
        throw new Error("Piano couldn't populated")
      }
    }
  }

  isFrequencyTypeSegment = async (domain:string, segmentID:string):Promise<boolean> => {
    // Testing suite runs one instance of Puppeteer in test script
    // To use it standalone, puppeteer needs to be initialized in the next 3 lines

    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto(domain, {waitUntil: 'networkidle2'})

    let kameleoon = await this.getKameleoon(page)
    // If Piano in Kameleoon object exists
    if(typeof(kameleoon) === 'object'){
      return this.frequencyTypeExists(
        kameleoon.API.CurrentVisit.customData.Piano,
        segmentID
      )
    } else {
      // Else populate it then check again
      await this.populateKameleoon(page)
      let populatedKameleoon = await this.getKameleoon(page)
      if(typeof(populatedKameleoon) === 'object'){
        return this.frequencyTypeExists(
          populatedKameleoon.API.CurrentVisit.customData.Piano,
          segmentID
        )
      } else {
        return false
      }
    }
  }

  private getKameleoon = async (page:Page):Promise<Kameleoon | boolean> => {
    const kameleoon:Kameleoon = await page.evaluate(async () => {
      return await new Promise<Kameleoon>((resolve) => {
        resolve(window.Kameleoon);
      })
    })
    // If Kameleoon.API.CurrentVisit.customData.Piano exists
    if(this.checkNested(
      kameleoon, 
      'API.CurrentVisit.customData.Piano'
    )) return kameleoon
    else 
      return false
  }

  private populateKameleoon = async (page:Page):Promise<void> => {
    await page.evaluate(() => {
      window.cX.getUserSegmentIds({
        persistedQueryId: window.cX.persistedQueryIdValue
      })
    })
  }

  private checkNested = (obj:any, path:string):{} => {
    return !!path.split('.').reduce((obj, prop) => {
      return obj && obj[prop] ? obj[prop] : undefined;
    }, obj)
  }

  private frequencyTypeExists = (piano:string[], segmentID:string):boolean => {
    if(piano.indexOf(segmentID) === 0)
      return true
    else 
      return false
  }

};

module.exports = FrequencyChecker