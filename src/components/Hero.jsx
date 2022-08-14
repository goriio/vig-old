import {
  ActionIcon,
  Box,
  Image,
  Overlay,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { BiX } from 'react-icons/bi';

export function Hero() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(
    localStorage.getItem('is-hero-open') || 'true'
  );

  return (
    <>
      {opened === 'true' && (
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <ActionIcon
            sx={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              zIndex: '1',
            }}
            onClick={() => {
              localStorage.setItem('is-hero-open', 'false');
              setOpened(false);
            }}
          >
            <BiX />
          </ActionIcon>
          <Image
            fit="cover"
            height={300}
            sx={{ width: '100%' }}
            src="https://static3.gamerantimages.com/wordpress/wp-content/uploads/2021/03/counter-strike-removed-steam.jpg"
          />
          <Overlay
            gradient={`linear-gradient(0deg, ${theme.black} 20%, #312f2f 50%, transparent 100%)`}
            zIndex="0"
          />
          <Title
            order={3}
            sx={{
              position: 'absolute',
              bottom: '1rem',
              padding: '1rem',
            }}
          >
            Trade virtual items with easier access
          </Title>
        </Box>
      )}
    </>
  );
}
