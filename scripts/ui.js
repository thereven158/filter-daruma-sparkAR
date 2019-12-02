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

gameOverlay.hidden = true;

var kidHead = Scene.root.find('kidHead');

var score;
var scoreStr = '';

export function InitScore(){
    Diagnostics.log("Init score");
    scoreText.hidden = false;
    scoreBackground.hidden = false;
    gameOverlay.hidden = true;
    score = 0;
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

export function resetScore(){
    score = 0;
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