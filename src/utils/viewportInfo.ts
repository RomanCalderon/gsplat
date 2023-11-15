const viewportInfo = {
    vh(percent: number) {
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return (percent * h) / 100;
    },
    
    vw(percent: number) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        return (percent * w) / 100;
    },
    
    vmin(percent: number) {
        return Math.min(this.vh(percent), this.vw(percent));
    },
    
    vmax(percent: number) {
        return Math.max(this.vh(percent), this.vw(percent));
    }
}

export default viewportInfo