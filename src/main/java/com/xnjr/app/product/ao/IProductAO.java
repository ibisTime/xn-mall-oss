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
    public Object addProduct(String category, String type, String typePic, String name, 
    		String order, String status, String advTitle,
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
    public Object editProduct(String code, String category, String type, String typePic, String name, 
    		String order, String status, String advTitle,
            String advPic, String majorPic, String majorText, String familyPic,
            String familyText, String highlightPic, String highlightText,
            String updater, String remark);

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
    public Object queryProductPage(String category, String name, String status,
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
    public Object queryProductList(String category, String type, String name, String updater,
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

    /**
     * 退货申请
     * @param goodsCode
     * @param price
     * @param quantity
     * @param applyUser
     * @param applyNote
     * @return 
     * @create: 2016年7月21日 下午5:41:09 XIANDONG
     * @history:
     */
    public Object tuihuoApply(String goodsCode, String price, String quantity,
            String applyUser, String applyNote);

    /**
     * 退货审核
     * @param code
     * @param approveUser
     * @param approveResult
     * @param approveNote
     * @return 
     * @create: 2016年7月21日 下午5:57:09 XIANDONG
     * @history:
     */
    public Object tuihuoCheck(String code, String approveUser,
            String approveResult, String approveNote);

    /**
     * 退货分页
     * @param code
     * @param goodsCode
     * @param status
     * @param applyUser
     * @param start
     * @param limit
     * @return 
     * @create: 2016年7月21日 下午5:57:29 XIANDONG
     * @history:
     */
    public Object goodsPage(String code, String goodsCode, String status,
            String applyUser, String start, String limit);

    /**
     * 退货列表
     * @param code
     * @param goodsCode
     * @param status
     * @param applyUser
     * @return 
     * @create: 2016年7月21日 下午5:58:20 XIANDONG
     * @history:
     */
    public Object goodsList(String code, String goodsCode, String status,
            String applyUser);

    /**
     * 退货详情
     * @param code
     * @return 
     * @create: 2016年7月21日 下午5:59:05 XIANDONG
     * @history:
     */
    public Object goodsDteail(String code);
    
    public Object producerAdd(String loginName, String mobile, String idKind, 
    		String idNo, String realName, String userReferee, String pdf);
    
    public Object jiamengAdd(String loginName, String mobile, String idKind, 
    		String idNo, String realName, String userReferee, String pdf);
}
