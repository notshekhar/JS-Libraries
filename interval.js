//Ineterval control 
class Interval{
    constructor(fn, time){
        this.fn = fn
        this.time = time
        this.timer = false;
    }
    start() {
        if (!this.isRunning())
            this.timer = setInterval(this.delayfn, this.delaytime);
    };
    stop() {
        clearInterval(this.timer);
        this.timer = false;
    };
    isRunning() {
        return this.timer !== false;
    };

    static delay(milliseconds) {
        let start = new Date().getTime();
        for (let i = 0; i < i+2; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
}

