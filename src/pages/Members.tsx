import MemberCard from '../components/members/MemberCard';
import GeneralLayout from '../components/layout/GeneralLayout';
import { useEffect, useState } from 'react';
import { Member } from '../../types/member';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';
import { GetUsersWithMemberRoleDTO } from '../../types/dto/user';

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const functions = getFunctions();
      const getBandMembersFunction = httpsCallable<object, GetUsersWithMemberRoleDTO>(
        functions,
        Callable.GetUsersWithMemberRole
      );
      const result = await getBandMembersFunction();
      return result.data.members;
    };

    fetchMembers().then(members => setMembers(members));
  }, []);

  return (
    <GeneralLayout title="Members">
      {members.map((member) => <MemberCard key={member.uid} {...member} />)}
    </GeneralLayout>
  );
};

export default Members;
