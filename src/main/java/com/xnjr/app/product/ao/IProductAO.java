package com.xnjr.app.product.ao;

/**
 * @author: XIANDONG 
 * @since: 2016年4月20日 上午11:40:19 
 * @history:
 */
public interface IProductAO {

    /**
     * 增加产品
     * @param type
     * @param name
     * @param advTitle
     * @param advPic
     * @param majorPic
     * @param majorText
     * @param familyPic
     * @param familyText
     * @param highlightPic
     * @param highlightText
     * @param updater
     * @return 
     * @create: 2016年5月17日 下午1:41:30 XIANDONG
     * @history:
     */
    public Object addProduct(String type, String name, String advTitle,
            String advPic, String majorPic, String majorText, String familyPic,
            String familyText, String highlightPic, String highlightText,
            String updater, String remark);

    /**
     * 修改产品
     * @param type
     * @param name
     * @param advTitle
     * @param advPic
     * @param majorPic
     * @param majorText
     * @param familyPic
     * @param familyText
     * @param highlightPic
     * @param highlightText
     * @param updater
     * @return 
     * @create: 2016年5月17日 下午1:41:40 XIANDONG
     * @history:
     */
    public Object editProduct(String code, String type, String name,
            String advTitle, String advPic, String majorPic, String majorText,
            String familyPic, String familyText, String highlightPic,
            String highlightText, String updater, String remark);

    /**
     * 分页查询产品
     * @param type
     * @param name
     * @param status
     * @param updater
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2016年5月17日 下午1:41:47 XIANDONG
     * @history:
     */
    public Object queryProductPage(String type, String name, String status,
            String updater, String start, String limit, String orderColumn,
            String orderDir);

    /**
     * 列表查询产品
     * @param type
     * @param name
     * @param updater
     * @param status
     * @return 
     * @create: 2016年5月17日 下午1:41:58 XIANDONG
     * @history:
     */
    public Object queryProductList(String type, String name, String updater,
            String status);

    /**
     * 产品详情
     * @param code
     * @return 
     * @create: 2016年5月17日 下午1:42:17 XIANDONG
     * @history:
     */

    public Object detailProduct(String code);

    /**
     * 审核产品
     * @param code
     * @param checkUser
     * @param checkResult
     * @param checkNote
     * @return 
     * @create: 2016年5月17日 下午1:42:29 XIANDONG
     * @history:
     */

    public Object checkProduct(String code, String checkUser,
            String checkResult, String checkNote);

    /**
     * 上架/下架产品
     * @param code
     * @param checkUser
     * @param checkResult
     * @param checkNote
     * @return 
     * @create: 2016年5月17日 下午1:42:45 XIANDONG
     * @history:
     */

    public Object upProduct(String code, String checkUser, String checkResult,
            String checkNote);

}
