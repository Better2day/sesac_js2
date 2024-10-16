const open = document.getElementById('open');
const close = document.getElementById('close');
//const modal = document.getElementsByClassName('modalcontainer')[0];
const modal = document.querySelector('.modalcontainer');
console.log(open);
console.log(modal);

open.onclick  = () => {modal.style.display = 'flex'};
close.onclick = () => {modal.style.display = 'none'};
/*
open.onClick = function() {
    modal.style.display = 'block';
}

close.onClick = function() {
    modal.style.display = 'none';

}
*/