import { Posts } from "./modules/posts.js";
import { Users } from "./modules/users.js";
import { getDataFromJson } from "./modules/dataService.js";
import { mostPopularPostsLoader, newPostsLoader, oldPostsLoader, showTagPosts, taggedPosts, mostPopularPosts, oldPosts, newestPosts, searchPostsLoader, filteredPosts, authorPostsLoader, postsByAuthor } from "./modules/filter.js";

class ModalService {
    constructor(){
        this.currentUser = this.removeSession();
    }

    emptySession(){
        let user = users.emptyUser();
        const {firstName, lastName, email, password, isSubscribed} = user;
        console.log(`Current session user:
        \nfirst name:${firstName}
        \nlast name: ${lastName}
        \nemail: ${email}
        \npassword: ${password}
        \nisSubscribed: ${isSubscribed}`);
        return user;
    }
    removeSession = () => this.currentUser = this.emptySession();
}
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
        this.loadMoreBtn = document.getElementById("loadMoreBtn");
        this.firstScrollReached = false;
        this.filterDiv = document.getElementById("filterDiv");
        this.backBtn = document.getElementById("backBtn");
        
        homeBtn.addEventListener('click',()=>{
            newPostsLoader(posts.storage,posts.selectedFilter)
            this.loadMoreBtn.style.display = 'block';

        });

        window.addEventListener('scroll', function() {
            if(postService.selectedFilter == null){
                return;
            } else if(typeof postService.selectedFilter === 'string'){
                // Check if the user has scrolled to the bottom
                if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 0.9) {
                    if (!this.firstScrollReached) {
                        // First scroll to the bottom
                        this.firstScrollReached = true;
                    } else {
                        // Second scroll to the bottom
                        this.firstScrollReached = false; // Reset for future double scroll detection
        
                        // Show loading indicator
                        setTimeout(() => postService.loadingIndicator.style.visibility = 'visible', 200);
        
                        // Load more posts
                        setTimeout(() => {
                            postService.loadingIndicator.style.visibility = 'hidden';
                            switch (postService.selectedFilter) {
                                case "newPostsLoader":
                                    postService.loadMore(newestPosts);
                                    break;
                                case "oldPostsLoader":
                                    postService.loadMore(oldPosts);
                                    break;
                                case "mostPopularPostsLoader":
                                    postService.loadMore(mostPopularPosts);
                                    break;
                                case "showTagPosts":
                                    postService.loadMore(taggedPosts);
                                    break;
                                case "searchedPosts":
                                    postService.loadMore(filteredPosts);
                                    break;
                                case "authorPosts":
                                    postService.loadMore(postsByAuthor);
                                    break;
                                default:
                                    postService.loadMore(posts.storage);  // -- obsolete
                                    break;
                            }
                        }, 1250);
                    }
                }
            }
        });
  }
        selectedFilter = "newPostLoader";
        initialPosts = 12;
        loadPosts = 12;
        rowCounter =0;
        idCounter = 0;
        loadedPosts = [];
        loadedSinglePost = null;
        

        renderPosts = (posts) => {
            let copies = [...posts];
            console.log(posts)
            console.log("second posts")
            this.counter = 0;
         
            for (let x of copies) {            
    
                if (this.counter < this.initialPosts) {
                         
                    this.result.innerHTML += `
                        <div class="card" style="width: 25vw" id="card-${x.id}">
                            <img class="card-img-top img-fluid imgLink" src="${x.imgSrc}" style="object-fit: fill; height: 20vw;" alt="Image should be here" value="${x.id}">
                            <div class="card-body title">
                                <a class="post-link"  value="${x.id}"><h5 class="card-title">${x.title}</h5></a>
                                <p class="card-text">Do you want to read more?</p>
                            </div>
                            <div class="card-body icons">
                                <div>
                                    <img src="./source/data/icons/star.svg" alt="Star Icon">
                                    <p>${x.stars.length}Stars</p>
                                </div>
                                <div>
                                    <img src="./source/data/icons/chat-right.svg" alt="Comment Icon">
                                    <p>Comments</p>
                                </div>
                        </div>  
                    `;
    
                    this.loadedPosts.push(x);
                    this.idCounter++;
                }
                this.rowCounter++;
                this.counter++;
            }
            let titlePostOpener = document.getElementsByClassName("post-link");
            Array.from(titlePostOpener).forEach(function(element) {
            element.addEventListener('click', getPostId);
            });
            let imgPostOpener = document.getElementsByClassName("imgLink");
            Array.from(imgPostOpener).forEach(function(element) {
            element.addEventListener('click', getPostId);
            });
        }
        renderSinglePost = (post) =>{
            window.scrollTo(0,0);
            this.loadMoreBtn.style.display = "none";
            this.filterDiv.style.display = "none";
            this.backBtn.style.display = "block";

            this.result.innerHTML = `<div class="singleCard mb-3" id="singlePostId">
    <div class="row g-0">
      <div class="col-md-5">
        <img src=${post.imgSrc} id="postImage" class="img-fluid rounded-start" alt="Relevant Picture">
      </div>
      <br>
      <div class="col-md-7">
        <div class="singleCard-body">
          <h2 class="card-title card-header"> ${post.title}</h2>
          <small>Created by - <a style="color: blue"  id="postAuthorId">${post.authorId.fullName()}</a> on ${post.postingTime}  </small><br>
          <small>tags- ${post.tags}</small>
          <hr>
          <p class="singleCard-text">${post.text}</p>
          <div class="card" style="width: 70vw;">
        </div>
      </div>
    </div>
  </div>
  <br>
  <br>
    
    <div class="comments">
        <!-- Existing comments... -->
            <div class="comments">
        <!-- Logged-in user comment -->
        <div class="comment">
            <span class="user">John Doe (Logged In)</span>
            <span class="date">Posted on June 14, 2024</span>
            <p>This is a great article! Keep up the good work.</p>
            <button class="like-button">Like</button>
        </div>

        <!-- Anonymous user comment -->
        <div class="comment">
            <span class="user">Anonymous</span>
            <span class="date">Posted on June 15, 2024</span>
            <p>Interesting read. Thanks for sharing!</p>
            <button class="like-button">Like</button>
        </div>

        <!-- Add more comments here... -->
    </div>
        <!-- Comment form -->
        <div class="comment-form">
            <h3>Add a Comment</h3>
            <form id="commentForm">
                <label for="commentText">Your Comment:</label>
                <input type="text" id="commentText" name="commentText" placeholder="Type your comment here...">
                <label for="anonymous">Comment Anonymously:</label>
                <input type="checkbox" id="anonymous" name="anonymous">
                <button type="submit">Post Comment</button>
            </form>
        </div>
    </div>
    <br><br><hr>
                        <div class="ad-banner">
        <h1>QINSHIFT</h1>
        <p>The Change Begins Here! <a href="https://qinshiftacademy.com/">Click to learn more</a></p>
    </div><hr><br>`

    document.getElementById("postAuthorId").addEventListener('click',()=>{
        authorPostsLoader(posts.storage, this.loadedSinglePost.authorId);
    });
let testComment = document.getElementById("commentForm");

testComment.addEventListener("click", function (e) {
    e.preventDefault();
    const commentText = document.getElementById("commentText").value;
    const isAnonymous = document.getElementById("anonymous").checked;

    // Process the comment (you can send it to a server or handle it as needed)
    console.log("Comment:", commentText);
    console.log("Anonymous:", isAnonymous);
});
        }

        loadMore = (posts) => {
            let postsToLoad = posts.filter(post => !this.loadedPosts.includes(post));
            this.renderPosts(postsToLoad.slice(0, this.loadPosts));
        }
    writePosts = (postData)=> {
        for (const item of postData) {
            posts.newPost(`${item.imgSrc}.jpg`, item.title, item.text, item.tags, users.storage[`${item.authorId}`], item.stars, item.postingTime);
        }
    }
    
    openPost (postId){
        let post = posts.storage.find(x=> x.id == postId);
        this.loadedSinglePost = post;
        this.renderSinglePost(post);
    }
} 
let getPostId = function(){
        let postId = this.getAttribute("value");
        postService.selectedFilter = null;
        postService.openPost(postId);
}
loadMoreBtn.addEventListener("click", function () {
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
        
    } else if (postService.selectedFilter == "searchedPosts") {
        postService.loadMore(filteredPosts);
    }else {
        postService.loadMore(posts.storage);
    }
});

