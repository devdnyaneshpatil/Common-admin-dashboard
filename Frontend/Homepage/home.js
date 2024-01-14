

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
});

