let wordToGuess = '';
let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let letterTried = [];
let wordDisplayed = [];
let countPotence = 0;
let setting = {
'normal': false,
'hard': false,
'hardcore': false,
'cyka': false
}

//POUR METTRE LES EVENT ONCLICK DES LETTRES
const initiateOnclickAlphabet = () =>{  
    for(let i=0; i<alphabet.length; i++){
        document.querySelector('.box-alphabet').innerHTML += `<div class="lettre_default ${alphabet[i].toUpperCase()}" onclick="checkLetter('${alphabet[i].toUpperCase()}')"><span>${alphabet[i].toUpperCase()}</span></div>`
    }
}
//FONCTION POUR RECUPERER LE MOT A DEVINER D'UNE INPUT
const storeWordToGuess = () => {
    wordToGuess = document.querySelector('.word_to_guess').value;
    switch(document.getElementById('difficulty').value){   //Set la difficulté
        case 'normal':
            setting['normal'] = true;
            break;
        case 'hard':
            setting['hard'] = true;
            break;
        case 'hardcore':
            setting['hardcore'] = true;
            break;
        default:
            break;
    }
    if(wordToGuess.length < 4 || !/^[a-zA-Z]+$/.test(wordToGuess)){ // test que le mot contienne que des lettres et fasse plus de 3 lettres
        document.querySelector('.word').innerHTML = '<input type="password" placeholder="mot a deviner" class=\'word_to_guess\'/><div class="btn btn_record_word" onclick="storeWordToGuess()">Choisir le mot</div><p>Votre mot doit contenir 4 lettres minimum et pas de caractères spéciaux</p>'
    }
    else {
        wordToGuess= wordToGuess.toUpperCase().split(''); //convertit wordToGuess en ["A", "B", "C", "D]
        for(let i = 0; i < wordToGuess.length; i++) { //On push des _ pour autant de lettre dans le mot à deviner
            wordDisplayed.push('_')                       
    }
    actualizeDisplay();
    } 
}
//QUAND UNE LETTRE EST BONNE
const actualizeDisplay = () => {
    document.querySelector('.word').innerHTML = '';
    for(let i=0; i<wordDisplayed.length; i++) {       //ON display le mot à deviner
        document.querySelector('.word').innerHTML += `<span "class='lettre_to_guess lettre_${wordDisplayed[i]}'>${wordDisplayed[i]} </span>`
    }
}
//QUAND UNE LETTRE EST FAUSSE
const actualizePotence = () => {
        countPotence += 1;
        switch(countPotence){
            case 1:
                document.querySelector('.pendu').innerHTML += '<div class="potence_1"></div';
                break;
            case 2:
                document.querySelector('.pendu').innerHTML += '<div class="potence_2"></div';
                break;
            case 3:
                document.querySelector('.pendu').innerHTML += '<div class="potence_3"></div';
                break;
            case 4:
                document.querySelector('.pendu').innerHTML += '<div class="potence_4"></div';
                break;
            case 5:
                document.querySelector('.pendu').innerHTML += '<div class="potence_5"></div';
                break;
            case 6:
                document.querySelector('.pendu').innerHTML += '<div class="pendu_1"></div>'
                break;
            case 7:
                document.querySelector('.pendu').innerHTML += '<div class="pendu_2"></div>'
                break;
            case 8:
                document.querySelector('.pendu').innerHTML += '<div class="pendu_3"></div>'
                break;
            case 9:
                document.querySelector('.pendu').innerHTML += '<div class="pendu_4"></div>'
                break;
            case 10:
                document.querySelector('.pendu').innerHTML += '<div class="pendu_5"></div>'
                break;
            default:
                document.querySelector('.pendu').innerHTML += ''
                break; 
        } 
};
//FONCTION QUI TESTE LES LETTRES
const checkLetter = (l) => {
    l = l.toUpperCase();                                
   if(letterTried.includes(l) == false){
    letterTried.push(l);
    if(wordToGuess.includes(l)){
        for(let i=0; i < wordToGuess.length; i++){          //pour chaque lettre du mot a deviner
            if(wordToGuess[i] === l) {                      //SI la lettre sur laquelle on a cliqué existe
                wordDisplayed[i] = l;                       //on ajoute a wordDisplay 
            } 
        } 
        console.log('j\'ajoute la lettre ' + l );
        document.getElementsByClassName(l)[0].style.backgroundColor = 'lightgreen'
        actualizeDisplay()
        handleEndGame()
    }
    else {
        document.getElementsByClassName(l)[0].style.backgroundColor = 'grey';
        document.getElementsByClassName(l)[0].style.cursor = 'not-allowed';
        console.log('j\'ajoute une barre')
        if(setting['normal']){ //on ajoute des barrens en fnction de la difficulté
            actualizePotence()
        }
        else if(setting['hard']){
            actualizePotence()
            actualizePotence()
        }
        else if(setting['hardcore']){
            actualizePotence()
            actualizePotence()
            actualizePotence()
            
        }
        else {
            actualizePotence()
            actualizePotence()
            actualizePotence()
            actualizePotence()
            actualizePotence()
        }
        handleEndGame()
    }
   }
}
//FONCtiON QUI CHECK SI LES WIN OR LOOSE CONDITIONS SON REUNIES ET ACTUALISE EN CONSEQUENCE
const handleEndGame = () => {
    if(document.body.contains(document.querySelector('.pendu_5'))) { //CAS DU PENDU COMPLET -> DEFAITE
        document.querySelector('.word').innerHTML = `<h2>Defaite du Joueur 2, il est Pendu !!<br />Le mot à trouver était ${wordToGuess.join('').toUpperCase()}.</h2>`
    }
   
    if(wordDisplayed.includes('_') == false) {
            document.querySelector('.word').innerHTML = '<h2>Victoire du Joueur 2, il échappe à la pendaison</h2>'
    }
}
initiateOnclickAlphabet();