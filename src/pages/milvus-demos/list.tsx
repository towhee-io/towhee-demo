import React, { useState, useEffect, useMemo, useContext } from 'react';
import {
  Typography,
  makeStyles,
  Theme,
  CircularProgress,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DemoContainer from '../../components/landingPage/DemoContainer';
import { DEMOS, getLink } from '../../constants/demos';
import ReactPlayer from 'react-player';
import RegisterForm from '../../components/landingPage/RegisterForm';
import { getIsMobile } from '../../utils/Common';
import CloseIcon from '@material-ui/icons/Close';
import Head from 'next/head';
import CustomLink from '../../components/customLink/CustomLink';
import { milvusDemos as milvusDemosDesc } from '../../../seo/page-description';
import { rootContext } from '../../context/Root';
import { TrackingEventType } from '../../context/Types';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .inner': {
      width: '100%',
      maxWidth: theme.breakpoints.values.lg,
      margin: '0 auto',
    },
    '& .banner-container': {
      backgroundColor: '#fff',
    },
    '& .text': {
      fontSize: '14px',
      color: '#010E29',
      paddingRight: '20%',
    },
  },
  banner: {
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& .content': {
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        width: 'calc(100% - 32px)',
        padding: theme.spacing(5, 0),
        boxSizing: 'content-box',
        maxHeight: '1000px',
      },
      width: '50%',
      maxHeight: '372px',
      boxSizing: 'content-box',
      padding: theme.spacing(10, 0),
      '& .link-wrapper': {
        display: 'flex',
        marginTop: theme.spacing(4),
        '& .icon-button': {
          zIndex: 'auto',
        },
        '& .icon-button > a': {
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(1, 0),
          '& img': {
            width: '20px',
            height: '20px',
            marginRight: theme.spacing(1),
          },
          '&:first-child': {
            marginRight: theme.spacing(6),
          },
        },
        [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
          flexDirection: 'column',
        },
      },
      '& .title': {
        fontSize: '32px',
        lineHeight: '40px',
        background:
          'linear-gradient(to right, #010e29, #156cdd 33%, #06aff2 66%, #06f3af 100%)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        marginBottom: theme.spacing(3),
      },
      '& .text': {
        '&:not(:last-child)': {
          marginBottom: theme.spacing(3),
        },
      },
    },
    '& .img-wrapper': {
      width: '50%',
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        width: '100%',
        padding: theme.spacing(5, 0),
        boxSizing: 'border-box',
      },
      boxSizing: 'content-box',
      padding: theme.spacing(10, 0),
      pointerEvents: 'none',
      position: 'relative',
      minHeight: '372px',
      background:
        'url(/images/landing-page/pattern.svg) right bottom no-repeat',
      backgroundSize: 'contain',

      '& .bg-img2': {
        zIndex: 2,
        width: '300px',
        [theme.breakpoints.down(theme.breakpoints.values.md)]: {
          width: '90%',
          top: '50%',
          left: '50%',
        },
        top: '40%',
        left: '20%',
      },
    },
  },
  demoWrapper: {
    padding: theme.spacing(10, 5),
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      padding: theme.spacing(5, 2),
    },
    '& .demo-container': {
      flexGrow: 1,
    },
  },
  playerWrapper: {
    position: 'relative',

    '& .center': {
      position: 'absolute',
      top: '50%',
      left: '50%',

      zIndex: 1,
    },
    '& .close-button': {
      background: 'transparent',
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '& .icon-wrapper': {
        cursor: 'pointer',
        width: '24px',
        height: '24px',
        color: '#fff',
      },
    },
    '& .player-wrapper': {
      background: '#010E29',
    },
  },
  btnText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const {
    query: { isZilliz },
  } = useRouter();
  const { git_link, slack_link } = getLink(isZilliz === 'true');
  const { setDialog, handleCloseDialog, trackingEvent } =
    useContext(rootContext);

  const [clientWidth, setClientWidth] = useState(0);

  const showVideoDialog = (data: {
    actionType: string;
    param: string | null;
    name: string | null;
    link: string | null;
  }) => {
    const { actionType, param, name, link } = data;
    if (actionType === 'watchVideo') {
      setDialog({
        open: true,
        type: 'custom',
        bgcolor: 'transparent',
        params: {
          component: (
            <Player
              clientWidth={clientWidth}
              videoSrc={param}
              hideVideoDialog={handleCloseDialog}
            />
          ),
        },
      });
    } else {
      setDialog({
        open: true,
        type: 'custom',
        bgcolor: 'transparent',
        params: {
          component: (
            <RegisterForm
              hideVideoDialog={handleCloseDialog}
              demoInfo={{ name, link }}
              source={isZilliz === 'true' ? 'Zilliz: demo' : 'Ads：Reddit'}
              isZilliz={isZilliz === 'true'}
            />
          ),
        },
      });
    }
  };

  const checkRegistered = () =>
    typeof window !== 'undefined' &&
    !!(window.localStorage.getItem('id') || false);

  useEffect(() => {
    const { innerWidth } = window;
    let clientWidth: number = innerWidth < 1200 ? innerWidth * 0.8 : 1200 * 0.8;
    if (isMobile) {
      clientWidth = innerWidth;
    }
    setClientWidth(clientWidth);
  }, []);

  return (
    <div className={classes.root}>
      <Head>
        <title>Zilliz: Billion scale search in sub-second speeds. </title>
        <meta name="description" content={milvusDemosDesc} />
      </Head>
      <div className="banner-container">
        <section className={`${classes.banner} inner`}>
          <div className="content">
            <div className="text-wrapper">
              <Typography variant="h6" component="h3" className="title">
                Zilliz: Billion scale search in sub-second speeds.
              </Typography>
              <Typography variant="body1" className="text">
                With applications spanning computer vision, natural language
                processing, new drug discovery, and much more, the possibilities
                of Milvus are virtually limitless.
              </Typography>
              <Typography variant="body1" className="text">
                This page includes live demonstrations built by Zilliz that
                showcase Milvus in several example scenarios. Explore them to
                discover what the future of software development can do for you.
              </Typography>
            </div>

            <div className="link-wrapper">
              <CustomLink
                className="icon-button"
                href={git_link}
                isExternal={true}
                children={
                  <>
                    <img src="/images/github.svg" alt="github" />
                    <span className={classes.btnText}>Milvus Bootcamp</span>
                  </>
                }
                onClick={() => {
                  trackingEvent(TrackingEventType.CTA_BUTTON, {
                    type: 'github-link',
                  });
                }}
              />
              <CustomLink
                className="icon-button"
                href={slack_link}
                isExternal={true}
                children={
                  <>
                    <img src="/images/slack.svg" alt="github" />
                    <span className={classes.btnText}>
                      Getting started on Slack
                    </span>
                  </>
                }
                onClick={() => {
                  trackingEvent(TrackingEventType.CTA_BUTTON, {
                    type: 'slack-link',
                  });
                }}
              />
            </div>
          </div>
          <div className="img-wrapper">
            <img
              src="/images/landing-page/solution-hero-img.png"
              className="bg-img2"
              alt="solutions"
            />
          </div>
        </section>
      </div>
      <section className={classes.demoWrapper}>
        <div className="demo-container inner">
          <Grid container spacing={3}>
            {DEMOS.map(demo => {
              const { coverImg, link, title, desc, videoSrc, demoName } = demo;
              return (
                <Grid item md={6} lg={4} sm={12} key={title}>
                  <DemoContainer
                    coverImg={coverImg}
                    link={link}
                    title={title}
                    desc={desc}
                    videoSrc={videoSrc}
                    demoName={demoName}
                    showVideoDialog={showVideoDialog}
                    checkRegistered={checkRegistered}
                    isZilliz={isZilliz === 'true'}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

const Player: React.FC<{
  clientWidth: number;
  videoSrc: string;
  hideVideoDialog: () => void;
}> = ({ clientWidth, videoSrc, hideVideoDialog }) => {
  const [ready, setReady] = useState(false);
  const classes = useStyles();
  const onReady = () => {
    setReady(true);
  };

  return useMemo(
    () => (
      <div
        style={{
          width: `${clientWidth}`,
          height: `${clientWidth / 2.2 + 40}`,
          overflow: 'hidden',
        }}
        className={classes.playerWrapper}
      >
        <div className="close-button">
          <p className="icon-wrapper" onClick={hideVideoDialog}>
            <CloseIcon />
          </p>
        </div>
        <div className="player-wrapper">
          {!ready && <CircularProgress size={16} className="center" />}
          <ReactPlayer
            controls={true}
            url={videoSrc}
            width={clientWidth}
            height={clientWidth / 2.2}
            onReady={onReady}
          />
        </div>
      </div>
    ),
    [clientWidth, videoSrc, ready]
  );
};
