package com.xnjr.app.vendor;

import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.customer.ao.ICustomerAO;
import com.xnjr.app.enums.EUserKind;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.security.ao.IUserAO;
import com.xnjr.app.util.UploadUtil;

@Controller
@RequestMapping(value = "/vendor")
public class VendorController extends BaseController {

	// 商家入驻
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object vendorAdd(@RequestBody Map map) {
  		map.put("updater", this.getSessionUser().getUserId());
  		map.put("pic1", UploadUtil.uploadPicture((String) map.get("pic1")));
  		return BizConnecter.getBizData("602900", JsonUtils.mapToJson(map),
              Object.class);
	}
    
    // 商家修改
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object vendorEdit(@RequestBody Map map) {
  		map.put("updater", this.getSessionUser().getUserId());
  		return BizConnecter.getBizData("602901", JsonUtils.mapToJson(map),
              Object.class);
	}
    
    // 商家上下线
	@RequestMapping(value = "/updown", method = RequestMethod.POST)
	@ResponseBody
	public Object vendorUpDown(@RequestBody Map map) {
  		return BizConnecter.getBizData("602902", JsonUtils.mapToJson(map),
              Object.class);
	}
	
	// 分页查询商家信息
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object VendorPage(@RequestParam Map<String,String> allRequestParams) {
    	//allRequestParams.put("userId", this.getSessionUser().getUserId());
  	    return BizConnecter.getBizData("602920", JsonUtils.mapToJson(allRequestParams),
              Object.class);
    }
    
    // 列表查询商家信息
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object VendorList(@RequestParam Map<String,String> allRequestParams) {
    	//allRequestParams.put("userId", this.getSessionUser().getUserId());
  	    return BizConnecter.getBizData("602921", JsonUtils.mapToJson(allRequestParams),
              Object.class);
    }
    
    // 详情查询商家信息
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object VendorDetail(@RequestParam Map<String,String> allRequestParams) {
    	//allRequestParams.put("userId", this.getSessionUser().getUserId());
  	    return BizConnecter.getBizData("602922", JsonUtils.mapToJson(allRequestParams),
              Object.class);
    }
}
