const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Materials = require('Materials');

// Material
const animationPeekMat = Materials.get('peekMaterial');
const animationHideMat = Materials.get('hideMaterial');

const kidObj = Scene.root.find('kid');

export function kidHide(){
    kidObj.material = animationHideMat;
}

export function kidPeek(){
    kidObj.material = animationPeekMat;
}
