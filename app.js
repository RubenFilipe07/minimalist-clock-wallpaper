//Autor: Rúben Filipe https://github.com/rubenfilipe07
var showAmPm;
var showframe;
var modo12Horas;
var dateformat;
var framecolor;
var framecolorAsCss;

function definir() {
  window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

      var schemeColor = properties.schemecolor.value.split(' ');
      schemeColor = schemeColor.map(function (c) {
        return Math.ceil(c * 255);
      });
      var schemeColorAsCSS = 'rgb(' + schemeColor + ')';
      document.getElementById("fundo").style = "background-color: " + schemeColorAsCSS

      var hourcolor = properties.hourcolor.value.split(' ');
      hourcolor = hourcolor.map(function (c) {
        return Math.ceil(c * 255);
      });
      var hourcolorAsCss = 'rgb(' + hourcolor + ')';
      document.getElementById("hora").style.color = hourcolorAsCss

      framecolor = properties.framecolor.value.split(' ');
      framecolor = framecolor.map(function (c) {
        return Math.ceil(c * 255);
      });
      framecolorAsCss = 'rgb(' + framecolor + ')';
      document.getElementById("relogio").style = "border: 2px solid " + framecolorAsCss

      var datecolor = properties.datecolor.value.split(' ');
      datecolor = datecolor.map(function (c) {
        return Math.ceil(c * 255);
      });
      var datecolorAsCss = 'rgb(' + datecolor + ')';
      document.getElementById("data").style.color = datecolorAsCss

      dateformat = properties.dateformat.value;
      var showdate = properties.showdate.value;
      if (showdate == false) {
        document.getElementById("data").style.display = "none";
      } else {
        document.getElementById("data").style.display = "block";
      }

      showframe = properties.showframe.value;
      if (showframe == false) {
        document.getElementById("relogio").style = "border: 0px solid rgba(0,0,0,0.0)"
      } else {
        document.getElementById("relogio").style = "border: 2px solid " + framecolorAsCss
      }

      showAmPm = properties.showampm.value;

      var hourformat = properties.hourformat.value;
      if (hourformat == "12") {
        modo12Horas = true;
      } else {
        modo12Horas = false;
      }
    }
  }
}

function configurar() {
  window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

      if (properties.showampm) {
        showAmPm = properties.showampm.value;
      }

      if (properties.hourformat) {
        var hourformat = properties.hourformat.value;
        if (hourformat == "12") {
          modo12Horas = true;
        } else {
          modo12Horas = false;
        }
      }
      if (properties.schemecolor) {
        var schemeColor = properties.schemecolor.value.split(' ');
        schemeColor = schemeColor.map(function (c) {
          return Math.ceil(c * 255);
        });
        var schemeColorAsCSS = 'rgb(' + schemeColor + ')';
        document.getElementById("fundo").style = "background-color: " + schemeColorAsCSS
      }

      if (properties.hourcolor) {
        var hourcolor = properties.hourcolor.value.split(' ');
        hourcolor = hourcolor.map(function (c) {
          return Math.ceil(c * 255);
        });
        var hourcolorAsCss = 'rgb(' + hourcolor + ')';
        document.getElementById("hora").style.color = hourcolorAsCss
      }
         
      if (properties.framecolor) {
        framecolor = properties.framecolor.value.split(' ');
        framecolor = framecolor.map(function (c) {
          return Math.ceil(c * 255);
        });
          framecolorAsCss = 'rgb(' + framecolor + ')';
          if(showframe===true){
          document.getElementById("relogio").style = "border: 2px solid " + framecolorAsCss
         }
      }

      if (properties.datecolor) {
        var datecolor = properties.datecolor.value.split(' ');
        datecolor = datecolor.map(function (c) {
          return Math.ceil(c * 255);
        });
        var datecolorAsCss = 'rgb(' + datecolor + ')';
        document.getElementById("data").style.color = datecolorAsCss
      }

      if (properties.showdate) {
        var showdate = properties.showdate.value;
        if (showdate == false) {
          document.getElementById("data").style.display = "none";
        } else {
          document.getElementById("data").style.display = "block";
        }
      }

      if (properties.showframe) {
        showframe = properties.showframe.value;
        if (showframe == false) {
          document.getElementById("relogio").style = "border: 0px solid rgba(0,0,0,0.0)"
        } else {
          document.getElementById("relogio").style = "border: 2px solid " + framecolorAsCss
        }
      }

      if (properties.dateformat) {
        dateformat = properties.dateformat.value;
      }
      
    }
  };
}

function contar() {
  var d = new Date();
  let horas = d.getHours();
  let minutos = d.getMinutes();
  let segundos = d.getSeconds();

  let dia = d.getDate();
  let mes = d.getMonth() + 1;
  let ano = d.getFullYear();
  var horario;

  if (segundos >= 0 && segundos < 10) {
    segundos = "0" + segundos
  }
  if (minutos >= 0 && minutos < 10) {
    minutos = "0" + minutos
  }
  if (horas >= 0 && horas < 10) {
    horas = "0" + horas
  }

  if (horas >= 0 && horas < 12) {
    horario = "Am"
  } else {
    horario = "Pm"
  }
  if (showAmPm == false) {
    horario = "";
  }
  if (horas > 12 && modo12Horas == true) {
    horas = horas - 12;
  }

  if (horas == 00 && modo12Horas == true) {
    horas = 12;
  }

  if (mes < 10) {
    mes = "0" + mes
  }
  if (dia < 10) {
    dia = "0" + dia
  }

  var saida = document.getElementById('hora')
  saida.innerHTML = `${horas}:${minutos}:${segundos}<span id="am-pm">${horario}<\span>`

  var saida2 = document.getElementById('data')
  switch (dateformat) {
    case "1":
      saida2.innerHTML = `${dia}/${mes}/${ano}`
      break;
    case "2":
      saida2.innerHTML = `${mes}/${dia}/${ano}`
      break;
    case "3":
      saida2.innerHTML = `${ano}/${mes}/${dia}`
      break;
    default:
      saida2.innerHTML = `${dia}/${mes}/${ano}`
  }
  configurar();
}

function iniciar() {
  window.setInterval(contar, 1000);
  definir();
}