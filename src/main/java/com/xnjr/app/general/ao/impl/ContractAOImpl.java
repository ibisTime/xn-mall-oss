package com.xnjr.app.general.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.app.exception.BizException;
import com.xnjr.app.general.ao.IContractAO;
import com.xnjr.app.general.req.XNlh5040Req;
import com.xnjr.app.general.req.XNlh5041Req;
import com.xnjr.app.general.req.XNlh5042Req;
import com.xnjr.app.general.req.XNlh5043Req;
import com.xnjr.app.general.req.XNlh5044Req;
import com.xnjr.app.general.req.XNlh5045Req;
import com.xnjr.app.general.res.XNlh5041Res;
import com.xnjr.app.general.res.XNlh5042Res;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.res.Page;

@Service
public class ContractAOImpl implements IContractAO {
    @Override
    public Object addContractTemplate(String title, String content,
            String type, String status, String updater, String remark) {
        if (StringUtils.isBlank(title)) {
            throw new BizException("XNlh0000", "合同标题不能为空");
        }
        if (StringUtils.isBlank(content)) {
            throw new BizException("XNlh0000", "合同内容不能为空");
        }
        if (StringUtils.isBlank(type)) {
            throw new BizException("XNlh0000", "合同类型不能为空");
        }
        if (StringUtils.isBlank(status)) {
            throw new BizException("XNlh0000", "合同状态不能为空");
        }
        XNlh5040Req xnlh5040Req = new XNlh5040Req();
        xnlh5040Req.setTitle(title);
        xnlh5040Req.setContent(content);
        xnlh5040Req.setType(type);
        xnlh5040Req.setStatus(status);
        xnlh5040Req.setUpdater(updater);
        xnlh5040Req.setRemark(remark);
        return BizConnecter.getBizData("lh5040",
            JsonUtils.object2Json(xnlh5040Req), Object.class);
    }

    @Override
    public boolean deleteContractTemplate(String id) {
        if (StringUtils.isBlank(id)) {
            throw new BizException("XNlh0000", "合同编号不能为空");
        }
        XNlh5041Req xnlh5041Req = new XNlh5041Req();
        xnlh5041Req.setId(id);
        return BizConnecter.getBizData("lh5041",
            JsonUtils.object2Json(xnlh5041Req), XNlh5041Res.class).isSuccess();
    }

    @Override
    public boolean editContractTemplate(String id, String title,
            String content, String type, String status, String updater,
            String remark) {
        if (StringUtils.isBlank(id)) {
            throw new BizException("XNlh0000", "合同编号不能为空");
        }
        if (StringUtils.isBlank(title)) {
            throw new BizException("XNlh0000", "合同标题不能为空");
        }
        if (StringUtils.isBlank(content)) {
            throw new BizException("XNlh0000", "合同内容不能为空");
        }
        if (StringUtils.isBlank(type)) {
            throw new BizException("XNlh0000", "合同类型不能为空");
        }
        if (StringUtils.isBlank(status)) {
            throw new BizException("XNlh0000", "合同状态不能为空");
        }
        XNlh5042Req xnlh5042Req = new XNlh5042Req();
        xnlh5042Req.setId(id);
        xnlh5042Req.setTitle(title);
        xnlh5042Req.setContent(content);
        xnlh5042Req.setType(type);
        xnlh5042Req.setStatus(status);
        xnlh5042Req.setUpdater(updater);
        xnlh5042Req.setRemark(remark);
        return BizConnecter.getBizData("lh5042",
            JsonUtils.object2Json(xnlh5042Req), XNlh5042Res.class).isSuccess();

    }

    @Override
    public Object queryContractTemplateList(String title, String type,
            String status, String orderColumn, String orderDir) {
        XNlh5044Req xnlh5044Req = new XNlh5044Req();
        xnlh5044Req.setTitle(title);
        xnlh5044Req.setType(type);
        xnlh5044Req.setStatus(status);
        xnlh5044Req.setOrderColumn(orderColumn);
        xnlh5044Req.setOrderDir(orderDir);
        return BizConnecter.getBizData("lh5044",
            JsonUtils.object2Json(xnlh5044Req), Object.class);
    }

    @Override
    public Page queryContractTemplatePage(String title, String type,
            String status, String start, String limit, String orderColumn,
            String orderDir) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("XNlh0000", "start不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("XNlh0000", "limit不能为空");
        }
        XNlh5043Req xnlh5043Req = new XNlh5043Req();
        xnlh5043Req.setTitle(title);
        xnlh5043Req.setType(type);
        xnlh5043Req.setStatus(status);
        xnlh5043Req.setStart(start);
        xnlh5043Req.setLimit(limit);
        xnlh5043Req.setOrderColumn(orderColumn);
        xnlh5043Req.setOrderDir(orderDir);
        return BizConnecter.getBizData("lh5043",
            JsonUtils.object2Json(xnlh5043Req), Page.class);
    }

    @Override
    public Object getContractTemplate(String id) {
        XNlh5045Req req = new XNlh5045Req();
        req.setId(id);
        return BizConnecter.getBizData("lh5045", JsonUtils.object2Json(req),
            Object.class);
    }
}
