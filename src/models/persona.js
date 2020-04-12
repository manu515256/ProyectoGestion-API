import mongoose, {Schema} from 'mongoose';

const personaSchema = new Schema({
    persona_type:{ type:Number, maxlength:5,required:true },
    name:{type:String, maxlength:50}
});


const Persona = mongoose.model('persona', personaSchema);


export default Persona;