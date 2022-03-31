import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
});

//after creating schema, we now create a model
var UserModal = mongoose.model("UserModal", userSchema);
export default UserModal;

// export default mongoose.model("User", userSchema);

