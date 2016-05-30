/**
 * @Title IMenuAO.java 
 * @Package com.ibis.pz.ao 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午9:16:37 
 * @version V1.0   
 */
package com.xnjr.app.security.ao;

import java.util.List;

import com.xnjr.app.security.res.XN805001Res;

/**
 * @author: XIANDONG 
 * @since: 2016年4月20日 上午11:40:19 
 * @history:
 */
public interface IMenuAO {

    /**
     * 添加菜单
     * @param kind
     * @param name
     * @param url
     * @param parentCode
     * @param type
     * @param orderNo
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午4:41:46 XIANDONG
     * @history:
     */
    public Object addMenu(String kind, String name, String url,
            String parentCode, String type, String orderNo, String updater,
            String remark);

    /**
     * 删除菜单
     * @param code
     * @return 
     * @create: 2015年10月12日 下午2:31:26 myb858
     * @history:
     */
    public Object dropMenu(String code);

    /**
     * 修改菜单
     * @param code
     * @param kind
     * @param name
     * @param url
     * @param parentCode
     * @param type
     * @param orderNo
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午4:42:26 XIANDONG
     * @history:
     */
    public Object editMenu(String code, String kind, String name, String url,
            String parentCode, String type, String orderNo, String updater,
            String remark);

    /**
    * 分页查询菜单
    * @param kind
    * @param name
    * @param parentCode
    * @param type
    * @return 
    * @create: 2016年4月17日 下午4:42:37 XIANDONG
    * @history:
    */
    public Object queryMenuPage(String kind, String name, String parentCode,
            String type, String updater, String start, String limit);

    /**
     * 查询菜单列表
     * @param kind
     * @param name
     * @param url
     * @param parentCode
     * @param type
     * @param updater
     * @return 
     * @create: 2016年5月30日 下午7:27:24 xieyj
     * @history:
     */
    public List<XN805001Res> queryMenuList(String kind, String name,
            String url, String parentCode, String type, String updater);

    public Object getMenu(String code);

}
