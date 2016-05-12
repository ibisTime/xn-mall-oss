package com.xnjr.app.enums;

public enum EUserStatus {
    OK("1", "正常"), BLOCK("0", "注销");

    EUserStatus(String code, String value) {
        this.code = code;
        this.value = value;
    }

    private String code;

    private String value;

    public String getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }
}
