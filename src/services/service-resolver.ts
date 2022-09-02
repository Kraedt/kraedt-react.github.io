import MusicService from "./music-service";
import AdminService from "./admin-service";
import ToastService from "./toast-service";
import InteractService from "./interact-service";

export interface Service {
  Intents: any;
  TypeName: string;
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

export type ServiceIdentifier = 'MusicService' | 'AdminService' | 'ToastService' | 'InteractService'

export const useService = <T extends Service>(ctor: { new(): T }) => {
  console.log(Object.entries(ServiceResolver), (new ctor()).TypeName, '3');
  return Object.entries(ServiceResolver).filter(o => o[0] === (new ctor()).TypeName)[0][1] as unknown as T;
};

export const ServiceResolver = new ServiceResolverImpl();