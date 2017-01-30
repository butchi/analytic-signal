function inv(n) {
  if(n === 0) {
    return 0;
  } else {
    return 1 / (n * Math.PI);
  }
}

function normalize(val) {
  return (val - 128) / 128;
}

export default class AnalyticSignal {
  constructor(opts = {}) {
    this.initialize(opts);
  }

  initialize(opts = {}) {
    this.elm = opts.elm;

    this.kernelLen = opts.kernelLen || 127;
    this.amp = opts.amp || 128;

    this.width = opts.width || 256;
    this.height = opts.height || 256;

    this.audioElm = this.elm.querySelector('.main-audio');
    this.canvasElm = this.elm.querySelector('.main-canvas');
    this.canvasContext = this.canvasElm.getContext("2d");

    this.canvasElm.width = this.width;
    this.canvasElm.height = this.height;

    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    
    if(!navigator.getUserMedia) {
      console.log("getUserMedia not supported");

      return;
    }

    navigator.getUserMedia(
      {audio : true},
      (stream) => {
        this.getUserMediaHandler(stream);
      },
      (err) => {
        console.log("The following error occured: " + err);
      }
    );
  }

  getUserMediaHandler(stream) {
    this.url = URL.createObjectURL(stream);
    this.mediastreamsource = this.audioContext.createMediaStreamSource(stream);

    this.audioElm.src = this.url;
    this.audioElm.volume = 0;

    this.mediastreamsource.connect(this.analyser);

    this.animation(stream);
  }

  animation(stream) {
    let timeDomainData = new Uint8Array(this.analyser.frequencyBinCount);

    this.analyser.getByteTimeDomainData(timeDomainData);

    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.canvasContext.beginPath();

    let len = timeDomainData.length - this.kernelLen;
    for(let i = this.kernelLen; i < len; i++) {
      let hilbTmp = 0;
      for(let k = - this.kernelLen; k <= this.kernelLen; k++) {
        hilbTmp += inv(k) * (normalize(timeDomainData[i + k]) || 0);
      }
      let x = this.width / 2 + this.amp * normalize(timeDomainData[i]);
      let y = this.height / 2 - this.amp * hilbTmp;
      this.canvasContext.lineTo(x, y);
    }
    this.canvasContext.stroke();

    requestAnimationFrame(() => {
      this.animation(stream);
    });
  }
}