const {Message} = require('./models/messageModel');

//  read a message by id
const getMessage = async(req, res) =>{
    try{
        const message = await Message.findById(req.params.id);
        res.status(200).json(message);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

// create a new message

const createMessage = async(req, res) =>{
    try{
        const message = req.body;
        const newMessage = new Message(message);
        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }   
}

// update a message by id

const updateMessage = async(req, res) =>{
    const message = req.body;
    try{
        const updatedMessage = await findByIdAndUpdate(req.paramsid, message, {new: true});
        res.status(200).json(updatedMesssage);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

// delete a message by id

const deleteMessage = async(req,res) => {
    try{
        const deletedMessage = await findByIdAndDeleted(req.params.id);
        res.status(200).json({message: 'Message deleted'});
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

module.exports = {readMessage, createMessage, updateMessage, deleteMessage};