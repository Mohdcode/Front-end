const API_key = "69ebe201ae5248a5a844b6d3d7ef36f0";
const url = "https://newsapi.org/v2/everything?q=";

document.addEventListener('DOMContentLoaded', () => {
    // Your existing code here

    // For example, the window load event can be moved here as well
    window.addEventListener('load', () => fetchNews("India"));
});


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_key}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("eng-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} ' ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
let curlSelectedNav=null;

function onNavitemClick(id) {
    fetchNews(id);
    const navitem = document.getElementById(id);
   curlSelectedNav?.classList.remove('active');
   curlSelectedNav=navitem;
   curlSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    curlSelectedNav?.classList.remove("active");
    curlSelectedNav=null;
})
function reload(){
    window.location.reload();
}
function onPress(event){
    if(event.key==="Enter"){
        event.preventDefault();
        const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    curlSelectedNav?.classList.remove("active");
    curlSelectedNav=null;

    }
}
