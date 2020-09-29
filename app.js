//Autor: Rúben Filipe https://github.com/rubenfilipe07
var showAmPm;
var showframe;
var hourFormatIs12;
var dateformat;
var framecolor;
var framecolorAsCss;

function initialSet() {
  window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

      var schemeColor = properties.schemecolor.value.split(' ');
      schemeColor = schemeColor.map(function (c) {
        return Math.ceil(c * 255);
      });
      var schemeColorAsCSS = 'rgb(' + schemeColor + ')';
      document.getElementById("background").style = "background-color: " + schemeColorAsCSS

      var hourcolor = properties.hourcolor.value.split(' ');
      hourcolor = hourcolor.map(function (c) {
        return Math.ceil(c * 255);
      });
      var hourcolorAsCss = 'rgb(' + hourcolor + ')';
      document.getElementById("hour").style.color = hourcolorAsCss

      framecolor = properties.framecolor.value.split(' ');
      framecolor = framecolor.map(function (c) {
        return Math.ceil(c * 255);
      });
      framecolorAsCss = 'rgb(' + framecolor + ')';
      document.getElementById("clock").style = "border: 2px solid " + framecolorAsCss

      var datecolor = properties.datecolor.value.split(' ');
      datecolor = datecolor.map(function (c) {
        return Math.ceil(c * 255);
      });
      var datecolorAsCss = 'rgb(' + datecolor + ')';
      document.getElementById("date").style.color = datecolorAsCss

      dateformat = properties.dateformat.value;
      var showdate = properties.showdate.value;
      if (showdate == false) {
        document.getElementById("date").style.display = "none";
      } else {
        document.getElementById("date").style.display = "block";
      }

      showframe = properties.showframe.value;
      if (showframe == false) {
        document.getElementById("clock").style = "border: 0px solid rgba(0,0,0,0.0)"
      } else {
        document.getElementById("clock").style = "border: 2px solid " + framecolorAsCss
      }

      showAmPm = properties.showampm.value;

      var hourformat = properties.hourformat.value;
      if (hourformat == "12") {
        hourFormatIs12 = true;
      } else {
        hourFormatIs12 = false;
      }
    }
  }
}

function configure() {
  window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

      if (properties.showampm) {
        showAmPm = properties.showampm.value;
      }

      if (properties.hourformat) {
        var hourformat = properties.hourformat.value;
        if (hourformat == "12") {
          hourFormatIs12 = true;
        } else {
          hourFormatIs12 = false;
        }
      }
      if (properties.schemecolor) {
        var schemeColor = properties.schemecolor.value.split(' ');
        schemeColor = schemeColor.map(function (c) {
          return Math.ceil(c * 255);
        });
        var schemeColorAsCSS = 'rgb(' + schemeColor + ')';
        document.getElementById("background").style = "background-color: " + schemeColorAsCSS
      }

      if (properties.hourcolor) {
        var hourcolor = properties.hourcolor.value.split(' ');
        hourcolor = hourcolor.map(function (c) {
          return Math.ceil(c * 255);
        });
        var hourcolorAsCss = 'rgb(' + hourcolor + ')';
        document.getElementById("hour").style.color = hourcolorAsCss
      }
         
      if (properties.framecolor) {
        framecolor = properties.framecolor.value.split(' ');
        framecolor = framecolor.map(function (c) {
          return Math.ceil(c * 255);
        });
          framecolorAsCss = 'rgb(' + framecolor + ')';
          if(showframe===true){
          document.getElementById("clock").style = "border: 2px solid " + framecolorAsCss
         }
      }

      if (properties.datecolor) {
        var datecolor = properties.datecolor.value.split(' ');
        datecolor = datecolor.map(function (c) {
          return Math.ceil(c * 255);
        });
        var datecolorAsCss = 'rgb(' + datecolor + ')';
        document.getElementById("date").style.color = datecolorAsCss
      }

      if (properties.showdate) {
        var showdate = properties.showdate.value;
        if (showdate == false) {
          document.getElementById("date").style.display = "none";
        } else {
          document.getElementById("date").style.display = "block";
        }
      }

      if (properties.showframe) {
        showframe = properties.showframe.value;
        if (showframe == false) {
          document.getElementById("clock").style = "border: 0px solid rgba(0,0,0,0.0)"
        } else {
          document.getElementById("clock").style = "border: 2px solid " + framecolorAsCss
        }
      }

      if (properties.dateformat) {
        dateformat = properties.dateformat.value;
      }
      
    }
  };
}

function count() {
  var d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  var period;

  if (seconds >= 0 && seconds < 10) {
    seconds = "0" + seconds
  }
  if (minutes >= 0 && minutes < 10) {
    minutes = "0" + minutes
  }
  if (hours >= 0 && hours < 10) {
    hours = "0" + hours
  }

  if (hours >= 0 && hours < 12) {
    period = "Am"
  } else {
    period = "Pm"
  }
  if (showAmPm == false) {
    period = "";
  }
  if (hours > 12 && hourFormatIs12 == true) {
    hours = hours - 12;
  }

  if (hours == 00 && hourFormatIs12 == true) {
    hours = 12;
  }

  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }

  var saida = document.getElementById("hour")
  saida.innerHTML = `${hours}:${minutes}:${seconds}<span id="am-pm">${period}<\span>`

  var saida2 = document.getElementById('date')
  switch (dateformat) {
    case "1":
      saida2.innerHTML = `${day}/${month}/${year}`
      break;
    case "2":
      saida2.innerHTML = `${month}/${day}/${year}`
      break;
    case "3":
      saida2.innerHTML = `${year}/${month}/${day}`
      break;
    default:
      saida2.innerHTML = `${day}/${month}/${year}`
  }
  configure();
}

function initial() {
  window.setInterval(count, 1000);
  initialSet();
}