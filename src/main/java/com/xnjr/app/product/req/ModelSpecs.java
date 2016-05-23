/**
 * @Title Specs.java 
 * @Package com.xnjr.mall.domain 
 * @Description 
 * @author xieyj  
 * @date 2016年5月23日 上午8:34:26 
 * @version V1.0   
 */
package com.xnjr.app.product.req;

/** 
 * @author: xieyj 
 * @since: 2016年5月23日 上午8:34:26 
 * @history:
 */
public class ModelSpecs {

    // 编号
    private String code;

    // dkey
    private String dkey;

    // dvalue
    private String dvalue;

    // 序号
    private String orderNum;

    // 模型编号
    private String modelCode;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDkey() {
        return dkey;
    }

    public void setDkey(String dkey) {
        this.dkey = dkey;
    }

    public String getDvalue() {
        return dvalue;
    }

    public void setDvalue(String dvalue) {
        this.dvalue = dvalue;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }

    public String getModelCode() {
        return modelCode;
    }

    public void setModelCode(String modelCode) {
        this.modelCode = modelCode;
    }
}
