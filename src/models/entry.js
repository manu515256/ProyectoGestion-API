import mongoose,{Schema} from 'mongoose';

const entrySchema = new Schema({
    user:{type: Schema.ObjectId, ref:'user',required:true},
    persona:{type: Schema.ObjectId, ref:'persona',required:true},
    receipt_type:{type:String,maxlength:20, required:true},
    receipt_serie:{type:String,maxlength:7},
    receipt_num:{type:String,maxlength:20, required:true},
    tax:{type:Number, required:true},
    total:{type:Number, required:true},
    details:[{
        _id:{type:String,required:true},
        article:{type:String,required:true},
        quantity:{type:String,required:true},
        price:{type:String, required:true}
    }],
    state:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
});

const Entry = mongoose.model('entry',entrySchema);

export default Entry;