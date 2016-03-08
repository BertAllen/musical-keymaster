app.service("ConversionEngine", function () {
    
    //This converts difficult chords (B# to C), (E# to F), (Cb to B), (Fb to E) to good stuff
    this.funkOut = function (chord) {
        switch (chord) {
            case "B#":
                chord = "C";
                break;
            case "E#":
                chord = "F";
                break;
            case "Cb":
                chord = "B";
                break;
            case "Fb":
                chord = "E";
        }
        return chord;
    }

    this.toFlat = function (chord) {
        switch (chord) {
            case "A#":
                chord = "Bb";
                break;
            case "C#":
                chord = "Db";
                break;
            case "D#":
                chord = "Eb";
                break;
            case "F#":
                chord = "Gb";
                break;
            case "G#":
                chord = "Ab";
        }
        return chord;
    }

    this.toSharp = function (chord) {
        switch (chord) {
            case "Bb":
                chord = "A#";
                break;
            case "Db":
                chord = "C#";
                break;
            case "Eb":
                chord = "D#";
                break;
            case "Gb":
                chord = "F#";
                break;
            case "Ab":
                chord = "G#";
        }
        return chord;
    }

    this.toGuitar = function (chord) {
        switch (chord) {
            case "A#":
                chord = "Bb";
                break;
            case "Db":
                chord = "C#";
                break;
            case "D#":
                chord = "Eb";
                break;
            case "Gb":
                chord = "F#";
                break;
            case "G#":
                chord = "Ab";
        }
        return chord;
    }
    /* pseudo-code for the "converter" function .............
    
    to parser --> .... done
    tabLine == true --> .... done
    sift "A"-"G" -->
    ? is next char "#" or "b"
    grab chordBlock -->
    run funkOut --> 
    run shifter -->
    replace chordBlock -->
    GOTO next chordBlock -->
    GOTO next tabLine
    */
    
    this.shifter = function(chord, slider, accidental){
        this.spot =0
        switch (accidental){
            case '#':
            this.spot = this.sharpList.indexOf(chord, 12);
            chord = this.sharpList[this.spot + slider];
            break;
            case 'b':
            this.spot = this.flatList.indexOf(chord, 12);
            chord = this.flatList[this.spot + slider];
            break;
            case 'g':
            this.spot = this.guitarList.indexOf(chord, 12);
            chord = this.guitarList[this.spot + slider];
            break;
        }
        return chord;
    }
    //reference lists to create conversion tables from
    this.sharpList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    this.flatList = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    this.guitarList = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];

    this.convert = function (tabLine, slider, accidental) {
        // debugger;
        this.newTabLine = '';
        for (var i = 0; i < tabLine.length; i++) {
            var chord = '';
            if (tabLine.charCodeAt(i) >= 65 && tabLine.charCodeAt(i) <= 71) {//looking for letters between A & G
                if (tabLine.charCodeAt(i + 1) === 35 || tabLine.charCodeAt(i + 1) === 98) {//trapping the # & b characters
                     chord = tabLine[i] + tabLine[i + 1];
                    i++;
                } else {
                     chord = tabLine[i];
                }
                //TODO ... initiate chord-shift process here ................
                if(chord){
                   chord = this.funkOut(chord);
                    switch (accidental){
                        case '#':
                        chord = this.toSharp(chord);
                        break;
                        case 'b':
                        chord = this.toFlat(chord);
                        break;
                        case 'g':
                        chord = this.toGuitar(chord);
                        break;
                    }
                   chord = this.shifter(chord, slider, accidental) // TODO ... write this function ........
                }
                this.newTabLine += chord;
                continue;
            }
            this.newTabLine += tabLine[i];
        }
        return this.newTabLine;
    }//end of convert function
   
       // v-- parsing function to distinguish chord lines from lyrics
    this.analyze = function (phrase) {
        //trap all other capitols and return flase if found (thanks Rob)
        for (var i = 0; i < phrase.length; i++) {
            if (phrase.charCodeAt(i) < 91 && phrase.charCodeAt(i) > 71 && phrase.charCodeAt(i) != 75) { // 75 is the letter K ... excluded for the word Key
                return false;
            }
        }
        // debugger;
        if (phrase.length === 1 && phrase.charCodeAt(0) != 32) {
            return true;
        }
        if (phrase.length === 0) {
            return false;
        }
        if (phrase.search("Bridge") != -1 || phrase.search("o") != -1) {
            return false;
        }

        

        // if(phrase.search("o") !=-1){
        //     return false;
        // }
        // if(phrase.search(String.fromCharCode(46)) !=-1){
        //     return false;
        // }

        this.prelimParse = ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', '2', '7', '9'];
        var flag = 0;
        for (var i = 0; i < this.prelimParse.length; i++) {
            if (phrase.search(this.prelimParse[i]) > 0) {
                flag++;
                if (flag >= 2) {
                    return true;
                }
            }
        }
        var spaceFlag = 0;
        var sharpFlag = 0;
        var chordFlag = 0;
        var numFlag = 0;
        var augDimFlag = 0;
        for (var i = 0; i < phrase.length; i++) {
            switch (phrase.charCodeAt(i)) {
                case 32:
                    spaceFlag++;
                    break;
                case 35:
                    sharpFlag++;
                    break;
                //chord section
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 71:
                    chordFlag++;
                    break;
                //the numbers 2, 7 and 9
                case 50:
                case 55:
                case 57:
                    numFlag++;
                    break;
                //the characters ( ) - +
                case 40:
                case 41:
                case 43:
                case 45:
                    augDimFlag++;

            }
        }
        //analysis of switch results
        //preponderance of spaces --v
        if (spaceFlag * 2 > phrase.length) {
            return true;
        }
        // preponderance of CAPS and other spesh characters --v
        if (((chordFlag + augDimFlag + sharpFlag + numFlag) + 1) * 3 >= phrase.length) {
            return true;
        }

        return false; //when all other tests fail
    }//end of analyze (parsing) function ---^




}) // end of ConversionEngine service

