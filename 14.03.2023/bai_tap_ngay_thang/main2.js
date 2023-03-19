let ngay = document.getElementById('ngay');
let thang = document.getElementById('thang');
let nam = document.getElementById('nam');
let hienThi = document.getElementById('hienThi');
let myText = document.getElementById('inDl')

let ngaySo, thangSo, namSo;

var thang31 = [1,3,5,7,8,10,12];
var thang30 = [4,6,9,11];

ngay.addEventListener('change', function(e) {
    ngaySo = e.target.value;
    ngaySo = parseInt(ngaySo)
    console.log(ngaySo);
});

thang.addEventListener('change', function(e) {
    thangSo = e.target.value;
    thangSo = parseInt(thangSo);
    console.log(thangSo);
    
});

nam.addEventListener('change', function(e) {
    namSo = e.target.value;
    namSo = parseInt(namSo);
    console.log(namSo);
});

hienThi.addEventListener('click', function() {
    let a = ngaySo>=1 && ngaySo<=31;
    let b = ngaySo>=1 && ngaySo<=30;
    let c = ngaySo>=1 && ngaySo<=28;
    let d = ngaySo>=1 && ngaySo<=29;
    var soSanh31 = thang31.includes(thangSo);
    var soSanh30 = thang30.includes(thangSo);
    let soSanh2 = thangSo === 2;
    if ((namSo%4)!=0) {
        if ((a && soSanh31)|| (b && soSanh30) || (c && soSanh2)) {
            let x = ngaySo + "-" + thangSo + "-" + namSo;
            console.log(x);
            let myInsertText = "Ngày hôm nay là: " + x;
            myText.innerHTML = myInsertText;
        }
        else
        {
            alert("Sai định dạng, vui lòng nhập lại!");
            window.location.reload();
        }
    } else {
        if ((a && soSanh31)|| (b && soSanh30) || (d && soSanh2)) {
            let x = ngaySo + "-" + thangSo + "-" + namSo;
            console.log(x);
            let myInsertText = "Ngày hôm nay là: " + x;
            myText.innerHTML = myInsertText;
        }
        else
        {
            alert("Sai định dạng, vui lòng nhập lại!");
            window.location.reload();
        }
    }
    
});