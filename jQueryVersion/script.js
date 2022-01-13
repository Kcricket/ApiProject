function moreAnime(){
    $.ajax(
        {
        url: "https://api.aniapi.com/v1/anime", 
        method: 'GET',
        headers: {      
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MyIsIm5iZiI6MTYzOTk3OTE0MCwiZXhwIjoxNjQyNTcxMTQwLCJpYXQiOjE2Mzk5NzkxNDB9.QsSpa7zga0ejguGLAySH1YJReGCEhmtZx73gIXVP4Q0',
            'Content-Type': 'application/json',
            'Accept': 'application/json'    
        },
        success: function (data){
            console.log(data)
            //Model each result that:
            dataArr = data.data.documents
            
            for(i=0; i<2; i++) {
                    $(".container").append(`
                    <div class="card">
                        <img src="${dataArr[i].banner_image}" alt="">
                        <h1 class="display-4">${dataArr[i].titles.en}</h1>
                        <p class="text">Description</p>
                    </div>
                    `
                    )
                
                index++
                
            }
        
    }});

}
var index=0;

$(document).ready(function(){
    moreAnime()
    $(window).on("scroll", function(){
        if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000){
            moreAnime();
            //index= 0;
        }
    })
    
});


