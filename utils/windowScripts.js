module.exports = windowScripts = {
  // This populates the piano but implement it here with out params
  // But in class it uses {persistedQueryId: persistedQueryIdValue}
  cxScript: `window.cX = {
    persistedQueryIdValue: "abcdef",
    getUserSegmentIds: () => {
      return window.Kameleoon = {
          API: {
            CurrentVisit: {
              customData: {
                Piano: [
                  "lowfrequencyUser"
                ]
              }
            }
          }
        }
    }
  }`,
  
  kameleoonScript: (frequency) => `window.Kameleoon = {
    API: {
      CurrentVisit: {
        customData: {
          Piano: [
            "${frequency}",
            "iOSUser",
            "androidUser",
            "windowsUsers"
          ]
        }
      }
    }
  }`
}