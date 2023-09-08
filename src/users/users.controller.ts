import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersRepository: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersRepository.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersRepository.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/health')
  getUser(@Headers('Authorization') authorizationHeader: string) {
    return this.usersRepository.getUser(
      this.authService.decodeToken(authorizationHeader.replace('Bearer ', '')),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/open/:id')
  async openCrate(
    @Headers('Authorization') authorizationHeader: string,
    @Param('id') crateId: string,
  ) {
    const userId = (
      await this.usersRepository.getUser(
        this.authService.decodeToken(authorizationHeader.replace('Bearer ', '')),
      )
    ).id;
    return this.usersRepository.openCrate(userId, crateId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/sell/:id/crate/:crate')
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
    return this.usersRepository.sellSkin(userId, crateId, skinId);
  }
}
