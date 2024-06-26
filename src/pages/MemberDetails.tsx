import { useAuth } from '../context/authContext';
import GeneralLayout from '../components/layout/GeneralLayout';
import { RouteComponentProps } from 'react-router';
import { FC, useEffect, useState } from 'react';
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import { Member } from '../../types/member';
import { Callable } from '../../enums/callable';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { UserRoles } from '../../enums/roles';

interface MemberDetailsProps
  extends RouteComponentProps<{
    uid: string;
  }> {}

const MemberDetails: FC<MemberDetailsProps> = ({ match }) => {
  const { user, addMemberToBand } = useAuth();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const isManager = user?.role === UserRoles.Manager;

  useEffect(() => {
    const fetchMember = async () => {
      const functions = getFunctions();
      const getUserProfileByIdFunction = httpsCallable<{ uid: string }, Member>(
        functions,
        Callable.GetUserProfileById
      );
      const result = await getUserProfileByIdFunction({
        uid: match.params.uid,
      });
      return result.data;
    };

    fetchMember().then((member) => {
      setMember(member);
      setLoading(false);
    });
  }, [match.params.uid]);

  if (loading) {
    return <GeneralLayout title='Members'>Loading...</GeneralLayout>;
  }

  if (!member) {
    return <GeneralLayout title='Members'>Member not found</GeneralLayout>;
  }

  const addMemberToBandHandler = async () => {
    setMember((prevState) => ({
      ...prevState!,
      band: user!.band!.uid!,
    }));
    addMemberToBand(member);
  };

  const canAddToBand = isManager && !member.band;

  return (
    <GeneralLayout>
      <IonGrid>
        <IonRow>
          <IonCol>
            <h2>{member.name}</h2>
            <p>{member.instrument}</p>
          </IonCol>
          <IonCol>
            <img src={member.image} alt='Member profile' />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {canAddToBand && (
              <IonButton onClick={addMemberToBandHandler}>
                Add to band
              </IonButton>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </GeneralLayout>
  );
};

export default MemberDetails;
