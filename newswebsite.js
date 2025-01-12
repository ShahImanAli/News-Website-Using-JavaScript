const apiKey = "eb79a36d4d2745ccab01ec4b0b4abc4c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("PAKISTAN"));

async function fetchnews(query) {
  const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
  const data = await response.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardcontainer = document.getElementById("card-container");
  const newscardtemplate = document.getElementById("templatenewscard");

  cardcontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardclone = newscardtemplate.content.cloneNode(true);
    fillDataincard(cardclone, article);
    cardcontainer.appendChild(cardclone);
  });
}

function fillDataincard(cardclone, article) {
  const newsimage = cardclone.querySelector("#newsimg");
  const newstitle = cardclone.querySelector("#newstitle");
  const newssource = cardclone.querySelector("#newssource");
  const newsdescription = cardclone.querySelector("#newsdescription");

  newsimage.src = article.urlToImage;
  newstitle.innerHTML = article.title;
  newsdescription.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newssource.innerHTML = `${article.source.name} . ${date}`;

  cardclone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank_");
  });
}

function onNavItemClick(id) {
  fetchnews(id);
}

const searchbutton = document.getElementById("searchbutton");
const searchtext = document.getElementById("searchtext");

searchbutton.addEventListener("click", () => {
  const query = searchtext.value;
  if (!query) return;
  fetchnews(query);
});

searchtext.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchtext.value.trim();
    if (query !== "") {
      fetchnews(query);
    }
  }
});

document.getElementById("image").addEventListener("click", () => {
  window.location.reload();
});
