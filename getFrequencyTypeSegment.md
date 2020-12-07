   Write a class with a method/function to get a users "frequency-type" for a given website inside a given class.
   "Frequency-type" is defined as the users behaviour how often the user visits the website.

   requirements:
   - preconditions:
        - the following object stores "segment ids" (or just think of defined names) in an array. See example:
         window.Kameleoon.API.CurrentVisit.customData.Piano  =  [
            "lowfrequencyUser",
            "mediumfrequencyUser",
            "highfrequencyUser",
            "iOSUser",
            "androidUser",
            "windowsUsers"
         ];
        - note that not all segment ids are frequency segments, some of them store the device information or something else
        - you need to call another function called isFrequencyTypeSegment (already implemented in the same class)
        - this function will tell you if this segment is from type frequency or not
        - isFrequencyTypeSegment has two parameters(domain: string, segmentID: string)

        - in some cases the object window.Kameleoon.API.CurrentVisit.customData.Piano does not exists and has to be populated with data
        - to populate this object use this given function:  window.cX.getUserSegmentIds({persistedQueryId: persistedQueryIdValue});
        - each domain has a different persistedQueryIdValue  like:   welt.de  has persistedQueryIdValue = "abcdef",   bild.de has persistedQueryIdValue = "ghijkl"

   - use typescript
   - make this function bulletproof
   - function definition as follows:

     * function: getFrequencyTypeSegment,
     * example function call: getFrequencyTypeSegment("welt.de")
     * this returns frequency segment id for this domain for this user, example:   "highfrequencyUser"
     *
     * @param domain: string, defines the website domain you are interested in
     * @returns string