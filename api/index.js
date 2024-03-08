const express = require('express');
const connectDB = require('./config/connectDB');
const verifyJWT = require('./middleware/verifyJWT');
const app = express();

const {createServer} = require('http');
const {Server} = require('socket.io');
const { log } = require('console');
const server = createServer(app);

const io = new Server(server, {});  

const PORT = process.env.PORT || 3000;

const users = {};

app.use(express.json()); // parse application/json
app.use(express.urlencoded({extended: true})); // parse application/x-www-form-urlencoded

connectDB(); // connect to database

// routes
app.use('/', require('./routes/root'));
app.use('/users/register', require('./routes/register'));
app.use('/users/login', require('./routes/login'));
app.use('/users/logout', require('./routes/logout'));

io.on('connection', (socket)=> {
    console.log('user connected: ', socket.id);

    socket.on('set_user_id', (userId)=>{
        users[userId] = socket.id;
        console.log(users);
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected: ', socket.id);
        Object.keys(users).forEach(key => {
            if(users[key] === socket.id){
                delete users[key];
            }
        });
    });

    socket.on('send_message', ({senderId, receiverId, message})=>{
        console.log('message: ', message);
        console.log('receiverId: ', receiverId);
        console.log('senderId: ', senderId);
        console.log('users: ', users);
        if(users[receiverId]){
            console.log('receiver is online');
            socket.broadcast.to(users[receiverId]).emit('receive_message', {senderId, message});
            console.log('message sent');
        }
    })

    socket.on('typing', ({senderId, receiverId, isTyping})=>{
        if(users[receiverId]){
            socket.broadcast.to(users[receiverId]).emit('typing', {senderId, isTyping});
        }
    })
}
)

// protected routes
app.use(verifyJWT);
app.use('/messages', require('./routes/messages'));




server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});