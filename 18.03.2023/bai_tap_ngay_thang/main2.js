let ngay = document.getElementById('ngay');
let thang = document.getElementById('thang');
let nam = document.getElementById('nam');
let hienThi = document.getElementById('hienThi');
let mytext = document.getElementById('inDl')

let day, month, year;

var thang31 = [1,3,5,7,8,10,12];
var thang30 = [4,6,9,11];

ngay.addEventListener('change', function(e) {
    day = e.target.value;
    day = parseInt(day)
    console.log(day);
});

thang.addEventListener('change', function(e) {
    month = e.target.value;
    month = parseInt(month);
    console.log(month);
    
});

nam.addEventListener('change', function(e) {
    year = e.target.value;
    year = parseInt(year);
    console.log(year);
});

hienThi.addEventListener('click', function() {
    let a = day>=1 && day<=31;
    let b = day>=1 && day<=30;
    let c = day>=1 && day<=28;
    var soSanh31 = thang31.includes(month);
    var soSanh30 = thang30.includes(month);
    let soSanh2 = month == 2;
    if ((a && soSanh31)|| (b && soSanh30) || (c && soSanh2)) {
        let x = day + "-" + month + "-" + year;
        console.log(x);
        let myInsertText = "Ngày hôm nay là: " + x;
        mytext.innerHTML = myInsertText;
    }
    else
    {
        alert("Sai định dạng, vui lòng nhập lại!");
        window.location.reload();
    }
});