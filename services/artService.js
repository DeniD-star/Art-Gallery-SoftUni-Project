const Publication = require('../models/Publication');
const User = require('../models/User');


async function getAllArts(){
    return Publication.find({}).lean()
}
async function createPublication(artData){
    const publication = new Publication(artData);

    return publication.save()
}

async function getPublicationById(id){
    return Publication.findById(id).lean()
}
async function editPublication(id, newData){
    const publication = await Publication.findById(id);

    publication.title = newData.title;
    publication.paintingTec = newData.paintingTec;
    publication.picture = newData.picture;
    publication.certificate = newData.certificate;
    
   return publication.save();
   

}


async function deletePublication(id){
    return Publication.findByIdAndDelete(id);
}
async function sharePublication(publicationId, userId){
    const publication = await Publication.findById(publicationId);
    const user = await User.findById(userId);
    publication.usersShared.push(user);

    return publication.save()
}

module.exports = {
    getAllArts,
    createPublication,
    getPublicationById,
    editPublication,
    deletePublication,
   sharePublication
}