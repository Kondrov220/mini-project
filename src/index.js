const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let currentPage = 1;
let s = "";
function makeList(arr) {
  const objectChange = arr
    .map((object) => {
      const newObject = `
      <li>
    <div class="photo-card">
        <img src="${object.largeImageURL}" alt="${object.tags}" />
        <div class="stats">
            <p class="stats-item">
                <i class="material-icons">thumb_up</i>
                ${object.likes}
            </p>
            <p class="stats-item">
                <i class="material-icons">visibility</i>
                ${object.views}
            </p>
            <p class="stats-item">
                <i class="material-icons">comment</i>
                ${object.comments}
            </p>
            <p class="stats-item">
                <i class="material-icons">cloud_download</i>
                ${object.downloads}
            </p>
        </div>
    </div>
    </li>
      `;
      return newObject;
    })
    .join("");
  return objectChange;
}


document.querySelector('.search-form').addEventListener('submit', (e) => {
      e.preventDefault();
    if(s !== e.target.children[0].value) {
      currentPage = 1;

    }
    document.querySelector("ul").innerHTML = "";

   s = e.target.children[0].value;
  fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${s}&page=${currentPage}&per_page=12&key=50978158-2e1c075068d4fb19bda657fd9`)
  .then((res) => res.json())
  .then((data) => {
    document.querySelector("ul").insertAdjacentHTML("beforeend", makeList(data.hits));
  });
});

document.querySelector('#load-more').addEventListener('click', (e) => {
  e.preventDefault();
  currentPage++;

  fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${s}&page=${currentPage}&per_page=12&key=50978158-2e1c075068d4fb19bda657fd9`)
    .then((res) => res.json())
    .then((data) => {
      const markup = makeList(data.hits);
      const oldItemsCount = gallery.querySelectorAll("li").length;
      gallery.insertAdjacentHTML("beforeend", markup);
      const allItems = gallery.querySelectorAll("li");
      const firstNewItem = allItems[oldItemsCount];

      if (firstNewItem) {
        firstNewItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    });
});


