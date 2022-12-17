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
module.exports = router;