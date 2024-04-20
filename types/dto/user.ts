import { Member } from '../member';

export interface GetUsersWithMemberRoleDTO {
  members: Member[];
}

export interface AddMemberToBandDTO {
  managerId: string;
  memberId: string;
}
