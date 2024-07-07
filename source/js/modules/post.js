import { Comment } from "./comment.js";

import { Base } from "./base.js"
import { postService } from "../app.js";
export class Post extends Base{
    constructor(id, imgSrc, title, text, tags, authorId, stars, postingTime = new Date().toISOString().slice(0, 10)){
        super(id);
        this.imgSrc = imgSrc;
        this.title = title;
        this.text = text;
        this.tags = Array.isArray(tags) ? tags : [tags];
        this.authorId = authorId;
        this.stars = stars;
        this.comments = [];
        this.postingTime = postingTime;
    }

    addComment = (name, comment) => this.comments.push(new Comment(comment, name));
    // displayComments() {
    //     document.getElementById("addedComments").innerHTML += `
    //     it works
    //     `;
        
        
    // }


    addStar = (userId) => !this.stars.some(x => x.userId = userId) ? this.stars.Push(userId)
                                                                   : `This post already has a star from user with id ${userId}.`;

}