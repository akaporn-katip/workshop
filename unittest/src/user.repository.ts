export interface User {
  id: number;
  email: string;
  createdAt: Date;
}

const users: User[] = [
  {
    id: 1,
    email: "abc1@email.com",
    createdAt: new Date("2026-01-12"),
  },
  {
    id: 2,
    email: "abc2@email.com",
    createdAt: new Date("2026-01-12"),
  },
  {
    id: 3,
    email: "abc3@email.com",
    createdAt: new Date("2026-01-12"),
  },
  {
    id: 4,
    email: "abc4@email.com",
    createdAt: new Date("2026-01-12"),
  },
  {
    id: 5,
    email: "abc5@email.com",
    createdAt: new Date("2026-01-12"),
  },
  {
    id: 6,
    email: "old@test.com",
    createdAt: new Date("2026-01-12"),
  },
];

export class UserRepository {
  async findOne({
    email,
  }: Pick<User, "email">): Promise<Omit<User, "createdAt"> | null> {
    const found = users.find((u) => u.email === email);
    if (found) {
      return found;
    }

    return null;
  }

  async save({
    email,
    createdAt,
  }: Pick<User, "email" | "createdAt">): Promise<Omit<User, "createdAt">> {
    const newUser = { id: users.length + 1, email, createdAt };
    if (users.find((u) => u.email === email))
      throw new Error("User already exists");
    users.push(newUser);
    return newUser;
  }
}
