    let conn = null;
    let signs = null;
    let world_id = window.location.hash.substr(1);

    if (!window.location.hash)
        alert('You must provide a world to load the webpage from!');
    else {
        PlayerIO.useSecureApiRequests = true;
        PlayerIO.authenticate("everybody-edits-su9rn58o40itdbnw69plyw", "simpleUsers", { username: "guest", password: "guest" }, {}, client => {
            client.bigDB.load("config", "config", config => {
                client.multiplayer.useSecureConnections = true;
                client.multiplayer.createJoinRoom(world_id, "Everybodyedits" + config.version, true, null, null, connection => {
                    conn = connection;
                    connection.addMessageCallback("*", on_message);
                    connection.send("init");
                }, callback_error);
            }, callback_error);
        }, callback_error);
    }

    function on_message(e) {
        if (e.type != "init")
            return;

        let bldatam = jsparse(e);
        let signs = bldatam.filter(block => block.id == 385)
                           .sort(function(a, b) { return a.x > b.x ? 1 : 0; })
                           .sort(function(a, b) { return a.y > b.y ? 1 : 0; });

        let html_complete = "";

        signs.forEach(sign => {
            html_complete += sign.args[1];
        });

        document.getElementById('content').innerHTML += html_complete;
        conn.disconnect();
    }

    function callback_error(error) { console.log("error: " + error.code + ": " + error.message); }