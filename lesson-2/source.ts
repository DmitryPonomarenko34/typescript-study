type stringOrNumber = string | number;

type ExampleObject = {
  on?(type: stringOrNumber, handler: []): ExampleObject;
  off?(type: stringOrNumber, handler: []): ExampleObject;
  trigger?(event: stringOrNumber | Event | any, args: []): ExampleObject;
  _dispatch?(event: {type: any} & string, args: [] | string[]): ExampleObject | void;
  _offByHandler?(type: number[] & string, args: [] | string[]): ExampleObject;
  _offByType?(event: string & number[], args: [] | string[]): ExampleObject;
  _offAll?(event: string & number[], args: [] | string[]): ExampleObject;
}

var emitter: ExampleObject = {};

function Emitter(): void {
  var e = Object.create(emitter);
  e.events = {};
  return e;
}

function Event(type: stringOrNumber): void {
  this.type = type;
  this.timeStamp = new Date();
}

emitter.on = function (type: stringOrNumber, handler: []) {
  if (this.events.hasOwnProperty(type)) {
    this.events[type].push(handler);
  } else {
    this.events[type] = [handler];
  }
  return this;
};

emitter.off = function (type, handler) {
  if (arguments.length === 0) {
    return this._offAll();
  }
  if (handler === undefined) {
    return this._offByType(type);
  }
  return this._offByHandler(type, handler);
};

emitter.trigger = function (event, args) {
  if (!(event instanceof Event)) {
    event = new Event(event);
  }
  return this._dispatch(event, args);
};

emitter._dispatch = function (event, args) {
  if (!this.events.hasOwnProperty(event.type)) return;
  args = args || [];
  args.unshift(event);

  var handlers = this.events[event.type] || [];
  handlers.forEach(handler => handler.apply(null, args));
  return this;
};

emitter._offByHandler = function (type, handler) {
  if (!this.events.hasOwnProperty(type)) return;
  var i = this.events[type].indexOf(handler);
  if (i > -1) {
    this.events[type].splice(i, 1);
  }
  return this;
};

emitter._offByType = function (type) {
  if (this.events.hasOwnProperty(type)) {
    delete this.events[type];
  }
  return this;
};

emitter._offAll = function () {
  this.events = {};
  return this;
};

Emitter.Event = Event;

Emitter.mixin = function (obj: object, arr: string[]) {
  var emitter = new Emitter();
  arr.map(function (name) {
    obj[name] = function () {
      return emitter[name].apply(emitter, arguments);
    };
  });
};

export { };