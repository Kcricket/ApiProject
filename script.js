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
function startPage()
{

      fetch('https://api.aniapi.com/v1/anime', 
      {    method: 'GET',    
      headers: {      
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MyIsIm5iZiI6MTYzOTk3OTE0MCwiZXhwIjoxNjQyNTcxMTQwLCJpYXQiOjE2Mzk5NzkxNDB9.QsSpa7zga0ejguGLAySH1YJReGCEhmtZx73gIXVP4Q0',
    'Content-Type': 'application/json',
    'Accept': 'application/json'    }  }).then(res=>res.json()).then(data=> {
          console.log(data)
          //Rellenamos el header
          var headers = document.querySelectorAll(".w-100")
          headers.forEach(element => {
              element.src = data.data.documents[randomNum()].banner_image
  
          });
          
      
          //Aqui rellenamos la section con fotos
          var cards = document.querySelectorAll(".xxx")
          cards.forEach(element => {
              for(i=0;i<4;i++){
                  element.innerHTML +=`
                  <div class="container" style="-webkit-box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64); box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64);">
                  <img src="${data.data.documents[randomNum()].banner_image}" class="image" alt="">
                      <div class="overlay">
                          <div class="text">Hello World</div>
                      </div>
                  </div>
                  `
              }
  
          });

          
  
          //Todas las imagenes deben tener un link , que al pulsarse, mande a otra pagina
          // var imgs = document.querySelectorAll("img")
          // imgs.forEach(element => {
          //     element.addEventListener("mouseover", function(){clickImg(e)})
          // });
          console.log(data.data.documents[1])

      
  
    }).catch(err=>console.warn(err.message));
    

}
// function clickImg(e){

// }

