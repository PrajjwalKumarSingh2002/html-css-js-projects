const apiKey = "0f678c81844b4db88cb600145548e123";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

newsHistory = [];
saved = [];

expand = document.querySelector(".expand");
navbar = document.querySelector(".navbar");
let displayingNavBar = 0;

expand.addEventListener("click", function(){
    if(displayingNavBar == 0){
        navbar.style.display = "block";
        displayingNavBar = 1;
    }
    else{
        navbar.style.display = "none";
        displayingNavBar = 0;
    }
})

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    bindData(data.articles);

    card = document.querySelectorAll(".card a");
    card.forEach(i => {
        i.addEventListener("click",()=>{
            newsHistory.push(i.outerHTML);
            console.log(newsHistory);
            
        })
    })

    save_btn = document.querySelectorAll(".save_btn");
    save_btn.forEach(item => {
        item.addEventListener("click",() => {
            console.log("save button clicked");
            saved.push(item.parentElement);
            
            // console.log(saved);
        })
    })
    
    return data;
}


let cardContainer = document.querySelector(".card-container");

function bindData(articles){
    title = "";
    desc = "";
    imgSrc = "";
    link = "";
    ihtml = "";
    let i = 0
    
    articles.forEach(article => {
        if(i < 50){
            title = article.title;
            description = article.description;
            imgSrc = article.urlToImage;
            link = article.url;

            // let cardTemp = `<div class="card"><a href="${link}" ><div class="img-part"><img src=${imgSrc}></div><div class="title">${title}</div><div class="summary">${description}</div></a></div>`;
            let cardTemp = `<div class="card"><div class="save_btn">Save</div><a href="${link}" ><div class="img-part"><img src=${imgSrc}></div><div class="title">${title}</div><div class="summary">${description}</div></a></div>`;
            ihtml += cardTemp;
        }
        i++;
        console.log(i);
    });

    cardContainer.innerHTML = ihtml;
}

listItem = document.querySelectorAll(".list-item");
listItem.forEach(item => {
    d = item.textContent;
    if(d == "Saved"){
        
        item.addEventListener("click", () => {
            cardTemp = "";
            saved.forEach(savedItem => {
                cardTemp += savedItem;
            });
            
            console.log(cardTemp);
            cardContainer.innerHTML = saved[0];
        })
    }
    else if(d == "History"){
        item.addEventListener("click", () => {
            cardTemp = "";
            newsHistory.forEach(item => {
                cardTemp += ('<div class="card"><div class="save_btn">Save</div>' + item + '</div>');
            });
            
            console.log(cardTemp);
            cardContainer.innerHTML = cardTemp;
        })
    }
    else{
        item.addEventListener("click", function(){
            fetchNews(item.textContent);
        })
    }
})

searchBar = document.querySelector(".search-bar input");
submitButton = document.querySelector(".search-bar button");


submitButton.addEventListener("click",() => {
    console.log(searchBar.value);
    fetchNews(searchBar.value);
    searchBar.value = "";
})


