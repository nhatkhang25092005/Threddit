class EventBus{
  constructor(){
    this.events = {}
  }

  on(eventName, callback){
    if(!this.events[eventName]){
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)

    return () => {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      )
    }
  }

  emit(eventName, data){
    const callbacks = this.events[eventName]
    if(!callbacks) return

    callbacks.forEach(cb=>cb((data)))
  }

  off(eventName, callback){
    const callbacks = this.events[eventName]
    if(!callbacks) return

    this.events[eventName] = callbacks.filter(cb => cb !== callback)
  }
}

export const eventBus = new EventBus()