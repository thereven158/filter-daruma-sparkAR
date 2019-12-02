const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Audio = require('Audio');

// Locate the playback controller in the Assets
const playbackController = Audio.getPlaybackController('audioPlaybackController');

export function setPlayAudio(){
    // @ts-ignore
    playbackController.setPlaying(true);
}

export function ResetAudioKoronda(){
    playbackController.reset();
}

export function StopAudio(){
    playbackController.stop();
}