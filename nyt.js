const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; //?stores variable for the URL
const key = 'jI2W4mX1VygOajonWQVVdnW8ovfYqoZo';                             //? Stores variable for the key to the app
let url;                                                                   //? declaring empty variable for use later

// SEARCH FORM
const searchTerm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");                        //?declaring variables and connecting them to html.
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");

//RESULTS NAVIGATION
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");                        //? declaring variables and connecting them to the html.
const nav = document.querySelector("nav");

//RESULTS SECTION
const section = document.querySelector("section");                          //? declaring variable and connecting them to the html.

//PAGINATION AND DISPLAY
nav.style.display = "none";                                                 //? to hide css styles if there is no data to display
let pageNumber = 0;                                                         //? setting the page to 0 instead of 1
console.log("PageNumber:", pageNumber);                                     //?logging the page#
let displayNav = false;                            

//EVENT LISTENERS
searchForm.addEventListener("submit", fetchResults);                        //? when an action is taken, this is the event that will occur (submit is specific for a form action)
nextBtn.addEventListener("click", nextPage);                                //?click is used for buttons primairly
previousBtn.addEventListener("click", previousPage);
function fetchResults(e) {                                                  //? the (e) is part of something in JS called an event handling function. the (e) is similar to a variable that allows you to interact with the object
    e.preventDefault();                                                     //? prevents default action from occuring

    // Assemble the full url
    url = baseURL + "?api-key=" + key + "&page=" + pageNumber + "&q=" + searchTerm.value;   //? all info stored into url that is showed in address bar. 
    console.log("URL:", url);
    if (startDate.value !== "") {
        url += "&begin_date=" + startDate.value;                            //?if its not blank then add
    };  
    if (endDate.value !== "") {
        url += "&end_date=" + endDate.value;                                //?if the value of the end date isnt blank, add this on the end.
    };
    fetch(url)
        .then(function(result) {
            return result.json();
        }).then(function(json) {
            displayResults(json);                                            //? pull the url, then translate it to json, then display it so it can be read.
        })
}
function displayResults(json) {
    while (section.firstChild) {                                
        section.removeChild(section.firstChild);                             //? while you are running the first item, if you pull a second one, then the first child will be removed.
    }
    let articles = json.response.docs;     
    console.log(json.response);                
    if (articles.length === 10) {
        nav.style.display = "block";                                            //? only pulls 10 articles at a time.
    } else {
        nav.style.display = "none";                                              //? 
    }
    if (articles.length === 0) {
        console.log("No Results");                                           //?no results will display if no articles are found.
    } else {
        for (let i = 0; i < articles.length; i++) {
            let article = document.createElement("article");
            let heading = document.createElement("h2");
            let link = document.createElement("a");
            let img = document.createElement("img");
            let para = document.createElement("p");
            let clearfix = document.createElement("div");               //?taking data from the url and creating the html properties & displaying it ^^^

            let current = articles[i];                                  //?index of article

            link.href = current.web_url;                                //?links the href from the page we are viewing it on, and takes it to the linked url.
            link.textContent = current.headline.main;   

            para.textContent = "Keywords: ";
            for (let j = 0; j < current.keywords.length; j++) {
                let span = document.createElement("span");
                span.textContent += current.keywords[j].value + " ";    //? index of the keywords within the article
                para.appendChild(span);
            }
            if (current.multimedia.length > 0) {
                img.src = "http://www.nytimes.com/" + current.multimedia[0].url;
                img.alt = current.headline.main;
            }
            clearfix.setAttribute("class", "clearfix");
            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }
}
function nextPage(e) {
    pageNumber++
    fetchResults(e);
    console.log("Page Number:", pageNumber);
}
function previousPage(e) {
    if (pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log("Page Number:", pageNumber);
}

/*


*/