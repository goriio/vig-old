import { Box, Image, Overlay, Title, useMantineTheme } from '@mantine/core';

export function Hero() {
  const theme = useMantineTheme();

  return (
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
        order={2}
        sx={{
          position: 'absolute',
          bottom: '1rem',
          padding: '1rem',
        }}
      >
        {'Trade virtual items with easier access'.toUpperCase()}
      </Title>
    </Box>
  );
}
