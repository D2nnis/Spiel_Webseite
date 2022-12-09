var spieler = document.querySelector(".player");
spieler.style.bottom = "50px";

var spielfeld = document.querySelector(".playground");
var punkteAnzeige = document.querySelector(".punkte");
var score = 0;

var timer = new Timer(90);

var backgroundPosition = 0;

let frame = 0;

function loop() {
  frame = frame + 0.05;

  const sin = Math.sin(frame);
  const movement = sin * 10;

  if (keyboard(38) && parseInt(spieler.style.bottom) < 460) {
    spieler.style.bottom = parseInt(spieler.style.bottom) + 10 + "px";
  }
  if (keyboard(40) && parseInt(spieler.style.bottom) > 0) {
    spieler.style.bottom = parseInt(spieler.style.bottom) - 10 + "px";
  }

  if (parseInt(spieler.style.bottom) > 0) {
    score = score + 1;
    punkteAnzeige.textContent = score;
  }

  if (timer.ready()) {
    var h = document.createElement("div");
    h.classList.add("stein");
    h.style.right = "0px";
    h.style.right = "20px";
    h.style.top = "200px";
    spielfeld.appendChild(h);
  }

  var steine = document.querySelectorAll(".stein");
  for (var stein of steine) {
    stein.style.right = parseInt(stein.style.right) + 5 + "px";
    stein.style.top = parseInt(stein.style.top) + movement + "px";
    if (parseInt(stein.style.right) > 1000) {
      stein.parentNode.removeChild(stein);
    }
  }

  if (anyCollision(spieler, steine)) {
    localStorage.setItem("score", score);
    location.href = "gameover.html";
    return;
  }

  //    localStorage.setItem("score", punkte);

  // Kommentar: sobald der Spieler mit Gegner3 oder 4 kollidiert, werden diese gelöscht
  var collisions = allCollisions(spieler, steine);
  // Kommentar: wir gehen durch alle Kollisionsobjekte durch und löschen sie
  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
  }

  backgroundPosition = backgroundPosition + 3;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