const users = new Users();
const posts = new Posts();
const postService = new PostService();
const modalService = new ModalService();

modalService.removeSession();

const userJsonPath = "source/data/json/userDATA.json";
const postJsonPath = "source/data/json/postData.json";
const userData = await getDataFromJson(userJsonPath);
users.writeUsers(userData);
users.newUser("Sasho", "Popovski", "example@mail.com", "easyGuessPassword123", true);
users.newUser("Daniel", "Petrov", "example2@mail.com", "easyGuessPassword1234");
users.newUser("Boris","Krstovski",'borisk@lala.com','123456');
users.newUser("Test","Testing",'test@lala.com','123456');

const postData = await getDataFromJson(postJsonPath);
postService.writePosts(postData)

newPostsLoader(posts.storage,posts.selectedFilter);

// posts.newPost("source/data/postImgs/3.jpg", "This man predicts stock prices like a fortune teller.", "Pay for more", ["stock"], users.storage[30], new Date(1992,11,20,8,30));
// posts.newPost("source/data/postImgs/20.jpg", "How this professor teaches AI and thinks about the future of human creativity", "Pay for more", ["AI"], users.storage[50]);

// postService.renderPosts(posts.storage.sort(x=> x.postingTime ));
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
document.getElementById("srcIcon").addEventListener("click", function() {
    // if(document.getElementById("searchInput").getAttribute("style") == "display:none"){
    //     document.getElementById("searchInput").setAttribute
    // }
    searchPostsLoader(posts.storage);
});


