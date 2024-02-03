const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');

class UserController{
    async registation(req, res, next){
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ApiError.badRequest('некорректный email или password'));
        }
        const candidate = await User.findOne({where: {email}});
        if(candidate){
            return next(ApiError.badRequest('этот email уже используется'));
        }
        const hashPassword = await bcrypt.hash(password,5);
        const user = await User.create({email, role, password: hashPassword});
        const basket = await Basket.create({userId: user.id});
        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
        res.json({token})
        
    }
 
    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            return next(ApiError.internal('пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return next(ApiError.internal('неверный пароль'));
        }
        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
        res.json({token})
    }
 
    async check(req, res, next){
        const token = jwt.sign(
            {id: req.user.id, email: req.user.email, role: req.user.role},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
        res.json({token})
    }
}

module.exports = new UserController();