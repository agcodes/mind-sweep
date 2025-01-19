(function() {
  function isCanvasSupported() {
    const elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }

  if (isCanvasSupported() === false) {
    alert('Votre navigateur internet ne supporte pas les fonctionnalités de ce site.');
  }
}());
