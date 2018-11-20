import { UserDetail } from './user';

export class Group {
    uuid: string;
    name: string;
  }

  export class GroupDetail {
    group: Group;
    activeMembers: UserDetail[];
    activeManagers: UserDetail[];
  }