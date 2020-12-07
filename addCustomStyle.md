  Write a class with a method/function to add a defined css style to a website

  requirements:
   - use typescript
   - make this function bulletproof
   - function definition as follows:

     * function: addCustomStyle, creates custom style element and appends to html body
     * example function call: addCustomStyle("myStyle", ".someClassName", "{background-color: #cccccc }")
     * this results in adding a style html element to the website with the given style definition <style id="myStyle"> .someClassName { background-color: #cccccc} </style>
     *
     * @param styleidentifier: string, defines id of the style element to identify the style for later usage
     * @param selector: string, valid css selector
     * @param attributes: any, object of css attributes with curly braces, example: { display: none }
     * @param mediaQuerry?: string (optional), media querry for given stylesheet, example: "max-width: 909px"
     * @returns void

