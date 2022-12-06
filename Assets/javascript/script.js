var publicKey = "8e7128d8990f4d1a60535dfc20afb150";
var privateKey = "1a3c471c716725296e080f6c818073c57860aed4";
var inputValue = document.querySelector("#characterInput");
var hash = "f5ba5e9921f79729ed166c13294a9b6a";
var button = document.querySelector(".btn");

var getMarvelApi = function () {
  console.log("button works");
  fetch(
    `https://gateway.marvel.com/v1/public/characters?name=` +                                 //gets API information
      inputValue.value +
      `&ts=1&apikey=8e7128d8990f4d1a60535dfc20afb150&hash=f5ba5e9921f79729ed166c13294a9b6a`
  ).then(function (response) {
    console.log(inputValue.value);
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.data.results[0].description);                        //navigates to the discription page in API and sets to short-info ID
        document.querySelector(".short-info").innerHTML =              
          data.data.results[0].description;
          

          var characterImgURL = data.data.results[0].thumbnail.path;           //gets img from api and sets it in ID of img element
          var characterImg = [characterImgURL+"/portrait_incredible"+ ".jpg"];
          $('#characterImg').attr('src', characterImg);  
          
      });
    }
    
  });
      
};


button.addEventListener("click",getMarvelApi)
button.addEventListener("click",getWikipediaAPI)
 

//$(".btn").on("click", getMarvelApi);
//});
