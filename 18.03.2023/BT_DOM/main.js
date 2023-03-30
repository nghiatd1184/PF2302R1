let button0 = document.getElementById("khong");
let button1 = document.getElementById("mot");
let button2 = document.getElementById("hai");
let button3 = document.getElementById("ba");
let button4 = document.getElementById("bon");
let button5 = document.getElementById("nam");
let button6 = document.getElementById("sau");
let button7 = document.getElementById("bay");
let button8 = document.getElementById("tam");
let button9 = document.getElementById("chin");
let buttonCong = document.getElementById("cong");
let buttonTru = document.getElementById("tru");
let buttonNhan = document.getElementById("nhan");
let buttonChia = document.getElementById("chia");
let buttonBang = document.getElementById("bang");

let dong1 = document.getElementById("p1");
let dong2 = document.getElementById("p2");
let phepToan;
let soT1, soT2;
let ketQua = 0;

button0.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button0.innerHTML;    
})
button1.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button1.innerHTML;    
})
button2.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button2.innerHTML;    
})
button3.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button3.innerHTML;    
})
button4.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button4.innerHTML;    
})
button5.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button5.innerHTML;    
})
button6.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button6.innerHTML;    
})
button7.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button7.innerHTML;    
})
button8.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button8.innerHTML;    
})
button9.addEventListener('click',function () {
    dong2.innerHTML = dong2.innerHTML + button9.innerHTML;    
})


buttonNhan.addEventListener('click',function () {
    phepToan = "x";
    if (dong2.innerHTML === '') {
        soT1 = 0;
        dong1.innerHTML = `0 x`;
    } else {
        soT1 = parseInt(dong2.innerHTML);
        dong1.innerHTML = dong2.innerHTML + " x";
        dong2.innerHTML = "";
    }
})
buttonChia.addEventListener('click',function () {
    phepToan = "/";
    if (dong2.innerHTML === '') {
        soT1 = 0;
        dong1.innerHTML = `0 /`;
    } else {
        soT1 = parseInt(dong2.innerHTML);
        dong1.innerHTML = dong2.innerHTML + " /";
        dong2.innerHTML = "";
    }   
})
buttonCong.addEventListener('click',function () {
    phepToan = "+";
    if (dong2.innerHTML === '') {
        soT1 = 0;
        dong1.innerHTML = `0 +`;
    } else {
        soT1 = parseInt(dong2.innerHTML);
        dong1.innerHTML = dong2.innerHTML + " +";
        dong2.innerHTML = "";
    }   
})
buttonTru.addEventListener('click',function () {
    phepToan = "-";
    if (dong2.innerHTML === '') {
        soT1 = 0;
        dong1.innerHTML = `0 -`;
    } else {
        soT1 = parseInt(dong2.innerHTML);
        dong1.innerHTML = dong2.innerHTML + " -";
        dong2.innerHTML = "";
    }       
})

buttonBang.addEventListener('click',function () {
    soT2 = parseInt(dong2.innerHTML);
    dong1.innerHTML = `${dong1.innerHTML} ${dong2.innerHTML}`;
    switch (phepToan) {
        case "x": dong2.innerHTML = soT1 * soT2; break;
        case "/": dong2.innerHTML = soT1 / soT2; break;
        case "+": dong2.innerHTML = soT1 + soT2; break;
        case "-": dong2.innerHTML = soT1 - soT2; break;
    }

})