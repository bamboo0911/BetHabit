import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    // friendList: [
    //   {
    //     friendId: {
    //       type: String,
    //       required: true,
    //     },
    //     friendName: {
    //       type: String,
    //       required: true,
    //     },
    //   }
    // ],
    lastLoginTime: {
      type: Date,
      required: true,
    },
    saysayPoint: {
      type: Number,
    }
  }
);

const User = mongoose.model('User', UserSchema);
export default User;
