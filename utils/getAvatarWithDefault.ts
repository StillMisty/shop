export default (avatar: string | null | undefined): string => {
  return avatar || "/images/photo.webp";
};
