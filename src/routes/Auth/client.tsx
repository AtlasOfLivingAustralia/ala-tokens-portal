import {
createStyles,
Text,
Title,
SimpleGrid,
TextInput,
Textarea,
Button,
Group,
ActionIcon,
Tooltip,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import { useState } from 'react';
import { Form, Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(-10deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
    theme.colors[theme.primaryColor][7]
    } 100%)`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    padding: theme.spacing.xl * 1.5,
    },
},

title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
},

description: {
    color: theme.colors[theme.primaryColor][2],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    maxWidth: '100%',
    },
},

form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
},

social: {
    color: theme.white,

    '&:hover': {
    color: theme.colors[theme.primaryColor][1],
    },
},

input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
    color: theme.colors.gray[5],
    },
},

inputLabel: {
    color: theme.black,
},

toolTip:{
    width:  "100%",
    margin: "10px 0px;"
},

control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
},
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

function ClientRegistration(): ReactElement {
    const { classes } = useStyles();
    
    const [appName, setAppName] = useState("");
    const [callbackUrl, setCallbackUrl] = useState("");
    const [resourceOwner, setResourceOwner] = useState("");
    const [resourceOwnerEmail, setResourceOwnerEmail] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");


    const MailTo = () =>{
        const email="mailto:support@ala.org.au"
        const body = `Hello There, %0d%0a %0d%0a This is a user generated request from the ALA Docs Portal for Client Application Registration  in the ALA Auth System. Please find the details below. %0d%0a
            1. Application Name / Access Reason: ${appName} %0d%0a
            2. Callback URL: ${callbackUrl} %0d%0a
            3. Resource Owner: ${resourceOwner} %0d%0a
            4. Resource Owner Contact: ${resourceOwnerEmail} %0d%0a
            5. Additional Info: ${additionalInfo} %0d%0a
        ` + "%0d%0aRegards, %0d%0a Auto-generated via ALA Docs Portal "
        const mailto = `${email}?subject=Request for ALA Client Application Registration&cc=${resourceOwnerEmail}&body=${body}`
        return (
            <a
                onClick={(e) => {
                    window.location.href = mailto;
                    e.preventDefault();
                }}
            >
                Sumbit
            </a>
        );
    }


    return (
        <div className={classes.wrapper}>
        <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
            <div>
            <Title className={classes.title}>Client Application Registration</Title>
            <Text className={classes.description} mt="sm" mb={30}>
                Please provide details in the adjacent form for Client Registration. Once registered, you will be provided with Client ID and Secret required for token generation and refresh. 
            </Text>

            </div>
            <div className={classes.form}>
                <TextInput
                    label="Application Name / Access Reason"
                    placeholder="e.g. Occurrence search app, metadata access etc"
                    required
                    classNames={{ input: classes.input, label: classes.inputLabel }}
                    value={appName}
                    onChange={(event) => setAppName(event.target.value)}
                />
                <Tooltip   position="bottom" className={classes.toolTip} label="The callback/redirect for your application ALA should redirect to after authentication. This is only required if you are planning to generate JWTs on your own front-end application(s) via PKCE or Implict OAuth flows.">
                    <TextInput
                        label="Callback URL (Optional)"
                        placeholder="e.g. https://myapp.exmaple.com"
                        classNames={{ input: classes.input, label: classes.inputLabel }}
                        value={callbackUrl}
                        onChange={(event) => setCallbackUrl(event.target.value)}
                    />
                </Tooltip>

                <TextInput
                    label="Resource Owner"
                    required
                    placeholder="e.g. your name, organisation etc"
                    mt="md"
                    classNames={{ input: classes.input, label: classes.inputLabel }}
                    value={resourceOwner}
                    onChange={(event) => setResourceOwner(event.target.value)}
                />
                <TextInput
                    label="Email"
                    required
                    type='email'
                    placeholder="e.g. Client credentials will be sent to this email"
                    mt="md"
                    classNames={{ input: classes.input, label: classes.inputLabel }}
                    value={resourceOwnerEmail}
                    onChange={(event) => setResourceOwnerEmail(event.target.value)}
                />
                <Textarea
                    label="Additional Details"
                    placeholder="Please include any further details relating to this request."
                    minRows={4}
                    mt="md"
                    value={additionalInfo}
                    onChange={(event) => setAdditionalInfo(event.target.value)}
                    classNames={{ input: classes.input, label: classes.inputLabel }}
                />

                <Group position="right" mt="md">
                    <Button type="submit" disabled={!appName || !resourceOwner || !resourceOwnerEmail} className={classes.control}> <MailTo></MailTo></Button>
                </Group>
            </div>
        </SimpleGrid>
        </div>
    );
}

export default ClientRegistration;