function searchWord(e){
    if(document.getElementById("tinput").value == ""){
        document.getElementById("SearchDiv").style.display = "none";
    }else{
        document.getElementById("SearchDiv").innerHTML = ""
        if(!e.ctrlKey && !e.shiftKey){
            //Ask for the Data
            fetch('https://api.aniapi.com/v1/anime?title='+e.target.value, 
            {    method: 'GET',    
            headers: {      
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MyIsIm5iZiI6MTYzOTk3OTE0MCwiZXhwIjoxNjQyNTcxMTQwLCJpYXQiOjE2Mzk5NzkxNDB9.QsSpa7zga0ejguGLAySH1YJReGCEhmtZx73gIXVP4Q0',
          'Content-Type': 'application/json',
          'Accept': 'application/json'    }  }).then(res=>res.json()).then(data=> {
            //Model the json Data
          document.getElementById("SearchDiv").style.display = ""
      
            var index = 0;
            console.log(data)
            //Model each result that:
            data.data.documents.forEach(element => {
              var genData ="";
              element.genres.forEach(elementGen => {
                  genData += elementGen+" "
              });

                // If contains String 
                  if(index<4){
                    //Html for the info
                      //valuesSearch.push(element.titles.en.toLowerCase())
                      var li = document.createElement("li")
                      li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start")
                      
                      li.innerHTML +=
                      `
                          <div class="ms-2 me-auto">
                              <div class="fw-bold"><a href="#" class="list-group-item list-group-item-action">${element.titles.en}</a><button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">See Anime</button>
                              </div>
                                  ${genData}

                              </div>
                          <span class="badge bg-primary rounded-pill">14</span>
                    ` 
                    document.getElementById("SearchDiv").appendChild(li)
                    li.addEventListener("click", function(){
                      document.getElementById("offcanvasTopLabel1").innerText = element.titles.en
                      document.getElementById("offcanvasTopLabel2").innerText = genData 
                      document.getElementById("offImg").src = element.banner_image
                          //Ask for the Data
                        fetch('https://api.aniapi.com/v1/episode?anime_id='+element.id
                        , 
                        {    method: 'GET',    
                        headers: {      
                      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MyIsIm5iZiI6MTYzOTk3OTE0MCwiZXhwIjoxNjQyNTcxMTQwLCJpYXQiOjE2Mzk5NzkxNDB9.QsSpa7zga0ejguGLAySH1YJReGCEhmtZx73gIXVP4Q0',
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'    }  }).then(res=>res.json()).then(data=> {
                        //Model the json Data
                      document.getElementById("SearchDiv").style.display = ""
                          console.log(data)
                          if(data.status_code != "404"){
                              for(i=0; i<data.data.documents.length; i++){
                                document.getElementById("offBody").innerHTML += `
                                <h1 class="display-4">Episode${i}: </h1><br>
                                <a href="${data.data.documents[i].video}">${data.data.documents[i].video}</a><br>
                              `

                            }
                          }else if(data.status_code == "200"){
                            document.getElementById("offBody").innerHTML += `
                            <h1 class="display-4">No EpisodesFound </h1><br>
                            `
                          }



                      }).catch(err=>console.warn(err.message));




                    })
                    index++
                  }
      
        
                })
        
                // var cards = document.querySelectorAll(".alert")
                // console.log(cards)
                // for(i=0; i<4; i++){
              
                //   cards[i].addEventListener('click', function(){
                //     searchAnime(e, valuesSearch[i])
                //   });
                // }
                
            
        
          }).catch(err=>console.warn(err.message));
          }
         

          
    }
      
  }

  function myFunction() {
    location.href = "./item.html"
  }
  var indexX =0;

  function moreAnime(){

               //Ask for the Data
               fetch('https://api.aniapi.com/v1/anime'
               , 
               {    method: 'GET',    
               headers: {      
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MyIsIm5iZiI6MTYzOTk3OTE0MCwiZXhwIjoxNjQyNTcxMTQwLCJpYXQiOjE2Mzk5NzkxNDB9.QsSpa7zga0ejguGLAySH1YJReGCEhmtZx73gIXVP4Q0',
             'Content-Type': 'application/json',
             'Accept': 'application/json'    }  }).then(res=>res.json()).then(data=> {
               //Model the json Data
             document.getElementById("SearchDiv").style.display = ""
                 console.log(data)
               //Model each result that:
               data.data.documents.forEach(element => {
                 var genData ="";
                 element.genres.forEach(elementGen => {
                     genData += elementGen+" "
                 });

                 var div = document.querySelector("#dLista")
                 if(indexX<4){
                  div.innerHTML +=`
                  <div class="row">
                     <div id="card" class="col xxx" >  
                     <div class="container" style="-webkit-box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64); box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64);">
                     <img src="${data.data.documents[randomNum()].banner_image}" class="image" alt="">
                         <div class="overlay">
                             <div class="text">Hello World</div>
                         </div>
                     </div>

                     <div class="container" style="-webkit-box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64); box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64);">
                     <img src="${data.data.documents[randomNum()].banner_image}" class="image" alt="">
                         <div class="overlay">
                             <div class="text">Hello World</div>
                         </div>
                     </div>

                     <div class="container" style="-webkit-box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64); box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64);">
                     <img src="${data.data.documents[randomNum()].banner_image}" class="image" alt="">
                         <div class="overlay">
                             <div class="text">Hello World</div>
                         </div>
                     </div>

                     <div class="container" style="-webkit-box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64); box-shadow: 0px 0px 34px 16px rgba(255,0,0,0.64);">
                     <img src="${data.data.documents[randomNum()].banner_image}" class="image" alt="">
                         <div class="overlay">
                             <div class="text">Hello World</div>
                         </div>
                     </div>
                      </div>
                  </div>
                  
                  `
                 }
                 indexX++
              
                
                 
                             
               })
           
                   // var cards = document.querySelectorAll(".alert")
                   // console.log(cards)
                   // for(i=0; i<4; i++){
                 
                   //   cards[i].addEventListener('click', function(){
                   //     searchAnime(e, valuesSearch[i])
                   //   });
                   // }
                   
               
           
             }).catch(err=>console.warn(err.message));
    
   
  }


  function loadEpisodes(id){




}

             

window.onload = () => {
 // loadEpisodes()

  if(window.location.href == "http://127.0.0.1:5500/index.html"){
    startPage()
  }else if(window.location.href == "http://127.0.0.1:5500/item.html"){
    document.getElementById("bigTxt").innerText = "Lo conseguiste abuela"
  }else if(window.location.href == "https://kcricket.github.io/ApiProject/"){
    startPage()
  }
    document.querySelector('#tinput').addEventListener("keyup", searchWord)
  window.addEventListener("scroll", ()=>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000){
      moreAnime();
      indexX = 0
    }
  })
}