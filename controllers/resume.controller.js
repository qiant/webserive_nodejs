const Resume = require('../models/resume.model.js');

exports.uploadResumeDetails = (req, res) => {
    if (!req.body) { 
        res.status(400).send({
            success: false, 
            msg: "resume can not be empty."
        })
    }

    // create a resume
    const resume = new Resume({
        name : req.body.name,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        title : req.body.title,
        company : req.body.company,
        description : req.body.description
    });

    Resume.uploadResumeDetails(resume, (err, data) => {
        if (err) {
            res.status(500).send({
                success: false, 
                msg : err.message || "Error occurred when creating resume."
            });
        } else {
            res.status(200).send({
                success: true, 
                data
            });
        }
    });
};


exports.getResumeById = (req, res) => {

    console.log(`controller getResumeById: ${req.params.id}`);
    if (!req.params.id) {

    }
    Resume.getResumeById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    success: false,
                    msg : `Not found Resume with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    success: false,
                    msg:  `Error retreiving Resume with id ${req.params.id}` 
                })
            }
        } else {
            res.status(200).send({
                success: true,
                data
            });
        }
    });   
};

exports.getResumeByName = (req, res) => {
    Resume.getResumeByName(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    success: false,
                    msg : `Not found Resume with name ${req.params.name}.`
                 });
            } else {
               res.status(500).send({
                    success: false,
                    msg:  `Error retreiving Resume with id ${req.params.name}` 
                })
            }
        } else {
           res.status(200).send({
                success : true,
                data
            })
        }
    });  
};

exports.updateResumeById = (req, res) => {
    Resume.updateResumeById(req.params.id, (err, data) => {
        if (!req.body) {
            res.status(400).send({
                success: false,
                msg : 'Request ID can not be empty!'
             });
        }
        console.log(req.body);
        Resume.updateResumeById(
            req.params.id,
            new Resume(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === 'not_found') {
                        res.status(404).send({
                            msg: `Not found Resume with ID ${req.params.id}.`
                        })
                    } else {
                        res.status(500).send({
                            msg: `Error updating Resume with id ${req.params.id}`
                        })
                    }
                } else {
                    res.status(200).send({
                        success: true,
                        data
                    });
                }
            }
        );
    });
};



exports.removeResumeById = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            success: false,
            msg : 'Request ID can not be empty!'
         });
         return;
    }
    Resume.removeResumeById(req.params.id, (err, data) => { 
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    success : false,
                    msg: `Not found Resume with id ${req.params.id} to delete.`
                });
            } else {
                res.status(500).send({
                    success : false,
                    msg: 'Could not delete Resume with id ' + req.params.id
                });
            }
            
        } else { 
            res.status(200).send({
                success : true,
                msg: `Resume with id ${req.params.id} has been deleted.` 
            })
        }
    }); 
};