/**
 * @Title MenuAOImpl.java 
 * @Package com.ibis.pz.ao.impl 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午10:22:25 
 * @version V1.0   
 */
package com.xnjr.app.product.ao.imp;

import org.springframework.stereotype.Service;

import com.xnjr.app.product.ao.IModelAO;

@Service
public class ModelAOImpl implements IModelAO {

    @Override
    public Object addModel(String productCode, String name, String pic1,
            String pic2, String pic3, String description, String specsList,
            String updater) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object editModel(String code, String productCode, String name,
            String pic1, String pic2, String pic3, String description,
            String specsList, String updater) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object updownModel(String code, String checkUser, String checkResult,
            String checkNote) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object queryModelPage(String code, String name, String status,
            String productCode, String start, String limit, String orderColumn,
            String orderDir) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object queryMOdelList(String code, String name, String status,
            String productCode) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object detailModel(String code) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object shopLeadadd(String modelCode, String originalPrice,
            String discountPrice, String toLevel, String updater,
            String remark) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object shopLeadedit(String code, String modelCode,
            String originalPrice, String discountPrice, String toLevel,
            String updater, String remark) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object shopCarPage(String userId, String start, String limit,
            String orderColumn, String orderDir) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object queryOrderPage(String applyUser, String status, String start,
            String limit, String orderColumn, String orderDir) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object queryOrderList(String applyUser, String status) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object detailOrder(String invoiceCode) {
        // TODO Auto-generated method stub
        return null;
    }

}
