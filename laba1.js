var arr = ['z', 'a', 'e'];
array.innerHTML = arr;

function createDict() {
    var newAlphabet = document.getElementById('newArray').innerHTML.split(',');
    var dictionary = {};

    newAlphabet.forEach(function(letter) {
        dictionary[letter] = [];
    });

    document.getElementById('dictArray').innerHTML = JSON.stringify(dictionary);
}

function pushArray(){
    var x = document.getElementById('newArray');
    var str = arr.indexOf(document.getElementById("inputAdd").value);
    if(str == -1) {
        arr.push(document.getElementById("inputAdd").value);
        x.innerHTML = arr.join();
    }else{
        alert("Элемент уже существует");
    }
}

function delArray(){
    var x = document.getElementById('newArray');
    var str = document.getElementById("inputDel").value;

    if(/^[0-9]$/.test(str)){//если это число
        arr.splice(str, 1);//берем элемент с индексом val и удаляем
        x.innerHTML = arr.join();
    } else {//все остальное
        var position = arr.indexOf(str); //вычисляем индекс
        arr.splice(position, 1);//удаляем
        x.innerHTML = arr.join();
    }
}

function checkArray(){
    var x = document.getElementById('newArray');
    var str = arr.indexOf(document.getElementById("inputCheck").value);
    if(str == -1){
        alert("Элемент "+document.getElementById("inputCheck").value+" не сущестует");
    } else{
        alert("Элемент "+document.getElementById("inputCheck").value+" сущестует");
    }
}
//
 function wordArray(){
     var arrayAsString = document.getElementById('newArray').innerHTML;
     var array = arrayAsString.split(',');
     var str = document.getElementById("inputWord").value;
     var newArr = array.sort(function (a, b) {
         return b.length - a.length;
     });
     var dpStr = str.slice();

     newArr.forEach(function (value) {
        return dpStr = dpStr.replace(value, "");
     });

     if (!dpStr) {
        alert("Слово " + str + " существует");
    } else {
        alert("Слово " + str + " не существует");
     }

 }

//ЗАДАНИЕ 2

function addStr() {
    var word = document.getElementById('inputAddStr').value;
    var checkWord = isDictionaryContainsWord(word);

    if (checkWord) {
        return alert('Слово есть в словаре');
    }

    var firstLetter = word.substring(0, 1);
    var dictionary = JSON.parse(document.getElementById('dictArray').innerHTML);
    var letterBlock = dictionary[firstLetter];

    letterBlock.push(word);

    document.getElementById('dictArray').innerHTML = JSON.stringify(dictionary);
}

function searchStr() {
    var word = document.getElementById('inputSearchStr').value;
    var c = isDictionaryContainsWord(word);

    if (c) {
        alert('Слово есть');
    } else {
        alert('Слова нет');
    }
}

function isDictionaryContainsWord(word) {
    var firstLetter = word.substring(0, 1);
    var dictionary = JSON.parse(document.getElementById('dictArray').innerHTML);
    var letterBlock = dictionary[firstLetter];

    return letterBlock.some(function(currentWord) {
        return word === currentWord;
    });
}

function delStr() {
    var word = document.getElementById('inputDelStr').value;
    var checkWord = isDictionaryContainsWord(word);

    if (checkWord) {
        var firstLetter = word.substring(0, 1);
        var dictionary = JSON.parse(document.getElementById('dictArray').innerHTML);
        var letterBlock = dictionary[firstLetter];

        letterBlock.splice(letterBlock.indexOf(word), 1);

        document.getElementById('dictArray').innerHTML = JSON.stringify(dictionary);
    } else {
        alert('Такого слова нет');
    }
}

// function sortStr() {
//     var dictionary = JSON.parse(document.getElementById('dictArray').innerHTML);
//     var dictionaryOrder = {};
//     var index = 0;
//     for (var property in dictionary) {
//         dictionaryOrder[property] = index;
//         index++;
//     }
//    // console.log('dictionaryOrder', dictionaryOrder);
//     for (var block in dictionary) {
//         if (dictionary.hasOwnProperty(block)) {
//             dictionary[block].sort(function(a, b) {
//                 if (dictionaryOrder[a] < dictionaryOrder[b]) {
//                     return -1;
//                 }
//
//                 if (dictionaryOrder[a] > dictionaryOrder[b]) {
//                     return 1;
//                 }
//                 return 0;
//             });
//
//             document.getElementById('dictArray').innerHTML = JSON.stringify(dictionary);
//         }
//     }
// }

function sortStr() {
    var dictionary = JSON.parse(document.getElementById('dictArray').innerHTML);
    var dictionaryOrder = {};
    var index = 0;
    for (var property in dictionary){
        dictionaryOrder[property] = index++;
    }

    for (var block in dictionary) {
        if (dictionary.hasOwnProperty(block)) {
            dictionary[block].sort(function(a, b){
                for(var i = 0; i < Math.min(a.length, b.length); i++) {
                if(a[i] === b[i]){
                    continue;
                } else if(dictionaryOrder[a[i]] < dictionaryOrder[b[i]]) return -1;
                else if(dictionaryOrder[a[i]] > dictionaryOrder[b[i]]) return 1;
            }
            return 0;
        });
            console.log('sort', dictionary);
            document.getElementById('dictArray').innerHTML = JSON.stringify(dictionary);
        }
    }
}

