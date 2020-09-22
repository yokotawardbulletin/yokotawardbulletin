function fillJSON(divClass){
  var sl = 'main .' + divClass;
  var section = document.querySelector(sl);
  var requestURL = 'js/personadb.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var localJObj = request.response;
    showJSON(localJObj,divClass);
  }
  function showJSON(jsonObj,divClass) {
    var localJObj = jsonObj[divClass];

    for (var i = 0; i < localJObj.length; i++) {
      var myArticle = document.createElement('article');
      var myH2 = document.createElement('h2');
      var myH3 = document.createElement('h3');
      var myPara1 = document.createElement('p');
      var myPara2 = document.createElement('p');
      var myPara3 = document.createElement('p');
      var myPara4 = document.createElement('p');
      var myIMG = document.createElement('img');
      var myList1 = document.createElement('ul');

      myIMG.setAttribute('src', localJObj[i].imgref);
      myIMG.setAttribute('alt', localJObj[i].name);

      var listSkill = document.createElement('li');
      listSkill.textContent = 'Influenced by: ' + localJObj[i].skills;
      myList1.appendChild(listSkill);

      var listBias = document.createElement('li');
      listBias.textContent = 'Known Biases: ' + localJObj[i].biases;
      myList1.appendChild(listBias);

      var listStrength = document.createElement('li');
      listStrength.textContent = 'Resistant towards: ' + localJObj[i].strengths;
      myList1.appendChild(listStrength);

      var listWeak = document.createElement('li');
      listWeak.textContent = 'Sympathetic towards: ' + localJObj[i].weakness;
      myList1.appendChild(listWeak);

      myH2.textContent = localJObj[i].announce;
      myH3.textContent = localJObj[i].title + ' ' + localJObj[i].name + ' ' + localJObj[i].surname;
      myPara1.textContent = 'Appearance: ' + localJObj[i].appearance;
      myPara2.textContent = 'Background: ' + localJObj[i].background;
      myPara3.textContent = 'Cause of Death: ' + localJObj[i].death;
      myPara4.textContent = 'Social Profile: ';

      myArticle.appendChild(myH2);
      myArticle.appendChild(myH3);
      myArticle.appendChild(myIMG);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myPara4);
      myArticle.appendChild(myList1);

      section.appendChild(myArticle);

      myArticle.setAttribute("class", localJObj[i].attitude);
    }
  }
}

function fillPCDB(divClass){
  var sl = 'main .' + divClass;
  var section = document.querySelector(sl);
  var requestURL = 'js/personadb.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var localJObj = request.response;
    showPCDB(localJObj,divClass);
  }
  function showPCDB(jsonObj,divClass) {
    var localJObj = jsonObj[divClass];

    for (var i = 0; i < localJObj.length; i++) {
      var myArticle = document.createElement('article');
      var myH2 = document.createElement('h2');
      var myH3 = document.createElement('h3');
      var myH4 = document.createElement('h4');
      var myPara1 = document.createElement('p');
      var myPara2 = document.createElement('p');
      var myPara3 = document.createElement('p');
      var myPara4 = document.createElement('p');
      var myIMG = document.createElement('img');
      var myList1 = document.createElement('ul');

      myIMG.setAttribute('src', localJObj[i].imgref);
      myIMG.setAttribute('alt', localJObj[i].name);

      var listAchieve = document.createElement('li');
      listAchieve.textContent = 'Known for: ' + localJObj[i].achievements;
      myList1.appendChild(listAchieve);

      var listBias = document.createElement('li');
      listBias.textContent = 'Known Biases: ' + localJObj[i].biases;
      myList1.appendChild(listBias);

      var listStrength = document.createElement('li');
      listStrength.textContent = 'Resistant towards: ' + localJObj[i].strengths;
      myList1.appendChild(listStrength);

      var listWeak = document.createElement('li');
      listWeak.textContent = 'Sympathetic towards: ' + localJObj[i].weakness;
      myList1.appendChild(listWeak);

      myH2.textContent = localJObj[i].announce;
      myH3.textContent = localJObj[i].title + ' ' + localJObj[i].name + ' ' + localJObj[i].surname;
      myH4.textContent = localJObj[i].race + ' ' + localJObj[i].camptrait + ' ' + localJObj[i].classes + ' ' + localJObj[i].persona;
      myPara1.textContent = 'Appearance: ' + localJObj[i].appearance;
      myPara2.textContent = 'Background: ' + localJObj[i].background;
      myPara3.textContent = 'Cause of Death: ' + localJObj[i].death;
      myPara4.textContent = 'Social Profile: ';

      myArticle.appendChild(myH2);
      myArticle.appendChild(myH3);
      myArticle.appendChild(myH4);
      myArticle.appendChild(myIMG);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myPara4);
      myArticle.appendChild(myList1);

      section.appendChild(myArticle);

      myArticle.setAttribute("class", localJObj[i].attitude);
    }
  }
}