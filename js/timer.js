function Timer(totalTime) {

    this.started = false;
    this.countdown = {};
    this.timeupCallbacks = [];
    this.intervalCallbacks = [];
    this.totalTime = totalTime ? totalTime : 10; //default 10 seconds
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

Timer.prototype.timeup = function() {
    this.started = false;
    clearInterval(this.countdown);
    this.timeupCallbacks.forEach(function (callback) {
      callback();
    });
};