import { useAuth } from '../context/authContext';
import GeneralLayout from '../components/layout/GeneralLayout';
import { RouteComponentProps } from 'react-router';
import { FC } from 'react';

interface MemberDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const MemberDetails: FC<MemberDetailsProps> = ({ match }) => {
  const { user } = useAuth();

  return (
    <GeneralLayout title="Members">
        MemberDetails
    </GeneralLayout>
  );
};

export default MemberDetails;
