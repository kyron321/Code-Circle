import { useAuthContext } from '../hooks/useAuthContext';
import Footer from './Footer';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

export default function Layout({ children }) {
  const { user } = useAuthContext();
  console.log(user)
  return (
    <div>
      {user &&<LoggedInNav/>}
      {!user && <LoggedOutNav />}
      {children}
      <Footer />
    </div>
  );
}
