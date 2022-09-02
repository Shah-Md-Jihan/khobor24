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
                                <p class="card-text">${post.details.slice(0, 400)}...</p>
                                
                            </div >
                            <div class="row d-flex justify-content-start align-items-center py-3">
                                <div class="col-md-3 d-flex">
                                    <div class="w-25">
                                        <img src="${post.author.img}" class="w-100 rounded-5" alt="not found">
                                    </div>
                                    <div class="w-75">
                                        <small class="ms-2">${post.author.name}</small><br>
                                        <p class="ms-2"><small>${post.author.published_date}</small></p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <p><i class="fa-regular fa-eye"></i><span class="ms-2">${post.total_view}</span></p>
                                </div>
                                <div class="col-md-3">
                                    <p>
                                        ${post.rating.number}
                                        <span class="text-warning ms-2">
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star-half-stroke"></i>
                                        </span>
                                    </p>
                                </div>
                                <div class="col-md-3">
                                    <p class="text-danger ms-5"><i class="fa-solid fa-arrow-right-long"></i></p>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
    `;
        newsContainer.appendChild(newsDiv);
        console.log(post);
    });
}
loadCategories();