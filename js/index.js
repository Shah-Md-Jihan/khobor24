const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    displayCategories(data.data.news_category);
}
const displayCategories = (categories) => {
    categories.forEach(category => {
        const categoryContainer = document.getElementById('category_container');
        const catgoryName = document.createElement('li');
        catgoryName.innerHTML = `
        <a>${category.category_name}</a>
        `;
        categoryContainer.appendChild(catgoryName);
        console.log(category);
    });
}
loadCategories();