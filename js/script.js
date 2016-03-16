

/* MESSAGES */
// Also set how long the message should display on the screen for
// Default is 5 seconds

var strings = [
  {
    string: "Ehen...hello!",
    waiting: 2000
  },
  {
    string: "So you made it here. O kare (very good).",
    waiting: 2500
  },
  {
    string: "I am Igi. And I have been here a long time.",
    waiting: 2000
  },
];



var target = document.getElementById('target');
var loader = document.getElementById('loader');
var counter = 0;



/* */

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

function displayMessage(counter) {
  if ( counter < strings.length ) {
    target.innerHTML = strings[counter].string;

    fadeIn(target);

    if ( counter < (strings.length - 1) ) {

        setTimeout(function() {
          fadeOut(target)
        }, strings[counter].waiting)

    }

  }
}

function displayLoader() {
  loader.children[0].style.display = "block";

  setTimeout(function() {
    fadeOut(loader, true);
  }, 3000)
}






/* PUSHER */

var pusher = new Pusher('0a50e9c19220c6262ffc', {
 cluster: 'eu',
 encrypted: true
});



var channel = pusher.subscribe('fibre');
channel.bind('my_event', function(data) {

  console.log(data);

});

setTimeout(function() {
  displayLoader();
}, 1000)




