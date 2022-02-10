module.exports = app => {
    const resumes = require('../controllers/resume.controller.js');

    var router = require("express").Router();

    // create a new resume
    router.post('/uploadResumeDetails', resumes.uploadResumeDetails);

    // retrieve one resume by id
    router.get('/getResumeById/:id', resumes.getResumeById);

    // retreive resume(s) by name 
    router.get('/getResumeByName/:name', resumes.getResumeByName);

    // update a resume
    router.put('/updateResumeById/:id', resumes.updateResumeById);

    // delete a resume by id
    router.delete('/removeResumeById/:id', resumes.removeResumeById);

    app.use('/api', router);
};