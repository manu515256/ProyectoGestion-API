import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Persona.create(req.body);
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
            const reg = await models.Persona.findOne({ _id: req.query._id });
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
            const reg = await models.Persona.find({$or:[{'name':new RegExp(value,'i')},{'email':new RegExp(value,'i')}]},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    //? CLIENTE TIPO 1, PROVEEDOR TIPO 2

    listClient: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.Persona.find({$or:[{'name':new RegExp(value,'i')},{'email':new RegExp(value,'i')}],'persona_type':'1'},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    listProvider: async (req, res, next) => {
        try {
            let value = req.query.value;
            const reg = await models.Persona.find({$or:[{'name':new RegExp(value,'i')},{'email':new RegExp(value,'i')}],'persona_type':'2'},{createdAt:0})
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
            const reg = await models.Persona.findByIdAndUpdate({ _id: req.body._id }, {persona_type:req.body.persona_type, name: req.body.name, document_num: req.body.document_num, address: req.body.address, telephone:req.body.telephone, email:req.body.email});
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
            const reg = await models.Persona.findByIdAndDelete({ _id: req.body._id });
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
            const reg = await models.Persona.findByIdAndUpdate({ _id: req.body._id }, { state: 1 });
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
            const reg = await models.Persona.findByIdAndUpdate({ _id: req.body._id }, { state: 0 });
            res.status(200).json(reg)
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    }
}