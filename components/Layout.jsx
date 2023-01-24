import Footer from './Footer';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

export default function Layout({ children }) {
  return (
    <div>
      <LoggedOutNav />
      {children}
      <Footer />
    </div>
  );
}
