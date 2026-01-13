import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ComposeForm } from '@/components/compose/ComposeForm';

const Compose = () => {
  const location = useLocation();
  const selectedGroup = location.state?.selectedGroup;

  return (
    <Layout 
      title="Compose Message" 
      subtitle="Send a message to one or multiple groups"
    >
      <ComposeForm initialGroupId={selectedGroup} />
    </Layout>
  );
};

export default Compose;
