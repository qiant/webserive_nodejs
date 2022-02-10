const sql = require('./db.js');

// constructor
const Resume = function(resume) {
    this.name = resume.name;
    this.firstname = resume.firstname; 
    this.lastname = resume.lastname;
    this.title = resume.title; 
    this.company = resume.company;
    this.description = resume.description;
};

// create
Resume.uploadResumeDetails = (newResume, result) => {
    sql.query("INSERT INTO resumes SET ?", newResume, (err, res) => {
        if (err) {
            console.log(`${err}`);
            result(err, null);
            return;
        }

        console.log(`created resume: `, {id: res.insertId, ...newResume});
        result(null, {id: res.insertId, ...newResume});
    });
};

// get
Resume.getResumeById = (id, result) => {
    sql.query(`SELECT * FROM resumes WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log(`${err}`);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(`found resume: ${res[0]}`);
            result(null, res[0]);
            return;
        }
        //not found resume with id
        result({kind: "not_found"}, null)
    });    
};


// get
// In case both first name and last name do not BOTH match a candidate, 
// it should return resumes with matches for both first name and last name 
// independently. I.e. return all matches for John (in first name), 
// and all matches for Doe (in last name)
Resume.getResumeByName = (name, result) => {
    name = name.replace('+', ' ')
    // console.log(`after replace + in qurey name = ${name}`)
    sql.query(`SELECT * FROM resumes WHERE name = '${name}'`, (err, res) => {
        if (err) {
            console.log(`${err}`);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(`found resume: ${res[0]}`);
            result(null, res[0]);
            return;
        } else {
            // to-do
            // search first name and last name seperately
        }
        //not found resume with id
        result({kind: "not_found"}, null)
    });   
};


// update
Resume.updateResumeById = (id, resume, result) => {
    sql.query("UPDATE resumes SET name = ?, firstname = ?, lastname = ?, title = ?, company = ?, description = ? WHERE id = ?", 
        [resume.name, resume.firstname, resume.lastname, resume.title, resume.company, resume.description, id], 
        (err, res) => {
        if (err) {
            console.log(`${err}`);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log(`found resume: ${res[0]}`);
            result(null, res[0]);
            return;
        }
        //not found resume with id
        result({kind: "not_found"}, null)
    });    
};

// delete
Resume.removeResumeById = (id, result) => {
    sql.query(`DELETE FROM resumes WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log(`${err}`);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            console.log(`found resume: ${res[0]}`);
            result({kind : "not_found"}, null);
            return;
        }
        
        console.log(`deleted resume with id: ${id}`)
        result(null, res)
    });    
};

module.exports = Resume;