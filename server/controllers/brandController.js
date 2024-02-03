const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController{
    async create(req, res){
        const {name} = req.body;
        const type = await Brand.create({name});
        return res.json(type);
    }

    async getAll(req, res){
        const types = await Brand.findAll();
        return res.json(types);
    }

}

module.exports = new TypeController();