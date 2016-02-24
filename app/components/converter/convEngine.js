app.service("ConversionEngine", function () {
    
    //This converts difficult chords (B# to C), (E# to F), (Cb to B), (Fb to E) to good stuff
    this.funkOut = function (chord) {
        alert("funkOut inservice"); //delete this line after first run-through
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
        alert('toFlat inservice');//delete this line after first run-through
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
        alert('toSharp inservice');//delete this line after first run-through
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
     
    //reference lists to create conversion tables from
    this.sharpList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    this.flatList = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
    this.guitarList = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];

    
    /* all this code is not needed for our purposes
    this.sharpTable = [];
    this.flatTable = [];
    this.guitarTable = [];

    for (var h = 0; h < 12; h++) {
    this.sharp = {};
    this.flat = {};
    this.guitar = {};
        for (var i = 0; i < 12; i++) {
            this.sharp[i.toString()]=this.sharpList[h + i];
            this.flat[i.toString()]=this.flatList[h + i];
            this.guitar[i.toString()]=this.guitarList[h + i];
        }
            this.sharpTable.push(this.sharp);
            this.flatTable.push(this.flat);
            this.guitarTable.push(this.guitar);
    }
    

    */

    this.converter = function (chord, list) {
        for (var i = 0; i < list.length; i++) {
            var currentChord = list[i];
            if (chord === currentChord) {
                //go up by 2 make sure thats okay
                //return list[nextIndex]
            }
        }
    }

    this.analyze = function (phrase) {

    }



}) // end of ConversionEngine service

