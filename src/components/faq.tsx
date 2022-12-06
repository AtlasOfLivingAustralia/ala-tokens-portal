import {Box} from '@mantine/core';

function Faq(): React.ReactElement {
    return (
        <Box
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          textAlign: 'center',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',
  
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
          },
        })}
      >
        Faq content goes here
      </Box>
    );
  }

export default Faq;