/* Put your javascript in here */
let width = 200;
let count = 3;
let car_list = carousel.querySelector('ul');
let position = 0

const arrayposr = [30, 670, 1310 ]
console.log('test1')
function moveleft(){
}

buttons.querySelector(".right").onclick = function() {
    console.log(position)
    if (position < 2) {
        car_list.style.marginLeft = -1*position*610 - 610 + "px";
        position += 1;
        console.log(car_list.style.marginLeft + position)
    }
}
buttons.querySelector(".left").onclick = function() {
    if (position > 0){
        car_list.style.marginLeft = -1*(position-1)*610 + "px";
        position -= 1;
        console.log(car_list.style.marginLeft + position)
    }
}
