var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var path = require('path')
var http = require('http')
var ws = require('ws')

var httpServer = http.createServer(app)
var WebSocketServer = new ws.Server({ server : httpServer})

app.use(express.static(path.join(__dirname, "/public/")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))    
})

WebSocketServer.on("connection", wss => {
    console.log("got new connection!")

    wss.on("message", (user_msg) => {
        wss.send("" + user_msg)
    })
})

httpServer.listen(4000, () => console.log('Server started: http://localhost:4000'));