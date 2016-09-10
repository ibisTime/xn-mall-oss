package com.xnjr.app.account.ao.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xnjr.app.account.ao.IAccountAO;
import com.xnjr.app.account.req.XN602030Req;
import com.xnjr.app.account.req.XN602400Req;
import com.xnjr.app.account.req.XN602401Req;
import com.xnjr.app.account.req.XN602402Req;
import com.xnjr.app.account.req.XN602403Req;
import com.xnjr.app.account.req.XN602404Req;
import com.xnjr.app.account.req.XN602405Req;
import com.xnjr.app.account.req.XN602600Req;
import com.xnjr.app.account.req.XN602620Req;
import com.xnjr.app.account.req.XN602622Req;
import com.xnjr.app.account.req.XN602623Req;
import com.xnjr.app.account.req.XN602627Req;
import com.xnjr.app.account.req.XN602628Req;
import com.xnjr.app.account.req.XN602629Req;
import com.xnjr.app.account.req.XN802010Req;
import com.xnjr.app.account.req.XN802011Req;
import com.xnjr.app.account.req.XN802020Req;
import com.xnjr.app.account.req.XN802030Req;
import com.xnjr.app.account.req.XN802100Req;
import com.xnjr.app.account.req.XN802110Req;
import com.xnjr.app.account.req.XN802120Req;
import com.xnjr.app.account.req.XN802121Req;
import com.xnjr.app.account.req.XN802200Req;
import com.xnjr.app.account.req.XN802210Req;
import com.xnjr.app.account.req.XN802212Req;
import com.xnjr.app.account.req.XN802213Req;
import com.xnjr.app.account.req.XN802220Req;
import com.xnjr.app.account.req.XN802222Req;
import com.xnjr.app.account.req.XN802223Req;
import com.xnjr.app.account.req.XN802300Req;
import com.xnjr.app.account.req.XN802310Req;
import com.xnjr.app.account.req.XN802700Req;
import com.xnjr.app.account.req.XN802710Req;
import com.xnjr.app.account.req.XN802711Req;
import com.xnjr.app.account.req.XN802720Req;
import com.xnjr.app.account.req.XN802721Req;
import com.xnjr.app.general.ao.IDictAO;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.util.UploadUtil;

@Service
public class AccountAOImpl implements IAccountAO {
    @Autowired
    protected IDictAO dataDicAO;

