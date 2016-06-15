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

    @RequestMapping(value = "/recharge", method = RequestMethod.POST)
    @ResponseBody
    public Object recharge(
            @RequestParam(value = "accountNumber", required = false) String accountNumber,
            @RequestParam(value = "amount", required = false) String amount,
            @RequestParam("pdf") String pdf,
            @RequestParam(value = "fromType", required = false) String fromType,
            @RequestParam(value = "fromCode", required = false) String fromCode) {
        return accountAO.recharge(accountNumber, amount, pdf, fromType,
            fromCode);
    }

    @RequestMapping(value = "/approveRecharge", method = RequestMethod.POST)
    @ResponseBody
    public Object approveRecharge(
            @RequestParam(value = "chargeNo", required = false) String chargeNo,
            // @RequestParam(value = "approveUser", required = false) String
            // approveUser,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.approveRecharge(chargeNo,
            this.getSessionUser().getUserName(), approveResult, approveNote);
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
            // @RequestParam(value = "approveUser", required = false) String
            // approveUser,
            @RequestParam(value = "approveResult", required = false) String approveResult,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return accountAO.approveWithdrawOrder(withdrawNo,
            this.getSessionUser().getUserName(), approveResult, approveNote);
    }

    @RequestMapping(value = "/payWithdrawOrder", method = RequestMethod.POST)
    @ResponseBody
    public Object payWithdrawOrder(
            @RequestParam(value = "withdrawNo", required = false) String withdrawNo,
            // @RequestParam(value = "payUser", required = false) String
            // payUser,
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

    // @RequestMapping(value = "/payaccount", method = RequestMethod.POST)
    // @ResponseBody
    // public Object payaccount(@RequestParam("code") String code,
    // @RequestParam("amount") String amount,
    // @RequestParam("fromType") String fromType,
    // @RequestParam("fromCode") String fromCode,
    // @RequestParam("pdf") String pdf,
    // @RequestParam("toCardNo") String toCardNo,
    // @RequestParam("remark") String remark) {
    // return accountAO.payaccount(code, amount, fromType, fromCode, pdf,
    // toCardNo, remark);
    //
    // }
}
