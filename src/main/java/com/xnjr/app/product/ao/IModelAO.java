package com.xnjr.app.product.ao;

import java.util.List;

import com.xnjr.app.product.req.ModelSpecs;
import com.xnjr.app.res.XN602026Res;

/**
 * @author: XIANDONG 
 * @since: 2016年4月20日 上午11:40:19 
 * @history:
 */
public interface IModelAO {

    /**
     * 新增型号
     * @param productCode
     * @param name
     * @param pic1
     * @param pic2
     * @param pic3
     * @param description
     * @param specsList
     * @param updater
     * @return 
     * @create: 2016年5月23日 上午11:17:21 XIANDONG
     * @history:
     */
    public Object addModel(String productCode, String name, String pic1,
            String pic2, String pic3, String description,
            List<ModelSpecs> modelSpecsList, String updater);

    /**
     * 修改型号
     * @param code
     * @param productCode
     * @param name
     * @param pic1
     * @param pic2
     * @param pic3
     * @param description
     * @param specsList
     * @param updater
     * @return 
     * @create: 2016年5月23日 上午11:17:58 XIANDONG
     * @history:
     */
    public Object editModel(String code, String productCode, String name,
            String pic1, String pic2, String pic3, String description,
            List<ModelSpecs> modelSpecsList, String updater);

    /**
     * 审核型号
     * @param code
     * @param checkUser
     * @param checkResult
     * @param checkNote
     * @return 
     * @create: 2016年5月23日 上午11:20:08 XIANDONG
     * @history:
     */
    public Object checkModel(String code, String checkUser, String checkResult,
            String checkNote);

    /**
     * 上架/下架型号
     * @param code
     * @param checkUser
     * @param checkResult
     * @param checkNote
     * @return 
     * @create: 2016年5月23日 上午11:21:54 XIANDONG
     * @history:
     */
    public Object updownModel(String code, String checkUser, String checkResult,
            String checkNote);

    /**
     * 分页查询型号
     * @param code
     * @param productCode
     * @param name
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2016年5月23日 上午10:44:07 XIANDONG
     * @history:
     */
    public Object queryModelPage(String code, String name, String status,
            String productCode, String start, String limit, String orderColumn,
            String orderDir);

    /**
     * 列表查询型号
     * @param code
     * @param productCode
     * @param name
     * @return 
     * @create: 2016年5月23日 上午10:44:49 XIANDONG
     * @history:
     */
    public Object queryMOdelList(String code, String name, String status,
            String productCode);

    /**
     * 型号详情
     * @param code
     * @return 
     * @create: 2016年5月23日 上午10:45:36 XIANDONG
     * @history:
     */

    public Object detailModel(String code);

    /**
     * 购买引导新增
     * @param modelCode
     * @param originalPrice
     * @param discountPrice
     * @param toLevel
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年5月23日 上午11:33:18 XIANDONG
     * @history:
     */
    public Object shopLeadadd(String modelCode, String originalPrice,
            String discountPrice, String toLevel, String updater,
            String remark);

    /**
     * 购买引导修改
     * @param code
     * @param modelCode
     * @param originalPrice
     * @param discountPrice
     * @param toLevel
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年5月23日 上午11:34:04 XIANDONG
     * @history:
     */
    public Object shopLeadedit(String code, String modelCode,
            String originalPrice, String discountPrice, String toLevel,
            String updater, String remark);

    /**
     * 购物车引导分页查询
     * @param code
     * @param modelCode
     * @param toLevel
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2016年5月25日 上午11:40:46 wu
     * @history:
     */
    public Object shopCarPage(String code, String modelCode, String toLevel,
            String start, String limit, String orderColumn, String orderDir);

    /**
     * 购物车引导列表查询     
     * @param code
     * @param modelCode
     * @param toLevel
     * @return 
     * @create: 2016年5月25日 上午11:42:55 wu
     * @history:
     */
    public Object shopCarList(String code, String modelCode, String toLevel);

    /**
     * 购物车引导详情查询 
     * @param code
     * @return 
     * @create: 2016年5月25日 上午11:43:52 wu
     * @history:
     */
    public Object shopCarDetail(String code);

    /**
     * 购物车型号分页查询
     * @param userId
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2016年5月23日 上午11:36:02 XIANDONG
     * @history:
     */
    // public Object shopModelPage(String userId, String start, String limit,
    // String orderColumn, String orderDir);

    /**
     * 发货确认
     * @param code
     * @param approveUser
     * @param approveNote
     * @return 
     * @create: 2016年5月25日 上午11:47:56 wu
     * @history:
     */
    public Object shipping(String code, String approveUser, String approveNote);

    /**
     * 订单分页查询
     * @param applyUser
     * @param status
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2016年5月23日 上午11:38:30 XIANDONG
     * @history:
     */
    public Object queryOrderPage(String code, String applyUser,
            String loginName, String status, String isSecondPay,
            String dateStart, String dateEnd, String start, String limit,
            String orderColumn, String orderDir);

    /**
     * 订单列表查询
     * @param applyUser
     * @param status
     * @return 
     * @create: 2016年5月23日 上午11:39:32 XIANDONG
     * @history:
     */
    public Object queryOrderList(String applyUser, String status);

    /**
     * 订单详情查询
     * @param invoiceCode
     * @return 
     * @create: 2016年5月23日 上午11:40:10 XIANDONG
     * @history:
     */
    public Object detailOrder(String invoiceCode);

    /**
     * 导出列表
     * @param loginName
     * @param status
     * @return 
     * @create: 2016年5月26日 下午4:50:05 XIANDONG
     * @history:
     */
    List<XN602026Res> exportList(String loginName, String status);

    /**
     * 取消订单
     * @param code
     * @param approveUser
     * @param approveNote
     * @return 
     * @create: 2016年5月26日 下午5:04:38 XIANDONG
     * @history:
     */
    public Object cancelOrder(String code, String approveUser,
            String approveNote);

    /**
     * 确认支付订单
     * @param code
     * @param approveUser
     * @param approveNote
     * @return 
     * @create: 2016年6月1日 下午11:15:19 XIANDONG
     * @history:
     */

    Object sureOrder(String code, String amount, String fromType,
            String fromCode, String pdf, String toCardNo, String approveUser,
            String approveNote);
}
