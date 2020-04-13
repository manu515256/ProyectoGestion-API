import models from '../models';

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Article.create(req.body);
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
            const reg = await models.Article.findOne({ _id: req.query._id })
            .populate('categoria',{name:1});
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
    queryBarcode: async (req, res, next) => {
        try {
            const reg = await models.Article.findOne({ code: req.query.code })
            .populate('categoria',{name:1});
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
            const reg = await models.Article.find({$or:[{'name':new RegExp(value,'i')},{'description':new RegExp(value,'i')}]},{createdAt:0})
            .populate('categoria',{name:1})
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
            const reg = await models.Article.findByIdAndUpdate({ _id: req.body._id }, { category:req.body.category, code:req.body.codigo, name: req.body.name, description: req.body.description, sell_price: req.body.sell_price,stock:req.body.stock });
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
            const reg = await models.Article.findByIdAndDelete({ _id: req.body._id });
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
            const reg = await models.Article.findByIdAndUpdate({ _id: req.body._id }, { state: 1 });
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
            const reg = await models.Article.findByIdAndUpdate({ _id: req.body._id }, { state: 0 });
            res.status(200).json(reg)
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    }
}