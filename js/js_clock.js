    // <div class="line_b_a"><div class="book_clock" id="bookClock">
    //     <div class="book_clock_time">
    //     <span id="clockHor">HH</span>
    //     <span id="clockSpr">:</span>
    //     <span id="clockMin">mm</span>
    //     </div>
    //     <div class="book_clock_time_sc">
    //     <span id="clockSec">ss</span>
    //     </div>
    // </div></div>

var clockHor = document.getElementById("clockHor");
var clockSec = document.getElementById("clockSec");
var clockMin = document.getElementById("clockMin");
function minnumberToChinese(num) {
    var min_Chineses = ['零','壹',"貳","叁","肆","伍","陸","柒","捌","玖","拾"];
    if (num < 0 || num > 59) return '零';
    
    if (num <= 10) {
        return "零" + min_Chineses[num];
    }
    
    var ten = Math.floor(num / 10);
    var unit = num % 10;
    
    var result = "";
    
    if (ten === 1) {
        result = "拾";
    } else if (ten === 2) {
        result = "贰拾";
    } else if (ten === 3) {
        result = "叁拾";
    } else if (ten === 4) {
        result = "肆拾";
    } else if (ten === 5) {
        result = "伍拾";
    }
    
    if (unit > 0) {
        if (ten === 1 || ten === 0) {
            result += min_Chineses[unit];
        } else {
            if (unit === 1) result += "壹";
            else if (unit === 2) result += "貳";
            else if (unit === 3) result += "叁";
            else if (unit === 4) result += "肆";
            else if (unit === 5) result += "伍";
            else if (unit === 6) result += "陸";
            else if (unit === 7) result += "柒";
            else if (unit === 8) result += "捌";
            else if (unit === 9) result += "玖";
        }
    }
    
    return result;
}
function inner(){
var data = new Date;
let hour_Chinese = ["零",'壹',"貳","叁","肆","伍","陸","柒","捌","玖","拾","拾壹","拾貳",
                    "零",'壹',"貳","叁","肆","伍","陸","柒","捌","玖","拾","拾壹","拾貳"
];
clockHor.innerText = hour_Chinese[parseInt(data.getHours())];
clockSec.innerText = data.getSeconds();
clockMin.innerText = minnumberToChinese(data.getMinutes());
}
setInterval(inner,1000);
inner();