import MusicService from "./music-service";
import AdminService from "./admin-service";
import ToastService from "./toast-service";
import InteractService from "./interact-service";

export interface Service {
  Intents: any;
}

export default class ServiceResolverImpl {
  MusicService = new MusicService();
  AdminService = new AdminService();
  ToastService = new ToastService();
  InteractService = new InteractService();

  constructor() {
    this.AdminService.musicService = this.MusicService;
  }
}

export const useService = <T extends Service>(ctor: { new(): T }) => {
  return Object.entries(ServiceResolver).filter(o => o[0] === ctor.name)[0][1] as unknown as T;
};

export const ServiceResolver = new ServiceResolverImpl();