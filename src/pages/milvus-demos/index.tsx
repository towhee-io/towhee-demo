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
  getImgUrl,
} from '../../utils/helper';
import Masonry from '../../components/imageSearchComponents/Masonry';
import { search, getCount, getModelOptions } from '../../utils/http';
import UploaderHeader from '../../components/imageSearchComponents/Uploader';
import { useCheckIsMobile } from '../../hooks/Style';
import Head from 'next/head';
// import { imageSearchDemo } from '../../../seo/page-description';
import 'gestalt/dist/gestalt.css';
import { DeviceType } from '../../types';
import { useStyles } from './style';

const Home = () => {
  formatCount(134200);
  const classes = useStyles();
  const { setDialog, dialog } = useContext(rootContext);
  const [imgs, setImgs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [partialLoading, setPartialLoading] = useState(false);
  const [selected, setSelected] = useState({
    src: '',
    isSelected: false,
    ratio: 0,
  });
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState<number | string>(0);
  const [file, setFile] = useState<any>(null!);
  const [isShowCode, setIsShowCode] = useState(false);
  const [noData, setNoData] = useState(false);
  const scrollContainer = useRef(null);
  const isMobile = useCheckIsMobile();

  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [model, setModel] = useState<string>('');

  const handleSelectedImg = (file: File | Blob, ratio) => {
    setFile(file);
    const src = getImgUrl(file);
    setSelected({
      src,
      isSelected: true,
      ratio: ratio,
    });
  };

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
      setPage(1);
      tempPage = 1;
      setNoData(false);
    }
    const fd = new FormData();
    fd.append('image', file);
    const params = {
      table_name: model || 'efficientnetb5',
      device: `${isMobile ? 'mobile' : 'pc'}` as DeviceType,
      page: scrollPage || tempPage,
      num: window.innerWidth < 800 ? 16 : 50,
    };

    try {
      const [duration = 0, res] = await search(fd, params);
      setDuration(Number(String(duration).substring(0, 6)));
      if (!res.length) {
        setNoData(true);
        return;
      }

      formatImgData(res, setImgs);
    } catch (error) {
      console.log(error);
      setNoData(true);
    } finally {
      setPage(v => v + 1);
      setLoading(false);
    }
  };

  const handleImgToBlob = (src: string, reset = false) => {
    const image = document.createElement('img');
    image.crossOrigin = '';
    image.src = src;
    image.onload = async () => {
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

  const toggleIsShowCode = () => {
    setIsShowCode(v => !v);
    window.dispatchEvent(new Event('resize'));
  };

  // reduce unnecessary rerendering
  const handleSearch = useCallback(
    (src, ratio) => {
      handleImgToBlob(src, true);
      setSelected({
        src: src,
        isSelected: true,
        ratio,
      });
    },
    // eslint-disable-next-line
    []
  );

  const handleModelChange = useCallback(
    value => {
      setModel(value);
      console.log('selected.isSelected--', selected.isSelected);
      if (selected.isSelected) {
        handleImgToBlob(selected.src, true);
      }
    },
    [selected]
  );

  const getImgsCount = async () => {
    try {
      const { model_list: options = [] } = await getModelOptions();
      setModelOptions(options);
      setModel(options[0]);
      const count = await getCount(options[0]);
      setCount(formatCount(count));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    await getImgsCount();
    handleImgToBlob('/images/demo.jpg');
  };

  useEffect(() => {
    fetchData();
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
              searchImg={handleImgSearch}
              handleSelectedImg={handleSelectedImg}
              toggleIsShowCode={toggleIsShowCode}
              selectedImg={selected}
              count={count}
              duration={duration}
              modelOptions={modelOptions}
              model={model}
              setModel={handleModelChange}
            />
          </div>

          {noData ? (
            <div className="no-data">
              <p style={{ textAlign: 'center', marginTop: '120px' }}>
                No More Data.
              </p>
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
              model={model}
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
