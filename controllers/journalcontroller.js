// requiring required files
const Journal = require ('../models/Journal');
const User = require ("../models/User");

// get route 
const getJournal = (req, res)=>{
    // console.log(req.params.id);
    // console.log(req.headers);
    try {
        User.findOne({_id:req.params.id}).populate("journals")
        .then(dbJournal=>{
            console.log(dbJournal.journals)
            res.json(dbJournal.journals);
        }) 
    } catch (error) {
        console.log(error)
     }

}
// post or creating journal
const createJournal =  (req, res)=>{
    console.log(req.body);
    if(req.body.userId === undefined) return res.status(500).json({message:"user is not authenticated"});
    try {
        const result = Journal.create({
            name : req.body.journal,
            user:req.body.userId
        })
        .then(({ _id }) => User.findOneAndUpdate({_id:req.body.userId}, { $push: { journals: _id } }, { new: true }))
        .then()
        res.json(result);
    } catch (error) {
        console.log(error)
    }
   
}
const updateJournal =  (req, res)=>{
    console.log(req.body);
   
}
const deleteJournal =  (req, res)=>{
    console.log(req.params.id);
   
   
}
module.exports={getJournal, createJournal, updateJournal, deleteJournal};