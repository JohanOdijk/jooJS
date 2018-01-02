jooJS = {
  version: 0,
  author: "Johan Odijk",
  defaultParam: function(param,def){ //make a default parameter, if it's empty, set it to the default given. for an example check jooJS.makeElement.
    param = typeof param !== 'undefined' ? param : def;
    return param;
  },
  getURL: function(url,callback) {//uses a get request to get an url
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  },
  shuffleArray: function(array) { //shuffles an array using the Fisher-Yates algorithm SRC: https://stackoverflow.com/a/2450976 & https://bost.ocks.org/mike/shuffle/
      if (Array.isArray(array)){
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    } else {
      return false;
    }
  },
  makeEl: function(type,text) { //returns an element, if wanted with text inside it.
    text = this.defaultParam(text,null);
    el = document.createElement(type);
    if (text !== null) {
        el.appendChild(document.createTextNode(text));
    }
    return el;
  }
};

/*
TEMP:
*/
//testing/messing around with libary:

jooJS.getURL('https://jsonplaceholder.typicode.com/posts',function (json){
  json = jooJS.defaultParam(json,'[{"title":"lol!"},{"title":"xD"}]');

  json = JSON.parse(json);
  console.log(json);
  json = jooJS.shuffleArray(json);

  titels = "";
  for (var i = 0; i < json.length; i++) {
    titels += json[i].title+" ";
  }
  document.body.appendChild(jooJS.makeEl('div',titels));
});
