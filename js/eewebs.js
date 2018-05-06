if (!window.location.hash)
  throw new function AlertError() { alert("You must provide at least one world to load the webpage from!"); }

worldIds = window.location.hash.substr(1).split('+');
promises = [];

worldIds.forEach(roomId => {
  promises.push(new Promise((resolve, reject) => {
    PlayerIO.useSecureApiRequests = true;
    PlayerIO.authenticate("everybody-edits-su9rn58o40itdbnw69plyw", "simpleUsers", { email: randomEmail(), password: "shared" }, {}, client => {
      client.bigDB.load("config", "config", config => {
        client.multiplayer.useSecureConnections = true;
        client.multiplayer.createJoinRoom(roomId, "Everybodyedits" + config.version, true, null, null, connection => {
          var successfullyJoined = false;

          connection.addDisconnectCallback(() => {
            if (!successfullyJoined)
              console.error(`Failed to load resource: the connection was unable to join world '${roomId}'`);

            resolve();
          });

          connection.addMessageCallback('init', e => {
            successfullyJoined = true;
            connection.disconnect();

            let signs = jsparse(e).filter(block => block.id == 385).reverse();
            let html = signs.map(sign => sign.args[1]).join('');

            resolve(html);
          });

          connection.send("init");
        }, callbackError);
      }, callbackError);
    }, callbackError);
  }));
});

Promise.all(promises).then((resolved) => {
  let iframe = document.createElement('iframe');

  iframe.width = '100%';
  iframe.height = '100%';
  iframe.frameBorder = '0';

  document.body.getElementsByTagName('div')[0].appendChild(iframe);
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(resolved.join(''));
  iframe.contentWindow.document.close();
});

function randomEmail() { return `EEWebsX${Math.floor(Math.random() * 128) + 1}@domain.tld`; }
function callbackError(error) { console.log("error: " + error); }