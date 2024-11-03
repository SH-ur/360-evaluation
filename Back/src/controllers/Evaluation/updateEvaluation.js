const {Evaluation}= require("../../db");

const updEvaluation = async(evaluationId, infoToUpd)=>{
    try {
        if (!evaluationId)return {answer: "We're so sorry, but we need the id to continue"}
        else if(!infoToUpd) return {answer:"We need the info to make the update possible please :)"};

const updating = await Evaluation.findOneAndUpdate({_id: evaluationId}, infoToUpd);

if(!updating)return {answer: "Something went wrong updating the evaluation..."};

return {answer: "Evaluation updated successfully!", results: updating};

    } catch (error) {
        return {error: error?.message};
    }
}

module.exports = updEvaluation;