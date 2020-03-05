const router = require('express').Router();
const controller = require('../controllers');

router.get('/',(req,res)=>{

    res.send('Express response');
    // controller.getAllRecipes(req,res);
});

module.exports=router;