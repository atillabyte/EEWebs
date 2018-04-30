if (!window.location.hash)
  throw new function AlertError() { alert("You must provide a world to load the webpage from!"); }

PlayerIO.useSecureApiRequests = true;
PlayerIO.authenticate("everybody-edits-su9rn58o40itdbnw69plyw", "simpleUsers", { email: "EEWebs@email.tld", password: "shared" }, {}, client => {
  client.bigDB.load("config", "config", config => {
    client.multiplayer.useSecureConnections = true;
    client.multiplayer.createJoinRoom(window.location.hash.substr(1), "Everybodyedits" + config.version, true, null, null, connection => {
      connection.addMessageCallback("init", e => {
        connection.disconnect();

        let signs = jsparse(e).filter(block => block.id == 385).reverse();

        let html = signs.map(sign => sign.args[1]).join('');
        let iframe = document.createElement('iframe');

        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';

        document.body.getElementsByTagName('div')[0].appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(html);
        iframe.contentWindow.document.close();
      });
      connection.send("init");
    }, callback_error);
  }, callback_error);
}, callback_error);

function callback_error(error) { console.log("error: " + error.code + ": " + error.message); }