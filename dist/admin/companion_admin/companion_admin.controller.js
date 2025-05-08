"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanionAdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../admin.service");
const restaurants_service_1 = require("../../restaurants/restaurants.service");
const create_admin_dto_1 = require("../dto/create-admin.dto");
const update_admin_dto_1 = require("../dto/update-admin.dto");
const update_restaurant_dto_1 = require("../../restaurants/dto/update-restaurant.dto");
const admin_1 = require("../../utils/types/admin");
const customers_service_1 = require("../../customers/customers.service");
const drivers_service_1 = require("../../drivers/drivers.service");
const customer_cares_service_1 = require("../../customer_cares/customer_cares.service");
const commonFunctions_1 = require("../../utils/commonFunctions");
const auth_service_1 = require("../../auth/auth.service");
const Payload_1 = require("../../types/Payload");
const address_book_service_1 = require("../../address_book/address_book.service");
let CompanionAdminController = class CompanionAdminController {
    constructor(adminService, restaurantService, customerService, driverService, customerCareService, authService, addressBookService) {
        this.adminService = adminService;
        this.restaurantService = restaurantService;
        this.customerService = customerService;
        this.driverService = driverService;
        this.customerCareService = customerCareService;
        this.authService = authService;
        this.addressBookService = addressBookService;
    }
    createCompanionAdmin(createAdminDto) {
        createAdminDto.role = admin_1.AdminRole.COMPANION_ADMIN;
        return this.adminService.create(createAdminDto);
    }
    findAllCompanionAdmins() {
        return this.adminService.findAll();
    }
    findAllRestaurants() {
        return this.restaurantService.findAll();
    }
    async createRestaurant() {
        let emailData;
        let existingUser;
        do {
            emailData = (0, commonFunctions_1.generateRandomEmail)();
            existingUser = await this.authService.findUserByEmail(emailData.email);
        } while (existingUser);
        const addressBook = await this.addressBookService.create({
            street: '123 Restaurant St',
            city: 'Restaurant City',
            nationality: 'Restaurant Country',
            postal_code: 70000,
            location: { lat: 1.234567, lng: 7.891011 },
            is_default: true,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            title: 'Main'
        });
        const createRestaurantDto = {
            first_name: emailData.fullName.first_name,
            last_name: emailData.fullName.last_name,
            email: emailData.email,
            password: '000000',
            phone: '1234567890',
            address_id: addressBook.data.id,
            owner_id: '1234567890',
            owner_name: `${emailData.fullName.first_name} ${emailData.fullName.last_name}`,
            restaurant_name: emailData.fullName.prefixEmail,
            contact_email: [
                {
                    title: 'Main',
                    email: emailData.email,
                    is_default: true
                }
            ],
            contact_phone: [
                {
                    title: 'Main',
                    number: '1234567890',
                    is_default: true
                }
            ],
            status: {
                is_open: true,
                is_active: true,
                is_accepted_orders: true
            },
            opening_hours: {
                mon: { from: 9, to: 17 },
                tue: { from: 9, to: 17 },
                wed: { from: 9, to: 17 },
                thu: { from: 9, to: 17 },
                fri: { from: 9, to: 17 },
                sat: { from: 9, to: 17 },
                sun: { from: 9, to: 17 }
            }
        };
        const registrationResult = await this.authService.register(createRestaurantDto, Payload_1.Enum_UserType.RESTAURANT_OWNER);
        return registrationResult;
    }
    findAllCustomers() {
        return this.customerService.findAll();
    }
    async createCustomer() {
        let emailData;
        let existingUser;
        do {
            emailData = (0, commonFunctions_1.generateRandomEmail)();
            existingUser = await this.authService.findUserByEmail(emailData.email);
        } while (existingUser);
        const addressBook = await this.addressBookService.create({
            street: '123 Customer St',
            city: 'Customer City',
            nationality: 'Customer Country',
            postal_code: 70000,
            location: { lat: 1.234567, lng: 7.891011 },
            is_default: true,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            title: 'Main'
        });
        const createCustomerDto = {
            first_name: emailData.fullName.first_name,
            last_name: emailData.fullName.last_name,
            email: emailData.email,
            password: '000000',
            phone: '1234567890',
            address: addressBook.data.id,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            user_id: '1234567890'
        };
        const registrationResult = await this.authService.register(createCustomerDto, Payload_1.Enum_UserType.CUSTOMER);
        return registrationResult;
    }
    findAllDrivers() {
        return this.driverService.findAll();
    }
    async createDriver() {
        let emailData;
        let existingUser;
        do {
            emailData = (0, commonFunctions_1.generateRandomEmail)();
            existingUser = await this.authService.findUserByEmail(emailData.email);
        } while (existingUser);
        const addressBook = await this.addressBookService.create({
            street: '123 Driver St',
            city: 'Driver City',
            nationality: 'Driver Country',
            postal_code: 70000,
            location: { lat: 1.234567, lng: 7.891011 },
            is_default: true,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            title: 'Main'
        });
        const createDriverDto = {
            first_name: emailData.fullName.first_name,
            last_name: emailData.fullName.last_name,
            email: emailData.email,
            contact_email: [
                {
                    title: 'Main',
                    email: emailData.email,
                    is_default: true
                }
            ],
            contact_phone: [
                {
                    title: 'Main',
                    number: '1234567890',
                    is_default: true
                }
            ],
            available_for_work: true,
            active_points: 80,
            is_on_delivery: false,
            rating: {
                average_rating: 4.5,
                review_count: 100
            },
            password: '000000',
            phone: '1234567890',
            user_id: addressBook.data.id,
            vehicle: {
                license_plate: 'ABC123',
                model: 'motorcycle',
                color: 'red'
            },
            current_location: {
                lat: 123.456,
                lng: 78.91
            }
        };
        const registrationResult = await this.authService.register(createDriverDto, Payload_1.Enum_UserType.DRIVER);
        return registrationResult;
    }
    findAllCustomerCare() {
        return this.customerCareService.findAll();
    }
    async createCustomerCare() {
        let emailData;
        let existingUser;
        do {
            emailData = (0, commonFunctions_1.generateRandomEmail)();
            existingUser = await this.authService.findUserByEmail(emailData.email);
        } while (existingUser);
        const addressBook = await this.addressBookService.create({
            street: '123 Driver St',
            city: 'Driver City',
            nationality: 'Driver Country',
            postal_code: 70000,
            location: { lat: 1.234567, lng: 7.891011 },
            is_default: true,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            title: 'Main'
        });
        const createCustomerCareDto = {
            first_name: emailData.fullName.first_name,
            last_name: emailData.fullName.last_name,
            email: emailData.email,
            password: '000000',
            phone: '1234567890',
            user_id: addressBook.data.id,
            available_for_work: true,
            is_assigned: false,
            assigned_tickets: [],
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000)
        };
        const registrationResult = await this.authService.register(createCustomerCareDto, Payload_1.Enum_UserType.CUSTOMER_CARE_REPRESENTATIVE);
        return registrationResult;
    }
    findOneCompanionAdmin(id) {
        return this.adminService.findOne(id);
    }
    updateCompanionAdmin(id, updateAdminDto) {
        updateAdminDto.role = admin_1.AdminRole.COMPANION_ADMIN;
        return this.adminService.update(id, updateAdminDto);
    }
    removeCompanionAdmin(id) {
        return this.adminService.remove(id);
    }
    findOneRestaurant(id) {
        return this.restaurantService.findOne(id);
    }
    updateRestaurant(id, updateRestaurantDto) {
        return this.restaurantService.update(id, updateRestaurantDto);
    }
    removeRestaurant(id) {
        return this.restaurantService.remove(id);
    }
};
exports.CompanionAdminController = CompanionAdminController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "createCompanionAdmin", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "findAllCompanionAdmins", null);
__decorate([
    (0, common_1.Get)('/restaurants'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "findAllRestaurants", null);
__decorate([
    (0, common_1.Post)('/restaurants'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanionAdminController.prototype, "createRestaurant", null);
__decorate([
    (0, common_1.Get)('/customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "findAllCustomers", null);
__decorate([
    (0, common_1.Post)('/customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanionAdminController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('/drivers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "findAllDrivers", null);
__decorate([
    (0, common_1.Post)('/drivers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanionAdminController.prototype, "createDriver", null);
__decorate([
    (0, common_1.Get)('/customer-care'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "findAllCustomerCare", null);
__decorate([
    (0, common_1.Post)('/customer-care'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanionAdminController.prototype, "createCustomerCare", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "findOneCompanionAdmin", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "updateCompanionAdmin", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "removeCompanionAdmin", null);
__decorate([
    (0, common_1.Get)('restaurant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "findOneRestaurant", null);
__decorate([
    (0, common_1.Patch)('restaurant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurant_dto_1.UpdateRestaurantDto]),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "updateRestaurant", null);
__decorate([
    (0, common_1.Delete)('restaurant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanionAdminController.prototype, "removeRestaurant", null);
exports.CompanionAdminController = CompanionAdminController = __decorate([
    (0, common_1.Controller)('companion-admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        restaurants_service_1.RestaurantsService,
        customers_service_1.CustomersService,
        drivers_service_1.DriversService,
        customer_cares_service_1.CustomerCareService,
        auth_service_1.AuthService,
        address_book_service_1.AddressBookService])
], CompanionAdminController);
//# sourceMappingURL=companion_admin.controller.js.map