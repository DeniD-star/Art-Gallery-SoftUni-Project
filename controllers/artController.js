const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { getUserByUsername } = require('../services/userService');
const { parseError } = require('../util/parse');

router.get('/catalog', async (req, res) => {
    const arts = await req.storage.getAllArts()
    res.render('gallery', { arts })
})


router.get('/create', isUser(), (req, res) => {
    res.render('create')
})
router.post('/create', isUser(), async (req, res) => {
    try {
        const artData = {
            title: req.body.title,
            paintingTec: req.body.paintingTec,
            picture: req.body.picture,
            certificate: req.body.certificate,
            author: req.user._id,
            authorUsername: req.user.username,
            usersShared: []
        }

        await req.storage.createPublication(artData);
        res.redirect('/arts/catalog')
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            artData: {
                title: req.body.title,
                paintingTec: req.body.paintingTec,
                picture: req.body.picture,
                certificate: req.body.certificate,
            }
            }
       

        res.render('create', ctx)
    }
})


router.get('/details/:id', async(req, res)=>{
    try {
        const publication = await req.storage.getPublicationById(req.params.id);
        publication.hasUser = Boolean(req.user);
        publication.isAuthor = req.user && req.user._id == publication.author;
        publication.shared = req.user && publication.usersShared.find(x=> x._id == req.user._id)
       

    res.render('details', {publication})
    } catch (err) {
        console.log(err.message);
        res.redirect('/arts/404')
    }
})

router.get('/404', (req, res)=>{
    res.render('404')
})


router.get('/edit/:id', isUser(), async(req, res)=>{
    const publication = await req.storage.getPublicationById(req.params.id)
    res.render('edit', {publication})
})
router.post('/edit/:id', isUser(), async(req, res)=>{
  try {

    const publication = await req.storage.getPublicationById(req.params.id)
        if(publication.author != req.user._id){
            throw new Error('You can not edit a publication you have not created!')
        }
       
    await req.storage.editPublication(req.params.id, req.body)

        res.redirect('/arts/details/' + req.params.id)
  } catch (err) {
    const ctx = {
        errors: parseError(err),
        publication: {
            _id: req.params.id,
            title: req.body.title,
            paintingTec: req.body.paintingTec,
            picture: req.body.picture,
            certificate: req.body.certificate,
           
        }
    }
    res.render('edit', ctx)
  }
})

router.get('/delete/:id', isUser(), async(req, res)=>{
    try {
        const publication = await req.storage.getPublicationById(req.params.id)
        if(publication.author != req.user._id){
            throw new Error('You can not delete a publication you have not created!')
        }

        await req.storage.deletePublication(req.params.id)
        res.redirect('/arts/catalog');
       
    } catch (err) {
        console.log(err.message);
        res.redirect('/arts/404')
    }
})


router.get('/share/:id', isUser(), async(req, res)=>{
    try {
        const publication = await req.storage.getPublicationById(req.params.id)
        if(publication.author == req.user._id){
            throw new Error('You can not share your own publication!')
        }

        await req.storage.sharePublication(req.params.id, req.user._id);
        res.redirect('/arts/details/' + req.params.id)
    } catch (err) {
        console.log(err.message);
        res.redirect('/arts/404')
    }
})
module.exports = router;