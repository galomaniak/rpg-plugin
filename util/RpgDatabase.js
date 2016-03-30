$.RpgDatabase = function() {
    var DEFAULT_RACE = "human";
    var GOD_RACE = "God";
    var GOD_REGEX = new RegExp('^' + GOD_RACE + '$', 'i');
    var EXCEPTIONS = {};
    EXCEPTIONS["galomaniak"] = GOD_RACE;

    this.getRace = function(person) {
        // TODO: check if person is in chat
        if (!$.inidb.exists("rpgRace", person)) {
            var race = DEFAULT_RACE;
            if (person in EXCEPTIONS)
                race = EXCEPTIONS[person];
            $.inidb.set("rpgRace", person, race);
        }
        return $.inidb.get("rpgRace", person);
    };

    this.setRace = function(person, race) {
        // TODO: check if person is in chat
        $.inidb.set("rpgRace", person, race);
        $.say(this.isGod(person));
    };

    this.isGod = function(person) {
        return this.isRaceGod(this.getRace(person));
    };

    this.isRaceGod = function(race) {
        return GOD_REGEX.test(race);
    };
};