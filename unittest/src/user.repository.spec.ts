import { UserRepositoryMock } from "./user.repository.js";

describe("UserRepositoryMock", () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  });

  describe("findOne", () => {
    it("should return the user if the email exists", async () => {
      const result = await repository.findOne({ email: "abc1@email.com" });
      expect(result).toBeDefined();
      expect(result?.email).toBe("abc1@email.com");
      expect(result?.id).toBe(1);
    });

    it("should return null if the email does not exist", async () => {
      const result = await repository.findOne({ email: "notfound@email.com" });
      expect(result).toBeNull();
    });
  });

  describe("save", () => {
    it("should add a new user and return it", async () => {
      const newUserInfo = {
        email: "newuser@email.com",
        createdAt: new Date(),
      };

      const result = await repository.save(newUserInfo);
      expect(result).toBeDefined();
      expect(result.email).toBe(newUserInfo.email);

      // Verify that it was successfully added
      const found = await repository.findOne({ email: newUserInfo.email });
      expect(found).toBeDefined();
      expect(found?.email).toBe(newUserInfo.email);
    });

    it("should throw an error if the user already exists", async () => {
      const existingUserInfo = {
        email: "abc1@email.com",
        createdAt: new Date(),
      };

      await expect(repository.save(existingUserInfo)).rejects.toThrow(
        "User already exists",
      );
    });
  });
});
