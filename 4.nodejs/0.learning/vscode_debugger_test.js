
let location = 1;

function repeatPrint(location) {
    if (location === 3) {
        return 1;
    }
    console.log('B'+location);
    repeatPrint(location+1);
};

repeatPrint(0);
