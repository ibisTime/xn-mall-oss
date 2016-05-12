/**
 * @Title PageReq.java 
 * @Package com.ibis.account.dto.req 
 * @Description 
 * @author miyb  
 * @date 2015-5-7 上午10:23:31 
 * @version V1.0   
 */
package com.xnjr.app.req;

import java.io.Serializable;

/** 
 * @author: miyb 
 * @since: 2015-5-7 上午10:23:31 
 * @history:
 */
public abstract class APageReq implements Serializable {
    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = 9192316630188356600L;

    // 创建起始时间(YYYY-MM-DD)(选填)
    private String dateStart;

    // 创建终止时间(YYYY-MM-DD)(选填)
    private String dateEnd;

    // 第几页-1(必填)
    private String start;

    // 每页行数(必填)
    private String limit;

    // 分页字段(选填)
    private String orderColumn;

    // 分页方向(选填)
    private String orderDir;

    public String getDateStart() {
        return dateStart;
    }

    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getLimit() {
        return limit;
    }

    public void setLimit(String limit) {
        this.limit = limit;
    }

    public String getOrderColumn() {
        return orderColumn;
    }

    public void setOrderColumn(String orderColumn) {
        this.orderColumn = orderColumn;
    }

    public String getOrderDir() {
        return orderDir;
    }

    public void setOrderDir(String orderDir) {
        this.orderDir = orderDir;
    }

}
