import { Typography } from '@material-ui/core';
import React, { FC, ReactElement } from 'react';
import { getCTAButtonStyle } from './ctaButton.util';

type VariantType =
  | 'contained'
  | 'outlined'
  | 'text'
  | 'icon'
  | 'nav'
  | undefined;

interface ICtaButtonProps {
  children?: ReactElement | string;
  disabled?: boolean;
  variant?: VariantType;
  onClick?: Function;
  linkHref?: string;
  className?: string;
  component?: React.ElementType<any>;
  target?: '_blank' | '_self';
  showShadow?: boolean;
  id?: string;
}

const vectorPath = '/images/vector.svg';

const CTAButton: FC<ICtaButtonProps> = props => {
  const classes = getCTAButtonStyle();
  const {
    children,
    disabled = false,
    variant = 'contained',
    onClick,
    linkHref,
    className = '',
    component = 'span',
    target = '_blank',
    showShadow = true,
    ...others
  } = props;

  const ContainedBtn = (
    <a
      href={linkHref}
      role="button"
      rel="noopener noreferrer"
      target={target}
      className={`${classes.base} ${
        !disabled ? classes.contained : classes.containedDisable
      } ${classes.linkContained}`}
      {...others}
    >
      <>
        {showShadow && (
          <div
            className={`${classes.contained} ${classes.containedShadow}`}
          ></div>
        )}
        <Typography
          variant="h5"
          component={component}
          className={classes.content}
        >
          {children}
        </Typography>
      </>
    </a>
  );

  const OutlinedBtn = (
    <div
      className={`${classes.base} ${
        !disabled ? classes.contained : classes.containedDisable
      } ${classes.outLine}`}
    >
      <Typography
        variant="h6"
        component={component}
        className={classes.content}
      >
        {children}
      </Typography>
    </div>
  );

  const TextBtn = (
    <div
      className={`${classes.textBase} ${
        !disabled ? classes.text : classes.textDisable
      }`}
    >
      <Typography
        variant="h6"
        component={component}
        className={classes.content}
      >
        {children}
      </Typography>
    </div>
  );

  const IconBtn = (
    <div className={classes.icon}>
      <span className={`${classes.content} ${classes.iconContent}`}>
        <img className={classes.iconImg} src={vectorPath} alt="vector icon" />
      </span>
    </div>
  );

  const NavBtn = (
    <a
      className={`${classes.base} ${
        !disabled ? classes.contained : classes.containedDisable
      } ${classes.nav}`}
      href={linkHref}
      rel="noopener noreferrer"
      target={target}
      role="button"
      {...others}
    >
      <Typography
        variant="h6"
        component={component}
        className={classes.content}
      >
        {children}
      </Typography>
    </a>
  );

  const btnMap = {
    contained: ContainedBtn,
    outlined: OutlinedBtn,
    text: TextBtn,
    icon: IconBtn,
    nav: NavBtn,
  };

  const handleClick = (e: React.MouseEvent<any>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return linkHref ? (
    btnMap[variant]
  ) : (
    <button
      onClick={handleClick}
      className={`${classes.btn} ${className}`}
      {...others}
    >
      {btnMap[variant]}
    </button>
  );
};

export default CTAButton;
