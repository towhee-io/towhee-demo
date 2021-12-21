import { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    right: '20%',
    bottom: '60px',
    cursor: 'pointer',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    visibility: (props: any) => (props.showToTopButton ? 'visible' : 'hidden'),
    opacity: (props: any) => (props.showToTopButton ? 1 : 0),
    transition: 'all .2s linear',

    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      right: theme.spacing(2),
    },
  },
}));

// const HEADER_HEIGHT = 90;
// const BOTTOM_DISTANCE = 100;
// const TOP_PADDING = 80;
// const TOTAL_DISTANCE = HEADER_HEIGHT + BOTTOM_DISTANCE + TOP_PADDING;

let timer: NodeJS.Timeout = null;

const BackToTopBtn = (props: { className?: string }) => {
  const [showToTopButton, setShowToTopButton] = useState(false);
  // const [top, setTop] = useState(0);
  const classes = useStyles({ showToTopButton });

  useEffect(() => {
    // const windowHeight = window.innerHeight;
    let currentPos = 0;
    // setTop(windowHeight - TOTAL_DISTANCE);
    const cb = function () {
      if (timer) clearTimeout(timer);
      const wrapper = document.querySelector('html');
      const direction = wrapper.scrollTop - currentPos > 0 ? 'down' : 'up';
      currentPos = wrapper.scrollTop;
      const showButton = direction === 'up' && currentPos ? true : false;
      setShowToTopButton(showButton);

      // timer = setTimeout(() => {
      //   setTop(windowHeight + currentPos - TOTAL_DISTANCE);
      // }, 100);
    };
    window.addEventListener('scroll', cb);

    return () => {
      window.removeEventListener('scroll', cb);
    };
  }, []);
  const onToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={classes.root}
      role="button"
      onClick={onToTopClick}
      onKeyDown={onToTopClick}
      tabIndex={0}
    >
      <svg
        width="33"
        height="27"
        viewBox="0 0 33 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M20.5438 26.1883L28 26.2L17.4327 7.80816C16.81 6.73108 15.2537 6.73074 14.6307 7.80782L4 26.1856L11.4707 26.1918L16.0203 18.3269L20.5438 26.1883Z"
            fill="#008CFF"
          />
        </g>
        <rect width="33" height="3" fill="#008CFF" />
        <defs>
          <clipPath id="clip0">
            <rect
              width="19.2"
              height="24"
              fill="white"
              transform="translate(4 26.2) rotate(-90)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default BackToTopBtn;
