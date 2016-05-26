package com.xnjr.app.product.req;

/**
 * 取消订单
 * @author: XIANDONG 
 * @since: 2016年5月26日 上午11:07:16 
 * @history:
 */
public class XN602022Req {

    // 编号（必填）
    private String code;

    // 取消说明（必填）
    private String applyNote;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getApplyNote() {
        return applyNote;
    }

    public void setApplyNote(String applyNote) {
        this.applyNote = applyNote;
    }

}
