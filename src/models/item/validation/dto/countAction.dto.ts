import { IsNotEmpty, IsString } from "class-validator";
import { ItemAnalyticsAction } from "../../item.types";


export class ItemCountActionDto {
    @IsNotEmpty()
    @IsString()
    type: ItemAnalyticsAction;
}
