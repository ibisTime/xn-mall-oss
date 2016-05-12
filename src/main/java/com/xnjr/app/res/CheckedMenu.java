package com.xnjr.app.res;

public class CheckedMenu {
    // 节点
    public String id;

    // 父节点
    public String pid;

    // 名称
    public String text;

    // 是否选中
    public boolean ischecked;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isIschecked() {
        return ischecked;
    }

    public void setIschecked(boolean ischecked) {
        this.ischecked = ischecked;
    }

}
