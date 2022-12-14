import { HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { AccountService } from "../../account.service";


@Injectable()
export class AccountIndexationPipe implements PipeTransform {
    constructor(
        private accountService: AccountService
    ) {}

    public async transform(value: any) {
        let account = value ? await this.accountService.findOneBy({ id: value as string }) : null
        if (!account) throw new HttpException('account.entity.notFound', 400);
        return account;
    }
}