package com.xnjr.app.account.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.app.account.ao.IUserAO;
import com.xnjr.app.account.req.XN805901Req;
import com.xnjr.app.account.res.XN805901Res;
import com.xnjr.app.exception.BizException;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;

/**
 * @author: xieyj 
 * @since: 2016年5月30日 上午9:28:30 
 * @history:
 */
@Service("fUserAO")
public class UserAOImpl implements IUserAO {

    /** 
     * @see com.xnjr.mall.bo.IUserBO#getRemoteUser(java.lang.String)
     */
    @Override
    public XN805901Res getRemoteUser(String tokenId, String userId) {
        XN805901Req req = new XN805901Req();
        req.setTokenId(tokenId);
        req.setUserId(userId);
        XN805901Res res = BizConnecter.getBizData("805901",
            JsonUtils.object2Json(req), XN805901Res.class);
        if (res == null
                || (res != null && StringUtils.isBlank(res.getLoginName()))) {
            throw new BizException("XN000000", "编号为" + userId + "的用户不存在");
        }
        return res;
    }
}
