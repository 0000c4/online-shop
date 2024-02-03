const Router = require('express');
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router();

router.post('/registration',UserController.registation)
router.post('/login',UserController.login)
router.get('/auth', authMiddleware, UserController.check)


module.exports = router;
