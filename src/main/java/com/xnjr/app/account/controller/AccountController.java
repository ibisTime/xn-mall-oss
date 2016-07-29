package com.xnjr.app.account.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.account.ao.IAccountAO;
import com.xnjr.app.controller.BaseController;

@Controller
@RequestMapping(value = "/account")
public class AccountController extends BaseController {
    @Autowired
    IAccountAO accountAO;

    @RequestMapping(value = "/queryPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryAccountPage(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryAccountPage(accountNumber, status, type, userId,
            realName, dateStart, dateEnd, start, limit);
    }

    @RequestMapping(value = "/jourPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryAJourPage(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "ajNo", required = false) String ajNo,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "bizType", required = false) String bizType,
            @RequestParam(value = "refNo", required = false) String refNo,
            @RequestParam(value = "workDate", required = false) String workDate,
            @RequestParam(value = "checkUser", required = false) String checkUser,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryAJourPage(accountNumber, ajNo, status, bizType,
            refNo, workDate, checkUser, dateStart, dateEnd, start, limit);
    }

    @RequestMapping(value = "/frozenAccountPag", method = RequestMethod.GET)
    @ResponseBody
    public Object queryFrozenAccountPag(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "ajNo", required = false) String ajNo,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "bizType", required = false) String bizType,
            @RequestParam(value = "refNo", required = false) String refNo,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryFrozenAccountPag(accountNumber, ajNo, status,
            bizType, refNo, dateStart, dateEnd, start, limit);
    }

    @RequestMapping(value = "/applyRechargeOrderPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryApplyRechargeOrderPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "fromType", required = false) String fromType,
            @RequestParam(value = "fromCode", required = false) String fromCode,
            @RequestParam(value = "channel", required = false) String channel,
            @RequestParam(value = "refNo", required = false) String refNo,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryRechargeOrderPage(null,
            this.getSessionUser().getUserId(), code, fromType, fromCode,
            channel, refNo, status, approveUser, dateStart, dateEnd, start,
            limit);
    }

    @RequestMapping(value = "/rechargeOrderPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryRechargeOrderPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "fromType", required = false) String fromType,
            @RequestParam(value = "fromCode", required = false) String fromCode,
            @RequestParam(value = "channel", required = false) String channel,
            @RequestParam(value = "refNo", required = false) String refNo,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryRechargeOrderPage(
            this.getSessionUser().getUserId(), null, code, fromType, fromCode,
            channel, refNo, status, approveUser, dateStart, dateEnd, start,
            limit);
    }

    @RequestMapping(value = "/fromRecharge", method = RequestMethod.POST)
    @ResponseBody
    public Object fromRecharge(@RequestParam("fromUserId") String fromUserId,
            @RequestParam("amount") String amount,
            @RequestParam("price") String price,
            @RequestParam("type") String type,
            @RequestParam("pdf") String pdf,
            @RequestParam(value = "applyNote", required = false) String applyNote) {
        return accountAO.jfRecharge(fromUserId,
            this.getSessionUser().getUserId(), amount, price, type, pdf,
            this.getSessionUser().getUserId(), applyNote);
    }

    @RequestMapping(value = "/toRecharge", method = RequestMethod.POST)
    @ResponseBody
    public Object toRecharge(@RequestParam("toUserId") String toUserId,
            @RequestParam("amount") String amount,
            @RequestParam("price") String price,
            @RequestParam("type") String type,
            @RequestParam("pdf") String pdf,
            @RequestParam(value = "applyNote", required = false) String applyNote) {
        return accountAO.jfRecharge(this.getSessionUser().getUserId(), toUserId,
            amount, price, type, pdf, this.getSessionUser().getUserId(), applyNote);
    }

    @RequestMapping(value = "/approveRecharge", method = RequestMethod.POST)
    @ResponseBody
    public Object approveRecharge(
            @RequestParam(value = "chargeNo", required = false) String chargeNo,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.approveRecharge(chargeNo,
            this.getSessionUser().getUserId(), approveResult, approveNote);
    }

    @RequestMapping(value = "/withdrawOrderPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryWithdrawOrderPage(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "toType", required = false) String toType,
            @RequestParam(value = "toCode", required = false) String toCode,
            @RequestParam(value = "channel", required = false) String channel,
            @RequestParam(value = "refNo", required = false) String refNo,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "payUser", required = false) String payUser,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryWithdrawOrderPage(accountNumber, code, toType,
            toCode, channel, refNo, status, approveUser, payUser, dateStart,
            dateEnd, start, limit);
    }

    @RequestMapping(value = "/agentWithdraw", method = RequestMethod.POST)
    @ResponseBody
    public Object queryAgentWithdrawPage(
            @RequestParam(value = "toBelong", required = false) String toBelong,
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "amount", required = false) String amount,
            @RequestParam(value = "toType", required = false) String toType,
            @RequestParam(value = "toCode", required = false) String toCode) {
        return accountAO.agentWithdrawCash(toBelong, accountNumber, amount,
            toType, toCode);
    }

    @RequestMapping(value = "/approveWithdrawOrder", method = RequestMethod.POST)
    @ResponseBody
    public Object approveWithdrawOrder(
            @RequestParam(value = "withdrawNo", required = false) String withdrawNo,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.approveWithdrawOrder(withdrawNo,
            this.getSessionUser().getUserName(), approveResult, approveNote);
    }

    @RequestMapping(value = "/payWithdrawOrder", method = RequestMethod.POST)
    @ResponseBody
    public Object payWithdrawOrder(
            @RequestParam(value = "withdrawNo", required = false) String withdrawNo,
            @RequestParam(value = "payResult", required = false) String payResult,
            @RequestParam(value = "payNote", required = false) String payNote,
            @RequestParam(value = "refNo", required = false) String refNo,
            @RequestParam(value = "fee", required = false) String fee) {
        return accountAO.payWithdrawOrder(withdrawNo,
            this.getSessionUser().getUserName(), payResult, payNote, refNo,
            fee);
    }

    @RequestMapping(value = "/turnOutListPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryTurnOutListPage(
            @RequestParam(value = "toCode", required = false) String toCode,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryTurnOutListPage(toCode, direction, accountNumber,
            dateStart, dateEnd, start, limit);
    }

    @RequestMapping(value = "/transfer", method = RequestMethod.POST)
    @ResponseBody
    public Object transfer(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "amount", required = false) String amount,
            @RequestParam(value = "fee", required = false) String fee,
            @RequestParam(value = "remark", required = false) String remark) {
        return accountAO.transfer(accountNumber, direction, amount, fee,
            remark);
    }

    @RequestMapping(value = "/redBlueOrderPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryRedBlueOrderPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "applyUser", required = false) String applyUser,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryRedBlueOrderPage(code, direction, status,
            applyUser, approveUser, accountNumber, dateStart, dateEnd, start,
            limit);
    }

    @RequestMapping(value = "/artificialAccountApply", method = RequestMethod.POST)
    @ResponseBody
    public Object artificialAccountApply(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "amount", required = false) String amount,
            @RequestParam(value = "applyNote", required = false) String applyNote) {
        return accountAO.artificialAccountApply(accountNumber, direction,
            amount, this.getSessionUser().getUserName(), applyNote);
    }

    @RequestMapping(value = "/artificialApproveCheck", method = RequestMethod.POST)
    @ResponseBody
    public Object artificialApproveCheck(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.artificialApproveCheck(code,
            this.getSessionUser().getUserName(), approveResult, approveNote);
    }

    @RequestMapping(value = "/checkInput", method = RequestMethod.POST)
    @ResponseBody
    public Object checkInput(
            @RequestParam(value = "ajNo", required = false) String ajNo,
            @RequestParam(value = "amount", required = false) String amount) {
        return accountAO.checkInput(ajNo, this.getSessionUser().getUserName(),
            amount);
    }

    @RequestMapping(value = "/checkApprove", method = RequestMethod.POST)
    @ResponseBody
    public Object checkApprove(
            @RequestParam(value = "code", required = false) String code,
            // @RequestParam(value = "approveUser", required = false) String
            // approveUser,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.checkApprove(code, this.getSessionUser().getUserName(),
            approveResult, approveNote);
    }

    @RequestMapping(value = "/account/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addaccount(@RequestParam("companyCode") String companyCode,
            @RequestParam("subbranch") String subbranch,
            @RequestParam("cardNo") String cardNo,
            @RequestParam("status") String status,
            // @RequestParam("updater") String updater,
            @RequestParam(value = "remark", required = false) String remark) {
        return accountAO.addaccount(companyCode, subbranch, cardNo, status,
            this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/account/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editaccount(@RequestParam("code") String code,
            @RequestParam("companyCode") String companyCode,
            @RequestParam("subbranch") String subbranch,
            @RequestParam("cardNo") String cardNo,
            @RequestParam("status") String status,
            // @RequestParam("updater") String updater,
            @RequestParam(value = "remark", required = false) String remark) {
        return accountAO.editaccount(code, companyCode, subbranch, cardNo,
            status, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/datailaccount", method = RequestMethod.GET)
    @ResponseBody
    public Object detailaccount(@RequestParam("code") String code) {
        return accountAO.detailaccount(code);
    }

    @RequestMapping(value = "/datailsystemaccount", method = RequestMethod.GET)
    @ResponseBody
    public Object detailsystemaccount(
            @RequestParam("accountNumber") String accountNumber) {
        return accountAO.detailsystemaccount(accountNumber);
    }

    @RequestMapping(value = "/dropaccount", method = RequestMethod.POST)
    @ResponseBody
    public Object dropaccount(@RequestParam("code") String code) {
        return accountAO.dropaccount(code);
    }

    @RequestMapping(value = "/accountpage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryaccountPage(
            @RequestParam(value = "companyCode", required = false) String companyCode,
            @RequestParam(value = "subbranch", required = false) String subbranch,
            @RequestParam(value = "cardNo", required = false) String cardNo,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryaccountPage(companyCode, subbranch, cardNo,
            status, start, limit);
    }

    @RequestMapping(value = "/accountlist", method = RequestMethod.GET)
    @ResponseBody
    public Object queryaccountList(
            @RequestParam(value = "companyCode", required = false) String companyCode,
            @RequestParam(value = "subbranch", required = false) String subbranch,
            @RequestParam(value = "cardNo", required = false) String cardNo,
            @RequestParam(value = "status", required = false) String status) {
        return accountAO.queryaccountList(companyCode, subbranch, cardNo,
            status);
    }

    // 积分商入驻
    @RequestMapping(value = "/scorer/add", method = RequestMethod.POST)
    @ResponseBody
    public Object scorerAdd(@RequestParam(value = "loginName") String loginName,
            @RequestParam(value = "mobile") String mobile,
            @RequestParam(value = "idKind") String idKind,
            @RequestParam(value = "idNo") String idNo,
            @RequestParam(value = "realName") String realName,
            // @RequestParam(value = "userReferee") String userReferee,
            @RequestParam(value = "pdf", required = false) String pdf) {
        return accountAO.scorerAdd(loginName, mobile, idKind, idNo, realName,
            this.getSessionUser().getUserId(), pdf);
    }

    // 积分切割
    @RequestMapping(value = "/incise/score", method = RequestMethod.POST)
    @ResponseBody
    public Object inciseScore(@RequestParam(value = "quantity") String quantity,
            @RequestParam(value = "price") String price,
            @RequestParam(value = "isApprove") String isApprove,
            @RequestParam(value = "remark", required = false) String remark) {
        return accountAO.inciseScore(this.getSessionUser().getUserId(),
            quantity, price, isApprove, remark);
    }

    // 删除积分二维码
    @RequestMapping(value = "/score/drop", method = RequestMethod.POST)
    @ResponseBody
    public Object delScore(@RequestParam(value = "code") String code) {
        return accountAO.delScore(code);
    }

    // 积分二维码上架/下架
    @RequestMapping(value = "/score/updown", method = RequestMethod.POST)
    @ResponseBody
    public Object updownScore(
            @RequestParam(value = "integralCode") String integralCode,
            @RequestParam(value = "updateResult") String updateResult,
            @RequestParam(value = "remark") String remark) {
        return accountAO.updownScore(integralCode,
            this.getSessionUser().getUserId(), updateResult, remark);
    }

    // 扫一扫加积分
    @RequestMapping(value = "/erweiscore", method = RequestMethod.GET)
    @ResponseBody
    public Object erweiScore(
            @RequestParam(value = "integralCode") String integralCode) {
        return accountAO.erweiScore(this.getSessionUser().getUserId(),
            integralCode);
    }

    // 积分切割分页查询
    @RequestMapping(value = "/inciseScore/page", method = RequestMethod.GET)
    @ResponseBody
    public Object inciseScorePage(
            @RequestParam(value = "isApprove", required = false) String isApprove,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "start") String start,
            @RequestParam(value = "limit") String limit) {
        return accountAO.inciseScorePage(this.getSessionUser().getUserId(),
            isApprove, status, start, limit);
    }

    // 积分切割列表查询
    @RequestMapping(value = "/inciseScore/list", method = RequestMethod.GET)
    @ResponseBody
    public Object inciseScoreList(
            @RequestParam(value = "isApprove") String isApprove,
            @RequestParam(value = "status", required = false) String status) {
        return accountAO.inciseScoreList(this.getSessionUser().getUserId(),
            isApprove, status);
    }

    // 积分切割详情查询
    @RequestMapping(value = "/inciseScore/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object inciseScoreDetail(@RequestParam(value = "code") String code) {
        return accountAO.inciseScoreDetail(code);
    }
    
    @RequestMapping(value = "/duixian", method = RequestMethod.POST)
    @ResponseBody
    public Object duixian(
            @RequestParam(value = "fromUserId") String fromUserId,
            @RequestParam(value = "amount") String amount,
            @RequestParam(value = "price") String price,
            @RequestParam(value = "type") String type) {
        return accountAO.duixian(fromUserId, this.getSessionUser().getUserId(),
            amount, price, type, this.getSessionUser().getUserId());
    }

    @RequestMapping(value = "/duixian/check", method = RequestMethod.POST)
    @ResponseBody
    public Object checkduixian(
            @RequestParam(value = "withdrawNo") String withdrawNo,
            @RequestParam(value = "approveResult") String approveResult,
            @RequestParam(value = "approveNote") String approveNote) {
        return accountAO.checkduixian(withdrawNo, this.getSessionUser()
            .getUserId(), approveResult, approveNote);
    }

    @RequestMapping(value = "/duixian/pay", method = RequestMethod.POST)
    @ResponseBody
    public Object payduixian(
            @RequestParam(value = "withdrawNo") String withdrawNo,
            @RequestParam(value = "payResult") String payResult,
            @RequestParam(value = "payNote") String payNote,
            @RequestParam(value = "refNo") String refNo,
            @RequestParam(value = "fee") String fee) {
        return accountAO.payduixian(withdrawNo, this.getSessionUser()
            .getUserId(), payResult, payNote, refNo, fee);
    }
}
