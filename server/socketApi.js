// Socket

const Chat = require('./model/Chat');
const socketio = require('socket.io');
const User = require('./model/User');

const io = socketio();

const socketApi = {
    io
};


io.on('connection', async (socket) => {
    // On new chat message it creates new message object 
    socket.on('chat message',async (message)  => {
        io.emit(message.to, message)
        const msg = new Chat({
            message: message.message,
            from: message.from,
            to: message.to,
            date: message.date,
            params: message.params
        });

        try {
            msg.save();
             await User.findById(message.to).updateOne({ $push: { notifications: message.from } });
        } catch (error) {
            console.log(error)
        }
    });
});
module.exports = socketApi;