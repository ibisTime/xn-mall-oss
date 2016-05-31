package com.xnjr.app.account.ao;

import com.xnjr.app.account.res.XN805901Res;

public interface IUserAO {

    /**
     * 获取远程用户信息
     * @param tokenId
     * @param userId
     * @return 
     * @create: 2016年5月30日 下午3:00:44 xieyj
     * @history:
     */
    public XN805901Res getRemoteUser(String tokenId, String userId);
}
