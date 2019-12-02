import {InitScore,
        UpdateScore,
        BlinkToPlay,
        GameOverUIActive,
        GameOverUIDeactive,
        preBlinkToPlay,
        resetScore
    } from './ui.js';

import {setPlayAudio,
        ResetAudioKoronda,
        StopAudio
        } from './audio.js';

import {kidHide,
        kidPeek
        } from './kid.js';

import config from './config.js';

const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Reactive = require('Reactive');
const FaceTracking = require('FaceTracking');
// const FaceGestures = require('FaceGestures');
const Time = require('Time');
const TouchGestures = require('TouchGestures');
const Materials = require('Materials');
const CameraInfo = require('CameraInfo');

const face = FaceTracking.face(0);

const buttonRetry = Scene.root.find('buttonRetry');
const buttonPlay = Scene.root.find('startBox');
// Material
const retryButtonClickedMat = Materials.get('retryClickedMat');
const retryButtonUnclickedMat = Materials.get('retryUnclickMat');

const leftEyeOpeness = FaceTracking.face(0).leftEye.openness;
const rightEyeOpeness = FaceTracking.face(0).rightEye.openness;

var gameStart = false;
var canPeek = true;
var leftEyesClosed = false;
var gameOver = false;
var intervalAudioPlay;



CameraInfo.isRecordingVideo.monitor().subscribe((value) => {
    if (value.newValue) {
        GameStart();
        Diagnostics.log("rec");
    }
    else {
        GameOver();
        Diagnostics.log("no rec");
    }
});


leftEyeOpeness.monitor().subscribe(function(event) {
    if(event.newValue > 0.3){
        leftEyesClosed = false;
    }else{
        leftEyesClosed = true;
    }
});

leftEyeOpeness.monitor().subscribe(function(event) {
    if(event.newValue > 0.3 && !leftEyesClosed){
        if(canPeek && !gameOver && gameStart){
            UpdateScore();
        }else if(canPeek && !gameOver && !gameStart){

        }
        else{
            GameOver();
        }
    }else{
        // Diagnostics.log("kedua mata tertutup");
    }
});

// FaceGestures.onBlink(face).subscribe(() => {
//     if(!gameStart){
//         GameStart();
//     }
// });

TouchGestures.onTap().subscribe(function (gesture) {
    if(!gameStart){
        GameStart();
    }
});

TouchGestures.onTap(buttonRetry).subscribe(function (gesture) {
    buttonRetry.material = retryButtonClickedMat;
    RestartGame();
});

function Init(){
    InitScore();
    StartLoopedStatic();
}

function GameStart(){
    gameStart = true;
    BlinkToPlay();
    Init();
}

function StartLoopedStatic(){
    intervalAudioPlay = Time.setInterval(() => {
        kidHide();
        setPlayAudio();
        Diagnostics.log("first audio start");
        // Diagnostics.log(randNumber);
        ResetAudioKoronda();
        Time.setTimeout(function (){
            canPeek = false;
            Diagnostics.log("Init/ can peek: " + canPeek);
            kidPeek();
            WaitCanPeekAgain();
        }, 5500);
    },11000);
}

function WaitCanPeekAgain(){
    Time.setTimeout(function (){
        canPeek = true;
        Diagnostics.log("WaitCanPeekAgain/ can peek: " + canPeek);
    }, 2000);
}

function GameOver() {
    gameOver = true;
    GameOverUIActive();
	Time.clearInterval(intervalAudioPlay);
}

function RestartGame(){
    buttonRetry.material = retryButtonUnclickedMat;
    resetScore();
    kidHide();
    preBlinkToPlay();
    GameOverUIDeactive();
    gameStart = false;
    gameOver = false;
}