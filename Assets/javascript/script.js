
var inputValue = document.querySelector('.characterInput');
var button = document.querySelector('.btn');


/*fetch(`http://gateway.marvel.com/v1/public/comics?ts=1&apikey=`+publicKey+`hash=`+hash) .then((response) =>{ 
        console.log(response)
})
*/
$(".btn").on("click", function(){
    fetch(`https://gateway.marvel.com/v1/public/characters?name=`+inputValue.value+`&ts=1&apikey=8e7128d8990f4d1a60535dfc20afb150&hash=f5ba5e9921f79729ed166c13294a9b6a`) 
    .then((response) =>{ 
        console.log(inputValue.value)
        response.json()
    })
    .then((data) =>{
        console.log(data)
    })

    fetch

});



