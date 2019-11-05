var datum = require('datumbox').factory("ef1d1b5a7a170b3a171929625d799c48");

var parallelContentDetector =  (req,res,next)=>{
  var services = ['SpamDetection','AdultContentDetection','CommercialDetection','EducationalDetection'];
  console.log(req.body.story);
  datum.parallel(req.body.story,services,(err,result)=>{
    if(err){
      return res.status(400).render({"message":"content  detecton service is not working please try later"});
    }
    if(result.includes("spam") || result.includes("adult")){
      return res.status(400).send(
        {
          "message": "Sorry! your content can not be posted because it found to be not suitable for Edushare Platform",
          "contentCategory": result
        }
      )
    }

    next();
  })
}

module.exports = parallelContentDetector;