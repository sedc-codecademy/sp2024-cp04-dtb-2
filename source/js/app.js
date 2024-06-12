import { Posts } from "./modules/posts.js";
import { Users } from "./modules/users.js";

class PostService {
    constructor(){
        this.logoBtn = document.getElementById('logoBtn');
        this.homeBtn = document.getElementById('homeBtn');
        this.aboutBtn = document.getElementById('aboutBtn');
        this.logInBtn = document.getElementById('logInBtn');
        this.searchBtn = document.getElementById('searchBtn');
        this.darkModeBtn = document.getElementById('darkModeBtn');
        this.result = document.getElementById('contentPart');
    }
    renderPosts = (posts) => {
        this.result.innerHTML = '';

        let copy = [...posts];
        copy.forEach(x => {
            this.result.innerHTML += 
            `
            <div class="card" style="width: 55vw">
                <img class="card-img-top img-fluid" src="${x.imgSrc}" style="max-width: fit-content; max-height: fit-content;" alt="Image should be here">
                    <div class="card-body title">
                        <h6></h6>
                        <a class="post-link" href="#"><h5 class="card-title">${x.title}</h5></a>
                        <p class="card-text">Do you want to read more?</p>
                    </div>
                </div>
                <hr class="post-line">
            `;
        });
    }
}

const users = new Users();
const posts = new Posts();
const postService = new PostService();

users.newUser("Sasho", "Popovski", "example@mail.com", "easyGuessPassword123");
users.newUser("David", "Davidsky", "example2@mail.com", "easyGuessPassword1234");
posts.newPost("source/data/postImgs/stockMoneyMan.jpg", "This man predicts stock prices like a fortune teller.", "Pay for more", ["stock"], users.storage[0].id);
posts.newPost("source/data/postImgs/AITeacher.jpg", "How this professor teaches AI and thinks about the future of human creativity", "Pay for more", ["AI"], users.storage[1].id);
posts.newPost("source/data/postImgs/applePost.jpg", "Apple goes trending after releasing the latest version of IOS", "Pay for more", ["AI", "apple"], users.storage[0].id);
posts.newPost("source/data/postImgs/appleAi.jpg", "Elon musk is threathening to block IOS users from his platforms after the latest update", "Pay for more", ["elon musk", "apple"], users.storage[1].id);

postService.renderPosts(posts.storage);
users.printUsers();
posts.printPosts();
console.log("Hello");
