const express = require("express")
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = new mongoose.model('Article', articleSchema);

//////////////////// Requests Targeting All Article /////////////////////////

app.route("/articles")
.get(function (req, res) {
    async function allArticles() {
        try {
            res.send(await Article.find({}));
        } catch (error) {
            console.error("Error, couldn't find the articles.");
            res.send(error);
        }
    }
    allArticles();
})

.post(async function (req, res) {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const savedArticle = await newArticle.save();
        res.send("Successfully added a new article.");
    } catch (err) {
        res.send(err);
    }
})

.delete(function (req, res) {
    async function deleteAllArticles() {
        try {
            await Article.deleteMany({});
            res.send("Successfully deleted all articles.");
        } catch (err) {
            res.send(err);
        }
    }
    deleteAllArticles();
});

//////////////////// Requests Targeting A Specific Article /////////////////////////

app.route("/articles/:articleTitle")
.get(function(req, res) {
const articleTitle = req.params.articleTitle;

async function getArticle() {
    try {
        const foundArticle = await Article.findOne({title: articleTitle});
        if (foundArticle) {
            res.send(foundArticle);
        } else {
            res.send("No articles match that title");
        }
    } catch (err) {
        res.send(err);
    }
}
getArticle();
})

.put(function(req, res) {
    async function updateArticle() {
        try {
           const updatedArticle = await Article.updateOne(
                {title: req.params.articleTitle},
                {title: req.body.title, content: req.body.content},
                {overwrite: true}
            );
            res.send("Successfully updated the article.");
        } catch (err) {
            res.send(err);
        }
    }
    updateArticle();
})

.patch(function(req, res) {
    async function updateSpecificArticle() {
        try {
            const updatedContent = await Article.updateOne(
                {title: req.params.articleTitle},
                {$set: req.body}
            );
            if(updatedContent.modifiedCount > 0) {
                res.send("Successfully updated the article content.");
            } else {
                res.send("Sorry didn't update.");
            }
        } catch (err) {
            res.send(err);
        }
    }
    updateSpecificArticle();
})

.delete(function(req, res) {
    async function deleteSpecificArticle() {
        try {
            await Article.deleteOne({title: req.params.articleTitle});
            res.send("Successfully deleted the selected article");
        } catch (err) {
            res.send(err);
        }
    }
    deleteSpecificArticle();
});


app.listen(port, function () {
    console.log("Server started on port 3000");
});