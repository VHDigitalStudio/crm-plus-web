import type { AuthRepository, RegisterLawyerInput } from "../domain/AuthRepository";
import { EmailAlreadyInUseError, InvalidCredentialsError } from "../domain/errors";
import type { User, UserRole } from "../domain/User";

interface StoredUserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const USERS_KEY = "crmjuridico:auth:users";
const SESSION_KEY = "crmjuridico:auth:session";

function readUsers(): StoredUserRecord[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredUserRecord[];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUserRecord[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublicUser(record: StoredUserRecord): User {
  return { id: record.id, name: record.name, email: record.email, role: record.role };
}

export class LocalStorageAuthRepository implements AuthRepository {
  async registerLawyer(data: RegisterLawyerInput): Promise<User> {
    const normalizedEmail = data.email.trim().toLowerCase();
    const users = readUsers();

    if (users.some((user) => user.email === normalizedEmail)) {
      throw new EmailAlreadyInUseError();
    }

    const record: StoredUserRecord = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: normalizedEmail,
      password: data.password,
      role: "advogado",
    };

    writeUsers([...users, record]);
    localStorage.setItem(SESSION_KEY, record.id);
    return toPublicUser(record);
  }

  async login(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const record = readUsers().find((user) => user.email === normalizedEmail && user.password === password);

    if (!record) {
      throw new InvalidCredentialsError();
    }

    localStorage.setItem(SESSION_KEY, record.id);
    return toPublicUser(record);
  }

  async logout(): Promise<void> {
    localStorage.removeItem(SESSION_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) return null;

    const record = readUsers().find((user) => user.id === sessionId);
    return record ? toPublicUser(record) : null;
  }
}
