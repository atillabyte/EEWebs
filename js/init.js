/*
 * Look, just use this source code as long as you include this original header comment. That's all I'm asking.
 * Original JSParse at https://www.sirjosh3917.com/cdn/jsparse_clean.js
 * Also SirJosh3917 made this code and used Processor's InitParse as a template/guide.
 * This is fine, just feed it the 'init' or 'reset' message and it shouldn't break, thanks.
 */

jsparse = function(e) {
    var result = [];

    if (!(e.type == "init" ||
            e.type == "reset")) {
        return undefined;
    }

    var i = e.length;
    var stack = [];
    var tstack = [];
    var getobjectsCache = e._internal_('get-objects');
    var gettypesCache = e._internal_('get-types');

    while (getobjectsCache[--i] != "we") {}
    while (getobjectsCache[--i] != "ws") {
        stack.push(getobjectsCache[i]);
        tstack.push(gettypesCache[i]);
    }

    i = 0;

    do {
        var args = [];

        //while we are trying to align the world data to our interests, we want:
        while (tstack[i] != 7 || //yPos bytearray
            tstack[i + 1] != 7 || //xPos byteArray
            tstack[i + 2] != 0 || //layer int
            tstack[i + 3] != 1) { //type uint
            args.push(stack[i++]); //and if that's not true, this is clearly an argument.
            if (i > stack.length)
                break;
        }

        if (i <= stack.length) { //only execute this if i is bigger than the stack length
            var yPos = stack[i++];
            var xPos = stack[i++];
            var layer = stack[i++];
            var type = stack[i++];

            if (xPos.length == yPos.length) { //don't parse it if they're not the same :p
                for (var j = 0; j < xPos.length; j += 2) {
                    result.push({
                        layer: layer,
                        id: type,
                        args: args,
                        x: (xPos[j] << 8) | xPos[j + 1],
                        y: (yPos[j] << 8) | yPos[j + 1] //no idea what this does but it works, thanks proc
                    });
                }
            }
        }
    } while (i <= stack.length); //else we'll quit :D

    return result;
};