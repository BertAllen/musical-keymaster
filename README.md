# Musical-Keymaster
### Music in *your* key!
This app was written to solve two problems: **1)** Songs are not always in a key that is easy to play or sing, and changing the key manually can be difficult at best. **2)** Carrying a book with 100 sheets of music in it is cumbersome. Along with the ability to change keys for you on the fly, the app also has a personal music book which can hold all of your converted songs which is available to you from anywhere there is internet access.

I wrote **Musical-Keymaster** as a cap-stone project for *Boise Code Works* with the help of two teammates: Brett Steckman and Rob Good. Brett did the awesome styling as well as putting together the nav bar and models. Rob did the firebase linkup and authentication pieces and also provided a valuable service to me by acting as my sounding board. 

My background as a musician and understanding of music theory gave me the knowledge of how the musical keys are related to each other. My education in JavaScript at *Boise Code Works* allowed me to figure out how to write the logic behind the conversion engine. For me, the real challenge wasn't the conversion engine itself (which only took me a single afternoon to write), but rather a supporting function which is a specialized parser. What the parser does is lets me paste an entire chord sheet into my app and then convert the chords in it to any key I want without messing up the lyrics. Writing the parsing function so it could tell the difference between a chord line and a lyric line was tricky, but ended up being a lot of fun!

The slider bar allows for conversion from one key to another in half-step (semitone) increments, and the net conversion field allows the user to convert back to the original key with a single conversion.
