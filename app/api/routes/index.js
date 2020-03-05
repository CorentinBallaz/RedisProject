const router = require('express').Router();
const controller = require('../controllers');

router.get('/user/:firstname',(req,res)=>{
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


router.delete('/user/:name',(req,res)=>{
    controller.deleteUser(req,res);
});

router.post('/login',(req,res)=>{
    controller.login(req,res);
})

module.exports=router;