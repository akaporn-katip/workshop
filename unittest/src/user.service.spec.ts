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

  describe("register", () => {
    it("should create user when email is new", async () => {
      // Arrange — เตรียมของ
      userRepo.findOne.mockResolvedValue(null); // ไม่มี user นี้ในระบบ
      userRepo.save.mockResolvedValue({ id: 1, email: "new@test.com" });

      // Act — ลงมือ
      const result = await service.register("new@test.com");

      // Assert — ตรวจผล
      expect(result.email).toBe("new@test.com");
      expect(userRepo.findOne).toHaveBeenCalledWith({ email: "new@test.com" });
      expect(userRepo.save).toHaveBeenCalledTimes(1);
      expect(userRepo.save).toHaveBeenCalledWith({
        email: "new@test.com",
        createdAt: expect.any(Date),
      });
    });

    it("should throw ConflictException when email already exists", async () => {
      // Arrange — มี user อยู่แล้ว
      userRepo.findOne.mockResolvedValue({ id: 1, email: "old@test.com" });

      // Act & Assert — ต้อง throw
      await expect(service.register("old@test.com")).rejects.toThrow(
        ConflictException,
      );
      expect(userRepo.save).not.toHaveBeenCalled();
    });
  });

  describe("findUserByEmail", () => {
    it("should return the user if found", async () => {
      // Arrange
      const mockUser = { id: 1, email: "test@test.com" };
      userRepo.findOne.mockResolvedValue(mockUser);

      // Act
      const result = await service.findUserByEmail("test@test.com");

      // Assert
      expect(result).toEqual(mockUser);
      expect(userRepo.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
    });

    it("should return null if user is not found", async () => {
      // Arrange
      userRepo.findOne.mockResolvedValue(null);

      // Act
      const result = await service.findUserByEmail("notfound@test.com");

      // Assert
      expect(result).toBeNull();
      expect(userRepo.findOne).toHaveBeenCalledWith({
        email: "notfound@test.com",
      });
    });
  });
});
