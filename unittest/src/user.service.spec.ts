import { jest } from "@jest/globals";
import { ConflictException } from "./errors.js";
import type { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

describe("UserService", () => {
  let service: UserService;
  let userRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepo = { findOne: jest.fn(), save: jest.fn() };
    service = new UserService(userRepo);
  });

  it("should create user when email is new", async () => {
    // Arrange — เตรียมของ
    userRepo.findOne.mockResolvedValue(null); // ไม่มี user นี้ในระบบ
    userRepo.save.mockResolvedValue({ id: 1, email: "new@test.com" });

    // Act — ลงมือ
    const result = await service.register("new@test.com");

    // Assert — ตรวจผล
    expect(result.email).toBe("new@test.com");
    expect(userRepo.save).toHaveBeenCalledTimes(1);
  });

  it("should throw ConflictException when email already exists", async () => {
    // Arrange — มี user อยู่แล้ว
    userRepo.findOne.mockResolvedValue({ id: 1, email: "old@test.com" });

    // Act & Assert — ต้อง throw
    await expect(service.register("old@test.com")).rejects.toThrow(
      ConflictException,
    );
  });

});
