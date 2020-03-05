const router = require('express').Router();
const controller = require('../controllers');

router.get('/',(req,res)=>{
    controller.saveUser(req,res);
    res.send('user added');
    // controller.getAllRecipes(req,res);
});

module.exports=router;