const loadCategory = ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => categoryName(data))
}
loadCategory();


const categoryName = category =>{
    console.log(category);
    for (const name of category.data.news_category){
        const {category_id, category_name} = name;
        categoryList(category_id, category_name);
    }
}

const categoryList = (id, name) =>{
    const categoryContainer = document.getElementById('categoryContainer');
    const createCategory = document.createElement('li');
    createCategory.classList.add('nav-link');
    createCategory.style.cursor = 'pointer'
    createCategory.setAttribute('id',`${id}`);
    createCategory.innerHTML = name;
    categoryContainer.appendChild(createCategory);

    document.getElementById(`${id}`).addEventListener('click',()=>{
        console.log(id);
        loadNews(id);
    })
}



const loadNews = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => showNews(data))
        .catch((data) => console.log(data + 'No data Found'));
}

const showNews = newsId =>{
    const newsContainer = document.getElementById('newsContainer');
    newsId.data.forEach(element => {
        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card mb-3');
        cardBody.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    `
        newsContainer.appendChild(cardBody);
    });
}