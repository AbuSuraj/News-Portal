// Nav catergories
const loadCategories = () => {
  NewsDetail("08");
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((err) => {
      console.log(err);
    });
};
const displayCategories = (categories) => {
  //   console.log(categories);
  const categoriesContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const li = document.createElement("span");
    li.innerHTML = `
<a href="#" onclick="NewsDetail('${category.category_id}', '${category.category_name}')"  class="link-dark text-decoration-none">${category.category_name} </a>
`;
    categoriesContainer.appendChild(li);
  });
};

const NewsDetail = (id, categoryName) => {
  //   console.log(id);

  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
  if (categoryName == undefined) {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
      .then((res) => res.json())
      .then((data) => displayNewsDetail(data.data))
      .catch((err) => {
        console.log(err);
      });
  }

  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayNewsDetail(data.data, categoryName))
    .catch((err) => {
      console.log(err);
    });
};
const displayNewsDetail = (categories, categoryName) => {
  // console.log(categories, categoryName);

  const noOfNews = document.getElementById("no-of-news");
  if (categoryName == undefined) {
    noOfNews.classList.add("d-none");
  } else {
    noOfNews.classList.remove("d-none");
    noOfNews.innerText = `${categories.length} items found for ${categoryName}`;
  }
  const NewsDetailContainer = document.getElementById("news-detail-container");
  NewsDetailContainer.innerHTML = "";
  categories.sort((a, b) => {
    return b.total_view - a.total_view;
  });

  categories.forEach((category) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("my-5");
    newsDiv.classList.add("shadow");
    // console.log(category.author.name);
    newsDiv.innerHTML = `
    
    <div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${
        category.image_url
      }" class="img-fluid rounded-start p-1" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${category.title}</h5>
        <p class="card-text">${category.details.slice(0, 300)}...</p>
        <div>
        <img class="rounded-circle" style="width: 50px; height: 50px;" src="${
          category.author.img
        }">
        <div class="d-flex justify-content-between"><h6>${
          category.author.name == null || category.author.name == ""
            ? "Not Available"
            : category.author.name
        }</h6>
        <p>${
          category.author.published_date == null
            ? "No date"
            : category.author.published_date.slice(0, 10)
        }</p>
        
        <p><i class="fa-solid fa-eye"></i> ${
          category.total_view == null ? 0 : category.total_view
        }</p>
        <button data-bs-toggle="modal" data-bs-target="#exampleModal"   onclick="categoryDetail('${
          category._id
        }')" class="btn btn-warning fs-5 fw-semibold">Details</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
    NewsDetailContainer.appendChild(newsDiv);
  });
  spinner.classList.add("d-none");
};
const categoryDetail = (id) => {
  //   console.log(id);
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => displayCategoryDetail(data.data))
    .catch((err) => {
      console.log(err);
    });
};
const displayCategoryDetail = (category) => {
  //   console.log(category[0].details);
  const categoryDeailContainer = document.getElementById("category-detail");
  categoryDeailContainer.innerHTML = "";
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("modal-content");
  categoryDiv.innerHTML = `
    <div class="modal-header ">
          <h4 class="modal-title" id="exampleModalLabel">${
            category[0].title
          }'</h4>
        </div>
        <div class="modal-body">
        <img src="${category[0].image_url}" class="img-fluid" alt="...">
        
           <p class="card-text">
          ${category[0].details}
       </p>
       <div class="d-flex justify-content-between"><h6>${
         category[0].author.name == null || category[0].author.name == ""
           ? "Not Available"
           : category[0].author.name
       }</h6>
        <p>${
          category[0].author.published_date == null
            ? "NO date Available"
            : category[0].author.published_date.slice(0, 10)
        }</p>
        
        <p><i class="fa-solid fa-eye"></i> ${
          category[0].total_view == null ? 0 : category[0].total_view
        }</p>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
    `;
  categoryDeailContainer.appendChild(categoryDiv);
};
loadCategories();
