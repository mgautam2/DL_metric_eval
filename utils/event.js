
class event {
  
  constructor(start, end, action) {
    this.start = start;
    this.end = end;
    this.action = action;
  }
  
  midpoint() {
    return (this.end + this.start) / 2;
  }

}


module.exports = event;