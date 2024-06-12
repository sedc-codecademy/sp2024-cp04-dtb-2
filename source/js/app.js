import { Posts } from "./modules/posts.js";
import { Users } from "./modules/users.js";
import { getDataFromJson } from "./modules/dataService.js";
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
                <img class="card-img-top img-fluid" src="${x.imgSrc}" style="max-width: 20vw; max-height: fit-content;" alt="Image should be here">
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
    writePosts = (postData)=> {
        for (const item of postData) {
            posts.newPost(`${item.imgSrc}.jpg`, item.title, item.text, item.tags, users.storage[`${item.authorId}`],new Date(item.postingTime));
        }
    }
}

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
posts.printPosts();


users.printUsers();
