import { User, UserRole } from '../../types';
import { mockUsers } from '../../data/mockData';

export interface LoginPayload {
  email: string;
  password: string;
  expectedRole?: UserRole;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const NETWORK_DELAY_MS = 800;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginWithMock(payload: LoginPayload): Promise<User | null> {
  await wait(NETWORK_DELAY_MS);

  const foundUser = mockUsers.find((u) => u.email === payload.email);
  if (!foundUser) {
    return null;
  }

  if (payload.expectedRole && foundUser.role !== payload.expectedRole) {
    return null;
  }

  return foundUser;
}

export async function signupWithMock(payload: SignupPayload): Promise<User> {
  await wait(NETWORK_DELAY_MS);

  return {
    id: Math.random().toString(36).slice(2, 11),
    name: payload.name,
    email: payload.email,
    role: payload.role,
    location: '',
    interests: [],
    joinedDate: new Date().toISOString(),
    verified: false,
    points: 0,
    level: 1,
    badges: [],
    followersCount: 0,
    followingCount: 0,
  };
}
