// This js file will run when the page is loaded
window.addEventListener('custom', function () {
    console.log('custom event triggered');
});
function printHello() {
    setTimeout(() => {
        console.log('HELLO THERE 3');
        printHello();
    }, 1000);
}
printHello();
