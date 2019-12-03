const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Audio = require('Audio');

// Locate the playback controller in the Assets
const playbackController = Audio.getPlaybackController('audioPlaybackController');
const playbackFailController = Audio.getPlaybackController('audioFailPlaybackController');
const speaker1 = Scene.root.find('speaker1');

export function setPlayAudioDaruma(){
    // @ts-ignore
    playbackController.setPlaying(true);
}

export function ResetAudioDaruma(){
    playbackController.reset();
}

export function StopAudioDaruma(){
    playbackController.stop();
}

export function setPlayAudioFail(){
    // @ts-ignore
    playbackFailController.setPlaying(true);
}

export function ResetAudioFail(){
    playbackFailController.reset();
}

export function StopAudioFail(){
    playbackFailController.stop();
}

export function muteAudioFail(){
    speaker1.volume = 0;
}

export function unMuteAudioFail(){
    speaker1.volume = 1;
}