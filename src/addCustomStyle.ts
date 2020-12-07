class Styler {

  constructor(public styleId:string | null){
    this.styleId = styleId
  }

  private isSelectorValid(selector:any):boolean {
    try { 
      document.createDocumentFragment()
        .querySelector(selector)
    } catch { 
      throw new Error("You need to pass a valid CSS selector.");
    }
    return true
  }

  private isAttributeValid(attribute:string, value:string):boolean{
    if(CSS.supports((attribute.trim()), value.trim())){
      return true
    } else {
      throw new Error(
        `${attribute.trim()}: ${value.trim()} isn't valid. Please pass valid CSS string.`);
    }
  }

  private isAttributesArrayValid(attributesArray:string[]):void{
    attributesArray.map(attr => attr.split(":")).map(keyAndValue => 
      this.isAttributeValid(keyAndValue[0], keyAndValue[1])
    )
  }

  private areAttributesValid(attributes:string):boolean {
    // Removes curly braces
    attributes = attributes.replace(/[{}]/g, "")
    // If attributes string has ';' char
    if(attributes.includes(";")){
      // Splits into attribute:value chunks
      // Filters empty values because of repeated semi-colons
      let attributesArray:string[] = attributes
                          .split(";")
                          .map(el => el.trim())
                          .filter(attrs => attrs !== "")
      this.isAttributesArrayValid(attributesArray)
    } else {
      // One attribute
      let keyAndValue:string[] = attributes.split(":")
      this.isAttributeValid(keyAndValue[0], keyAndValue[1])
    }
    return true
  }

  addCustomStyle = (
    styleidentifier: string,
    selector: string,
    attributes: any,
    mediaQuery?: string
  ):void => {
    if(this.isSelectorValid(selector) && this.areAttributesValid(attributes.toString())){
      const body = document.body || document.getElementsByTagName('body')[0]
      const styleElement = document.createElement('style');
      styleElement.id = styleidentifier;
      let styleElementContent = selector + attributes.toString()
      if(mediaQuery){
        styleElementContent = `@media (${mediaQuery}){${styleElementContent}}`
      }
      styleElement.appendChild(
        document.createTextNode(styleElementContent)
      );
      body.appendChild(styleElement)
    }
  }

}