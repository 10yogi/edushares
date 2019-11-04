const Post = require('../../models/post');
const User = require('../../models/user');
const mongoose = require('mongoose');
const {dataUri} = require('../../config/multer-config');
const request = require('request');



var addPost = (req,res)=>{
  console.log(dataUri(req).base64);
  console.log('\n\n\n')
  request.post(
  {
      url:'https://api.imgbb.com/1/upload?key=eef90c3f7459ee85c99a4625dbb986ba',
    form:{
      image: dataUri(req).base64
    }
  },
  function(err,response,body){
    console.log(response.body.data);
    console.log();
    if(response.statusCode != 200){
      console.log("error occure \n"+JSON.stringify(err));
      return res.status(400).json("image can not be uploaded")
    }
    const post = new Post(
      {
        _user: req.user._id,
        imgpath: req.file ? JSON.parse(body).data.url: null,
        story: req.body.story,
        likes: [],
        comments: [],
        date: Date.now(),
      }
    );
    post.save().then(result => {
      // console.log("calling"+JSON.stringify(result));
      return User.updateOne({ _id: mongoose.Types.ObjectId(req.user._id) }, {
        $push: { myposts: result._id },
      });
    }).then(result => {
      return res.redirect('/home');
    }).catch(err => {
        return res.status(400).json(err.message);
    });
  })

};
module.exports = addPost;