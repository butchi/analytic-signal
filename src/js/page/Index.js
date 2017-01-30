import ns from '../module/ns';

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    var width = 465;
    var height = 465;

    var kernelLen = 127;
    var amp = 128;

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

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

    function initialize() {
        var audioElm = document.getElementById("audio");
        var canvasElm = document.getElementById("canvas");
        var canvasContext = canvasElm.getContext("2d");
        var timeDomainData;
        
        canvasElm.width = width;
        canvasElm.height = height;
        
        if(navigator.getUserMedia) {
            navigator.getUserMedia(
                {audio : true},
                function(stream) {
                    var url = URL.createObjectURL(stream);
                    audioElm.src = url;
                    audioElm.volume = 0;
                    var audioContext = new AudioContext();
                    var mediastreamsource = audioContext.createMediaStreamSource(stream);
                    var analyser = audioContext.createAnalyser();
                    timeDomainData = new Uint8Array(analyser.frequencyBinCount);
                    mediastreamsource.connect(analyser);
                    
                    var animation = function(){
                        analyser.getByteTimeDomainData(timeDomainData);
                        
                        var i, k, l;
                        canvasContext.clearRect(0, 0, width, height);
                        canvasContext.beginPath();
                        
                        for (i = kernelLen, l = timeDomainData.length - kernelLen; i < l; i++) {
                            var hilbTmp = 0;
                            for(k = -kernelLen; k <= kernelLen; k++) {
                                hilbTmp += inv(k) * (normalize(timeDomainData[i + k]) || 0);
                            }
                            var x = width/2 + amp * normalize(timeDomainData[i]);
                            var y = height/2 - amp * hilbTmp;
                            canvasContext.lineTo(x, y);
                        }
                        canvasContext.stroke();
                        
                        requestAnimationFrame(animation);
                    };
                    
                    animation();
                    
                },
                function(err) {
                    console.log("The following error occured: " + err);
                }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    }

    window.addEventListener("load", initialize, false);
  }
}