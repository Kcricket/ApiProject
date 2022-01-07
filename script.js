// metodos para rellenar los campos con animes de forma aleatoria
function randomNumArr(){
    var arr = [];
    for(i=0; i<13; i++){
        arr.push(Math.floor(Math.random()*99))
    };
    return arr
}
function randomNum(){
    return Math.floor(Math.random()*99)
}
function startPage(){
    
    fetch('https://api.aniapi.com/v1/anime', 
    {    method: 'GET',    
    headers: {      
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MyIsIm5iZiI6MTYzOTk3OTE0MCwiZXhwIjoxNjQyNTcxMTQwLCJpYXQiOjE2Mzk5NzkxNDB9.QsSpa7zga0ejguGLAySH1YJReGCEhmtZx73gIXVP4Q0',
  'Content-Type': 'application/json',
  'Accept': 'application/json'    }  }).then(res=>res.json()).then(data=> {
        console.log(data)
        //Rellenamos el header
        document.querySelector(".header").style.background = "url("+data.data.documents[randomNum()].banner_image+") no-repeat scroll 50% 50%"
    
        //Aqui rellenamos la section con fotos
        for(i=0; i<3; i++){
        var cards = document.querySelectorAll(".xxx")
        cards.forEach(element => {

            element.innerHTML =`
            <img src="${data.data.documents[randomNum()].banner_image}" class = "rounded mx-auto d-block" alt="" style="width: 100px; height: 100px;">
            <img src="${data.data.documents[randomNum()].banner_image}" class = "rounded mx-auto d-block" alt="" style="width: 100px; height: 100px;">
            <img src="${data.data.documents[randomNum()].banner_image}" class = "rounded mx-auto d-block" alt="" style="width: 100px; height: 100px;">
            <img src="${data.data.documents[randomNum()].banner_image}" class = "rounded mx-auto d-block" alt="" style="width: 100px; height: 100px;">
            <img src="${data.data.documents[randomNum()].banner_image}" class = "rounded mx-auto d-block" alt="" style="width: 100px; height: 100px;">
            <img src="${data.data.documents[randomNum()].banner_image}" class = "rounded mx-auto d-block" alt="" style="width: 100px; height: 100px;">

            `
        });
        console.log(data.data.documents[1])
    }

  }).catch(err=>console.warn(err.message));

}


window.onload = () => {
    startPage()
}