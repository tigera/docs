import { keyframes } from '@emotion/react';

const animation = keyframes`
from {
  transform: rotate(0);
}

to {
  transform: rotate(360deg);
}
`;


export const containerStyles = {
    position: 'relative',
    overflow: 'hidden',
    padding: '2px',
    borderRadius: '4px',
    _before: {
        content: '""',
        display: 'block',
        background: 'linear-gradient(90deg, var(--chakra-colors-tigeraLilac) 0%, var(--chakra-colors-tigeraRose) 100%)',
        height: '750px',
        width: '750px',
        position: 'absolute',
        animation: `${animation} 4s linear infinite`,
        zIndex: 0,
    }
}

export const buttonStyles = {
    color: 'tigeraBlack',
    width: 'full',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    _hover: {
        backgroundColor: 'rgba(245, 245, 245, 0.85)',
        cursor: 'pointer'
    },
    _active: {
        backgroundColor: 'rgba(245, 245, 245, 0.85)',
        cursor: 'pointer'
    },
    borderRadius: '2px',
}

export const textWrapStyles = {
    maxWidth:'400px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    m: 0,
}