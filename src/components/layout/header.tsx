import { makeStyles, Theme } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { NAV_LIST } from './constants';
import GitHubButton from 'react-next-github-btn';

const useStyles = makeStyles((theme: Theme) => ({
  headerWrapper: {
    background: '#fff',
    fontFamily: 'Poppins',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.05)',
  },
  headerContent: {
    padding: theme.spacing(3, 0),
    display: 'flex',
    maxWidth: '1440px',
    margin: '0 auto',
    justifyContent: 'space-between',
  },
  leftPart: {
    '& img': {
      height: '32px',
    },
  },
  rightPart: {
    display: 'flex',
    alignItems: 'center',

    '& .git-btn': {
      marginRight: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
    },
  },
  navList: {
    display: 'flex',

    '& li': {
      padding: theme.spacing(1, 1.5),
      fontSize: 0,
      lineHeight: 0,

      '&:hover': {
        background: '#f7f8f9',

        '&>a': {
          textDecoration: 'none',
        },
      },
    },

    '& a': {
      fontFamily: 'Poppins Bold',
      color: '#010e29',
      fontSize: '14px',
      lineHeight: '16px',
      display: 'inline-block',
    },

    '&>li:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
  loginBtn: {
    border: '1px solid #000',
    borderRadius: '4px',

    '&:hover': {
      background: '#f7f8f9',
    },

    '&>a': {
      textDecoration: 'none',
      color: '#010e29',
    },
  },
  githubBtn: {},
}));

const Header: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <header className={classes.headerWrapper}>
      <div className={classes.headerContent}>
        <div className={classes.leftPart}>
          <Link href="/">
            <img src={'/images/logo-title.png'}></img>
          </Link>
        </div>
        <div className={classes.rightPart}>
          {/* <div className="git-btn">
            <GitHubButton
              href="https://github.com/towhee-io/towhee"
              data-icon="octicon-github"
              data-size="large"
              aria-label="Star ntkme/github-buttons on GitHub"
              data-show-count={true}
            >
              Star
            </GitHubButton>
          </div> */}
          <ul className={classes.navList}>
            {NAV_LIST.map(v => (
              <li key={v.label}>
                <Link href={v.href}>{v.label}</Link>
              </li>
            ))}

            <li className={classes.loginBtn} key="signIn">
              <a href="">Sign In</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
