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
      
}
function getImdbApi(){
  const options = {
    method: 'GET',
    params: {q: 'game of thr'},
    headers: {
      'X-RapidAPI-Key': '866ba6891emshf012812e04a3f17p1be6d9jsn726cacb876c4',
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

        // var movieImgSrc1 = data.d[1].i.imageUrl
        // $('#moviesImg1').attr('src', movieImgSrc1)
        // var movieImgSrc2 = data.d[2].i.imageUrl
        // $('#moviesImg2').attr('src', movieImgSrc2)
        // var movieImgSrc3 = data.d[3].i.imageUrl
        // $('#moviesImg3').attr('src', movieImgSrc3)
        // var movieImgSrc4 = data.d[4].i.imageUrl
        // $('#moviesImg4').attr('src', movieImgSrc4)