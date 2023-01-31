import {
createStyles,
Text,
Title,
SimpleGrid,
TextInput,
Textarea,
Button,
Group,
Tooltip,
Collapse,
ActionIcon,
Notification
} from '@mantine/core';
import { IconToggleLeft, IconToggleRight, IconCheck, IconX } from '@tabler/icons';
import { useState } from 'react';
import { AuthConfig } from '../helpers/config';


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



const  ClientRegistration: React.FC<{config: AuthConfig, updateRegistrationSuccess: any}> = ({config, updateRegistrationSuccess}) => {
    const { classes } = useStyles();
    
    const [appName, setAppName] = useState("");
    const [callbackUrl, setCallbackUrl] = useState("");
    const [resourceOwner, setResourceOwner] = useState("");
    const [resourceOwnerEmail, setResourceOwnerEmail] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [scopes, setScopes] = useState("openid email profile roles"); 
    const [showOptionalFields, setShowOptionalFields] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerFailure, setRegisterFailure] = useState(false)

    const submitRequest =  () =>{
        const payload = {
            "appName": appName,
            "callbackUrl": callbackUrl ? callbackUrl + ', https://tokens.ala.org.au': 'https://tokens.ala.org.au',
            "resourceOwner": resourceOwner,
            "scopes": scopes ? scopes: 'openid email profile roles',
            "resourceOwnerEmail": resourceOwnerEmail,
            "additionalInfo": additionalInfo
        }

          const options = {
            method: "POST",
            body: JSON.stringify(payload)
          };

          const request = new Request(config.tokens_api + '/register', options);
          fetch(request, {mode: 'cors'}).then(response =>{
              if(response.ok){
                setRegisterSuccess(true);
                updateRegistrationSuccess(true);
              } else{
                setRegisterFailure(true);
              }
          }).catch(e =>{
              console.log(e);
              setRegisterFailure(true);
          }).finally( ()=> {
              // reset registration stats after a delay
              setTimeout(() => {
                setRegisterSuccess(false);
                setRegisterFailure(false);
                updateRegistrationSuccess(false);
              }, 5000)
          });
    }




    return (
        <div className={classes.wrapper}>
        <SimpleGrid cols={2} spacing={10}    breakpoints={[
            { maxWidth: 'sm', cols: 2, spacing: 'sm' },
            { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}>
            <div>
            <Title className={classes.title}>Client Application Registration</Title>
            <Text className={classes.description} mt="sm" mb={30}>
                Please provide details in the adjacent form for Client Registration. Once registered, our team will provide you with Client ID and Secret required for token generation and refresh. 
            </Text>

            </div>
            <div className={classes.form}>
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

                <TextInput
                    label="Application Name / Access Reason"
                    placeholder="e.g. Occurrence search app, metadata access etc"
                    required
                    classNames={{ input: classes.input, label: classes.inputLabel }}
                    value={appName}
                    onChange={(event) => setAppName(event.target.value)}
                />
                <br />

                <span style={{fontSize:'12px'}} >Toggle optional fields</span>
                <ActionIcon color="blue" onClick={() => setShowOptionalFields(!showOptionalFields)}>
                   {showOptionalFields && <IconToggleRight size={25} />} 
                    {!showOptionalFields && <IconToggleLeft size={25} />}
                </ActionIcon>


                <Collapse in={showOptionalFields}>
                        <TextInput
                            label="Scopes / Resource Permissions (Optional)"
                            placeholder="e.g. openid email ala "
                            classNames={{ input: classes.input, label: classes.inputLabel }}
                            value={scopes}
                            onChange={(event) => setScopes(event.target.value)}
                        />
                        <Tooltip   position="bottom" className={classes.toolTip} label="The callback/redirect for your application ALA should redirect to after authentication. This is only required if you are planning to generate JWTs on your own front-end application(s) via PKCE or Implicit OAuth flows.">
                            <TextInput
                                label="Callback URL (Optional)"
                                placeholder="e.g. https://myapp.example.com"
                                classNames={{ input: classes.input, label: classes.inputLabel }}
                                value={callbackUrl}
                                onChange={(event) => setCallbackUrl(event.target.value)}
                            />
                        </Tooltip>

                        <Textarea
                            label="Additional Details (Optional)"
                            placeholder="Please include any further details relating to this request."
                            minRows={4}
                            mt="md"
                            value={additionalInfo}
                            onChange={(event) => setAdditionalInfo(event.target.value)}
                            classNames={{ input: classes.input, label: classes.inputLabel }}
                        />
                </Collapse>

                <Group position="right" mt="md">
                    <Button  disabled={!appName || !resourceOwner || !resourceOwnerEmail} className={classes.control} onClick={() => submitRequest()}> Submit </Button>
                </Group>
            </div>
        </SimpleGrid>
        <br />
        { registerFailure && <Notification disallowClose={true} icon={<IconX size={18} />} color="red" title="Error">
               Error submitting Client Application Registration!. Please try again later.
        </Notification> }
        </div>
    );
}

export default ClientRegistration;

