const { checkIntervalOverlap } = require('./helperFunc');


class event {
  
  constructor(start, end, action) {
    this.start = start;
    this.end = end;
    this.action = action;
  }
  
  getAction() {
    return this.action;
  }
  
  getFrames() {
    return (this.end - this.start);
  }
  
  getOverlap(event) {
    const overlapType = checkIntervalOverlap(this, event);
    
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