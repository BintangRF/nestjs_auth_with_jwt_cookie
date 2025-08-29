import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProps } from 'types/user-types';

@Injectable()
export class UserService {
  private readonly users: UserProps[] = [
    {
      id: 1,
      name: 'Zero',
    },
    {
      id: 2,
      name: 'One',
    },
  ];

  getUsers() {
    return {
      data: this.users,
      meta: { total: this.users.length },
    };
  }

  getUserById(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
