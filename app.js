/******************** Load Core Modules Here **********************/
/******************** Load NPM Modules Here ***********************/
const yargs = require('yargs'); // npm i yargs@13.2.2 ... @ is for loading most current version
/******************** Load Custom Modules Here ********************/
const notes = require('./notes.js'); // this is a local file
/******************** End of Modules ******************************/

const log = console.log;

// Changing the version number of the app
yargs.version('2.0.0');

// Create Add Command
yargs.command({
    command: 'add',
    describe: 'Add a New Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

// Create Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create List Command
yargs.command({
    command: 'list',
    describe: 'List the Notes',
    handler() {
        notes.listNotes();
    }
})

// Create Read Command
yargs.command({
    command: 'read',
    describe: 'Read the Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

// Create Read Command
yargs.command({
    command: 'change',
    describe: 'Change a Note',
    builder: {
        title: {
            describe: 'Title of Note to be Change',
            demandOption: true,
            type: 'string'
        },
        item: {
            describe: 'Change Title (1) or Body (2)',
            demandOption: true,
            type: 'number'
        },
        text: {
            describe: 'Text of change to be made',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.changeNote(argv.title, argv.item, argv.text);
    }
})

yargs.parse();