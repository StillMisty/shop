export interface Users {
  avatar?: string;
  isAdmin: boolean;
  lastLoginTime: number;
  nickname: string;
  registerTime: number;
  userId: string;
  username: string;
  userStatus: UserStatus;
  wallet: number;
}

export enum UserStatus {
  Blacklisted = "BLACKLISTED",
  Frozen = "FROZEN",
  Normal = "NORMAL",
}
