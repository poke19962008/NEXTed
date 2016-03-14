var item = document.querySelector('div#skill_counter');

function isIOSSafari() {
    var userAgent;
    userAgent = window.navigator.userAgent;
    return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
};

function isTouch() {
    var isIETouch;
    isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
};
var isIOS = isIOSSafari(),
    clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';
function extend( a, b ) {
    for( var key in b ) {
        if( b.hasOwnProperty( key ) ) {
            a[key] = b[key];
        }
    }
    return a;
}
function Animocon(el, options) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );

    this.checked = false;

    this.timeline = new mojs.Timeline();

    for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
        this.timeline.add(this.options.tweens[i]);
    }

    var self = this;
    this.el.addEventListener(clickHandler, function() {
        if( self.checked ) {
            self.options.onUnCheck();
        }
        else {
            self.options.onCheck();
            self.timeline.start();
        }
        self.checked = !self.checked;
    });
}
var el10 = item.querySelector('button.icobutton'), el10span = el10.querySelector('span'), el10counter = el10.querySelector('span.icobutton__text');
var opacityCurve10 = mojs.easing.path('M1,0 C1,0 26,100 51,100 C76,100 101,0 101,0');
var translationCurve10 = mojs.easing.path('M0,100 C0,0 50,0 50,0 L50,100 L50,200 C50,200 50,100 100,100');
var colorCurve10 = mojs.easing.path('M0,100 L50,100 L50,0 L100,0');
new Animocon(el10, {
    tweens : [
        // burst animation
        new mojs.Burst({
            parent: el10,
            duration: 600,
            shape : 'circle',
            fill: '#C0C1C3',
            x: '50%',
            y: '50%',
            opacity: 0.6,
            childOptions: {
                radius: {30:0},
                type: 'line',
                stroke: '#6F97F7',
                strokeWidth: {1:2}
            },
            radius: {80:130},
            degree: 90,
            angle: 135,
            count: 6,
            isRunLess: true,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }),
        // icon scale animation
        new mojs.Tween({
            duration : 400,
            easing: mojs.easing.ease.out,
            onUpdate: function(progress) {
                var opacityProgress = opacityCurve10(progress);
                el10span.style.opacity = opacityProgress;

                var translationProgress = translationCurve10(progress);
                el10span.style.WebkitTransform = el10span.style.transform = 'translate3d(0,' + -150 * translationProgress + '%,0)';

                var colorProgress = colorCurve10(progress);
                el10.style.color = colorProgress ? '#6F97F7' : '#C0C1C3';
            }
        })
    ],
    onCheck : function() {
        el10counter.innerHTML = Number(el10counter.innerHTML) + 1;
    },
    onUnCheck : function() {
        el10.style.color = '#C0C1C3';

        var current = Number(el10counter.innerHTML);
        el10counter.innerHTML = current > 1 ? Number(el10counter.innerHTML) - 1 : '';
    }
});
