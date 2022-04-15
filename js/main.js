const wrapperUsers = document.querySelector(".wrapper-users");
const wrapperPosts = document.querySelector(".wrapper-posts");
const wrapperComments = document.querySelector(".wrapper-comments");
const loadingImg = document.querySelector(".loading__img");

const containerUsers = [];
const containerPosts = [];

const renderUsers = (array, element) => {
  const fragmentUsers = document.createDocumentFragment();
  const templateUsers = document.querySelector(".wrapper-users__template").content;

  if (array.length > 0) {
    loadingImg.style.display = "none";
    array.forEach((obj) => {
      containerUsers.push(obj.id);
      const templateAllUsers = templateUsers.cloneNode(true);
      templateAllUsers.querySelector(".users__text").textContent = obj.username;
      templateAllUsers.querySelector(".users-name").textContent = obj.name;
      templateAllUsers.querySelector(".users-id").textContent = obj.id;
      templateAllUsers.querySelector(".users-street").textContent =obj.address.street;
      templateAllUsers.querySelector(".users-suite").textContent = obj.address.suite;
      templateAllUsers.querySelector(".users-city").textContent = obj.address.city;
      templateAllUsers.querySelector(".users-zipcode").textContent =obj.address.zipcode;
      templateAllUsers.querySelector(".users-title").textContent = obj.company.name;
      templateAllUsers.querySelector(".users-phrase").textContent =obj.company.catchPhrase;
      templateAllUsers.querySelector(".users-bs").textContent = obj.company.bs;
      templateAllUsers.querySelector(".users-phone").textContent = obj.phone;
      templateAllUsers.querySelector(".users-geo").textContent = "geo";
      templateAllUsers.querySelector(".users-website").textContent = obj.website;
      templateAllUsers.querySelector(".users-email").textContent = obj.email;
      templateAllUsers.querySelector(".users-phone").href = `tel:${obj.phone}`;
      templateAllUsers.querySelector(".users-geo").href = `https://google.com/maps/place/${obj.address.geo.lat},
      ${obj.address.geo.lng}`;
      templateAllUsers.querySelector(".users-website").href = `https://${obj.website}`;
      templateAllUsers.querySelector(".users-email").href = `mailto:${obj.email}`;
      templateAllUsers.querySelector(".wrapper-users__item").dataset.id = obj.id;

      fragmentUsers.appendChild(templateAllUsers);
    });
  }
  element.appendChild(fragmentUsers);
};

const renderPosts = (array, element) => {
  element.innerHTML = "";

  const fragmentPosts = document.createDocumentFragment();
  const templatePosts = document.querySelector(".wrapper-posts__template").content;

  if (array.length > 0) {
    loadingImg.style.display = "none";
    array.forEach((obj) => {
      containerPosts.push(obj.id);
      const templateAllPosts = templatePosts.cloneNode(true);
      templateAllPosts.querySelector(".posts-title").textContent = obj.title;
      templateAllPosts.querySelector(".posts-body").textContent = obj.body;
      templateAllPosts.querySelector(".posts-item").dataset.id = obj.id;
      fragmentPosts.appendChild(templateAllPosts);
    });
  }

  element.appendChild(fragmentPosts);
};

const renderComments = (array, element) => {
  element.innerHTML = "";
  const fragmentComments = document.createDocumentFragment();
  const templateComments = document.querySelector( ".wrapper-comments__template").content;
  if (array.length > 0) {
    loadingImg.style.display = "none";

    array.forEach((obj) => {
      const templateAllComments = templateComments.cloneNode(true);
      templateAllComments.querySelector(".comments-name").textContent = obj.name;
      templateAllComments.querySelector(".comments-email").textContent = obj.email;
      templateAllComments.querySelector(".comments-body").textContent = obj.body;

      templateAllComments.querySelector(".comments-email").href = `mailto:${obj.email}`;

      fragmentComments.appendChild(templateAllComments);
    });
  }
  element.appendChild(fragmentComments);
};

const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  renderUsers(data, wrapperUsers);
};

getUsers();

const getPosts = async (usersId) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${usersId}`
  );
  const data = await res.json();
  renderPosts(data, wrapperPosts);
};

const getComments = async (postsId) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postsId}`
  );
  const data = await res.json();
  renderComments(data, wrapperComments);
};

wrapperUsers.addEventListener("click", (evt) => {
  wrapperComments.innerHTML = "";
  if (evt.target.matches(".wrapper-users__item")) {
    loadingImg.style.display = "flex";
    const usersListItemId = evt.target.dataset.id - 0;
    containerUsers.forEach((userId) => {
      if (usersListItemId === userId) {
        getPosts(userId);
      }
    });
  }
});

wrapperPosts.addEventListener("click", (evt) => {
  if (evt.target.matches(".posts-item")) {
    loadingImg.style.display = "flex";
    const postsListItemId = evt.target.dataset.id - 0;
    containerPosts.forEach((postId) => {
      if (postsListItemId === postId) {
        getComments(postId);
      }
    });
  }
});
