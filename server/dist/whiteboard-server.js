import { createServer } from 'http';
export class WhiteboardServer {
    constructor() {
        this.socketIo = require('express');
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    createApp() {
        const express = require("express");
        this.app = express;
    }
    createServer() {
        this.server = createServer(this.app);
    }
    config() {
        this.port = process.env.PORT || WhiteboardServer.PORT;
    }
    sockets() {
        //  const socketIo = require("socketIo");
        this.io = this.socketIo(this.server);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on('connect', (socket) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    getApp() {
        return this.app;
    }
}
WhiteboardServer.PORT = 8084;
