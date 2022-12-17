const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const artController = require('../controllers/artController');

module.exports=(app)=>{
    app.use('/auth', authController)
    app.use('/', homeController)
    app.use('/arts', artController)
}