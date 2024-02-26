import mongoose, {Document} from "mongoose";

interface UserDocument extends Document{
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string
}

const UserSchema = new mongoose.Schema<UserDocument>({
    name:{
        type: String,
        required: true,
        trim: true

    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role:{
        type: String,
        enum: ['admin' ,'user'],
        default:'user'
    },
    password:{
        type: String,
        required: true
    },

},
{
    timestamps:true

}

);

const UserModel = mongoose.model('User', UserSchema)

// export default userModel as mongoose.Model<UserDocument>;
export default UserModel;