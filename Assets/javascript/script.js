
var publicKey = "8e7128d8990f4d1a60535dfc20afb150";
var privateKey = "1a3c471c716725296e080f6c818073c57860aed4";
var inputValue = document.querySelector("#characterInput");
var hash = "f5ba5e9921f79729ed166c13294a9b6a";
var button = document.querySelector(".btn");

function setLocalstorage() {
  if(historyArr.indexOf(inputValue) === -1){
    historyArr.push(inputValue.value);
    localStorage.setItem('characterInput', JSON.stringify(historyArr));
}
}

  var historyArr = JSON.parse(localStorage.getItem('history')) || [];

  if(historyArr.length){
      for (let i = 0; i < historyArr.length; i++) {
         displayHistory(historyArr[i])
          
      }
  }

function displayHistory (){
  var history = JSON.parse (window.localStorage.getItem('characterInput'));
  document.querySelector('.history').innerHTML=history
  console.log (history)

}
function init(){
  var storedHistory = JSON.parse (window.localStorage.getItem('characterInput'));
  if(storedHistory !== null) {
    historyArr = storedHistory;
    displayHistory()
  }
}

var getMarvelApi = function () {
  console.log("button works");
  fetch(
    `https://gateway.marvel.com/v1/public/characters?name=` +                                 //gets API information
      inputValue.value +
      `&ts=1&apikey=8e7128d8990f4d1a60535dfc20afb150&hash=f5ba5e9921f79729ed166c13294a9b6a`
  ).then(function (response) {
    
    if (response.ok) {
      response.json().then(function (data) {
       console.log(data)                                             //navigates to the discription page in API and sets to short-info ID
        document.querySelector(".short-info").innerHTML =              
          data.data.results[0].description;
          

          var characterImgURL = data.data.results[0].thumbnail.path;           //gets img from api and sets it in ID of img element
          var characterImg = [characterImgURL+"/portrait_incredible"+ ".jpg"];
          $('#characterImg').attr('src', characterImg);  
          document.querySelector("#name").innerHTML =              
          data.data.results[0].name;

      });
    }
    
  });
      
}
function getImdbApi(){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c21921c1b2mshac831bb48532619p1580c3jsn39b34f798587',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  };
  
  fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=`+inputValue.value, options)
  .then(function (response) {
    console.log(inputValue.value);
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data)
        
        for(var z = 1; z <= 4; z++) {
          var movieImgSrc = data.d[z].i.imageUrl
          $('#moviesImg' + z).attr('src', movieImgSrc)
        }
        
      });
}
});
}


button.addEventListener("click",getMarvelApi)
button.addEventListener("click",getImdbApi)
button.addEventListener("click", setLocalstorage)
button.addEventListener("click", displayHistory)

        // var movieImgSrc1 = data.d[1].i.imageUrl
        // $('#moviesImg1').attr('src', movieImgSrc1)
        // var movieImgSrc2 = data.d[2].i.imageUrl
        // $('#moviesImg2').attr('src', movieImgSrc2)
        // var movieImgSrc3 = data.d[3].i.imageUrl
        // $('#moviesImg3').attr('src', movieImgSrc3)
        // var movieImgSrc4 = data.d[4].i.imageUrl
        // $('#moviesImg4').attr('src', movieImgSrc4)

        document.addEventListener('DOMContentLoaded', () => {
          // Functions to open and close a modal
          function openModal($el) {
            $el.classList.add('is-active');
          }
        
          function closeModal($el) {
            $el.classList.remove('is-active');
          }
        
          function closeAllModals() {
            (document.querySelectorAll('.modal') || []).forEach(($modal) => {
              closeModal($modal);
            });
          }
        
          // Add a click event on buttons to open a specific modal
          (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
            const modal = $trigger.dataset.target;
            const $target = document.getElementById(modal);
        
            $trigger.addEventListener('click', () => {
              openModal($target);
            });
          });
        
          // Add a click event on various child elements to close the parent modal
          (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
            const $target = $close.closest('.modal');
        
            $close.addEventListener('click', () => {
              closeModal($target);
            });
          });
        
          // Add a keyboard event to close all modals
          document.addEventListener('keydown', (event) => {
            const e = event || window.event;
        
            if (e.keyCode === 27) { // Escape key
              closeAllModals();
            }
          });
        });
        init()