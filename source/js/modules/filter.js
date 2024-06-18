import {postService} from "../app.js";


export  let taggedPosts = [];
export let mostPopularPosts = [];
export let oldPosts = [];
export let newestPosts = [];



export function newPostsLoader(posts) {
    postService.selectedFilter = "newPostsLoader";
    newestPosts = posts.slice().sort((a, b) => new Date(b.postingTime) - new Date(a.postingTime));
    document.getElementById("contentPart").innerHTML = "";
    postService.renderPosts(newestPosts);
}
export function oldPostsLoader(posts) {
    postService.selectedFilter = "oldPostsLoader";
    oldPosts = posts.slice().sort((a, b) => new Date(a.postingTime) - new Date(b.postingTime));
    document.getElementById("contentPart").innerHTML = "";
    postService.renderPosts(oldPosts);
}
export function mostPopularPostsLoader(posts) {
    postService.selectedFilter = "mostPopularPostsLoader";
    mostPopularPosts = posts.slice().sort((a, b) => b.stars.length - a.stars.length);
    document.getElementById("contentPart").innerHTML = "";
    postService.renderPosts(mostPopularPosts);
}
export function showTagPosts (posts) {
   
    
    postService.selectedFilter = "showTagPosts";
    let tagInput = document.getElementById("tagInput").value;
    let correctedInput = tagInput.split(/[\s,]+/).map(tag => tag.trim()).filter(tag => tag);
    

    posts.forEach(post => {
    if (Array.isArray(post.tags) && post.tags.some(tag => correctedInput.includes(tag))) {
        // console.log("Match found for Post:", post);
        taggedPosts.push(post);
    }});

    console.log(taggedPosts)
    document.getElementById("contentPart").innerHTML = "";
    postService.renderPosts(taggedPosts);
    

    console.log("CONSOLE LOGGEd")
    
}
    