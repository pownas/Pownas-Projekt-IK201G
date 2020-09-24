

$(document).ready(function() {
        
    var divList = [];
    var divIndex = 0;
    var index = 0;

    var showIndex = 0;

  
    
    $.getJSON(
        'res/portfolio-data.json',
        function (data) {
            displayPortfolio(data.projects);
        }
    );

    function displayPortfolio(projects) {

    var startDiv = '<div id="portfolioGroup">';
    var endDiv = '</div>';
    var projectGroup = startDiv;

    $.each(projects, function (i, portfolio) {          
        var aProject = 
            '<div class="subPortfolio" id="' + portfolio.id + '">' + 
            '<img class="project-img" id="' + portfolio.id + '"src="' + portfolio.image + '" title="Project" alt="Project">' +
                '<h1 id="' + portfolio.id + '">' + portfolio.title + '</h1>' +
                '<p id="' + portfolio.id + '">' + portfolio.description + '</p>' +
            '</div>';
        
        //skapar en div per projekt

        projectGroup += aProject;


        if (i > 0 && (i + 1) % 4 == 0){
            projectGroup += endDiv;
            divList[divIndex] = projectGroup;
            divIndex++;
            projectGroup = startDiv;    
            //för var fjärde div så skapas en slut-tag, sen lagras 4 divar i en yttre div
        };       
        index++;     
    });

    if (index == 0){
        divList = '';
        //tömmer diven ifall inga projekt finns
    };

    if ((index) % 4 != 0){
        projectGroup += endDiv;
        divList[divIndex] = projectGroup;    
        console.log('ja här hamnar vi');
        //lägger till slut-div-tagg       
    };
    
    console.log(divList);

    if (divList[divList.length-1] == '<div id="portfolioGroup"></div>'){
        divList.splice(divList.length-1,1); 
        //raderar en sista tom div som skapas när antalet projekt är delbart med 4
    }
    $('#portfolio-box').html(divList[0]);
    
    };

    $('#arrowRight').click(function () {
        
        //$('#portfolio-box').fadeout();
        //$("#portfolio-box").delay( 100 ).fadeIn( 100 );
        //$("#portfolio-box").find("#portfolioGroup").fadeOut( 200 ).delay( 400 ).fadeIn( 200 );
        showIndex++;

        if (showIndex == divList.length){
            showIndex = 0;
        }

        $('#portfolio-box').html(divList[showIndex]);
        //$('#portfolio-box').fadein();
        
    });

    $('#arrowLeft').click(function () {
        
        showIndex--;

        if (showIndex < 0){
            showIndex = divList.length - 1;
        }

        $('#portfolio-box').html(divList[showIndex]);
        
    });
});

//About-project...

var slideshowInterval = clearInterval(slideshowInterval);

var images = [];

$(".portfolioMain").on("click", ".subPortfolio", function(event){
    event.preventDefault();
    var id = (event.target.id);

    $(".projectdiv").show();
    $(".project-content").show();

    $("body").css({"overflow": "hidden"});
    
    // Loads persons from about-data.json
    $.getJSON(
        'res/portfolio-data.json',
        function (data) {
            getProject(data.projects, id);
        }
    );
});

function getProject(projects, id) {
    $.each(projects, function (ind, project) {
            if (project.id == id) {              
                
                var projectSquare = $(
                    '<div class="project-content" id="' + project.id + '">' + 
                        '<div class="project-content-left">' +
                            '<span class="fas fa-times" id="close-portfolio"></span>' +
                            
                            '<img class="slideshow-image" id="slideshow" src="' + project.slideshow[0] + '" title="developer" alt="developer">' + 
                            '<span class="fas fa-pause" id="slideShowPaus"></span>' +
                            '<span class="fas fa-play" id="slideShowPlay"></span>' +             
                            '</img>' +                  
                        '</div>' +
                        '<div class="project-content-right">' + 
                            '<h2> ' + project.title + '</h2>' + 
                            '<p>' + project.date + '</p>' +  '<hr/>' +
                            '<p>' + project.description +'</p>' + 
                            
                        '</div>' +
                            '<br/>' +
                                                       
                    '</div>'
                    
                );

            images = project.slideshow;
            $('.projectdiv').html(projectSquare);  

            

            slideshowInterval = setInterval(slideshow, 2000); 
            };
    });
};

var slideIndex = 1;

function slideshow(){
    
    if (slideIndex == images.length){
        slideIndex=0;
    }    
    document.getElementById('slideshow').src=images[slideIndex];
    slideIndex++;
}

$(".about-project").on("click", "#close-portfolio", function(event){
    event.preventDefault();
    $('.projectdiv').html('');
    $(".project-content").hide();
    $(".projectdiv").hide(); 
    clearInterval(slideshowInterval); 
    $("body").css({"overflow": "auto"});
});

$(".about-project").on("click", "#theProjectdiv", function(event){
    if(event.target.id=="theProjectdiv"){
        event.preventDefault();
        $('.projectdiv').html('');
        $(".project-content").hide();
        $(".projectdiv").hide(); 
        clearInterval(slideshowInterval);  
        $("body").css({"overflow": "auto"});
    }; 
});

document.getElementById("slideshow").addEventListener("mouseover", mouseOver);

function mouseOver() {
  document.getElementById("demo").style.color = "red";
}