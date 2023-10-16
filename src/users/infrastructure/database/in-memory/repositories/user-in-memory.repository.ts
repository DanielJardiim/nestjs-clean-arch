import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { IUserRepository } from '@/users/domain/repositories/user.repository'

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements IUserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.items.find(item => item.email === email)
    if (!user) {
      throw new NotFoundError(`User not found using email ${email}`)
    }
    return user
  }

  async emailExists(email: string): Promise<void> {
    const user = this.items.find(item => item.email === email)
    if (user) {
      throw new ConflictError('Email address already used')
    }
  }
}
