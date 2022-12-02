import { Navbar, createStyles } from '@mantine/core';
import { IconExternalLink, IconKey,  IconQuestionMark } from '@tabler/icons';

import { useState } from 'react';


  interface NavProps {
    opened: Boolean;
    updateNavContent: any;
}

const  TokensNavbar: React.FC<NavProps> = ({opened, updateNavContent}) => {

  const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');

    return {
      navbar: {
        backgroundColor: theme.fn.darken(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.2
        ),
        
      },

      logo:{
        borderRadius: "10px"
      },
  
      version: {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.0
        ),
        color: theme.white,
        fontWeight: 700,
      },
  
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        )}`,
      },
  
      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        )}`,
      },
  
      link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
  
        '&:hover': {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor}).background!,
            0.1
          ),
        },
      },
  
      linkIcon: {
        ref: icon,
        color: theme.white,
        opacity: 0.75,
        marginRight: theme.spacing.sm,
      },
  
      linkActive: {
        '&, &:hover': {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.15
          ),
          [`& .${icon}`]: {
            opacity: 0.9,
          },
        },
      },
    };
  });

  const {classes, cx } = useStyles();

  const [navBarActive, setNavbarActive] = useState('Credentials & Tokens');

  const navBarOptions = [
    { link: 'https://docs.ala.org.au', label: 'Docs Portal', icon: IconExternalLink},
    { link: '#', label: 'Credentials & Tokens', icon: IconKey },
    { link: '#', label: 'FAQ', icon: IconQuestionMark }
  ];


  const links = navBarOptions.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === navBarActive })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        if(item.label === "Docs Portal"){
          window.open(item.link);
        } else{
          setNavbarActive(item.label);
          updateNavContent(item.label)
        }

      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  )); 

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 230, lg: 230 }}  className={classes.navbar}>
        <Navbar.Section grow>
        {links}
        </Navbar.Section>
    </Navbar>
  );
}

export default TokensNavbar;
