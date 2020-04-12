import mongoose, {Schema} from 'mongoose';

const personaSchema = new Schema({
    persona_type:{ type:Number, maxlength:5,required:true },
    name:{type:String, maxlength:50,unique:true, required:true},
    document_type:{type:String, maxlength:20},
    document_num:{type:String, maxlength:20},
    address:{type:String, maxlength:50},
    telephone:{type:String, maxlength:20},
    email:{type:String, maxlength:50, unique:true},
    state:{type:Number, default:1},
    createdAt:{type:Date,default:Date.now}

});


const Persona = mongoose.model('persona', personaSchema);

export default Persona;