import { makeStyles, Theme } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { NAV_LIST } from './constants';
import GitHubButton from 'react-next-github-btn';
import MenuIcon from '@material-ui/icons/Menu';
import { useEffect, useRef } from 'react';

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

    width: 'calc(100% - 200px)',

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      width: 'calc(100% - 64px)',
    },

    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      width: 'calc(100% - 32px)',
    },
  },
  leftPart: {
    display: 'flex',
    alignItems: 'center',

    '& img': {
      height: '32px',

      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        height: '20px',
      },
    },
  },
  linkBtn: {
    display: 'inline-block',
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

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: 'none',
    },

    '& li': {
      display: 'flex',
      alignItems: 'center',

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
      padding: theme.spacing(1, 2),
    },

    '&>li': {
      marginRight: theme.spacing(2),
    },
  },
  loginBtn: {
    border: '1px solid #000',
    borderRadius: '4px',
    padding: theme.spacing(1, 2),

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      padding: theme.spacing(0.5, 1.5),
      fontSize: '14px',
    },

    '&:hover': {
      background: '#f7f8f9',
    },

    '&>a': {
      textDecoration: 'none',
      color: '#010e29',
    },
  },
  githubBtn: {},
  menuWrapper: {
    cursor: 'pointer',
    display: 'none',
    marginLeft: theme.spacing(3),

    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: 'block',
    },
  },
  menuMask: {
    position: 'absolute',
    zIndex: -1,
    visibility: 'hidden',
    top: '78px',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.2)',

    '&.active': {
      position: 'fixed',
      zIndex: 10,
      visibility: 'visible',
    },
  },
  menuContent: {
    background: '#fff',
    padding: theme.spacing(4),
    borderTop: '1px',
    borderStyle: 'solid',
    borderColor: '#eee',
    boxShadow: '3px 3px 5px #eee',

    '&>ul': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

const Header: React.FC<any> = () => {
  const classes = useStyles();
  const menuMask = useRef<HTMLDivElement>(null!);
  const content = useRef<HTMLDivElement>(null!);

  const handleToggleMobileMenu = () => {
    menuMask.current.classList.toggle('active');
  };

  const handleClickOutside = e => {
    if (e.target.contains(content.current) && e.target !== content.current) {
      menuMask.current.classList.remove('active');
    }
  };

  // useEffect(() => {
  //   window.addEventListener(
  //     'resize',
  //     () => {
  //       console.log(window.innerWidth);
  //     },
  //     false
  //   );
  // }, []);

  return (
    <header className={classes.headerWrapper}>
      <div className={classes.headerContent}>
        <div className={classes.leftPart}>
          <Link href="/" className={classes.linkBtn}>
            <img src={'/images/logo-title.png'}></img>
          </Link>
        </div>
        <div className={classes.rightPart}>
          <ul className={classes.navList}>
            <li key="github">
              <GitHubButton
                href="https://github.com/towhee-io/towhee"
                data-size="large"
                data-show-count="true"
                aria-label="Star towhee-io/towhee on GitHub"
              >
                Star
              </GitHubButton>
            </li>
            {NAV_LIST.map(v => (
              <li key={v.label}>
                <Link href={v.href} target="_blank">
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={classes.loginBtn} key="signIn">
            <a href="https://towhee.io/user/login" target="_blank">
              Sign In
            </a>
          </div>
          <div className={classes.menuWrapper} onClick={handleToggleMobileMenu}>
            <MenuIcon />
          </div>
        </div>
        <div
          className={classes.menuMask}
          ref={menuMask}
          onClick={handleClickOutside}
        >
          <div className={classes.menuContent} ref={content}>
            <ul className={classes.navList}>
              <li key="github">
                <GitHubButton
                  href="https://github.com/towhee-io/towhee"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star towhee-io/towhee on GitHub"
                >
                  Star
                </GitHubButton>
              </li>
              {NAV_LIST.map(v => (
                <li key={v.label}>
                  <Link href={v.href}>{v.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
