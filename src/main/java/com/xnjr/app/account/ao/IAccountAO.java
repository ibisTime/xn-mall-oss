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
            String type, String userId, String realName, String dateStart,
            String dateEnd, String start, String limit);

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
    public Object queryRechargeOrderPage(String fromAccountNumber,
            String accountNumber, String code, String fromType, String fromCode,
            String channel, String refNo, String status, String approveUser,
            String dateStart, String dateEnd, String start, String limit);

    /**
     * 积分充值
     * @param fromUserId 来方用户
     * @param toUserId 去方用户
     * @param amount 积分数量
     * @param price 人民币价格
     * @param type 类型
     * @param pdf 
     * @param applyUser
     * @return 
     * @create: 2016年7月24日 下午3:52:15 xieyj
     * @history:
     */
    public Object jfRecharge(String fromUserId, String toUserId, String amount,
            String price, String type, String pdf, String applyUser, String applyNote);

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
            String status, String approveUser, String payUser, String dateStart,
            String dateEnd, String start, String limit);

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
    public Object agentWithdrawCash(String toBelong, String accountNumber,
            String amount, String toType, String toCode);

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
    public Object queryTurnOutListPage(String code, String direction,
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
    public Object artificialAccountApply(String accountNumber, String direction,
            String amount, String applyUser, String applyNote);

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

    /**
     * 新增账号
     * @param companyCode
     * @param subbranch
     * @param cardNo
     * @param status
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年6月11日 下午5:17:47 XIANDONG
     * @history:
     */
    public Object addaccount(String companyCode, String subbranch,
            String cardNo, String status, String updater, String remark);

    /**
     * 修改账号
     * @param code
     * @param companyCode
     * @param subbranch
     * @param cardNo
     * @param status
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年6月11日 下午5:18:50 XIANDONG
     * @history:
     */
    public Object editaccount(String code, String companyCode, String subbranch,
            String cardNo, String status, String updater, String remark);

    /**
     * 删除账号
     * @param code
     * @return 
     * @create: 2016年6月11日 下午5:19:31 XIANDONG
     * @history:
     */
    public Object dropaccount(String code);

    /**
     * 系统账户详情
     * @param accountNumber
     * @return 
     * @create: 2016年6月14日 下午6:40:56 XIANDONG
     * @history:
     */

    public Object detailsystemaccount(String accountNumber);

    /**
     * 分页查询账户
     * @param companyCode
     * @param subbranch
     * @param cardNo
     * @param status
     * @return 
     * @create: 2016年6月11日 下午5:20:32 XIANDONG
     * @history:
     */
    public Object queryaccountPage(String companyCode, String subbranch,
            String cardNo, String status, String start, String limit);

    /**
     * 分页查询列表
     * @param companyCode
     * @param subbranch
     * @param cardNo
     * @param status
     * @return 
     * @create: 2016年6月11日 下午5:22:09 XIANDONG
     * @history:
     */
    public Object queryaccountList(String companyCode, String subbranch,
            String cardNo, String status);

    /**
     * 账号详情
     * @param code
     * @return 
     * @create: 2016年6月11日 下午5:22:25 XIANDONG
     * @history:
     */
    public Object detailaccount(String code);

    /**
     * 付款
     * @param code
     * @param amount
     * @param fromType
     * @param fromCode
     * @param pdf
     * @param toCardNo
     * @param remark
     * @return 
     * @create: 2016年6月12日 下午8:42:33 XIANDONG
     * @history:
     */
    public Object payaccount(String code, String amount, String fromType,
            String fromCode, String pdf, String toCardNo, String remark);

    /**
     * 积分切割
     * @param userId
     * @param quantity
     * @param price
     * @param isApprove
     * @param remark
     * @return 
     * @create: 2016年7月21日 下午3:13:08 XIANDONG
     * @history:
     */
    public Object inciseScore(String userId, String quantity, String price,
            String isApprove, String remark);

    /**
     * 积分切割分页
     * @param userId
     * @param isApprove
     * @param status
     * @param start
     * @param limit
     * @return 
     * @create: 2016年7月21日 下午3:13:59 XIANDONG
     * @history:
     */
    public Object inciseScorePage(String userId, String isApprove,
            String status, String start, String limit);

    /**
     * 积分切割列表
     * @param userId
     * @param isApprove
     * @param status
     * @return 
     * @create: 2016年7月21日 下午3:14:40 XIANDONG
     * @history:
     */
    public Object inciseScoreList(String userId, String isApprove,
            String status);

    /**
     * 积分切割详情
     * @param code
     * @return 
     * @create: 2016年7月21日 下午3:15:26 XIANDONG
     * @history:
     */
    public Object inciseScoreDetail(String code);

    /**
     * 扫描积分二维码
     * @param userId
     * @param integralCode
     * @return 
     * @create: 2016年7月21日 下午3:19:24 XIANDONG
     * @history:
     */
    public Object erweiScore(String userId, String integralCode);

    /**
     * 积分上架/下架
     * @param integralCode
     * @param updater
     * @param updateResult
     * @param remark
     * @return 
     * @create: 2016年7月23日 下午1:44:54 XIANDONG
     * @history:
     */
    public Object updownScore(String integralCode, String updater,
            String updateResult, String remark);

    // /**
    // * 购买积分二维码
    // * @param userId
    // * @param integralCode
    // * @return
    // * @create: 2016年7月23日 下午1:45:54 XIANDONG
    // * @history:
    // */
    // public Object buyScore(String userId, String integralCode);
    //
    // /**
    // * 积分二维码失效
    // * @param integralCode
    // * @param updater
    // * @param remark
    // * @return
    // * @create: 2016年7月23日 下午1:46:51 XIANDONG
    // * @history:
    // */
    // public Object shixiaoScore(String integralCode, String updater,
    // String remark);
    //
     /**
     * 代线下兑现
     * @param fromUserId
     * @param toUserId
     * @param amount
     * @param price
     * @param type
     * @param applyUser
     * @return
     * @create: 2016年7月24日 下午8:25:38 XIANDONG
     * @history:
     */
     public Object duixian(String fromUserId, String toUserId, String amount,
     String price, String type, String applyUser);
    
     /**
     * 审批兑现订单
     * @param withdrawNo
     * @param approveUser
     * @param approveResult
     * @param approveNote
     * @return
     * @create: 2016年7月24日 下午8:26:33 XIANDONG
     * @history:
     */
     public Object checkduixian(String withdrawNo, String approveUser,
     String approveResult, String approveNote);
    
     /**
     * 支付兑现订单
     * @param withdrawNo
     * @param payUser
     * @param payResult
     * @param payNote
     * @param refNo
     * @param fee
     * @return
     * @create: 2016年7月24日 下午8:28:28 XIANDONG
     * @history:
     */
     public Object payduixian(String withdrawNo, String payUser,
     String payResult, String payNote, String refNo, String fee);

    // 删除积分
    public Object delScore(String code);

    // 积分商入驻
    public Object scorerAdd(String loginName, String mobile, String idKind,
            String idNo, String realName, String userReferee, String pdf);

}
