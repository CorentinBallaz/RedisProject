const router = require('express').Router();
const controller = require('../controllers');

router.get('/',(req,res)=>{
    controller.saveUser(req,res);
    res.send("testes")
    // controller.getAllRecipes(req,res);
});

// router.get('/user/:username',(req,res)=>{
//
// });
//
//
//
// router.post('/user',(req,res)=>{
//     controller.saveUser(req,res);
// });
//
// router.update('/user/:username',(req,res)=>{
//
// });
//
// router.delete('/user/:username',(req,res)=>{
//
// });

module.exports=router;