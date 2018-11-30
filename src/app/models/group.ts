import { PublicUserDetail } from './user';

export class PublicGroup {
    uuid: string;
    uuid_digest: string;
    name: string;
    description: string;
  }

  export class PublicGroupDetail {
    group: PublicGroup;
    activeMembers: PublicUserDetail[];
    activeManagers: PublicUserDetail[];
  }