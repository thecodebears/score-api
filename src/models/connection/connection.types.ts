export type ConnectionType = 'vk' | 'google' | 'discord';

export enum ConnectionTypes {
    VK='vk',
    Discord='discord',
    Google='google'
}

export type ConnectionRequest = {
    type: ConnectionType,
    key: string,
    placeholderName: string,
    accountId?: string
};

export type ConnectionPair = {
    account: string,
    connection: string
};

export type DiscordAccount = {
    id: string,
    username: string
};