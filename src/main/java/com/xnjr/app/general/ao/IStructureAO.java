package com.xnjr.app.general.ao;

public interface IStructureAO {
    public Object addStructure(String name, String status, String summary,
            String description, String updater, String remark);

    public Object dropStructure(String code);

    public Object editStructure(String code, String name, String summary,
            String description, String updater, String remark, String status);

    public Object getStructure(String code);

    public Object queryStructureList(String name, String status);

    public Object queryStructurePage(String name, String status, String start,
            String limit, String orderColumn, String orderDir);
}
