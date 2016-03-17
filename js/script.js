/* 
 * MAIN SCRIPT FILE 
 * 
 * Don't edit unless you know what you're doing
 *
*/



// SETUP VARIABLES

var target = document.getElementById('target');
var loader = document.getElementById('loader');
var counter = 0;



// HELPER FUNCTIONS

function fadeOut(element, isLoader) {
    var op = 1; 
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';

            if ( !isLoader ) { counter++; }

            setTimeout(function() {
              displayMessage(counter);
            }, 500)
            
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function fadeIn(element) {
    var op = 0.1; 
    element.style.display = 'flex';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}

function resetPage() {
  loader.children[0].style.display = "none";
  target.style.display = "none";
  fadeIn(loader);
  counter = 0;
}

function displayMessage(counter) {
  if ( counter < strings.length ) {
    target.innerHTML = strings[counter].string;

    fadeIn(target);

    setTimeout(function() {

      if ( counter < (strings.length - 1) ) {
        fadeOut(target)
      } else {
        resetPage();
      }
      
    }, strings[counter].waiting)

  }
}

function displayLoader() {
  loader.children[0].style.display = "block";

  setTimeout(function() {
    fadeOut(loader, true);
  }, 3000)
}






// PUSHER STUFF

var pusher = new Pusher('0a50e9c19220c6262ffc', {
 cluster: 'eu',
 encrypted: true
});


var channel = pusher.subscribe('fibre');
channel.bind('my_event', function(data) {

  displayLoader();

});

// comment this out when done with testing
// setTimeout(function() {
//   displayLoader();
// }, 1000)




