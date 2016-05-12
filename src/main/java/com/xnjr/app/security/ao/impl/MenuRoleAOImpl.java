/**
 * @Title MenuRoleAOImpl.java 
 * @Package com.ibis.pz.ao.impl 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午10:23:11 
 * @version V1.0   
 */
package com.xnjr.app.security.ao.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.xnjr.app.exception.BizException;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.security.ao.IMenuRoleAO;
import com.xnjr.app.security.req.XNlh4020Req;
import com.xnjr.app.security.req.XNlh4021Req;
import com.xnjr.app.security.res.XNlh4020Res;

/** 
 * @author: miyb 
 * @since: 2015-5-14 上午10:23:11 
 * @history:
 */
@Service
public class MenuRoleAOImpl implements IMenuRoleAO {

    @Override
    public List<XNlh4020Res> queryMenuList(String roleCode, String parentCode,
            String type, String kind) {
        XNlh4020Req req = new XNlh4020Req();
        req.setRoleCode(roleCode);
        req.setParentCode(parentCode);
        req.setType(type);
        req.setKind(kind);
        String jsonStr = BizConnecter.getBizData("lh4020",
            JsonUtils.object2Json(req));
        Gson gson = new Gson();
        List<XNlh4020Res> list = gson.fromJson(jsonStr,
            new TypeToken<List<XNlh4020Res>>() {
            }.getType());
        return list;
    }

    @Override
    public Object changeMenuRole(String roleCode, String[] menuCodeList,
            String updater) {
        XNlh4021Req req = new XNlh4021Req();
        req.setRoleCode(roleCode);
        List<String> list = new ArrayList<String>();
        for (int i = 0; i < menuCodeList.length; i++) {
            list.add(menuCodeList[i]);
        }
        req.setMenuCodeList(list);
        req.setUpdater(updater);
        return BizConnecter.getBizData("lh4021", JsonUtils.object2Json(req),
            Object.class);
    }

    /** 
     * @see com.xnjr.app.security.ao.IMenuRoleAO#queryMenuList(java.lang.String, java.lang.String, java.lang.String, boolean)
     */
    @Override
    public Object queryMenuList(String roleCode, String parentCode,
            String type, boolean isGetChild) {
        if (StringUtils.isBlank(roleCode)) {
            throw new BizException("XN700001", "角色编号不能为空");
        }
        if (StringUtils.isBlank(parentCode)) {
            throw new BizException("XN700001", "父编号不能为空");
        }
        if (StringUtils.isBlank(type)) {
            throw new BizException("XN700001", "类型不能为空");
        }
        List<XNlh4020Res> list = null;
        if (false == isGetChild) {
            return this.queryMenuList(roleCode, parentCode, type, "");
        } else {
            list = this.queryMenuList(roleCode, null, type, "");
            List<XNlh4020Res> cList = new ArrayList<XNlh4020Res>();
            List<XNlh4020Res> resList = new ArrayList<XNlh4020Res>();
            for (XNlh4020Res res : list) {
                if (res.getParentCode().equals(parentCode)
                        && res.getType().equals(type)) {
                    cList.add(res);
                    resList.add(res);
                }
            }
            for (XNlh4020Res res : cList) {
                for (XNlh4020Res result : list) {
                    if (res.getCode().equals(result.getParentCode())) {
                        resList.add(result);
                    }
                }
            }
            return resList;
        }

    }
}
