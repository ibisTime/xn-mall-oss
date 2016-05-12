package com.xnjr.app.req;

public class XNlh5013Req {
	
	private String type;
	private String parentKey;
	private String dkey;
	private String start;
	private String limit;
	private String orderColumn;
	private String orderDir;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getParentKey() {
		return parentKey;
	}
	public void setParentKey(String parentKey) {
		this.parentKey = parentKey;
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
	public String getDkey() {
		return dkey;
	}
	public void setDkey(String dkey) {
		this.dkey = dkey;
	}
	
}
