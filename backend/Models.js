import mongoose from "mongoose";
import { Schema } from "mongoose"; 

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ThreadSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
});

const MessageSchema = new Schema({
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'threads',
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        index: true
    }
});

const User = mongoose.model("users", UserSchema);
const Thread = mongoose.model("threads", ThreadSchema);
const Message = mongoose.model("messages", MessageSchema);

export {
  User,
  Thread,
  Message
}
