import {postService} from "../app.js";

export function aboutUsPageLoader() {
    postService.lastPageLoaded.push("about");
    postService.loadMoreBtn.style.display = "none";
    postService.filterDiv.style.display = "none";
    postService.backBtn.style.display = "block";
    // postService.contentDiv.setAttribute("style"," ");
    // postService.contentDiv.setAttribute("class","row");
    postService.result.setAttribute("style","max-width: none; max height: none; display: block ");
    // postService.result.setAttribute("class"," ");
    postService.result.innerHTML = `
    
    <div>
        <h1>About us</h1>
        <h3>Our team consists of 4 developers and 2 QA engineers:</h3>
        <h3>Daniel - Developer
            Boris - Developer
            Sahso - Developer
            Petar - Developer
            Elena - QA engineer 
            Marina - QA engineer</h3
    </div>
    
    `}