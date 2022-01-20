import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { CircularProgress, Link, Typography } from '@material-ui/core';
import { rootContext } from '../context/Root';
import {
  convertBase64UrlToBlob,
  getBase64Image,
  formatCount,
  formatImgData,
  getImgUrl,
} from '../utils/helper';
import Masonry from '../components/imageSearchComponents/Masonry';
import { search, getCount, getModelOptions } from '../utils/http';
import UploaderHeader from '../components/imageSearchComponents/Uploader';
import { useCheckIsMobile } from '../hooks/Style';
import Head from 'next/head';
import 'gestalt/dist/gestalt.css';
import { DeviceType } from '../types';
import { useStyles } from '../styles/demo';

const Home = () => {
  formatCount(134200);
  const classes = useStyles();
  const { model, fileSrc, handleSelectFile } = useContext(rootContext);
  const [imgs, setImgs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [partialLoading, setPartialLoading] = useState(false);

  const [duration, setDuration] = useState<number | string>('searching...');

  const [noData, setNoData] = useState(false);
  const scrollContainer = useRef(null);
  const isMobile = useCheckIsMobile();

  const [modelOptions, setModelOptions] = useState<string[]>([]);

  const handleImgSearch = async (
    file: File | Blob,
    model: string,
    reset: boolean = false,
    pageIndex: number | null
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
      device: `${window.innerWidth < 800 ? 'mobile' : 'pc'}` as DeviceType,
      page: pageIndex || tempPage,
      num: window.innerWidth < 800 ? 32 : 50,
    };

    try {
      const [duration = 0, res] = await search(fd, params);

      setDuration(Math.round(duration * 100));
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

  const searchImgByImagePath = (src: string, model: string) => {
    const image = document.createElement('img');
    image.crossOrigin = '';
    image.src = src;
    image.onload = () => {
      const base64 = getBase64Image(image);
      const imgBlob = convertBase64UrlToBlob(base64);
      handleSelectFile(src);
      handleImgSearch(imgBlob, model, true, null);
    };
  };

  // reduce unnecessary rerendering
  const loadItems = useCallback(
    async () => {
      try {
        setPartialLoading(true);
        await handleImgSearch(fileSrc.file, model, false, page);
      } catch (error) {
        console.log(error);
      } finally {
        setPartialLoading(false);
      }
    },
    // eslint-disable-next-line
    [handleImgSearch]
  );

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
        <div className={classes.contentContainer}>
          <div className="top-part">
            <UploaderHeader
              searchImgByFile={handleImgSearch}
              searchImgByPath={searchImgByImagePath}
              duration={duration}
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
              container={scrollContainer}
            />
          )}
        </div>
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
