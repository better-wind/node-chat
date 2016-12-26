var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8181 }),
    clients = [],
    clientNum = 0;
wss.on('connection', function (ws) {
    console.log('client connected');
    clientNum ++;
    clients.push({'ws':ws});
    ws.on('message', function (rs) {
        var rs = JSON.parse(rs)
        wsSend(rs)
    });
});
function wsSend(rs){
    for(var i =0;i<clients.length;i++){
        var clientSocket = clients[i].ws;
        if (clientSocket.readyState === clientSocket.OPEN) {
            clientSocket.send(JSON.stringify(rs));
        }
    }
}
