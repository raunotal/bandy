import MemberCard from '../components/members/MemberCard';
import GeneralLayout from '../components/layout/GeneralLayout';
import { useEffect, useState } from 'react';
import { Member } from '../../types/member';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Callable } from '../../enums/callable';
import { GetUsersWithMemberRoleDTO } from '../../types/dto/user';
import { useAuth } from '../context/authContext';

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const { user } = useAuth();

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

  const membersToShow = members.filter(member => member.uid !== user?.uid);

  return (
    <GeneralLayout title="Members">
      {membersToShow.map((member) => <MemberCard key={member.uid} {...member} />)}
    </GeneralLayout>
  );
};

export default Members;
