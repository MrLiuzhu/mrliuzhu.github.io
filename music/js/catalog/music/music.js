$(document).ready(function($) {
    var musicurl=new Array();
    $.ajax({
              url: "json/music.json",
              success: function(response){
/*                    console.log("Data Loaded: " + response[1]);*/
                                    var i=0;
                                    $('#music-container tr').each(function () {                
                                                $(this).children('td').eq(1).children('a').text(response[i].name);
                                                $(this).children('td').eq(1).children('a').css('color','#777');
/*                                                $(this).children('td').eq(1).children('a').attr('href',response[i].url);*/
                                                musicurl[i]=response[i].url;
                                                i++;
                                        });
                    },
              dataType: "json"
        });

    $("#music-container tr").each(function  (argument) {
                $(this).children('td').eq(0).click(function  (argument) {
                        var index=$(this).parent().index();
                        if ($(this).hasClass('music-begin'))
                        {
                             $(this).removeClass('music-begin');
                             $(this).addClass('music-end');
                             $(this).next().children('a').css('color','blue');
                             $(this).parent().siblings().each(function  (argument) {
                                    $(this).children('td').eq(0).addClass('music-begin');
                                    $(this).children('td').eq(0).removeClass('music-end');
                                    $(this).children('td').eq(1).children('a').css('color','#777');                 
                             })
                             $('audio')[0].pause();
                             $('audio')[0].currentTime=0;
                             $('audio')[0].src=musicurl[index];
                             $('audio')[0].play();
                             $('#wrapper').children().removeClass('audioplayer-stopped');
                             $('#wrapper').children().addClass('audioplayer-playing');
                             $('#wrapper').children().children('div').first().attr("title","暂停");
                        }
                        else{
                             $(this).removeClass('music-end');
                             $(this).addClass('music-begin');
                             $(this).next().children('a').css('color','#777');
                        }                              
                })
        })
});
