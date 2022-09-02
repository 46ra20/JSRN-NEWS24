const loadCategory = ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => console.log(data))
}
loadCategory();