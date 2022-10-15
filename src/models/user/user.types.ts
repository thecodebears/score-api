type ProductId = string;
type Count = number;

export type UserCart = {
    [key: ProductID]: Count
};

type AuthService = 'vk' | 'google' | 'discord';
type Key = string;

export type UserConnections = {
    [key: AuthService]: Key
};