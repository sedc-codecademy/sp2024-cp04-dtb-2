import { Posts } from "./modules/posts.js";
import { Users } from "./modules/users.js";
import { getDataFromJson } from "./modules/dataService.js";
import { mostPopularPostsLoader, newPostsLoader, oldPostsLoader, showTagPosts, taggedPosts, mostPopularPosts, oldPosts, newestPosts } from "./modules/filter.js";
class PostService {
    constructor(){
        this.logoBtn = document.getElementById('logoBtn');
        this.homeBtn = document.getElementById('homeBtn');
        this.aboutBtn = document.getElementById('aboutBtn');
        this.logInBtn = document.getElementById('logInBtn');
        this.searchBtn = document.getElementById('searchBtn');
        this.darkModeBtn = document.getElementById('darkModeBtn');
        this.result = document.getElementById('contentPart');
        this.loadingIndicator = document.getElementById('loadIndicator');

        window.addEventListener('scroll', function() {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 0.9) {
                this.setTimeout(() => postService.loadingIndicator.style.visibility = 'visible', 200)
                
                this.setTimeout(() => {
                    postService.loadingIndicator.style.visibility = 'hidden';
                    if (postService.selectedFilter == "newPostsLoader") {
                        postService.loadMore(newestPosts);
                        console.log("first");
                    } else if (postService.selectedFilter == "oldPostsLoader") {
                        postService.loadMore(oldPosts);
                        console.log("second");
                    } else if (postService.selectedFilter == "mostPopularPostsLoader") {
                        postService.loadMore(mostPopularPosts);
                        console.log("third");
                    } else if (postService.selectedFilter == "showTagPosts") {
                        postService.loadMore(taggedPosts);
                        
                    } else {
                        postService.loadMore(posts.storage);
                    }
                }, 1250);
            }
        });
    }
        selectedFilter = "newPostLoader";
        initialPosts = 12;
        loadPosts = 12;
        rowCounter =0;
        idCounter = 0;
        loadedPosts = [];
        

        renderPosts = (posts) => {
            let copies = [...posts];
            console.log(posts)
            console.log("second posts")
            this.counter = 0;
         
            for (let x of copies) {            
    
                if (this.counter < this.initialPosts) {
                         
                    this.result.innerHTML += `
                        <div class="card" style="width: 25vw" id="card-${this.idCounter}">
                            <img class="card-img-top img-fluid" src="${x.imgSrc}" style="max-width: 20vw; max-height: fit-content;" alt="Image should be here">
                            <div class="card-body title">
                                <h6></h6>
                                <a class="post-link" href="#"><h5 class="card-title">${x.title}</h5></a>
                                <p class="card-text">Do you want to read more?</p>
                            </div>
                        </div>  
                    `;
    
                    this.loadedPosts.push(x);
                    this.idCounter++;
                }
                this.rowCounter++;
                this.counter++;
            }
        }

        loadMore = (posts) => {
            let postsToLoad = posts.filter(post => !this.loadedPosts.includes(post));
            this.renderPosts(postsToLoad.slice(0, this.loadPosts));
        }
    writePosts = (postData)=> {
        for (const item of postData) {
            posts.newPost(`${item.imgSrc}.jpg`, item.title, item.text, item.tags, users.storage[`${item.authorId}`],new Date(item.postingTime));
        }
    }
}
document.getElementById("loadMoreBtn").addEventListener("click", function () {
    console.log(postService.selectedFilter)
    if (postService.selectedFilter == "newPostsLoader") {
        postService.loadMore(newestPosts);
        console.log("first");
    } else if (postService.selectedFilter == "oldPostsLoader") {
        postService.loadMore(oldPosts);
        console.log("second");
    } else if (postService.selectedFilter == "mostPopularPostsLoader") {
        postService.loadMore(mostPopularPosts);
        console.log("third");
    } else if (postService.selectedFilter == "showTagPosts") {
        postService.loadMore(taggedPosts);
        
    } else {
        postService.loadMore(posts.storage);
    }
});

const users = new Users();
const posts = new Posts();
const postService = new PostService();


const userJsonPath = "source/data/json/userData.json";
const postJsonPath = "source/data/json/postData.json";
const userData = await getDataFromJson(userJsonPath);
users.writeUsers(userData);
users.newUser("Sasho", "Popovski", "example@mail.com", "easyGuessPassword123", true);
users.newUser("Daniel", "Petrov", "example2@mail.com", "easyGuessPassword1234");
users.newUser("Boris","Krstovski",'borisk@lala.com','123456');
users.newUser("Test","Testing",'test@lala.com','123456');

const postData = await getDataFromJson(postJsonPath);
postService.writePosts(postData);

posts.newPost("source/data/postImgs/3.jpg", "This man predicts stock prices like a fortune teller.", "Pay for more", ["stock"], users.storage[30], new Date(1992,11,20,8,30));
posts.newPost("source/data/postImgs/20.jpg", "How this professor teaches AI and thinks about the future of human creativity", "Pay for more", ["AI"], users.storage[50]);

postService.renderPosts(posts.storage);
// posts.printPosts();

// users.printUsers();
document.getElementById("newFirst").addEventListener("click", function(){
    newPostsLoader(posts.storage,posts.selectedFilter);
})
document.getElementById("oldFirst").addEventListener("click", function(){
    oldPostsLoader(posts.storage,posts.selectedFilter);
})
document.getElementById("mostPopular").addEventListener("click", function(){
    mostPopularPostsLoader(posts.storage,posts.selectedFilter);
})

document.getElementById("byTag").addEventListener("click",function(){
    document.getElementById('tagFilterDiv').classList.toggle('d-none');
})
document.getElementById('tagSearchBtn').addEventListener('click', () => {
    showTagPosts(posts.storage,posts.selectedFilter);
});


export {postService};