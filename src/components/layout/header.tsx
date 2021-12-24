import { makeStyles, Theme } from '@material-ui/core';
import { Link } from '@material-ui/core';
import Image from 'next/image';
import { NAV_LIST } from './constants';

const useStyles = makeStyles((theme: Theme) => ({
  headerWrapper: {},
}));

const Header: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <header style={{ height: '200px', border: '1px solid blue' }}>
      <div className="left-part">
        <Link href="/">
          <Image src={'/images/logo-title.png'}></Image>
        </Link>
      </div>
      <div className="right-part">
        <div className="git-btn"></div>
        <ul className="nav-list">
          {NAV_LIST.map(v => (
            <Link href={v.href}>{v.label}</Link>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