    @Override
    public Object queryAccountPage(String accountNumber, String status,
            String type, String userId, String realName, String dateStart,
            String dateEnd, String start, String limit) {
        XN802010Req req = new XN802010Req();
        req.setAccountNumber(accountNumber);
        req.setStatus(status);
        req.setType(type);
        req.setUserId(userId);
        req.setRealName(realName);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("802010", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryAJourPage(String mobile, String accountNumber, String ajNo, String currency,
            String status, String bizType, String refNo, String workDate,
            String checkUser, String dateStart, String dateEnd, String start,
            String limit) {
        XN802020Req req = new XN802020Req();
        req.setMobile(mobile);
        req.setAccountNumber(accountNumber);
        req.setAjNo(ajNo);
        req.setCurrency(currency);
        req.setStatus(status);
        req.setBizType(bizType);
        req.setRefNo(refNo);
        req.setWorkDate(workDate);
        req.setCheckUser(checkUser);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("802020", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryFrozenAccountPag(String accountNumber, String ajNo,
            String status, String bizType, String refNo, String dateStart,
            String dateEnd, String start, String limit) {
        XN802030Req req = new XN802030Req();
        req.setAccountNumber(accountNumber);
        req.setAjNo(ajNo);
        req.setStatus(status);
        req.setBizType(bizType);
        req.setRefNo(refNo);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("802030", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryRechargeOrderPage(String mobile, String currency, String fromAccountNumber,
            String accountNumber, String code, String fromType, String fromCode,
            String channel, String refNo, String status, String approveUser,
            String dateStart, String dateEnd, String start, String limit) {
        XN802100Req req = new XN802100Req();
        req.setMobile(mobile);
        req.setCurrency(currency);
        req.setFromAccountNumber(fromAccountNumber);
        req.setAccountNumber(accountNumber);
        req.setCode(code);
        req.setFromType(fromType);
        req.setFromCode(fromCode);
        req.setChannel(channel);
        req.setRefNo(refNo);
        req.setStatus(status);
        req.setApproveUser(approveUser);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("802100", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object jfRecharge(String fromUserId, String toUserId, String amount,
            String price, String type, String pdf, String applyUser, String applyNote) {
        XN802120Req req = new XN802120Req();
        req.setFromUserId(fromUserId);
        req.setToUserId(toUserId);
        req.setAmount(amount);
        req.setPrice(price);
        req.setType(type);
        req.setPdf(pdf);
        req.setApplyUser(applyUser);
        req.setApplyNote(applyNote);
        return BizConnecter.getBizData("802120", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object approveRecharge(String chargeNo, String approveUser,
            String approveResult, String approveNote) {
        XN802121Req req = new XN802121Req();
        req.setChargeNo(chargeNo);
        req.setApproveUser(approveUser);
        req.setApproveResult(approveResult);
        req.setApproveNote(approveNote);
        return BizConnecter.getBizData("802121", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryWithdrawOrderPage(String mobile, String currency, String fromAccountNumber, String accountNumber, String code,
            String toType, String toCode, String channel, String refNo,
            String status, String approveUser, String payUser, String dateStart,
            String dateEnd, String start, String limit) {
        XN802200Req req = new XN802200Req();
        req.setMobile(mobile);
        req.setCurrency(currency);
        req.setFromAccountNumber(fromAccountNumber);
        req.setAccountNumber(accountNumber);
        req.setCode(code);
        req.setToType(toType);
        req.setToCode(toCode);
        req.setChannel(channel);
        req.setRefNo(refNo);
        req.setStatus(status);
        req.setApproveUser(approveUser);
        req.setPayUser(payUser);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("802200", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object agentWithdrawCash(String toBelong, String accountNumber,
            String amount, String toType, String toCode) {
        XN802210Req req = new XN802210Req();
        req.setToBelong(toBelong);
        req.setAccountNumber(accountNumber);
        req.setAmount(amount);
        req.setToType(toType);
        req.setToCode(toCode);
        return BizConnecter.getBizData("802210", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object approveWithdrawOrder(String withdrawNo, String approveUser,
            String approveResult, String approveNote) {
        XN802212Req req = new XN802212Req();
        req.setWithdrawNo(withdrawNo);
        req.setApproveUser(approveUser);
        req.setApproveResult(approveResult);
        req.setApproveNote(approveNote);
        return BizConnecter.getBizData("802212", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object payWithdrawOrder(String withdrawNo, String payUser,
            String payResult, String payNote, String refNo, String fee) {
        XN802213Req req = new XN802213Req();
        req.setWithdrawNo(withdrawNo);
        req.setPayUser(payUser);
        req.setPayResult(payResult);
        req.setPayNote(payNote);
        req.setRefNo(refNo);
        req.setFee(fee);
        return BizConnecter.getBizData("802213", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryTurnOutListPage(String code, String direction,
            String accountNumber, String dateStart, String dateEnd,
            String start, String limit) {
        XN802300Req req = new XN802300Req();
        req.setCode(code);
        req.setDirection(direction);
        req.setAccountNumber(accountNumber);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("802300", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object transfer(String accountNumber, String direction,
            String amount, String fee, String remark) {
        XN802310Req req = new XN802310Req();
        req.setAccountNumber(accountNumber);
        req.setDirection(direction);
        req.setAmount(amount);
        req.setFee(fee);
        req.setRemark(remark);
        return BizConnecter.getBizData("802310", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryRedBlueOrderPage(String code, String mobile, String direction,
            String status, String applyUser, String approveUser,
            String accountNumber, String dateStart, String dateEnd,
            String start, String limit) {
        XN802700Req req = new XN802700Req();
        req.setCode(code);
        req.setMobile(mobile);
        req.setDirection(direction);
        req.setStatus(status);
        req.setApplyUser(applyUser);
        req.setApproveUser(approveUser);
        req.setAccountNumber(accountNumber);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("802700", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object artificialAccountApply(String accountNumber, String direction,
            String amount, String applyUser, String applyNote) {
        XN802710Req req = new XN802710Req();
        req.setAccountNumber(accountNumber);
        req.setDirection(direction);
        req.setAmount(amount);
        req.setApplyUser(applyUser);
        req.setApplyNote(applyNote);
        return BizConnecter.getBizData("802710", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object artificialApproveCheck(String code, String approveUser,
            String approveResult, String approveNote) {
        XN802711Req req = new XN802711Req();
        req.setCode(code);
        req.setApproveUser(approveUser);
        req.setApproveResult(approveResult);
        req.setApproveNote(approveNote);
        return BizConnecter.getBizData("802711", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object checkInput(String ajNo, String checkUser, String amount) {
        XN802720Req req = new XN802720Req();
        req.setAjNo(ajNo);
        req.setCheckUser(checkUser);
        req.setAmount(amount);
        return BizConnecter.getBizData("802720", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object checkApprove(String code, String approveUser,
            String approveResult, String approveNote) {
        XN802721Req req = new XN802721Req();
        req.setCode(code);
        req.setApproveUser(approveUser);
        req.setApproveResult(approveResult);
        req.setApproveNote(approveNote);
        return BizConnecter.getBizData("802721", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object addaccount(String companyCode, String subbranch,
            String cardNo, String status, String updater, String remark) {
        XN602400Req req = new XN602400Req();
        req.setCompanyCode(companyCode);
        req.setSubbranch(subbranch);
        req.setCardNo(cardNo);
        req.setStatus(status);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("602400", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object editaccount(String code, String companyCode, String subbranch,
            String cardNo, String status, String updater, String remark) {
        XN602402Req req = new XN602402Req();
        req.setCode(code);
        req.setCompanyCode(companyCode);
        req.setSubbranch(subbranch);
        req.setCardNo(cardNo);
        req.setStatus(status);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("602402", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object dropaccount(String code) {
        XN602401Req req = new XN602401Req();
        req.setCode(code);
        return BizConnecter.getBizData("602401", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryaccountPage(String companyCode, String subbranch,
            String cardNo, String status, String start, String limit) {
        XN602403Req req = new XN602403Req();
        req.setCompanyCode(companyCode);
        req.setSubbranch(subbranch);
        req.setCardNo(cardNo);
        req.setStatus(status);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("602403", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryaccountList(String companyCode, String subbranch,
            String cardNo, String status) {
        XN602404Req req = new XN602404Req();
        req.setCompanyCode(companyCode);
        req.setSubbranch(subbranch);
        req.setCardNo(cardNo);
        req.setStatus(status);
        return BizConnecter.getBizData("602404", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object detailaccount(String code) {
        XN602405Req req = new XN602405Req();
        req.setCode(code);
        return BizConnecter.getBizData("602405", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object payaccount(String code, String amount, String fromType,
            String fromCode, String pdf, String toCardNo, String remark) {
        XN602030Req req = new XN602030Req();
        req.setCode(code);
        req.setAmount(amount);
        req.setFromType(fromType);
        req.setFromCode(fromCode);
        req.setPdf(UploadUtil.uploadPicture(pdf));
        req.setToCardNo(toCardNo);
        req.setRemark(remark);
        return BizConnecter.getBizData("602030", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object detailsystemaccount(String accountNumber) {
        XN802011Req req = new XN802011Req();
        req.setAccountNumber(accountNumber);
        return BizConnecter.getBizData("802011", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object inciseScore(String userId, String quantity, String price,
            String isApprove, String remark) {
        XN602620Req req = new XN602620Req();
        req.setUserId(userId);
        req.setQuantity(quantity);
        req.setPrice(price);
        req.setIsApprove(isApprove);
        req.setRemark(remark);
        return BizConnecter.getBizData("602620", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object inciseScorePage(String userId, String isApprove,
            String status, String start, String limit) {
        XN602627Req req = new XN602627Req();
        req.setUserId(userId);
        req.setIsApprove(isApprove);
        req.setStatus(status);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("602627", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object inciseScoreList(String userId, String isApprove,
            String status) {
        XN602628Req req = new XN602628Req();
        req.setUserId(userId);
        req.setIsApprove(isApprove);
        req.setStatus(status);
        return BizConnecter.getBizData("602628", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object inciseScoreDetail(String code) {
        XN602629Req req = new XN602629Req();
        req.setCode(code);
        return BizConnecter.getBizData("602629", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object erweiScore(String userId, String integralCode) {
        XN602623Req req = new XN602623Req();
        req.setUserId(userId);
        req.setIntegralCode(integralCode);
        return BizConnecter.getBizData("602623", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object updownScore(String integralCode, String updater,
            String updateResult, String remark) {
        XN602622Req req = new XN602622Req();
        req.setIntegralCode(integralCode);
        req.setUpdater(updater);
        req.setUpdateResult(updateResult);
        req.setRemark(remark);
        return BizConnecter.getBizData("602622", JsonUtils.object2Json(req),
            Object.class);
    }

    // @Override
    // public Object buyScore(String userId, String integralCode) {
    // XN602106Req req = new XN602106Req();
    // req.setUserId(userId);
    // req.setIntegralCode(integralCode);
    // return BizConnecter.getBizData("602106", JsonUtils.object2Json(req),
    // Object.class);
    // }
    //
    // @Override
    // public Object shixiaoScore(String integralCode, String updater,
    // String remark) {
    // XN602107Req req = new XN602107Req();
    // req.setIntegralCode(integralCode);
    // req.setUpdater(updater);
    // req.setRemark(remark);
    // return BizConnecter.getBizData("602107", JsonUtils.object2Json(req),
    // Object.class);
    // }
    
     @Override
     public Object duixian(String fromUserId, String toUserId, String amount,
     String price, String type, String applyUser) {
     XN802220Req req = new XN802220Req();
     req.setFromUserId(fromUserId);
     req.setToUserId(toUserId);
     req.setAmount(amount);
     req.setPrice(price);
     req.setType(type);
     req.setApplyUser(applyUser);
     return BizConnecter.getBizData("802220", JsonUtils.object2Json(req),
     Object.class);
     }
    
     @Override
     public Object checkduixian(String withdrawNo, String approveUser,
     String approveResult, String approveNote) {
     XN802222Req req = new XN802222Req();
     req.setWithdrawNo(withdrawNo);
     req.setApproveUser(approveUser);
     req.setApproveResult(approveResult);
     req.setApproveNote(approveNote);
     return BizConnecter.getBizData("802222", JsonUtils.object2Json(req),
     Object.class);
     }
    
     @Override
     public Object payduixian(String withdrawNo, String payUser,
     String payResult, String payNote, String refNo, String fee) {
     XN802223Req req = new XN802223Req();
     req.setWithdrawNo(withdrawNo);
     req.setPayUser(payUser);
     req.setPayResult(payResult);
     req.setPayNote(payNote);
     req.setRefNo(refNo);
     req.setFee(fee);
     return BizConnecter.getBizData("802223", JsonUtils.object2Json(req),
     Object.class);
     }

    @Override
    public Object delScore(String code) {
        return BizConnecter.getBizData("602621",
            JsonUtils.string2Json("code", code), Object.class);
    }

    @Override
    public Object scorerAdd(String loginName, String mobile, String idKind,
            String idNo, String realName, String userReferee, String pdf) {
        XN602600Req req = new XN602600Req();
        req.setLoginName(loginName);
        req.setMobile(mobile);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        req.setRealName(realName);
        req.setUserReferee(userReferee);
        if (StringUtils.isNotBlank(pdf)) {
            req.setPdf(UploadUtil.uploadPicture(pdf));
        }
        return BizConnecter.getBizData("602600", JsonUtils.object2Json(req),
            Object.class);
    }

	@Override
	public Object RMBRecharge(String accountNumber, String amount,
			String fromType, String fromCode) {
		XN802110Req req = new XN802110Req();
		req.setAccountNumber(accountNumber);
		req.setAmount(amount);
		req.setFromCode(fromCode);
		req.setFromType(fromType);
		return BizConnecter.getBizData("802110", JsonUtils.object2Json(req),
	            Object.class);
	}
}
