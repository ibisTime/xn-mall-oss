package com.xnjr.app.general.ao;

import com.xnjr.app.res.Page;

public interface IContractAO {
    /**
     * 增加合同模板
     * @param title
     * @param content
     * @param type
     * @param status
     * @param updater
     * @param remark
     * @return 
     * @create: 2015年11月16日 上午11:01:05 jlxuu
     * @history:
     */
    public Object addContractTemplate(String title, String content,
            String type, String status, String updater, String remark);

    /**
     * 删除合同模板
     * @param id
     * @return 
     * @create: 2015年11月16日 上午11:01:34 jlxuu
     * @history:
     */
    public boolean deleteContractTemplate(String id);

    /**
     * 修改合同模板
     * @param id
     * @param title
     * @param content
     * @param type
     * @param status
     * @param updater
     * @param remark
     * @return 
     * @create: 2015年11月16日 上午11:01:55 jlxuu
     * @history:
     */
    public boolean editContractTemplate(String id, String title,
            String content, String type, String status, String updater,
            String remark);

    /**
     * 列表查询合同模板
     * @param id
     * @param title
     * @param type
     * @param status
     * @param creator
     * @param updater
     * @param dateStart
     * @param dateEnd
     * @return 
     * @create: 2015年11月16日 上午11:02:18 jlxuu
     * @history:
     */
    public Object queryContractTemplateList(String title, String type,
            String status, String orderColumn, String orderDir);

    /**
     * 分页查询合同模板
     * @param id
     * @param title
     * @param type
     * @param status
     * @param creator
     * @param updater
     * @param dateStart
     * @param dateEnd
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2015年11月16日 上午11:02:46 jlxuu
     * @history:
     */
    public Page queryContractTemplatePage(String title, String type,
            String status, String start, String limit, String orderColumn,
            String orderDir);

    /**
     * 详情查询合同模板
     * @param id
     * @return 
     * @create: 2016年4月28日 下午2:38:00 Gejin
     * @history:
     */
    public Object getContractTemplate(String id);
}
