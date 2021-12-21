import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CircularProgress, Link, Typography } from '@material-ui/core';
import { rootContext } from '../../context/Root';
import {
  convertBase64UrlToBlob,
  getBase64Image,
  formatCount,
  formatImgData,
} from '../../utils/helper';
import Masonry from '../../components/imageSearchComponents/Masonry';
import { search, getCount } from '../../utils/http';
import UploaderHeader from '../../components/imageSearchComponents/Uploader';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useCheckIsMobile } from '../../hooks/Style';

import { useRouter } from 'next/router';
import Head from 'next/head';
// import { imageSearchDemo } from '../../../seo/page-description';
import 'gestalt/dist/gestalt.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 60px)',
    },
  },

  backLink: {
    display: 'flex',
    color: '#000',
    alignItems: 'center',
    marginBottom: '27px',

    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },

    '& .back-btn': {
      padding: 0,
      color: '#000',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
      marginLeft: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    maxWidth: '1440px',
    width: '100%',
    padding: theme.spacing(3, 12.5, 0),
    margin: '0 auto',
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2, 0),
    },
  },

  contentContainer: {
    flex: 1,
  },

  codeContainer: {
    flex: 1,
    background: '#303030',
    borderRadius: '16px',
    marginLeft: '20px',
  },

  uploadSection: {
    width: '100%',
    border: '1px dashed #000',
    padding: theme.spacing(9, 9),
    borderRadius: '4px',
    boxSizing: 'border-box',

    '& .desc': {
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '28px',
      color: '#82838E',
      textAlign: 'center',
      marginBottom: theme.spacing(5),
    },
  },
  uploadWrapper: {
    textAlign: 'center',
    '& .input': {
      display: 'none',
    },
  },
  layoutSection: {},
  loadingWrapper: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Home = () => {
  formatCount(134200);
  const classes = useStyles();
  const { setDialog, dialog } = useContext(rootContext);
  const [imgs, setImgs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [partialLoading, setPartialLoading] = useState(false);
  const [selected, setSelected] = useState({
    src: '',
    isSelected: false,
  });
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState<number | string>(0);
  const [file, setFile] = useState<any>(null!);
  const [isShowCode, setIsShowCode] = useState(false);
  const [noData, setNoData] = useState(false);
  const { open } = dialog;
  const scrollContainer = useRef(null);
  const isMobile = useCheckIsMobile();
  const [isNeedLoadMore, setIsNeedLoadMore] = useState(false);
  const { query } = useRouter();
  const isCn = query.lan === 'cn';

  const handleImgSearch = async (
    file: File | Blob,
    reset = false,
    scrollPage: number | null
  ) => {
    setLoading(true);
    setDuration('searching...');
    let tempPage = page;
    if (reset) {
      setImgs([]);
      setPage(0);
      tempPage = 0;
      setNoData(false);
    }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('Num', `${window.innerWidth < 800 ? 16 : 50}`);
    fd.append('Page', `${scrollPage || tempPage}`);
    fd.append('Device', `${isMobile ? 1 : 0}`);

    try {
      const [res, duration = 0] = await search(fd, isCn);
      setDuration(Number.prototype.toFixed.call(duration, 4));
      if (!res.length) {
        setNoData(true);
        return;
      }

      formatImgData(res, setImgs);
    } catch (error) {
      console.log(error);
    } finally {
      setPage(v => v + 1);
      setLoading(false);
    }
  };

  const handleImgToBlob = (src: string, reset = false) => {
    const image = document.createElement('img');
    image.crossOrigin = '';
    image.src = src;
    image.onload = function () {
      const base64 = getBase64Image(image);
      const imgBlob = convertBase64UrlToBlob(base64);
      handleImgSearch(imgBlob, reset, null);
      setFile(imgBlob);
    };
  };

  // reduce unnecessary rerendering
  const loadItems = useCallback(
    async () => {
      try {
        setPartialLoading(true);
        await handleImgSearch(file, false, page);
      } catch (error) {
        console.log(error);
      } finally {
        setPartialLoading(false);
      }
    },
    // eslint-disable-next-line
    [file, page]
  );

  const handleSelectedImg = (file: File | Blob, src: string) => {
    setFile(file);
    setSelected({
      src: src,
      isSelected: true,
    });
  };

  const toggleIsShowCode = () => {
    setIsShowCode(v => !v);
    window.dispatchEvent(new Event('resize'));
  };

  // reduce unnecessary rerendering
  const handleSearch = useCallback(
    src => {
      console.log(src);
      handleImgToBlob(src, true);
      setSelected({
        src: src,
        isSelected: true,
      });
    },
    // eslint-disable-next-line
    []
  );

  const getImgsCount = async () => {
    const count = await getCount(isCn);
    setCount(formatCount(count));
  };

  useEffect(() => {
    handleImgToBlob('/images/demo.jpg');
    getImgsCount();
  }, []);

  return (
    <section className={classes.root} ref={scrollContainer}>
      <Head>
        <title>
          Milvus Reverse Image Search - Open-Source Vector Similarity
          Application Demo
        </title>
        {/* <meta name="description" content={imageSearchDemo} /> */}
      </Head>
      <div className={classes.container}>
        <div
          className={`${classes.contentContainer} ${
            isShowCode ? 'shrink' : ''
          }`}
        >
          <div className="top-part">
            <Link
              href="/milvus-demos"
              className={classes.backLink}
              underline="none"
              children={
                <>
                  <ChevronLeftIcon />
                  <Typography
                    variant="h4"
                    className="back-btn"
                    component="span"
                  >
                    Back to Demo
                  </Typography>
                </>
              }
            />
            <UploaderHeader
              handleImgSearch={handleImgSearch}
              handleSelectedImg={handleSelectedImg}
              toggleIsShowCode={toggleIsShowCode}
              selectedImg={selected.src}
              count={count}
              duration={duration}
            />
          </div>

          {noData ? (
            <div className="no-data">
              <p style={{ textAlign: 'center' }}>No More Data.</p>
            </div>
          ) : (
            <Masonry
              pins={imgs}
              loadItems={loadItems}
              loading={partialLoading}
              isSelected={selected.isSelected}
              isShowCode={isShowCode}
              handleSearch={handleSearch}
              container={scrollContainer}
            />
          )}
        </div>

        {isShowCode ? <div className={classes.codeContainer}>123</div> : null}
      </div>
      {loading && !partialLoading ? (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      ) : null}
    </section>
  );
};

export default Home;
