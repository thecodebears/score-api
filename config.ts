import 'dotenv/config';


export const config = Object.freeze({
    scope: process.env.scope,
    domain: process.env.domain,
    port: 3000,
    credentials: {
        discord: {
            applicationClientId: process.env.discordApplicationClientId,
            applicationClientSecret: process.env.discordApplicationClientSecret,
            applicationConfirmURL: process.env.scope === 'DEV' ?
                    `http://localhost:3000/connect/discord` :
                    encodeURIComponent('https://' + process.env.hostname + '/connect/discord'),
            applicationRedirectURL: `https://discord.com/api/oauth2/authorize?\
                client_id=${ process.env.discordApplicationClientId }\
                &redirect_uri=${ process.env.scope === 'DEV' ?
                    `http://localhost:3000/connect/discord` :
                    encodeURIComponent('https://' + process.env.hostname + '/connect/discord') }\
                &response_type=code&scope=identify`.replace(/\s/g, '')
        }
    }
});