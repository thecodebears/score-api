import { AccountController } from "./account.controller";
import { OrderController } from "./order/order.controller"
import { AccountService } from "./account.service"
import { Test } from "@nestjs/testing"
import { ConnectionService } from "./connection/connection.service";
import { OrderService } from "./order/order.service";
import { SignUpResponse } from "./account.types";
import { AccountUpdateDto } from "./validation/dto/update.dto";
import { Item } from "../item/item.entity";
import { ModelGetRequest } from "../model.types";

describe('AccountController', () => {
    let accountController: AccountController;
    let orderController: OrderController;
    let accountService: AccountService;
    let connectionService: ConnectionService;
    let orderService: OrderService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AccountController, OrderController],
            providers: [AccountService, ConnectionService, OrderService]
        }).compile()
    
        accountController = moduleRef.get<AccountController>(AccountController)
        orderController = moduleRef.get<OrderController>(OrderController)
        accountService = moduleRef.get<AccountService>(AccountService)
        connectionService = moduleRef.get<ConnectionService>(ConnectionService)
        orderService = moduleRef.get<OrderService>(OrderService)
    })

    let userMock = { 
        username: 'test_name', 
        password: 'test_pwd' 
    }
    let user: Promise<SignUpResponse>;

    describe('signUp', () => {
        it('should return { account, token }', async () => {
            user = accountController.signUp(userMock)
            
            expect((await user)?.account && (await user)?.token).toBe(true)
        })
    })

    describe('signIn', () => {
        it('should return jwt token', async () => {
            let res = await accountController.signIn((await user)?.account);
            expect(typeof res).toBe("string")
        })
    })

    describe('get', () => {
        it('should return user info', async () => {
            let res = await accountController.get((await user)?.account, { fields: "" } as ModelGetRequest)
            expect(typeof res).toBe("object")
        })
    })

    describe('update', () => {
        it('should update user info', async () => {
            let res = await accountController.update((await user)?.account, {
                name: "test_name_2"
            } as AccountUpdateDto)
            expect(res.name).toBe("test_name_2")
        })
    })

    describe('cart/add', () => {
        it('should be ok', async () => {
            let isOk = true
            try {
                await accountController.addToCart(
                    (await user)?.account, 
                    { id: 1 } as Item,
                    { count: 1 },
                    new Response()
                )
            }
            catch {
                isOk = false
            }

            expect(isOk).toBe(true)
        })
    })

    describe('cart/remove', () => {
        it('should be ok', async () => {
            let isOk = true
            try {
                await accountController.removeFromCart(
                    (await user)?.account, 
                    { id: 1 } as Item,
                    new Response()
                )
            }
            catch {
                isOk = false
            }

            expect(isOk).toBe(true)
        })
    })

    describe('cart/clear', () => {
        it('should be ok', async () => {
            let isOk = true
            try {
                await accountController.clearCart(
                    (await user)?.account, 
                    new Response()
                )
            }
            catch {
                isOk = false
            }

            expect(isOk).toBe(true)
        })
    })

    describe('pins/add', () => {
        it('should be ok', async () => {
            let isOk = true
            try {
                await accountController.addToPins(
                    (await user)?.account, 
                    { id: 1 } as Item,
                    new Response()
                )
            }
            catch {
                isOk = false
            }

            expect(isOk).toBe(true)
        })
    })

    describe('pins/remove', () => {
        it('should be ok', async () => {
            let isOk = true
            try {
                await accountController.removeFromPins(
                    (await user)?.account, 
                    { id: 1 } as Item,
                    new Response()
                )
            }
            catch {
                isOk = false
            }

            expect(isOk).toBe(true)
        })
    })

    describe('pins/clear', () => {
        it('should be ok', async () => {
            let isOk = true
            try {
                await accountController.clearPins(
                    (await user)?.account, 
                    new Response()
                )
            }
            catch {
                isOk = false
            }

            expect(isOk).toBe(true)
        })
    })
})