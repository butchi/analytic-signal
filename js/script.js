// エントリーポイント。indexからはライブラリとこれしか呼ばない

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

import ns from './module/ns.js';
import Main from './module/main.js';

ns.main = new Main();
