window.onload=function  () {
    // body...
        startTime();
        calendar();
}

//添加时钟
function startTime()
{
        var today=new Date()
        var h=today.getHours()
        var m=today.getMinutes()
        var s=today.getSeconds()
        // add a zero in front of numbers