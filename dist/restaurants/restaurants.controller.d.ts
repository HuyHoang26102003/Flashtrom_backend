import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UpdateMenuItemDto } from 'src/menu_items/dto/update-menu_item.dto';
import { CreateMenuItemDto } from 'src/menu_items/dto/create-menu_item.dto';
import { CreateMenuItemVariantDto } from 'src/menu_item_variants/dto/create-menu_item_variant.dto';
import { UpdateMenuItemVariantDto } from 'src/menu_item_variants/dto/update-menu_item_variant.dto';
import { ApiResponse } from 'src/utils/createResponse';
import { Restaurant } from './entities/restaurant.entity';
import { ToggleRestaurantAvailabilityDto } from './dto/restaurant-availability.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<ApiResponse<Restaurant>>;
    applyPromotion(restaurantId: string, promotionId: string): Promise<ApiResponse<any>>;
    clearRedis(): Promise<ApiResponse<null>>;
    findAll(): Promise<ApiResponse<any>>;
    findAllPaginated(page?: string, limit?: string): Promise<ApiResponse<{
        totalPages: number;
        currentPage: number;
        totalItems: number;
        items: Restaurant[];
    }>>;
    findOne(id: string): Promise<ApiResponse<Restaurant>>;
    getRestaurantRatingsReviews(id: string): Promise<ApiResponse<any>>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<ApiResponse<Restaurant>>;
    remove(id: string): Promise<ApiResponse<boolean>>;
    createMenuItem(restaurantId: string, createMenuItemDto: CreateMenuItemDto): Promise<any>;
    getMenuItemsForRestaurant(restaurantId: string): Promise<any>;
    findOneMenuItem(restaurantId: string, id: string): Promise<ApiResponse<any>>;
    updateMenuItem(restaurantId: string, id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<any>;
    toggleAvailability(id: string, toggleDto: ToggleRestaurantAvailabilityDto): Promise<ApiResponse<Restaurant>>;
    removeMenuItem(restaurantId: string, id: string): Promise<any>;
    createMenuItemVariant(variantId: string, createMenuItemVariantDto: CreateMenuItemVariantDto): Promise<any>;
    updateMenuItemVariant(variantId: string, updateMenuItemVariantDto: UpdateMenuItemVariantDto): Promise<any>;
    removeMenuItemVariantForRestaurant(variantId: string): Promise<any>;
    getRestaurantOrders(restaurantId: string, page?: string, limit?: string): Promise<ApiResponse<any>>;
}
