jooJS = {
  version: 0,
  author: "Johan Odijk",
  defaultParam: function(param,def){ //make a default parameter, if it's empty, set it to the default given. for an example check jooJS.makeElement.
    param = typeof param !== 'undefined' ? param : def;
    return param;
  },
  getURL: function(url,callback,cache) {//uses a get request to get an url
    cache = this.defaultParam(cache,true);

    var request = new XMLHttpRequest();
    request.addEventListener("load",function () {callback(this.responseText)});
    if (cache) { //use normal url, cache is included (default)
      request.open("GET",url);
    } else { //unique url (using date)
      request.open("GET", url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime());
    }
    request.send();
  },
  postURL: function(path, params) { //gotten from https://stackoverflow.com/a/133997., slightly modified to make it only accept post.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
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
  makeEl: function(type,text,classes) { //returns an element, if wanted with text inside it.
    text = this.defaultParam(text,null);
    classes = this.defaultParam(classes,null);
    el = document.createElement(type);
    if (text !== null) {
        el.appendChild(document.createTextNode(text));
    }
    if (classes !== null) {
      classes.forEach(function(className){
        el.classList.add(className);
      });
    }
    return el;
  },
  makeButton: function(text,func,div) { //makes a button, either as a div or as a button and has a click addEventListener of func.
    text = this.defaultParam(text,null);
    div = this.defaultParam(div,false);
    if (div) {
      el = this.makeEl("div",text);
    } else {
      el = this.makeEl("button",text);
    }
    el.classList.add("button");
    el.addEventListener("click",func);
    return el;
  },
  emptyEl: function(el) { //removes an element's content. SRC: https://stackoverflow.com/a/3955238
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    return true
  }
};
