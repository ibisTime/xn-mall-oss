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
import com.xnjr.app.security.req.XN805026Req;
import com.xnjr.app.security.req.XN805027Req;
import com.xnjr.app.security.res.XN805026Res;

/** 
 * @author: miyb 
 * @since: 2015-5-14 上午10:23:11 
 * @history:
 */
@Service
public class MenuRoleAOImpl implements IMenuRoleAO {

    @Override
    public List<XN805026Res> queryMenuList(String roleCode, String parentCode,
            String type, String kind) {
        XN805026Req req = new XN805026Req();
        req.setRoleCode(roleCode);
        req.setParentCode(parentCode);
        req.setType(type);
        String jsonStr = BizConnecter.getBizData("805026",
            JsonUtils.object2Json(req));
        Gson gson = new Gson();
        List<XN805026Res> list = gson.fromJson(jsonStr,
            new TypeToken<List<XN805026Res>>() {
            }.getType());
        return list;
    }

    @Override
    public Object changeMenuRole(String roleCode, String[] menuCodeList,
            String updater) {
        XN805027Req req = new XN805027Req();
        req.setRoleCode(roleCode);
        List<String> list = new ArrayList<String>();
        for (int i = 0; i < menuCodeList.length; i++) {
            list.add(menuCodeList[i]);
        }
        req.setMenuCodeList(list);
        req.setUpdater(updater);
        return BizConnecter.getBizData("805027", JsonUtils.object2Json(req),
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
        List<XN805026Res> list = null;
        if (false == isGetChild) {
            return this.queryMenuList(roleCode, parentCode, type, "");
        } else {
            list = this.queryMenuList(roleCode, null, type, "");
            List<XN805026Res> cList = new ArrayList<XN805026Res>();
            List<XN805026Res> resList = new ArrayList<XN805026Res>();
            for (XN805026Res res : list) {
                if (res.getParentCode().equals(parentCode)
                        && res.getType().equals(type)) {
                    cList.add(res);
                    resList.add(res);
                }
            }
            for (XN805026Res res : cList) {
                for (XN805026Res result : list) {
                    if (res.getCode().equals(result.getParentCode())) {
                        resList.add(result);
                    }
                }
            }
            return resList;
        }
    }
}
