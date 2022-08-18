import MusicService from "./music-service";
import ToastService from "./toast-service";

export interface Service {
  Intents: any;
}

export default class ServiceResolverImpl {
  MusicService = new MusicService();
  ToastService = new ToastService();
}

export const useService = <T extends Service>(ctor: { new(): T }) => {
  return Object.entries(ServiceResolver).filter(o => o[0] === ctor.name)[0][1] as unknown as T;
};

export const ServiceResolver = new ServiceResolverImpl();