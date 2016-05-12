package com.xnjr.app.general.ao;

public interface ISystemAO {
    
    public Object querySystemLog(String table, String operateType,
            String operater, String operateDatetimeStart, String operateDatetimeEnd, 
            String start, String limit, String orderDir, String orderColoum);
    
    public Object addSystemParam(String key, String value, String note, String updater, String remark);
    
    public Object editSystemParam(String id, String value, String note, String updater, String remark);
    
    public Object querySystemParamPage(String key, String start, String limit, String orderColumn, String orderDir);
    
    public Object querySystemParamDetail(String id);
}
