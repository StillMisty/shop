/**
 * top.stillmisty.shopback.entity.Category
 *
 * Category
 */
export interface Category {
  /**
   * 类别ID
   */
  categoryId: string;
  /**
   * 类别名称
   */
  categoryName: string;
  /**
   * 类别层级，1为顶级类别，2为二级类别，3为三级类别
   */
  level: number;
  /**
   * 类别排序号
   */
  sortOrder: number;
}
