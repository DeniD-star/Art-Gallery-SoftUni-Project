const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
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
module.exports = router;