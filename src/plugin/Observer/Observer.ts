class Observer {
  private observers: Function[];

  constructor() {
	  this.observers = [];  	
  }
  
  public getSubscribers(): Function[] {
    return this.observers;
  }

  public subscribe(fn: Function): void {
    this.observers.push(fn);
  }
  
  public unsubscribe(fn: Function): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  public notify(data: object): void {
    this.observers.forEach((subscriber) => subscriber(data));
  }
}

export default Observer;