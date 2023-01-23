import Footer from './Footer';
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
