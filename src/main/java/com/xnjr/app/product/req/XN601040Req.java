package com.xnjr.app.product.req;

/** 
 * @author: xieyj 
 * @since: 2016年5月24日 上午9:13:00 
 * @history:
 */
public class XN601040Req {

	private String code;
    private String originalPrice;
    private String discountPrice;
    private String toLevel;
    private String toSite;
    private String updater;
    private String remark;
    
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getOriginalPrice() {
		return originalPrice;
	}
	public void setOriginalPrice(String originalPrice) {
		this.originalPrice = originalPrice;
	}
	public String getDiscountPrice() {
		return discountPrice;
	}
	public void setDiscountPrice(String discountPrice) {
		this.discountPrice = discountPrice;
	}
	public String getToLevel() {
		return toLevel;
	}
	public void setToLevel(String toLevel) {
		this.toLevel = toLevel;
	}
	public String getToSite() {
		return toSite;
	}
	public void setToSite(String toSite) {
		this.toSite = toSite;
	}
	public String getUpdater() {
		return updater;
	}
	public void setUpdater(String updater) {
		this.updater = updater;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
