package com.xnjr.app.general.ao;

import java.util.List;

import com.xnjr.app.res.XNlh5014Res;

public interface IDictAO {
    public Object addDict(String type, String parentKey, String dkey,
            String dvalue, String updater, String remark);

    public Object dropDict(String id);

    public Object editDict(String id, String dvalue, String updater, String remark);
    
    public List<XNlh5014Res> queryDictList(String type, String parentKey, String dkey);

    public List<XNlh5014Res> queryDictList(String type, String parentKey, String dkey,
            String orderColumn, String orderDir);

    public Object queryDictPage(String type, String parentKey, String dkey,
            String start, String limit, String orderColumn, String orderDir);
    
    public Object queryDictDetail(String id);
}
