const { checkIntervalOverlap } = require('./helperFunc');


class event {
  
  constructor(start, end, action) {
    this.start = start;
    this.end = end;
    this.action = action;
  }
  
  getFrames() {
    return (this.end - this.start);
  }
  
  getOverlap(event) {
    console.log(this)
    console.log(event)
    const overlapType = checkIntervalOverlap(this, event);
    console.log(overlapType);
    if (overlapType === 'underfill') {
      return event.getFrames();
    }
    else if (overlapType === 'overfill') {
      return this.getFrames();
    }
    else if (overlapType === 'left') {
      return (event.end - this.start);
    }
    else if (overlapType === 'right') {
      return (this.end - event.start);
    }
  }
  
}


module.exports = event;