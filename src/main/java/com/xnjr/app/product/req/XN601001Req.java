package com.xnjr.app.product.req;

/**
 * 修改产品
 * @author: wu 
 * @since: 2016年5月17日 上午11:52:53 
 * @history:
 */
public class XN601001Req {

    // 用户编号（必填）
    private String code;

    // 六方（必填）
    private String type;

    // 角色编号（必填）
    private String name;

    // 登录名（必填）
    private String advTitle;

    // 真实姓名（选填）
    private String advPic;

    // 推荐人（必填）
    private String majorPic;

    // 状态（必填）
    private String majorText;

    // 联系方式（必填）
    private String familyPic;

    // 更新人（必填）
    private String familyText;

    // 更新人（必填）
    private String highlightPic;

    // 更新人（必填）
    private String highlighText;

    // 更新人（必填）
    private String updater;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdvTitle() {
        return advTitle;
    }

    public void setAdvTitle(String advTitle) {
        this.advTitle = advTitle;
    }

    public String getAdvPic() {
        return advPic;
    }

    public void setAdvPic(String advPic) {
        this.advPic = advPic;
    }

    public String getMajorPic() {
        return majorPic;
    }

    public void setMajorPic(String majorPic) {
        this.majorPic = majorPic;
    }

    public String getMajorText() {
        return majorText;
    }

    public void setMajorText(String majorText) {
        this.majorText = majorText;
    }

    public String getFamilyPic() {
        return familyPic;
    }

    public void setFamilyPic(String familyPic) {
        this.familyPic = familyPic;
    }

    public String getFamilyText() {
        return familyText;
    }

    public void setFamilyText(String familyText) {
        this.familyText = familyText;
    }

    public String getHighlightPic() {
        return highlightPic;
    }

    public void setHighlightPic(String highlightPic) {
        this.highlightPic = highlightPic;
    }

    public String getHighlighText() {
        return highlighText;
    }

    public void setHighlighText(String highlighText) {
        this.highlighText = highlighText;
    }

    public String getUpdater() {
        return updater;
    }

    public void setUpdater(String updater) {
        this.updater = updater;
    }

}
