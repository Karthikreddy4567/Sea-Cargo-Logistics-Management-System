import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : { type : String, required: true },
    email: { type: String, required: true },
    userrole: { 
        type: String, 
        enum: ['manager', 'agent', 'customer'], 
        required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

export const UserModel = mongoose.model('users', userSchema);

export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: String) => UserModel.findOne({ email });
export const getUserrole = (_id: string) => UserModel.findById(_id).select('userrole');
export const getUserBySessionToken = (sessionToken: String) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});

export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());

export const updateUserById = (id: String, values: Record<string, any> ) => UserModel.findByIdAndUpdate(id, values);

export const deleteUserById = (id: String, values: Record<string, any> ) => UserModel.findOneAndDelete({ _id: id });






