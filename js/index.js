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

// sorting item counter start 

const newsItem = (item) => {

    const sortingContainer = document.getElementById('found-item-container');

    sortingContainer.innerHTML = `<h3>${item} news items found</h3>`
}

// sorting item counter end

// load category post 
const loadCategoryPost = async categoryId => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`);
    const postData = await res.json();

    const categoryNewsAlert = document.getElementById('category_news_null_alert');

    if (postData.status === false) {
        categoryNewsAlert.classList.remove('d-none');
        displayCategoryPost(postData.data);
        newsItem(0);

    } else {
        categoryNewsAlert.classList.add('d-none');
        displayCategoryPost(postData.data);
    }


}

// display category post 
const displayCategoryPost = posts => {

    const newsContainer = document.getElementById('news_container');
    newsContainer.textContent = '';
    if (posts.length === 0) {
        return;
    };
    loadSpinner(true);

    let count = 0;
    posts.sort((a, b) => { return b.total_view - a.total_view }).forEach(post => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4 p-4">
                            <img src="${post.thumbnail_url}" class="img-fluid rounded-start pt-3" alt="...">
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
                                    <p><i class="fa-regular fa-eye"></i><span class="ms-2">${post.total_view === null ? 'Nothing To Show' : post.total_view}</span></p>
                                </div>
                                <div class="col-md-3">
                                    <p>
                                        ${post.rating.number}
                                        <span class="text-warning ms-2">

    
                                        </span >
                                    </p >
                                </div >
                                <div class="col-md-3">
                                    <p class="text-danger ms-5" onclick="displayNewsDetail('${post._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right-long newsArrow"></i></p>
                                </div>
                            </div >
                        </div >
                    </div >
                </div >
    `;
        newsContainer.appendChild(newsDiv);
        count = count + 1;
        console.log(post);
    });
    newsItem(count);
    loadSpinner(false);


}
// display category post 

// display news details 
const displayNewsDetail = async (news_id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`);
    const news_data = await response.json();
    // console.log(news_id);
    const news_details = news_data.data[0];
    const newsModalContainer = document.getElementById('news_detail_container');

    newsModalContainer.innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${news_details.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="container-fluid">
            <div class="card mb-3 p-4">
                <div class="row g-0">
                    <div class="col-md-4 pt-4">
                        <img src="${news_details.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 ps-5">
                        <div class="card-body">
                            <h5 class="card-title">${news_details.title}</h5>
                            <p class="card-text">${news_details.details}</p>
                        </div>
                        <div class="row d-flex align-items-center">
                            <div class="col-md-4">
                                <img src="${news_details.author.img}" class="w-50 rounded-circle">
                                <p class="p-0 m-0">${news_details.author.name}</p>
                                <small class="p-0">${news_details.author.published_date.slice(0, 10)}</small>
                            </div>
                            <div class="col-md-4">
                                <p><i class="fa-regular fa-eye"></i><span class="ms-2">${news_details.total_view}</p>
                            </div>
                            <div class="col-md-4">
                            <p>${news_details.rating.number}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // console.log(news_details);
}

const loadSpinner = (isLoading) => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading === true) {
        loaderSection.classList.remove('d-none');

    } else {
        loaderSection.classList.add('d-none');

    }
}

loadCategories();