function Timer(totalTime) {

    this.started = false;
    this.countdown = {};
    this.timeupCallbacks = [];
    this.intervalCallbacks = [];
    this.totalTime = totalTime ? totalTime : 300; //default 5 mins
    this.elapsed;
}

Timer.prototype.start = function() {
    this.started = true;
    var self = this;

    this.elapsed = 0;
    clearInterval(this.countdown);
    this.countdown = setInterval(this.interval.bind(this), 1000);
};

Timer.prototype.onTimeup = function(callback) {
    this.timeupCallbacks.push(callback);
};

Timer.prototype.onInterval = function(callback) {
    this.intervalCallbacks.push(callback);
};

Timer.prototype.interval = function() {
    this.elapsed += 1;
    var timeLeft = this.totalTime - this.elapsed;
    this.intervalCallbacks.forEach(function (callback) {
      callback(timeLeft);
    });
    if (timeLeft <= 0) {
        this.timeup();
    }
};

Timer.prototype.stop = function() {
    this.started = false;
    clearInterval(this.countdown);
};

Timer.prototype.timeup = function() {
    this.stop();
    this.timeupCallbacks.forEach(function (callback) {
      callback();
    });
};