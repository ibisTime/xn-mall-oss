package com.xnjr.app.logistics.req;

public class GoodsReq {

    // 型号编号(必填)
    private String modelCode;

    // 成本价(必填)
    private String costPrice;

    // 销售价(必填）
    private String salePrice;

    // 数量(必填）
    private String quantity;

	public String getModelCode() {
		return modelCode;
	}

	public void setModelCode(String modelCode) {
		this.modelCode = modelCode;
	}

	public String getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(String costPrice) {
		this.costPrice = costPrice;
	}

	public String getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(String salePrice) {
		this.salePrice = salePrice;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	

}
