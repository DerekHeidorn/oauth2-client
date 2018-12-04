import { PublicUserProfile } from './user';

export class PublicGroup {
    uuid: string;
    uuid_digest: string;
    name: string;
    description: string;
    subscribed: boolean;
  }

  export class PublicGroupDetail {
    group: PublicGroup;
    activeMembers: PublicUserProfile[];
    activeManagers: PublicUserProfile[];
  }