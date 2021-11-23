import express from "express";

let User = require('../models/user');
let Complaint = require('../models/complaint');
let ComplaintMapping = require('../models/complaint-mapping');

//admin
router.get('/admin', ensureAuthenticated, (req,res,next) => {
    Complaint.getAllComplaints((err, complaints) => {
        if (err) throw err;
    
        User.getdepartmentName((err, deparment) => {
            if (err) throw err;

            res.render('admin/admin', {
                complaints : complaints,
                department : deparment,
            });
        });
    });        
});

// Assign the Complaint to Deparment

router.post('/assign', (req,res,next) => {
    const complaintID = req.body.complaintID;
    const departmentName = req.body.departmentName;

    req.checkBody('complaintID', 'Contact field is required').notEmpty();
    req.checkBody('departmentName', 'Description field is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('admin/admin', {
            errors: errors
        });
    } else {
        const newComplaintMapping = new ComplaintMapping({
            complaintID: complaintID,
            departmentName: departmentName,
        });

        ComplaintMapping.registerMapping(newComplaintMapping, (err, complaint) => {
            if (err) throw err;
            req.flash('success_msg', 'You have successfully assigned a complaint to Department');
            res.redirect('/admin');
        });
    }

});
