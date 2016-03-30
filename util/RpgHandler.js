$.loadScript("./rpg/util/RpgDatabase.js");

$.RpgHandler = function() {
    this.db = new $.RpgDatabase();
    var commands = {};
    commands["race"] = "getRace";
    commands["getrace"] = "getRace";
    commands["setrace"] = "setRace";

    this.handle = function(args, sender) {
        sender = sender.toLowerCase();
        var command = args[0];
        if (command === undefined) {
            this.displayHelp(sender);
        } else {
            args = args.slice(1, args.length);
            if (command in commands) {
                this[commands[command]](args, sender);
            } else {
                this.displayError(arg, sender);
            }
        }
    };

    this.displayHelp = function(sender) {
        $.say("Hello " + sender + "! This is RPG module written by Galomaniak. Subcommands: race; race [person]; setrace [person] [race]");
    };

    this.getRace = function(args, sender) {
        var person = this.getSubjectOfCommand(args, sender);
        //TODO: what when person does not exists
        $.say(person + " is " + this.db.getRace(person));
    };

    this.setRace = function(args, sender) {
        //TODO: check privilege
        var person = this.getSubjectOfCommand(args, sender);
        var newRace = args[1];
        if (newRace === undefined) {
            this.displaySubcommandError(sender, "setrace");
        } else {
            this.db.setRace(person, newRace);
        }
    };

    this.displaySubcommandError = function(sender, subcommand) {
        $.say(sender + " incorrect usage of subcommand " + subcommand);
    }

    this.displayError = function(arg, sender) {
        $.say(sender + " incorrect RPG command: " + arg);
    };

    this.getSubjectOfCommand = function(args, sender) {
        var person;
        if (args.length == 0)
            person = sender;
        else
            person = args[0].toLowerCase();
        return person;
    };

};