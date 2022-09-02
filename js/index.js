const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    displayCategories(data.data.news_category);
}
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category_container');
    categories.forEach(category => {
        const catgoryName = document.createElement('li');
        catgoryName.innerHTML = `
        <a class="cat_name text-danger" onclick="loadCategoryPost(${category.category_id})">${category.category_name}</a>
        
        `;
        categoryContainer.appendChild(catgoryName);
    });
}

// load category post 
const loadCategoryPost = async categoryId => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`);
    const postData = await res.json();

    displayCategoryPost(postData.data);

}

// display category post 
const displayCategoryPost = posts => {
    const newsContainer = document.getElementById('news_container');
    newsContainer.textContent = '';
    posts.forEach(post => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4 p-4">
                            <img src="${post.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8 p-4">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.details}</p>
                                
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div></div>
                                </div>
                                <div class="col-md-3">text</div>
                                <div class="col-md-3">text</div>
                                <div class="col-md-3">text</div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        newsContainer.appendChild(newsDiv);
        console.log(post);
    });
}
loadCategories();