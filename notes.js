/******************** Load Core Modules Here **********************/
const fs = require('fs');
/******************** Load NPM Modules Here ***********************/
const chalk = require('chalk');
/******************** Load Custom Modules Here ********************/
/******************** End of Modules ******************************/


 // npm i chalk not necessary, already installed previously


const addNote = (title, body) => {

    const notes = loadNotes();

    let dupNote;
    
    if (notes.length > 0) {
        dupNote = notes.find((note) => note.title === title);
    } else {
        dupNote = false;
    }

    if (!dupNote) {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green.inverse('New Note Added!'));
    } else {
        console.log(chalk.red.inverse('Title already exists'));
    }

    saveNotes(notes);
}

const removeNote = (title) => {

    const notes = loadNotes();

    const keptNotes = notes.filter((note) => note.title !== title);

    if (notes.length !== keptNotes.length) {
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(keptNotes);
    } else {
        console.log(chalk.red.inverse('No Note Found!'));
    }   
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Here is a list of your Notes:'))

    return notes.filter((note) => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();

    const foundNote = notes.find((note) => note.title === title);

    if (foundNote) {
        console.log(chalk.green.inverse('Note Found!'));
        console.log('Title: ' + chalk.bold(foundNote.title));
        console.log('Content: ' + foundNote.body);
        console.log('-----------------------------------------------------');
    } else {
        console.log(chalk.red.inverse('Title Not Found'));
    }

    saveNotes(notes);
}

const changeNote = (title, item, text) => {
    //console.log(chalk.green(`Information passed in is: Title - ${title}, Item - ${item} and, Change - ${text}`));
    const notes = loadNotes();

    const foundNote = notes.find((note) => note.title === title);

    let keptNotes;
    let note;

    if (foundNote) {
        // Gets all the notes except for the one chosen for modification
        keptNotes = notes.filter((note) => note.title !== title);
        // Gets the note chosen for modification
        note = notes.filter((note) => note.title === title);

        if (item === 1) {
            // if user wants to change the title, they selected 1
            note[0].title = text;
        } else if (item === 2) {
            // if the user wants to change the body, they selected 2
            note[0].body = text;
        } else {
            // Otherwise, the entered an invalid choice
            console.log(chalk.red.inverse('------------------------------------------------------'));
            console.log(chalk.red(' Invalid Item Entered:'));
            console.log(chalk.green.inverse('  Please enter 1 to change Title, or 2 to change Body '));
            console.log(chalk.red.inverse('------------------------------------------------------'));
            return; // This short-circuits the push and save code below
        }
    } else {
        // The note they selected does not exist
        console.log(chalk.red.inverse('------------------------------------------------------'));
        console.log(chalk.red(' Note Does not Exist:'));
        console.log(chalk.red.inverse('------------------------------------------------------'));
        return; // This short-circuits the push and save code below
    }

    keptNotes.push(note[0]);

    saveNotes(keptNotes);

    console.log(chalk.green.inverse('Note Updated!'));
}

const loadNotes = () => {

    try {
        // get the notes, convert to String, Then parse it
        return JSON.parse(fs.readFileSync('notes.json').toString()); // returns a JSON object
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote,
    changeNote
}

