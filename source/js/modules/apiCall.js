export class apiCall {
    
    async fetchPaginatedPosts() {
        let pagiPostUrl = "https://localhost:7073/api/Posts";
        try {
            const response = await fetch(pagiPostUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "pageIndex": 1,
                    "sortBy": "new",
                    "tags": ["AI"]
                }),
            });

            const paginatedPosts = await response.json();
            console.log(paginatedPosts);
            return paginatedPosts;
            
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    async fetchDetailedPost() {
        let detailedPostUrl ="https://localhost:7073/api/Posts/1";
        try {
            const response = await fetch (detailedPostUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "aplication/json",
                }
            })
            const jsonResponse = await response.json();
            console.log(jsonResponse);

        } catch (error) {
            console.error("Error fetching post:", error);
        }
    }

}
