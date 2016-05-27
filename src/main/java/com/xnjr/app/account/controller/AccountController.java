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
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryAccountPage(accountNumber, status, userId,
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

    @RequestMapping(value = "/rechargeOrderPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryRechargeOrderPage(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
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
        return accountAO.queryRechargeOrderPage(accountNumber, code, fromType,
            fromCode, channel, refNo, status, approveUser, dateStart, dateEnd,
            start, limit);
    }

    @RequestMapping(value = "/recharge", method = RequestMethod.GET)
    @ResponseBody
    public Object recharge(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "amount", required = false) String amount,
            @RequestParam(value = "fromType", required = false) String fromType,
            @RequestParam(value = "fromCode", required = false) String fromCode) {
        return accountAO.recharge(accountNumber, amount, fromType, fromCode);
    }

    @RequestMapping(value = "/approveRecharge", method = RequestMethod.GET)
    @ResponseBody
    public Object approveRecharge(
            @RequestParam(value = "chargeNo", required = false) String chargeNo,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.approveRecharge(chargeNo, approveUser, approveResult,
            approveNote);
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

    @RequestMapping(value = "/agentWithdrawPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryAgentWithdrawPage(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "amount", required = false) String amount,
            @RequestParam(value = "toType", required = false) String toType,
            @RequestParam(value = "toCode", required = false) String toCode) {
        return accountAO.queryAgentWithdrawPage(accountNumber, amount, toType,
            toCode);
    }

    @RequestMapping(value = "/approveWithdrawOrder", method = RequestMethod.GET)
    @ResponseBody
    public Object approveWithdrawOrder(
            @RequestParam(value = "withdrawNo", required = false) String withdrawNo,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.approveWithdrawOrder(withdrawNo, approveUser,
            approveResult, approveNote);
    }

    @RequestMapping(value = "/payWithdrawOrder", method = RequestMethod.GET)
    @ResponseBody
    public Object payWithdrawOrder(
            @RequestParam(value = "withdrawNo", required = false) String withdrawNo,
            @RequestParam(value = "payUser", required = false) String payUser,
            @RequestParam(value = "payResult", required = false) String payResult,
            @RequestParam(value = "payNote", required = false) String payNote,
            @RequestParam(value = "refNo", required = false) String refNo,
            @RequestParam(value = "fee", required = false) String fee) {
        return accountAO.payWithdrawOrder(withdrawNo, payUser, payResult,
            payNote, refNo, fee);
    }

    @RequestMapping(value = "/upDownPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryUpDownPage(
            @RequestParam(value = "toCode", required = false) String toCode,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryUpDownPage(toCode, direction, accountNumber,
            dateStart, dateEnd, start, limit);
    }

    @RequestMapping(value = "/transfer", method = RequestMethod.GET)
    @ResponseBody
    public Object transfer(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "amount", required = false) String amount,
            @RequestParam(value = "fee", required = false) String fee,
            @RequestParam(value = "remark", required = false) String remark) {
        return accountAO
            .transfer(accountNumber, direction, amount, fee, remark);
    }

    @RequestMapping(value = "/redBlueOrderPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryRedBlueOrderPage(
            @RequestParam(value = "toCode", required = false) String toCode,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "applyUser", required = false) String applyUser,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return accountAO.queryRedBlueOrderPage(toCode, direction, status,
            applyUser, approveUser, accountNumber, dateStart, dateEnd, start,
            limit);
    }

    @RequestMapping(value = "/artificialAccountApply", method = RequestMethod.GET)
    @ResponseBody
    public Object artificialAccountApply(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "amount", required = false) String amount,
            @RequestParam(value = "applyUser", required = false) String applyUser,
            @RequestParam(value = "approveapplyNoteUser", required = false) String applyNote) {
        return accountAO.artificialAccountApply(accountNumber, direction,
            amount, applyUser, applyNote);
    }

    @RequestMapping(value = "/artificialApproveCheck", method = RequestMethod.GET)
    @ResponseBody
    public Object artificialApproveCheck(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.artificialApproveCheck(code, approveUser,
            approveResult, approveNote);
    }

    @RequestMapping(value = "/checkInput", method = RequestMethod.GET)
    @ResponseBody
    public Object checkInput(
            @RequestParam(value = "ajNo", required = false) String ajNo,
            @RequestParam(value = "checkUser", required = false) String checkUser,
            @RequestParam(value = "amount", required = false) String amount) {
        return accountAO.checkInput(ajNo, checkUser, amount);
    }

    @RequestMapping(value = "/checkApprove", method = RequestMethod.GET)
    @ResponseBody
    public Object checkApprove(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "approveUser", required = false) String approveUser,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.checkApprove(code, approveUser, approveResult,
            approveNote);
    }

}
