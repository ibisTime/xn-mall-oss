package com.xnjr.app.res;

import org.apache.commons.lang3.StringUtils;

public class IsSuccessRes {
    // 是否成功
    private boolean isSuccess;

    public IsSuccessRes() {
    }

    public IsSuccessRes(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public IsSuccessRes(Long id) {
        boolean flag = false;
        if (id != null && id.longValue() != 0) {
            flag = true;
        }
        this.isSuccess = flag;
    }

    public IsSuccessRes(String code) {
        boolean flag = false;
        if (StringUtils.isNotBlank(code)) {
            flag = true;
        }
        this.isSuccess = flag;
    }

    public boolean getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
