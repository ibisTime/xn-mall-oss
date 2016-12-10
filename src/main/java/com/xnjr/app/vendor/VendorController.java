package com.xnjr.app.vendor;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
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
		map.put("pic1", UploadUtil.uploadPicture((String) map.get("pic1")));
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
	public Object VendorPage(@RequestParam Map<String, String> allRequestParams) {
		// allRequestParams.put("userId", this.getSessionUser().getUserId());
		return BizConnecter.getBizData("602920",
				JsonUtils.mapToJson(allRequestParams), Object.class);
	}

	// 列表查询商家信息
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public Object VendorList(@RequestParam Map<String, String> allRequestParams) {
		// allRequestParams.put("userId", this.getSessionUser().getUserId());
		return BizConnecter.getBizData("602921",
				JsonUtils.mapToJson(allRequestParams), Object.class);
	}

	// 详情查询商家信息
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public Object VendorDetail(
			@RequestParam Map<String, String> allRequestParams) {
		// allRequestParams.put("userId", this.getSessionUser().getUserId());
		return BizConnecter.getBizData("602922",
				JsonUtils.mapToJson(allRequestParams), Object.class);
	}

	// 分页消费记录查询
	@RequestMapping(value = "/record/page", method = RequestMethod.GET)
	@ResponseBody
	public Object VendorRecordPage(
			@RequestParam Map<String, String> allRequestParams) {
		// allRequestParams.put("merchantCode",
		// this.getSessionUser().getUserId());
		return BizConnecter.getBizData("602923",
				JsonUtils.mapToJson(allRequestParams), Object.class);
	}

	// 分类新增
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/kind/add", method = RequestMethod.POST)
	@ResponseBody
	public Object viewAdd(@RequestBody Map map) {
		map.put("type", "3");
		map.put("status", "1");
		map.put("location", "1");
		map.put("belong", "1");
		map.put("parentCode", "0");
		map.put("companyCode", "0");
		map.put("userId", this.getSessionUser().getUserId());
		map.put("pic", UploadUtil.uploadPicture((String) map.get("pic")));
		return BizConnecter.getBizData("806040", JsonUtils.mapToJson(map),
				Object.class);
	}

	// 分类修改
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/kind/edit", method = RequestMethod.POST)
	@ResponseBody
	public Object viewEdit(@RequestBody Map map) {
		map.put("type", "3");
		map.put("status", "1");
		map.put("location", "1");
		map.put("belong", "1");
		map.put("parentCode", "0");
		map.put("isCompanyEdit", "0");
		map.put("companyCode", "0");
		map.put("pic", UploadUtil.uploadPicture((String) map.get("pic")));
		return BizConnecter.getBizData("806042", JsonUtils.mapToJson(map),
				Object.class);
	}

	// 分类删除
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/kind/delete", method = RequestMethod.POST)
	@ResponseBody
	public Object viewDelete(@RequestBody Map map) {
		return BizConnecter.getBizData("806041", JsonUtils.mapToJson(map),
				Object.class);
	}

	// 分页分类
	@RequestMapping(value = "/kind/page", method = RequestMethod.GET)
	@ResponseBody
	public Object viewPage(@RequestParam Map<String, String> allRequestParams) {
		// allRequestParams.put("userId", this.getSessionUser().getUserId());
		return BizConnecter.getBizData("806050",
				JsonUtils.mapToJson(allRequestParams), Object.class);
	}

	// 列表分类
	@RequestMapping(value = "/kind/list", method = RequestMethod.GET)
	@ResponseBody
	public Object viewList(@RequestParam Map<String, String> allRequestParams) {
		// allRequestParams.put("userId", this.getSessionUser().getUserId());
		return BizConnecter.getBizData("806052",
				JsonUtils.mapToJson(allRequestParams), Object.class);
	}

	// 详情分类
	@RequestMapping(value = "/kind/detail", method = RequestMethod.GET)
	@ResponseBody
	public Object viewDetail(@RequestParam Map<String, String> allRequestParams) {
		// allRequestParams.put("userId", this.getSessionUser().getUserId());
		return BizConnecter.getBizData("806053",
				JsonUtils.mapToJson(allRequestParams), Object.class);
	}

	// 商家统计
	@RequestMapping(value = "/statistics", method = RequestMethod.GET)
	@ResponseBody
	public Object viewStats(@RequestParam Map<String, String> allRequestParams) {
		// allRequestParams.put("userId", this.getSessionUser().getUserId());
		return BizConnecter.getBizData("602907",
				JsonUtils.mapToJson(allRequestParams), Object.class);
	}

}
