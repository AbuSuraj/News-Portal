// Nav catergories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};
const displayCategories = (categories) => {
  console.log(categories);
  const categoriesContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const li = document.createElement("span");
    //   navDiv.classList.add('navbar');
    //   navDiv.classList.add('navbar-dark');
    //   navDiv.classList.add('bg-primary');
    //   categoriesContainer.innerHTML = categories[0].category_name;

    li.innerHTML = `
<a href="#" onclick="NewsDetail(${category.category_id})"  class="link-dark text-decoration-none">${category.category_name} </a>
`;
    categoriesContainer.appendChild(li);
  });
};

const NewsDetail = (id) => {
  console.log(id);
  fetch("https://openapi.programming-hero.com/api/news/category/{category_id}")
    .then((res) => res.json())
    .then((data) => displayNewsDetail(data));
};
const displayNewsDetail = (data) => {};
loadCategories();
