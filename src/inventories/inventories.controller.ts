import { Controller, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { InventoriesService } from './inventories.service';

@Controller('inventories')
export class InventoriesController {
  constructor(
    private readonly authService: AuthService,
    private usersRepository: UsersService,
    private inventoryRepository: InventoriesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add/:id/crate/:crate')
  async sellSkin(
    @Headers('Authorization') authorizationHeader: string,
    @Param('id') skinId: string,
    @Param('crate') crateId: string,
  ) {
    const userId = (
      await this.usersRepository.getUser(
        this.authService.decodeToken(authorizationHeader.replace('Bearer ', '')),
      )
    ).id;
    return this.inventoryRepository.addSkin(userId, crateId, skinId);
  }
}
