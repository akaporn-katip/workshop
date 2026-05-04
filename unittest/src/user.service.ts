import { ConflictException } from "./errors.js";
import type { UserRepository } from "./user.repository.js";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async register(email: string) {
    const existing = await this.userRepo.findOne({ email });
    if (existing) throw new ConflictException("Email already exists");

    return this.userRepo.save({ email, createdAt: new Date() });
  }
}
