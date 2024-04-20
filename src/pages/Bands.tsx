import BandCard from '../components/bands/BandCard';
import GeneralLayout from '../components/layout/GeneralLayout';

const DUMMY_DATA = [
  {
    name: 'Heldene Aeg'
  },
  {
    name: 'Terminal Frost'
  },
  {
    name: 'The Beatles'
  }
];

const Bands = () => {
  return (
    <GeneralLayout title="Bands">
      {DUMMY_DATA.map((band, index) => <BandCard key={index} {...band} />)}
    </GeneralLayout>
  );
};

export default Bands;