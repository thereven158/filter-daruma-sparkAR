const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Materials = require('Materials');
const Fonts = require('Fonts');
const Animation = require('Animation');
const Time = require('Time');

const normalKidMaterial = Materials.get('goodKidMat');

const scoreText = Scene.root.find('scoreText');
const finalScoreText = Scene.root.find('finalScoreTxt');
const scoreBackground = Scene.root.find('scoreContainer');
const preStart = Scene.root.find('startBox');
const gameOverlay = Scene.root.find('gameOverlay');
const rectangle0 = Scene.root.find('rectangle0');
const warning = Scene.root.find('warning');

gameOverlay.hidden = true;

var kidHead = Scene.root.find('kidHead');

var score;
var scoreStr = '';
var intervalTimer;
var reduceTemp = 7.5;

export function InitScore(){
    Diagnostics.log("Init score");
    scoreText.hidden = false;
    scoreBackground.hidden = false;
    gameOverlay.hidden = true;
    score = 0;
}

export function setTimer(){
    intervalTimer = Time.setInterval(() => {
        reduceTemp -= 0.15;
        rectangle0.transform.scaleX = reduceTemp;
        if(reduceTemp < 0) Time.clearInterval(intervalTimer);
    },100);
}

export function resetTimer(){
    reduceTemp = 7.5;
}

export function BlinkToPlay(){
    preStart.hidden = true;
}

export function preBlinkToPlay(){
    preStart.hidden = false;
}

export function UpdateScore(){
    score += 0.08;
    scoreStr = '' + score.toFixed(0);
    scoreText.text = scoreStr;
}

export function GameOverUIActive(){
    finalScoreText.text = scoreStr;
    kidHead.material = normalKidMaterial;
    gameOverlay.hidden = false;
}

export function GameOverUIDeactive(){
    gameOverlay.hidden = true;
    Diagnostics.log("restart game");
}