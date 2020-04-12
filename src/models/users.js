import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    rol:{type:Number, maxlength:5,required:true},
    name:{type:String, maxlength:50, unique:true, required:true},
    document_type:{type:String, maxlength:20},
    document_num:{type:String, maxlength:20},
    address:{type:String, maxlength:70},
    telephone:{type:String,maxlength:20},
    email:{type:String, maxlength:50, unique:true,required:true},
    password:{type:String, maxlength:65, required:true},
    state:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
});

const User = mongoose.model('user', userSchema);

export default User;