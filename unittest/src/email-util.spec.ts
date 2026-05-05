import { isValidEmail } from "./email-util.js";

describe("email-util", () => {
  it("should valid", () => {
    expect(isValidEmail("email@test.com")).toBeTruthy();
    expect(isValidEmail("email@test.co.th")).toBeTruthy();
  });
});