document.getElementById("tagFilter").addEventListener("click", function() {
    console.log("it worksz");
    var tagDropdown = document.getElementById('tagFilterDropdown');
    if (tagDropdown.style.display === 'none' || tagDropdown.style.display === '') {
        tagDropdown.style.display = 'block';
    } else {
        tagDropdown.style.display = 'none';
    }
});


// Hide tag filter dropdown when clicking outside of it
document.addEventListener("click", (event) => {
    var filterDiv = document.getElementById('filterDiv');
    var tagDropdown = document.getElementById('tagFilterDropdown');
    var isClickInsideFilterDiv = filterDiv.contains(event.target);
    var isClickInsideDropdown = tagDropdown.contains(event.target);
    var tagClickCheck = true; 
    
    if (!isClickInsideFilterDiv && !isClickInsideDropdown) {
        tagDropdown.style.display = 'none';
        tagClickCheck = false;
    }
    const selectedTags = Array.from(document.querySelectorAll('.form-check-input:checked')).map(cb => cb.value);
    if (selectedTags.length > 0 ) {
        // showTagPosts(posts.storage, selectedTags);
        if (tagClickCheck == true) {
            showTagPosts(posts.storage, selectedTags);
        }
        tagClickCheck = false; 
    } else {    
            // postService.renderPosts(posts.storage);
    }  
});


let mybutton = document.getElementById("backToTopBtn")
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

console.log(postData);
export {postService};




//display modal function
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

// hide modal function

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 500);
}

//sign up modal storing entered values
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let registeredFirstname = document.getElementById('signUpFirstName').value;
    let registeredLastName = document.getElementById('signUpLastName').value;
    let registeredEmail = document.getElementById('signUpEmail').value;
    let registeredPassword = document.getElementById('signUpPassword').value;
    console.log(registeredFirstname, registeredLastName, registeredEmail, registeredPassword);
    if(!users.storage.some(x => x.email === registeredEmail)){
        console.log('User Signed Up:', { registeredEmail, registeredPassword });
        users.newUser(registeredFirstname, registeredLastName, registeredEmail, registeredPassword);
        alert("Successfully registered!");
        document.getElementById('signUpForm').reset();
        hideModal('signUpModal');
    } else{
        alert("Email is already registered, please try logging in or use a different email!");
        document.getElementById('signUpForm').reset();
    }
});

// login modal logic for checking values from signup modal
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    console.log(email, password);

    if (users.storage.some(x => x.email === email &&
                                x.password === password)) 
    {
        
        modalService.currentUser = users.storage.find(x => x.email === email &&
                                                           x.password === password);
        updateNavbar();
        hideModal('loginModal');
    } else {
        alert('Invalid username or password. Please try again.');
    }

    document.getElementById('loginForm').reset();
});

//changes the logout button
document.getElementById('logoutBtn').addEventListener('click', function() {
    modalService.removeSession();
    updateNavbar();
});

//displayes the currently subscribed email in the unsubscribe modal
document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    newsletterEmail = document.getElementById('newsletterEmail').value;

    console.log('Subscribed to Newsletter:', { newsletterEmail });

    document.getElementById('newsletterForm').reset();
    hideModal('subscribeModal');
});

//logic for showing aproppriate modal for newsletter
document.getElementById('unsubscribeBtn').addEventListener('click', function() {
    newsletterEmail = '';
    hideModal('unsubscribeModal');
    showModal('subscribeModal');
});

//changes the button from login to logout and displays the currently loggin user
function updateNavbar() {
    const loggedInUser = document.getElementById('loggedInUser');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const createPostBtn = document.getElementById('createPostBtn');

    if (modalService.currentUser.firstName != null) {
        loggedInUser.textContent = `Logged in as: ${modalService.currentUser.fullName()}`;
        loginBtn.style.display = 'none';
        createPostBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'inline-block';
    } else {
        loggedInUser.textContent = 'You\'re not logged in!';
        loginBtn.style.display = 'inline-block';
        createPostBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}

//logic frr displaying newsletter and and NL unsubscribe modal
document.getElementById('newsletterBtn').addEventListener('click', function() {
    if (newsletterEmail) {
        document.getElementById('currentEmail').textContent = newsletterEmail;
        showModal('unsubscribeModal');
    } else {
        showModal('subscribeModal');
    }
});

//login event listener
document.getElementById('loginBtn').addEventListener('click', function() {
    showModal('loginModal');
});

document.getElementById('showSignUpBtn').addEventListener('click', function() {
    hideModal('loginModal');
    showModal('signUpModal');
});

//closing open modals when clinked on the background
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function(event) {
        const modal = event.target.closest('.modal');
        hideModal(modal.id);
    });
});

window.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal.show');
    if (modal && event.target === modal) {
        hideModal(modal.id);
    }
});

//updates the navbar
updateNavbar();
