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
    newsContainer.innerHTML = '';
    newsId.data.forEach(element => {
        console.log(element);
        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card mb-3');
        cardBody.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.title}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <img src="${element.author.img}" style="height:48px; width:48px; border-radius:50%" >
                            <div>
                                <p class="m-0 fw-semibold">${element.author.name}</p>
                                <p class="card-text"><small class="text-muted">${element.author.published_date}</small></p>
                            </div>
                        </div>
                        <div>
                            <p class="fs-3 m-0" onclick="openModal('${element._id}')" title="Show Details"><i class="fa-solid fa-arrow-right"></i></p>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    `
        newsContainer.appendChild(cardBody);
    });
}

loadNews('01');


function openModal(_id){
    fetch(`https://openapi.programming-hero.com/api/news/${_id}`)
        .then(res => res.json())
        .then(data => console.log(data))
}