var publicKey ="8e7128d8990f4d1a60535dfc20afb150"
var privateKey ="1a3c471c716725296e080f6c818073c57860aed4"
var inputValue = document.querySelector('.characterInput');
var hash = "f5ba5e9921f79729ed166c13294a9b6a"
var button = document.querySelector('.btn');


/*fetch(`http://gateway.marvel.com/v1/public/comics?ts=1&apikey=`+publicKey+`hash=`+hash) .then((response) =>{ 
        console.log(response)
})
*/
$(".btn").one("click", function(){
    console.log('button works')
    fetch(`https://gateway.marvel.com/v1/public/characters?name=`+inputValue.value+`&ts=1&apikey=8e7128d8990f4d1a60535dfc20afb150&hash=f5ba5e9921f79729ed166c13294a9b6a`) .then((response) =>{ 
        console.log(inputValue.value)
     response.json().then((data) => {
        console.log(data)
    })
    
     })
});

