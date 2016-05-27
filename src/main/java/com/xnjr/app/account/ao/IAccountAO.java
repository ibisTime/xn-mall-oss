package com.xnjr.app.account.ao;

public interface IAccountAO {

    /**
     * 分页查询账户列表
     * @param accountNumber
     * @param status
     * @param userId
     * @param realName
     * @param dateStart
     * @param dateEnd
     * @param start
     * @param limit
     * @return 
     * @create: 2016年5月27日 下午4:29:22 wu
     * @history:
     */
    public Object queryAccountPage(String accountNumber, String status,
            String userId, String realName, String dateStart, String dateEnd,
            String start, String limit);

    /**
     * 分页查询资金明细
     * @param accountNumber
     * @param ajNo
     * @param status
     * @param bizType
     * @param refNo
     * @param workDate
     * @param checkUser
     * @param dateStart
     * @param dateEnd
     * @param start
     * @param limit
     * @return 
     * @create: 2016年5月27日 下午4:35:58 wu
     * @history:
     */
    public Object queryAJourPage(String accountNumber, String ajNo,
            String status, String bizType, String refNo, String workDate,
            String checkUser, String dateStart, String dateEnd, String start,
            String limit);

    /**
     * 分页查询冻结明细
     * @param accountNumber
     * @param ajNo
     * @param status
     * @param bizType
     * @param refNo
     * @param dateStart
     * @param dateEnd
     * @param start
     * @param limit
     * @return 
     * @create: 2016年5月27日 下午4:38:17 wu
     * @history:
     */
    public Object queryFrozenAccountPag(String accountNumber, String ajNo,
            String status, String bizType, String refNo, String dateStart,
            String dateEnd, String start, String limit);

    /**
     * 分页查询充值订单列表
     * @param accountNumber
     * @param code
     * @param fromType
     * @param fromCode
     * @param channel
     * @param refNo
     * @param status
     * @param approveUser
     * @param dateStart
     * @param dateEnd
     * @param start
     * @param limit
     * @return 
     * @create: 2016年5月27日 下午4:41:22 wu
     * @history:
     */
    public Object queryRechargeOrderPage(String accountNumber, String code,
            String fromType, String fromCode, String channel, String refNo,
            String status, String approveUser, String dateStart,
            String dateEnd, String start, String limit);

    /**
     * 线下充值
     * @param accountNumber
     * @param amount
     * @param fromType
     * @param fromCode
     * @return 
     * @create: 2016年5月27日 下午4:42:34 wu
     * @history:
     */
    public Object recharge(String accountNumber, String amount,
            String fromType, String fromCode);

    /**
     * 审批充值订单
     * @param chargeNo
     * @param approveUser
     * @param approveResult
     * @param approveNote
     * @return 
     * @create: 2016年5月27日 下午4:44:11 wu
     * @history:
     */
    // @SuppressWarnings("rawtypes")
    public Object approveRecharge(String chargeNo, String approveUser,
            String approveResult, String approveNote);

    /**
     * 分页查询取现订单列表
     * @param accountNumber
     * @param code
     * @param toType
     * @param toCode
     * @param channel
     * @param refNo
     * @param status
     * @param approveUser
     * @param payUser
     * @param dateStart
     * @param dateEnd
     * @param start
     * @param limit 
     * @create: 2016年5月27日 下午4:46:27 wu
     * @history:
     */
    public Object queryWithdrawOrderPage(String accountNumber, String code,
            String toType, String toCode, String channel, String refNo,
            String status, String approveUser, String payUser,
            String dateStart, String dateEnd, String start, String limit);

    /**
     * 代线下取现
     * @param accountNumber
     * @param amount
     * @param toType
     * @param toCode
     * @return 
     * @create: 2016年5月27日 下午4:55:02 wu
     * @history:
     */
    public Object queryAgentWithdrawPage(String accountNumber, String amount,
            String toType, String toCode);

    /**
     * 审批取现订单
     * @param withdrawNo
     * @param approveUser
     * @param approveResult
     * @param approveNote
     * @return 
     * @create: 2016年5月27日 下午4:55:53 wu
     * @history:
     */
    public Object approveWithdrawOrder(String withdrawNo, String approveUser,
            String approveResult, String approveNote);

    /**
     * 支付取现订单
     * @param withdrawNo
     * @param payUser
     * @param payResult
     * @param payNote
     * @param refNo
     * @param fee
     * @return 
     * @create: 2016年5月27日 下午4:57:31 wu
     * @history:
     */
    public Object payWithdrawOrder(String withdrawNo, String payUser,
            String payResult, String payNote, String refNo, String fee);

    /**
     * 分页查询转入转出列表
     * @param code
     * @param direction
     * @param accountNumber
     * @param dateStart
     * @param dateEnd
     * @param start
     * @param limit
     * @return 
     * @create: 2016年5月27日 下午4:59:19 wu
     * @history:
     */
    public Object queryUpDownPage(String code, String direction,
            String accountNumber, String dateStart, String dateEnd,
            String start, String limit);

    /**
     * 转账
     * @param accountNumber
     * @param direction
     * @param amount
     * @param fee
     * @param remark
     * @return 
     * @create: 2016年5月27日 下午5:01:21 wu
     * @history:
     */
    public Object transfer(String accountNumber, String direction,
            String amount, String fee, String remark);

    /**
     * 分页查询红冲蓝补订单
     * @param code
     * @param direction
     * @param status
     * @param applyUser
     * @param approveUser
     * @param accountNumber
     * @param dateStart
     * @param dateEnd
     * @param start
     * @param limit
     * @return 
     * @create: 2016年5月27日 下午5:03:30 wu
     * @history:
     */
    public Object queryRedBlueOrderPage(String code, String direction,
            String status, String applyUser, String approveUser,
            String accountNumber, String dateStart, String dateEnd,
            String start, String limit);

    /**
     * 人工干预账户申请
     * @param accountNumber
     * @param direction
     * @param amount
     * @param applyUser
     * @param applyNote
     * @return 
     * @create: 2016年5月27日 下午5:05:10 wu
     * @history:
     */
    public Object artificialAccountApply(String accountNumber,
            String direction, String amount, String applyUser, String applyNote);

    /**
     * 人工干预账户审批：需要对账
     * @param code
     * @param approveUser
     * @param approveResult
     * @param approveNote
     * @return 
     * @create: 2016年5月27日 下午5:06:05 wu
     * @history:
     */
    public Object artificialApproveCheck(String code, String approveUser,
            String approveResult, String approveNote);

    /**
     * 对账结果录入
     * @param ajNo
     * @param checkUser
     * @param amount
     * @return 
     * @create: 2016年5月27日 下午5:07:07 wu
     * @history:
     */
    public Object checkInput(String ajNo, String checkUser, String amount);

    /**
     * 对账审批:免对账
     * @param code
     * @param approveUser
     * @param approveResult
     * @param approveNote
     * @return 
     * @create: 2016年5月27日 下午5:07:52 wu
     * @history:
     */
    public Object checkApprove(String code, String approveUser,
            String approveResult, String approveNote);

}
