import models from '../models';
import bcrypt from 'bcryptjs'
import token from '../services/token'

export default {
    add: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password,10)
            const reg = await models.User.create(req.body);
            res.status(200).json(reg)
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.User.findOne({ _id: req.query._id });
            if (!reg) {
                res.status(404).send({
                    message: 'This entry does not exist'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.User.find({$or:[{'name':new RegExp(value,'i')},{'document_num':new RegExp(value,'i')}]},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            let pass = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id});
            if(pass!=reg0.password){ 
                req.body.password = await bcrypt.hash(req.body.password,10); 
            }
            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, {rol:req.body.rol, name: req.body.name, document_num: req.body.document_num, address: req.body.address, telephone:req.body.telephone, email:req.body.email, password:req.body.password });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            const reg = await models.User.findByIdAndDelete({ _id: req.body._id });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { state: 1 });
            res.status(200).json(reg)
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.User.findByIdAndUpdate({ _id: req.body._id }, { state: 0 });
            res.status(200).json(reg)
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    login: async(req,res,next)=>{
        try{
            let user = await models.User.findOne({email:req.body.email,state:1});
            if(user){
                let match = await bcrypt.compare(req.body.password,user.password);
                if(match){
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user,tokenReturn});
                }else{
                    res.status(404).send({message: 'Wrong password'});
                }
            }else{
                res.status(404).send({message:'User does not exist'})
            }
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    }
}