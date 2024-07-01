import {postService} from "../app.js";


export  let taggedPosts = [];
export let mostPopularPosts = [];
export let oldPosts = [];
export let newestPosts = [];
export let filteredPosts = [];


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
    let postsWithStars = posts.filter(post => post.stars !== undefined && post.stars !== null);
    mostPopularPosts = postsWithStars.slice().sort((a, b) => {
        return b.stars.length - a.stars.length; 
    });
    document.getElementById("contentPart").innerHTML = "";
    postService.renderPosts(mostPopularPosts);
}
export function showTagPosts (posts, selectedTags) {
   
    postService.selectedFilter = "showTagPosts";
    taggedPosts = [];

    posts.forEach(post => {
        if (Array.isArray(post.tags) && post.tags.some(tag => selectedTags.includes(tag))) {
            taggedPosts.push(post);
        }
    });

    document.getElementById("contentPart").innerHTML = "";
    postService.renderPosts(taggedPosts);    
}
export function searchPostsLoader(posts) {
    postService.selectedFilter = "searchedPosts";
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchInput) || post.text.toLowerCase().includes(searchInput));
    document.getElementById("contentPart").innerHTML = "";
    postService.renderPosts(filteredPosts);
}