$.loadScript("./rpg/util/RpgHandler.js");

var RPG_COMMAND = "rpg";

$.on('command', function (event) {
    try {
        var handler = new $.RpgHandler(); //todo: create only one handler ;)
        var command = event.getCommand();
        var args = event.getArgs();
        var sender = event.getSender();
        if (command.equalsIgnoreCase(RPG_COMMAND)) {
            handler.handle(args, sender);
        }
    } catch (e) {
        $.say("General RPG error: " + e);
    }
});