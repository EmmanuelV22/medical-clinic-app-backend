const connectDB = require("../server");

exports.createTreatment = async (req, res, next) => {
    const {patient_id, confirmation , treatment , medicine , quantity , initial_date , exp_date, medical_id , patologies, surgey, finish_treatment} = req.body;
    
    const query =  "INSERT INTO treatment (patient_id, confirmation , treatment , medicine , quantity , initial_date , exp_date, medical_id , patologies, surgey, finish_treatment) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

    const values = [patient_id, confirmation , treatment , medicine , quantity , initial_date , exp_date, medical_id , patologies, surgey, finish_treatment];

    connectDB.query(query, values, (error, results , fields) => {
        if (error){
            return res
            .status(400)
            .json({message: "Error creating treatment", error: error.message});
        }
        return res 
        .status(201)
        .json({ message:"Treatment successful created", treatment: results.insterId});
    });
};

exports.updateTreatment = async (req, res, next) => {
    const {id, patient_id, confirmation , treatment , medicine , quantity , initial_date , exp_date, medical_id , patologies, surgey, finish_treatment, updatedAt} = req.body;
    
    const query =  "UPDATE treatment SET patient_id=?, confirmation=? , treatment=? , medicine=? , quantity=? , initial_date=? , exp_date=?, medical_id=? , patologies=?, surgey=? , finish_treatment=?, updatedAt=? WHERE id=?";

    const values = [ patient_id, confirmation , treatment , medicine , quantity , initial_date , exp_date, medical_id , patologies, surgey, finish_treatment, updatedAt , id];

    connectDB.query(query, values, (error, results , fields) => {
        if (error){
            return res
            .status(400)
            .json({message: "Error updating treatment", error: error.message});
        }
        return res 
        .status(200)
        .json({ message:"Treatment successful updated", treatment: id});
    });
};