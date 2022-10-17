import 'dotenv/config';


namespace environment {
    export const scope: string = process.env.scope;
    export const domain: string = process.env.domain;
    export const port: number = parseInt(process.env.port);

    export namespace credentials {
        export const discord = {
            clientId: process.env.discordClientId,
            clientSecret: process.env.discordClientSecret,
            callbackUrl: `http://${ process.env.scope === 'DEV' ? `localhost:${port}` : domain }/${process.env.discordCallbackUrl}`
        };
    }

    export namespace security {
        export const jwt = {
            secret: process.env.jwtSecret
        };
        export const session = {
            secret: process.env.sessionSecret
        };
    }
}

export default environment;
