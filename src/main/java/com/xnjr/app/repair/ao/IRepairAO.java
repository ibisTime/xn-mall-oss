package com.xnjr.app.repair.ao;

public interface IRepairAO {

    /**
     * 维修单分页查询
     * @param code
     * @param goodsCode
     * @param userId
     * @param applyUser
     * @param status
     * @param updater
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2016年6月1日 下午12:14:52 wu
     * @history:
     */
    public Object queryRepairPage(String code, String goodsCode, String userId,
            String applyUser, String status, String updater, String start,
            String limit, String orderColumn, String orderDir);

    /**
     * 维修单详情查询
     * @param code
     * @return 
     * @create: 2016年6月1日 下午12:15:37 wu
     * @history:
     */
    public Object queryRepairDetailPage(String code);

    /**
     * 维修单处理
     * @param code
     * @param checkResult
     * @param checkUser
     * @param remark
     * @return 
     * @create: 2016年6月1日 下午12:16:52 wu
     * @history:
     */
    public Object repairDeal(String code, String checkResult, String checkUser,
            String remark);

}
