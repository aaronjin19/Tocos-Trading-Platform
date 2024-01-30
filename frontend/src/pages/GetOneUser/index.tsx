import { WithLayout } from '../../layout';
import { GetOneUserContainer } from '../../containers';

const GetOneUser: React.FC = () => {
  return <GetOneUserContainer />
}

export const GetOneUserPage = WithLayout(GetOneUser);