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
        // add a zero in front of numbers<10
        m=checkTime(m)
        s=checkTime(s)
        document.getElementById('time').innerHTML=h+":"+m+":"+s
        t=setTimeout('startTime()',500)
}

function checkTime(i)
{
        if (i<10) 
          {i="0" + i}
          return i
}

//生成日历
function calendar (argument) {
        var today = new Date();
        var year = today.getFullYear();      //本年
        var month = today.getMonth() + 1;    //本月  0-11
        var day = today.getDate();           //本日
            //本月第一天是星期几（距星期日离开的天数）
        var startDay = new Date(year, month - 1, 1).getDay();
            //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
        var nDays = new Date(year, month, 0).getDate();
             //开始画日历
        var numRow = 0;  //记录行的个数，到达7的时候创建tr
        var i;        //日期
        var html = '';
        html += '<table id="Body" width="100%"><tbody>';
        //第一行
        html += '<tr>';
        for (i = 0; i< startDay; i++) {
                html += '<td></td>';
                numRow++;
        }
        for (var j = 1; j<= nDays; j++) {
           //如果是今天则显示红
                if (j == day) 
                    {
                        html += '<td style="color:red" class="bg-ok">';
                        html += j;    //开始加日期
                    }
            else {
                        html += '<td class="bg-ok">';
                        html += j;    //开始加日期
                    }
            html += '</td>';
            numRow++;
            if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
                        numRow = 0;
                        html += '</tr><tr>';
            }
        }
        html += '</tbody></table>';
        $("#container").html(html);
}


