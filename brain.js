
//Challenge - 1 
function cal() {
    let age = prompt(' What is your birth year? ');
    age = (2021 - age) * 365;
    let days = document.getElementById('result');
    days.innerHTML = age;
}
function reset() {
    // alert('hi');
    let days = document.getElementById('result');
    days.innerHTML = '0'
}

//Challenge - 2
function generate() {
    let image = document.createElement('img');
    image.src = "cat.jpg";
    let doc = document.getElementById('flex-gen');
    doc.append(image);
}
function del() {
    let doc = document.getElementById('flex-gen');
    doc.innerHTML = null;
}

// Challenge - 3

function rpsGame(yourchoice) {
    let humanchoice, botchoice;
    humanchoice = yourchoice.id;
    botchoice = random();
    // console.log(botchoice);
    let result = findwinner(humanchoice, botchoice);
    // console.log(result);


    botchoice = document.getElementById(botchoice);
    humanchoice = document.getElementById(humanchoice);

    // console.log(humanchoice);
    let content = document.getElementById('game');
    content.innerHTML = null;

    let human = document.createElement('div');
    let text = document.createElement('div');
    let bot = document.createElement('div');
    text.setAttribute('id', 'txt');

    human.innerHTML = "<img class='item' id='human' src='" + humanchoice.src + "' height=180px >";
    bot.innerHTML = "<img class='item' id='bot' src='" + botchoice.src + "' height=180px >";
    text.innerHTML = "<p class='msg' style='color: " + result['color'] + ";'>" + result['message'] + "</p> <button class='btn green' onclick='playagain()'>Play Again</button>";


    content.append(human);
    content.append(text);
    content.append(bot);

}
function random() {
    let item = ['rock', 'paper', 'scissor'];
    let val = 3 * Math.random();
    val = Math.floor(val);
    // console.log(val);
    return item[val];
}

function playagain() {
    // console.log(document.getElementById('rock'));
    let cont = document.getElementById('game');
    cont.innerHTML = '<img class="item" id="rock" src="http://images.clipartpanda.com/rock-clipart-alpine-landscape-rock-rubble-01b-al1.png" alt="Rock" onclick="rpsGame(this)"> <img class="item" id="paper" src="https://i.pinimg.com/originals/2c/ff/0f/2cff0f357f2341446857f7f5b350c114.jpg" alt="Paper" onclick="rpsGame(this)"> <img class="item" id="scissor" src="scissor.jpg" alt="Scissor" onclick="rpsGame(this)">';

}

function findwinner(humanchoice, botchoice) {
    let res = {
        'message': '',
        'color': ''
    }
    if (humanchoice == botchoice) {
        res['message'] = 'You tied!';
        res['color'] = 'yellow';
        return res;
    }
    if (humanchoice == 'rock') {
        if (botchoice == 'paper') {
            res['message'] = 'You lost!';
            res['color'] = 'red';
        }
        else {
            res['message'] = 'You Won!';
            res['color'] = 'green';
        }
    }
    else if (humanchoice == 'paper') {
        if (botchoice == 'scissor') {
            res['message'] = 'You lost!';
            res['color'] = 'red';
        }
        else {
            res['message'] = 'You Won!';
            res['color'] = 'green';
        }
    }
    else {
        if (botchoice == 'rock') {
            res['message'] = 'You lost!';
            res['color'] = 'red';
        }
        else {
            res['message'] = 'You Won!';
            res['color'] = 'green';
        }
    }
    return res;
}

// CHallenge - 4  -----  Change the colors of all button


let all_buttons = document.getElementsByTagName('button');
// console.log(all_buttons);
let colour_arr = [];
for (let i = 0; i < all_buttons.length; i++) {
    colour_arr.push(all_buttons[i].classList[1]);

}
// console.log(colour_arr);

// IT WILL BE CALLED WHEN THERE IS ANY CHANGE IN OPTION SELECTION

function backgroundchange(your_choice) {
    console.log(your_choice.value);
    let new_color = your_choice.value;
    if (new_color == 'random') {
        random_colour();
    }
    else if (new_color == 'reset') {
        reset_colour();
    }
    else {

        for (let i = 0; i < all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(new_color);
        }
    }
}

//  RANDOM FUNCTION
function random_colour() {
    let arr_rand = ['red', 'green', 'blue', 'orange', 'pink'];
    let index_rand;
    for (let i = 0; i < all_buttons.length; i++) {

        index_rand = Math.floor(Math.random() * 5);
        // console.log(index_rand);
        let new_color = arr_rand[index_rand];

        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(new_color);

    }

}
//  RESET FUNCTION
function reset_colour() {
    // console.log('calling reset function')
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(colour_arr[i]);
    }
}

///-----------------------------------------------------------------------------------------------------
//  challenge - 5 Black Jack game


let blackjack_obj = {
    you: {
        div: '#human_card',
        'msg_box': 'my_score',
        score: 0,
    },
    bot: {
        div: '#bot_card',
        'msg_box': 'bot_score',
        score: 0,
    },

}
//  Objects 
const YOU = blackjack_obj['you'];
const DEALER = blackjack_obj['bot'];

//  Initalisation of result of table
let [win_result,lose_result,drew_result]=[0,0,0];
let turnsover=false;

let interval;
const hit_sound = new Audio('sounds/swish.m4a');
const win_sound = new Audio('sounds/cash.mp3');
const lost_sound = new Audio('sounds/aww.mp3');
// let your_total,bot_total;
// your_total=0;
// bot_total=0;
// selecting hit button and also calling function when it is clicked
console.log(document.querySelector('#hit_btn').addEventListener('click', blackjack_hit));
console.log(document.querySelector('#deal_btn').addEventListener('click', blackjack_deal));
console.log(document.querySelector('#stand_btn').addEventListener('click', blackjack_stand));

