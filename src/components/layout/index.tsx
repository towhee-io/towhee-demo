import Header from './header';
import Footer from './footer';

const Layout: React.FC<any> = props => {
  return (
    <section
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {props.children}
    </section>
  );
};

export default Layout;
