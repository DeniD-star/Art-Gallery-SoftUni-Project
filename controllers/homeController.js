const router = require('express').Router();

router.get('/', async(req, res)=>{
    const arts = await req.storage.getAllArts()
    res.render('home')
})

module.exports = router;