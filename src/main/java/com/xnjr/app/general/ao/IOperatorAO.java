package com.xnjr.app.general.ao;

public interface IOperatorAO {
    /**
     * 增加
     * @param userId
     * @param mobile
     * @param level
     * @param photo
     * @param introduction
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月26日 上午11:39:29 haiqingzheng
     * @history:
     */
    public Object addOperator(String userId, String mobile, String level,
            String photo, String introduction, String updater, String remark);

    /**
     * 修改
     * @param userId
     * @param mobile
     * @param level
     * @param photo
     * @param introduction
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月26日 上午11:44:39 haiqingzheng
     * @history:
     */
    public Object editOperator(String userId, String mobile, String level,
            String photo, String introduction, String updater, String remark);

    /**
     * 列表
     * @param mobile
     * @param realName
     * @param level
     * @return 
     * @create: 2016年4月19日 下午4:23:24 XIANDONG
     * @history:
     */
    public Object queryOperatorList(String mobile, String realName, String level);

    /**
     * 分页
     * @param userId
     * @param mobile
     * @param realName
     * @param level
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2016年4月19日 下午4:23:31 XIANDONG
     * @history:
     */
    public Object queryOperatorPage(String mobile, String realName,
            String level, String start, String limit, String orderColumn,
            String orderDir);

    /**
     * 详情查询
     * @param userId
     * @return 
     * @create: 2016年4月19日 下午4:40:17 XIANDONG
     * @history:
     */
    public Object detailPage(String userId);

}
