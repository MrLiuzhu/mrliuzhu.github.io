$(document).ready(function(){
  $(document).toggle(function(){
        $('#a10').css({"display":"block","-webkit-animation":"faa 1s"});
        $('#a1').css({"display":"block","-webkit-animation":"fab 1s"});
    },
    function(){
        $('#a10').css({"-webkit-animation":"fac 1s"});
        $('#a1').css({"-webkit-animation":"fad 1s"});
        setTimeout(removecss,1000);
        function removecss(argument) {
                $('#a10').css({"display":"none"});
                $('#a1').css({"display":"none"});
        }
    },
    function(){
                $('#sec').css({"display":"block"});
/*                $('#sec1').css('visibility','visible');*/
                var i=0;
                var b1=setInterval(function  (argument) {
                        i++;
                        if (i==5) {clearInterval(b1);}
                        else
                        {
                        $("[id=sec"+i+"]").css({"-webkit-animation":"sec 0.2s","visibility":"visible"});
                        }
                },1000)
    },
    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {
            console.log('12');
    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {
            console.log('12');
    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {
            console.log('12');
    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {
            console.log('12');
    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {

    },    function  (argument) {

    },    
    function  (argument) {

    },    
    function  (argument) {
            console.log('12');
    });

    function rotate () {
                var clen=$("#sec").children();       //children()只包括自己的子元素
                var arr=[1,1,1,1];
                for(var j=0;j<clen.length;j++){
                        (function  (j) {
                                clen[j].onclick=function  (argument) {
                                    console.log("arr[j]"+arr[j]);
                                            if (arr[j]==1) {
                                    var tmp=$(this);
                                    $(this).css('-webkit-animation','thr 5s');
                                    $(this).children('p').remove();
/*                                    $(this).siblings().css("display","none");
                                    $('#sec').css({"margin":"0px"});*/
                                    setTimeout(function  (argument) {
                                        var dizhi='url(images/liuzhu'+j+'.jpg)';
                                            tmp.css({'background':dizhi,'padding':'5px','background-position':'center center','background-repeat':'no-repeat'});
                                            tmp.css('opacity','1');
                                            setTimeout(function  (argument) {
                                                        tmp.css('-webkit-animation','fou 2.5s');
                                            },5000);
                                    },2500);
                                    arr[j]=0;
                                }
                                else if(arr[j]==0){
                                    $("#sec").fadeOut(3000);

                                    arr[j]=2;
                                    var url='html/'+j+'.html';
                                                                        console.log(url);
                                    setTimeout(function  (argument) {
                                        $.ajax({
                                                url:url,
                                                success:function  (response) {
                                                        $('#content').html(response);
/*                                                        console.log(response);
*/                                                }
                                            });
                                        $('body').css('background','#aaa');
                                    },3000);
                                }
                                };
                        })(j)
                }
    }
    rotate();     

    var dbtime=0;
    $(document).dblclick(function  (argument) {
        if (dbtime<4) {
                        $('#content').empty();
            $("#sec").fadeIn();
            dbtime++;
            console.log(dbtime);
        }
        else{
/*                $("#sec").find('div').remove();*/
                $('#sec').empty();
                $("body").css('background','url(images/last.jpg)');                
                $("body").css('background-repeat','no-repeat');
                $("body").css('background-position','center center');
                console.log('hfjsdka');
        }

    })   
});