import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "supervisor", "user"],
    default: "user"
  },
},{ 
    timestamps: true    
});

export default mongoose.model("User", userSchema);