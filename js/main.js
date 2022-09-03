const loadCategory = ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => categoryName(data))
        .catch((data)=> console.log(data + 'no data available'))
}
loadCategory();


const categoryName = category =>{
    for (const name of category.data.news_category){
        const {category_id, category_name} = name;
        categoryList(category_id, category_name);
    }
}


const categoryList = (id, name) =>{
    const categoryContainer = document.getElementById('categoryContainer');
    const createCategory = document.createElement('li');
    createCategory.classList.add('nav-link');
    createCategory.style.cursor = 'pointer';
    createCategory.setAttribute('id',`${id}`);
    createCategory.innerHTML = name;
    categoryContainer.appendChild(createCategory);

    document.getElementById(`${id}`).addEventListener('click',()=>{
        loadNews(id);
        document.getElementById('spinierContainer').classList.remove('d-none');
    })
}



const loadNews = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // showNews(data)
            dataSort(data)
        })
        .catch((data) => console.log(data + 'No data Found'));
}

loadNews('01');

const dataSort = (data)=>{
    let byView = data.data.slice(0);

    byView.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    showNews(byView);

}

const showNews = newsId =>{
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    categoryLength(newsId);
    newsId.forEach(element => {
        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card mb-3');
        cardBody.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${dataValidation(element.title)}</h5>
                    <p class="card-text text-truncate">${dataValidation(element.details)}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <img src="${element.author.img}" style="height:48px; width:48px; border-radius:50%" >
                            <div>
                                <p class="m-0 fw-semibold">${dataValidation(element.author.name)}</p>
                                <p class="card-text"><small class="text-muted">${dataValidation(element.author.published_date)}</small></p>
                            </div>
                        </div>
                        <div>
                            <p class="m-0 fw-semibold"><span><i class="fa-regular fa-eye"></i> </span>${dataValidation(element.total_view)}</p>
                        </div>
                        <div>
                            <p class="fs-3 m-0" onclick="openModal('${dataValidation(element._id)}')" style="cursor:pointer;" title="Show Details" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></p>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    `
        newsContainer.appendChild(cardBody);
    });
    document.getElementById('spinierContainer').classList.add('d-none');
}

const categoryLength = (category) => {
    const numberOfNews = document.getElementById('numberOfNews');
    const newsLength = category.length;
    if(newsLength > 0){
        numberOfNews.innerText = newsLength + ' item found';
    }
    else{
        numberOfNews.innerText = 'No item found for this';
    }
}



function openModal(_id){
    fetch(`https://openapi.programming-hero.com/api/news/${_id}`)
        .then(res => res.json())
        .then(data => modalDetails(data))
        .catch((data)=> console.log(data+' no data found'))
}

const modalDetails =(details)=>{
    const newsTitle = document.getElementById('exampleModalLabel');
    newsTitle.innerText = details.data[0].title;

    const newsBody = document.getElementById('modalBody');
    const author = details.data[0].author;

    newsBody.innerHTML = `
        <img src='${dataValidation(details.data[0].image_url)}' class="img-fluid">
        <div class="d-flex align-items-center gap-3 my-2">
            <img src="${dataValidation(author.img)}" style="height:48px; width:48px; border-radius:50%" >
                <div>
                    <p class="m-0 fw-semibold">${dataValidation(author.name)}</p>
                    <p class="card-text"><small class="text-muted">${dataValidation(author.published_date)}</small></p>
                </div>
        </div>
        <hr>
        <div>
            <p>${dataValidation(details.data[0].details)}</p>
        </div>
    `
}

function dataValidation(data){
    if(data === ''){
        return 'No data available';
    }
    else if(data  === null){
        return 'No data available'
    }
    else{
        return data;
    }
}
