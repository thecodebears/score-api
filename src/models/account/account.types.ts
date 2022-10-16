type ProductId = string;
type Count = number;

export type Cart = {
    [key: ProductId]: Count
};