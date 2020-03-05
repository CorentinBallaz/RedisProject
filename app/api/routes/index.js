const router = require('express').Router();
const controller = require('../controllers');

router.get('/user/:username',(req,res)=>{
    // controller.saveUser(req,res);
    // res.send("testes")
    controller.getUser(req,res);
    // controller.getAllRecipes(req,res);
});
router.get('/users',(req,res)=>{
    // controller.saveUser(req,res);
    // res.send("testes")
    controller.getUsers(req,res);
    // controller.getAllRecipes(req,res);
});
router.post('/user',(req,res)=>{
    controller.saveUser(req,res);
})


router.delete('/user/:username',(req,res)=>{
    controller.deleteUser(req,res);
});

module.exports=router;