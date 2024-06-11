import { Comment } from "./comment.js";
import { Star } from "./star.js";
import { Base } from "./base.js"
export class Post extends Base{
    constructor(id, imgSrc, title, text, tags, authorId){
        super(id)
        this.imgSrc = imgSrc;
        this.title = title;
        this.text = text;
        this.tags = [].push(...tags);
        this.authorId = authorId
        this.stars = []
        this.comments = []
    }

    addComment = (name, comment) => this.comments.Push(new Comment(comment, name));
    addStar = (userId) => !this.stars.some(x => x.userId = userId) ? this.stars.Push(new Star(userId))
                                                                   : `This post already has a star from user with id ${userId}.`;

}