import EventDispatcherInterface from './event-dispatcher.interface'
import EventHandlerInterface from './event-handler.interface'
import eventInterface from './event.interface'

export default class EventDispacher implements EventDispatcherInterface {
  //
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  notify(event: eventInterface): void {
    throw new Error('Method not implemented.')
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = []

    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    console.log('Method not implemented.')
  }

  unregisterAll(): void {
    console.log('Method not implemented.')
  }
}
