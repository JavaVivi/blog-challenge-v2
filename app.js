const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Load the full build.
const _ = require('lodash');
const mongoose =  require('mongoose');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nibh mattis, cursus erat varius, rutrum justo. Donec aliquam lectus nec porttitor rutrum. Donec a purus suscipit velit interdum tempus at auctor odio. Sed dignissim dignissim lobortis. Vestibulum non lacinia nisi. Maecenas tincidunt sem ac quam consequat, id tincidunt quam dignissim.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nibh mattis, cursus erat varius, rutrum justo. Donec aliquam lectus nec porttitor rutrum. Donec a purus suscipit velit interdum tempus at auctor odio. Sed dignissim dignissim lobortis. Vestibulum non lacinia nisi. Maecenas tincidunt sem ac quam consequat, id tincidunt quam dignissim.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nibh mattis, cursus erat varius, rutrum justo. Donec aliquam lectus nec porttitor rutrum. Donec a purus suscipit velit interdum tempus at auctor odio. Sed dignissim dignissim lobortis. Vestibulum non lacinia nisi. Maecenas tincidunt sem ac quam consequat, id tincidunt quam dignissim.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/blogDB');

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/', function(req, res) {
  Post.find({}, function(err, posts){
   res.render("home", {
     startingContent: homeStartingContent,
     posts: posts
     });
 })
})

app.get('/about', function(req, res) {
  res.render("about", {aboutContent : aboutContent});
})

app.get('/contact', function(req, res) {
  res.render("contact", {contactContent : contactContent});
})

app.get('/compose', function(req, res) {
  res.render("compose");
})

app.post('/compose', function(req, res){
  const post = new Post({
    title: req.body.title,
    post: req.body.post,
  });
  post.save(function(err){
   if (!err){
     res.redirect("/");
   }
 });
})

app.get('/posts/:postId', function(req, res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){
   res.render("post", {
     title: post.title,
     content: post.content
   });
 });
})

app.listen(3000, function(){
  console.log("Server running on port 3000.");
})
