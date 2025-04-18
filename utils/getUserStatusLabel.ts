import { UserStatus } from "~/types/Users";

export default (status: UserStatus) => {
  switch (status) {
    case UserStatus.Blacklisted:
      return "黑名单";
    case UserStatus.Frozen:
      return "已冻结";
    case UserStatus.Normal:
      return "正常";
    default:
      return "未知状态";
  }
};
