import { baseURL } from '../api';

import { handleBodyRequest, handleResponse } from '../../helpers';

import { IEvent, INewEvent } from './type';

export async function getEventsService(): Promise<IEvent[]> {
  const httpResultEvent = await fetch(`${baseURL}/events`, {
    credentials: 'include',
  });
  return handleResponse(httpResultEvent);
}

export async function createEventService(event: INewEvent): Promise<IEvent[]> {
  const httpResultCreateEvent = await fetch(
    `${baseURL}/events`,
    handleBodyRequest('POST', event)
  );
  return handleResponse(httpResultCreateEvent);
}

export async function updateEventService(event: INewEvent): Promise<IEvent> {
  const httpResultUpdateEvent = await fetch(
    `${baseURL}/events/${event.id}`,
    handleBodyRequest('PUT', event)
  );
  return handleResponse(httpResultUpdateEvent);
}

export async function deleteEventService(event: INewEvent): Promise<void> {
  const httpResultDeleteEvent = await fetch(
    `${baseURL}/events/${event.id}`,
    handleBodyRequest('DELETE', event.id)
  );
  return handleResponse(httpResultDeleteEvent);
}
