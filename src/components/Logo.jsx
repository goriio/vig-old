import { Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import LogoSVG from '../assets/logo.svg';

export function Logo() {
  return (
    <Link to="/">
      <Image src={LogoSVG} alt="VIG Logo" />
    </Link>
  );
}
