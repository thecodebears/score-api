import { HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { ApplicationService } from "../../application.service";


@Injectable()
export class ApplicationIndexationPipe implements PipeTransform {
    constructor(
        private applicationService: ApplicationService
    ) {}

    public async transform(value: any) {
        let application = value ? await this.applicationService.findOneBy({ id: value as string }) : null
        if (!application) throw new HttpException('application.entity.notFound', 400);
        return application;
    }
}