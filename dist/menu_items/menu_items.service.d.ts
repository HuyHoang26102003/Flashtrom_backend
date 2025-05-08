import { CreateMenuItemDto } from './dto/create-menu_item.dto';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto';
import { MenuItemVariantsService } from 'src/menu_item_variants/menu_item_variants.service';
import { ApiResponse } from 'src/utils/createResponse';
import { FoodCategoriesRepository } from 'src/food_categories/food_categories.repository';
import { RestaurantsRepository } from 'src/restaurants/restaurants.repository';
import { MenuItemsRepository } from './menu_items.repository';
import { MenuItem } from './entities/menu_item.entity';
import { Repository } from 'typeorm';
export declare class MenuItemsService {
    private readonly menuItemRepository;
    private readonly menuItemsRepository;
    private readonly restaurantRepository;
    private readonly foodCategoriesRepository;
    private readonly menuItemVariantsService;
    private readonly logger;
    constructor(menuItemRepository: Repository<MenuItem>, menuItemsRepository: MenuItemsRepository, restaurantRepository: RestaurantsRepository, foodCategoriesRepository: FoodCategoriesRepository, menuItemVariantsService: MenuItemVariantsService);
    create(createMenuItemDto: CreateMenuItemDto): Promise<ApiResponse<any>>;
    findAll(): Promise<ApiResponse<MenuItem[]>>;
    private calculateDiscountedPrice;
    findOne(id: string): Promise<ApiResponse<any>>;
    update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<ApiResponse<MenuItem>>;
    remove(id: string): Promise<ApiResponse<null>>;
    updateEntityAvatar(uploadResult: {
        url: string;
        public_id: string;
    }, menuItemId: string): Promise<ApiResponse<MenuItem>>;
    private validateMenuItemData;
    private findExistingMenuItem;
    private handleExistingMenuItem;
    private createNewMenuItem;
    private updateExistingMenuItem;
    private createVariant;
    private handleMenuItemResponse;
    private handleError;
    findByRestaurantId(restaurantId: string): Promise<ApiResponse<MenuItem[]>>;
    findAllPaginated(page?: number, limit?: number): Promise<ApiResponse<any>>;
}
