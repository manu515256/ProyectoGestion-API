import models from '../models';

//* Suma stock
async function sumStock(idarticle, quantity){
    let {stock} = await models.Article.findOne({_id:idarticle});
    let nStock = parseInt(stock)+parseInt(quantity);
    const reg = await models.Article.findByIdAndUpdate({_id:idarticle},{stock:nStock});
}
//* Resta stock
async function resStock(idarticle, quantity){
    let {stock} = await models.Article.findOne({_id:idarticle});
    let nStock = parseInt(stock)-parseInt(quantity);
    const reg = await models.Article.findByIdAndUpdate({_id:idarticle},{stock:nStock});
}

export default {
    add: async (req, res, next) => {
        try {
            const reg = await models.Sell.create(req.body);
            //* Actualizar stock
            let details = reg.details;
            details.map(function(x){
                resStock(x._id,x.quantity);
            });
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
            const reg = await models.Sell.findOne({ _id: req.query._id })
            .populate('user',{name:1})
            .populate('persona',{name:1});
            if (!reg) {
                res.status(404).send({
                    message: 'This Sell does not exist'
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
            const reg = await models.Sell.find({$or:[{'receipt_serie':new RegExp(value,'i')},{'receipt_num':new RegExp(value,'i')}]})
            .populate('user',{name:1})
            .populate('persona',{name:1})
            .sort({'createdAt':-1});
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
            const reg = await models.Sell.findByIdAndUpdate({ _id: req.body._id }, { state: 1 });
            let details = reg.details;
            details.map(function(x){
                resStock(x._id,x.quantity);
            });
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
            const reg = await models.Sell.findByIdAndUpdate({ _id: req.body._id }, { state: 0 });
            let details = reg.details;
            details.map(function(x){
                sumStock(x._id,x.quantity);
            });
            res.status(200).json(reg)
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    },
    //* agrupa las ventas por mes y las apila en un año
    graph12m: async(req,res,next) =>{
        try{
            const reg = await models.Sell.aggregate(
                [
                    {
                        $group:{
                            _id:{
                                month:{$month:"$createdAt"},
                                year:{$year:"$createdAt"}
                            },
                            total:{$sum:"$total"},
                            number:{$sum:1}
                        }
                    },
                    {
                        $sort:{
                            "_id.year":-1,"_id.mes":-1
                        }
                    }
                ]
            ).limit(12);

            res.status(200).json(reg);
        }catch(e){
            res.status(500).send({
                message:'An error ocurred'
            });
            next(e);
        }
    },
    queryDate: async (req, res, next) => {
        try {
            let start = req.query.start;
            let end = req.query.end;
            const reg = await models.Sell.find({"createdAt":{"$gte":start,"$lt":end}})
            .populate('user',{name:1})
            .populate('persona',{name:1})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'An error ocurred in the request'
            });
            next(e);
        }
    }
}