//  hit function
function blackjack_hit() {
    // alert('Hit on')
    if(turnsover==false){
        let card = get_card(YOU);
        let box = document.querySelector(YOU['div']);

        if (YOU['score'] > 21) {
            // blackjack_bust(YOU);
            let your_score = document.getElementById(YOU['msg_box']);
            // console.log(YOU['score']);
            // msg='You: '+YOU['score'];
            your_score.innerHTML = "You: <span style='color: red','font-size: 40px'>BUST! </span>";
        }
        else {
            // let box=document.querySelector('#bot_card');
            hit_sound.play();
            box.append(card);

            let your_score = document.getElementById(YOU['msg_box']);
            // console.log(YOU['score']);
            // msg='You: '+YOU['score'];
            your_score.innerHTML = 'You: ' + YOU['score'];
        }
    }

}

function get_card(Player) {
    let arr_card = ['2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', 'A.png', '10.png', 'J.png', 'K.png', 'Q.png'];

    //Random Value
    let ran_ind = Math.floor(Math.random() * 13);

    //  Updating total score
    if (ran_ind >= 9 && ran_ind <= 12) {
        Player['score'] += 10;
    }
    else if (ran_ind == 8) {
        
        if((Player['score']+11)<=21)
        Player['score'] += 11;
        else
        Player['score']+=1;
    }
    else {
        Player['score'] += (ran_ind + 2);
    }

    let ran_src = 'images/';
    ran_src += arr_card[ran_ind];
    let ran_card = document.createElement('img');
    ran_card.src = ran_src;
    return ran_card;
}

function blackjack_deal() {

    // let winner=computeWinner();
    

    //  Message reset
    let txt_msg = document.getElementById('top_msg')
    txt_msg.innerHTML = "Let's Play";
    txt_msg.style.color='black';
    // showResult(winner);
    //  Score reset
    let your_score = document.getElementById('my_score');
    let dealer_score = document.getElementById('bot_score');
    your_score.innerHTML = 'You: 0';
    dealer_score.innerHTML = 'Dealer: 0';
    YOU['score'] = 0;
    DEALER['score'] = 0;


    //  Images Reset
    let your_images = document.querySelector('#human_card').querySelectorAll('img');
    let dealer_images = document.querySelector('#bot_card').querySelectorAll('img');

    for (i = 0; i < your_images.length; i++) {
        your_images[i].remove();
    }
    for (i = 0; i < dealer_images.length; i++) {
        dealer_images[i].remove();
    }

    turnsover=false;
}

//  STAND BUTTON
function blackjack_stand()
{

    interval=setInterval(dealer_insert,1000);
    
    // dealer_insert();
    // if (DEALER['score'] > 21) {
    //     // blackjack_bust(YOU);
    //     let your_score = document.getElementById(DEALER['msg_box']);
    //     // console.log(YOU['score']);
    //     // msg='You: '+YOU['score'];
    //     your_score.innerHTML = "Dealer: <span style='color: red','font-size: 40px'>BUST! </span>";
    // }
}
function dealer_insert()
{
    if(DEALER['score']>=16)
    {
        if(DEALER['score']>21){
            let your_score = document.getElementById(DEALER['msg_box']);
            your_score.innerHTML = "Dealer: <span style='color: red','font-size: 40px'>BUST! </span>";
        }
        let win=computeWinner();
        showResult(win);

        clearInterval(interval);
    }
    else{
        turnsover=true;
        // alert('Inserting');
        let card = get_card(DEALER);
        let box = document.querySelector(DEALER['div']);

        if(DEALER['score']<=21)
        {
            hit_sound.play();
            box.append(card);
            let your_message = document.getElementById(DEALER['msg_box']);
            your_message.innerHTML = 'Dealer: ' + DEALER['score'];
        }
    }
}
// function blackjack_bust(Player)
// {
//     let txt=document.getElementById(Player['msg_box']);
//     txt.innerHTML='You: '
// }

function computeWinner()
{
    let winner='';
    if((YOU['score']==DEALER['score']) || (YOU['score']>21 && DEALER['score']>21))
    {
        winner='drew';
        console.log('drew');
    }
    else if(YOU['score']<=21)
    {
        if(YOU['score']>DEALER['score'] || DEALER['score']>21)
        {
            winner='won';
            console.log('won');
        }
        else{
            winner='lose';
            console.log('lose');
        }
    }
    else{
        winner='lose';
        console.log('lose');
    }
    return winner;
}

// This will show result in table as well as in top message
function showResult(winner)
{
    let show=document.getElementById('top_msg');
    let msg_color;
    if(winner=='won')
    {
        let table_result=document.getElementById('win');
        win_result+=1;
        // console.log('You Won!!')
        show.innerHTML="You Won!!";
        msg_color='green';
        table_result.innerHTML=win_result;
        win_sound.play();
    }
    else if(winner=='lose')
    {
        let table_result=document.getElementById('lose');
        lose_result+=1;
        // console.log('You lose!!')
        show.innerHTML='You Lose !';
        msg_color='red';
        table_result.innerHTML=lose_result;
        lost_sound.play();
    }
    else{
        let table_result=document.getElementById('draw');
        drew_result+=1;
        // console.log('You Drew!!')
        show.innerHTML='You Drew !';
        msg_color='yellow';
        table_result.innerHTML=drew_result;
        lost_sound.play();
    }
    show.style.color=msg_color;
    // console.log(winner);
    // console.log(show);
}