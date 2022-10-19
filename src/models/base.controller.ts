import {CanActivate, Controller, Get, Post, UseGuards } from "@nestjs/common";


export const EntityController = <EntityService>(entityName: string, guards: CanActivate[] = []): any => {
    @Controller(entityName)
    class MixinEntityController {
        constructor(protected readonly service: EntityService) {}

        @Get()
        @UseGuards(...guards)
        public get() {}

        @Post('create')
        @UseGuards(...guards)
        public create() {}

        @Post('search')
        @UseGuards(...guards)
        public search() {}

        @Post('update')
        @UseGuards(...guards)
        public update() {}

        @Post('delete')
        @UseGuards(...guards)
        public delete() {}
    }

    return MixinEntityController;
}