var publicKey = "8e7128d8990f4d1a60535dfc20afb150";
var privateKey = "1a3c471c716725296e080f6c818073c57860aed4";
var inputValue = document.querySelector("#characterInput");
var hash = "f5ba5e9921f79729ed166c13294a9b6a";
var button = document.querySelector(".btn");

function setLocalstorage() {
  //sets local storage
  if (historyArr.indexOf(inputValue) === -1) {
    historyArr.push(inputValue.value);
    localStorage.setItem("characterInput", JSON.stringify(historyArr));
  }
}

var historyArr = JSON.parse(localStorage.getItem("history")) || []; //adds the next user input to same key in local storage

if (historyArr.length) {
  for (let i = 0; i < historyArr.length; i++) {
    displayHistory(historyArr[i]);
  }
}

function displayHistory() {
  //gets the information from local storage and puts it in selected div ID
  var history = JSON.parse(window.localStorage.getItem("characterInput"));
  document.querySelector(".history").innerHTML = history;
  console.log(history);
}
function init() {
  //function that if something in storage run displayHistory. Runs on page load
  var storedHistory = JSON.parse(window.localStorage.getItem("characterInput"));
  if (storedHistory !== null) {
    historyArr = storedHistory;
    displayHistory();
  }
}

var getMarvelApi = function () {
  //gets API information
  console.log("button works");
  fetch(
    `https://gateway.marvel.com/v1/public/characters?name=` +
      inputValue.value +
      `&ts=1&apikey=8e7128d8990f4d1a60535dfc20afb150&hash=f5ba5e9921f79729ed166c13294a9b6a`
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data); //navigates to the discription page in API and sets to short-info ID
        document.querySelector(".short-info").innerHTML =
          data.data.results[0].description;

        var characterImgURL = data.data.results[0].thumbnail.path; //gets img from api and sets it in ID of img element
        var characterImg = [characterImgURL + "/portrait_incredible" + ".jpg"];
        $("#characterImg").attr("src", characterImg);
        document.querySelector("#name").innerHTML = data.data.results[0].name;
      });
    }
  });
};
function getImdbApi() {
  // function to get imdb API
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c21921c1b2mshac831bb48532619p1580c3jsn39b34f798587",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };

  fetch(
    `https://online-movie-database.p.rapidapi.com/auto-complete?q=` +
      inputValue.value,
    options
  ).then(function (response) {
    console.log(inputValue.value);
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        for (var z = 1; z <= 4; z++) {
          //loops the action to get 4 images outputted to the website
          var movieImgSrc = data.d[z].i.imageUrl;
          $("#moviesImg" + z).attr("src", movieImgSrc);
        }
      });
    }
  });
}

//event listeners
button.addEventListener("click", getMarvelApi);
button.addEventListener("click", getImdbApi);
button.addEventListener("click", setLocalstorage);
button.addEventListener("click", displayHistory);

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
init();
