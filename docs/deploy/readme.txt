部署步骤：
1,打包
  将包导出到本地路径，例如包已在/Users/xieyj/Desktop/package文件夹中
2,包上传
  1).将路径切换到包路径，例如cd /Users/xieyj/Desktop/package，然后上传
   scp -P 57652 ./xn-moom-oss.war root@120.55.113.192:/home/
   scp -P56011 ./xn-moom-oss.war root@115.28.58.167:/home/
   
      scp -P57652 ./xn-moom-oss.war root@120.26.222.73:/home/
   

3，部署
  1）务必谨慎，须备份ueditor下面的image文件，更改路径最后日期，语句:cp -r /home/tomcat_GJS_app_oss/webapps/xn-moom-oss/ueditor/jsp/upload/image /home/image_bak/xn_moom_oss/20160121(当前日期)
  
  2）ssh -p 57652 root@120.55.113.192
  
    
  3）cd /home/tomcat_SYJ_oss/webapps
  
  cp -f ./xn-moom-oss/WEB-INF/classes/application.properties .
  cp -f ./xn-moom-oss/WEB-INF/classes/config.properties .
  rm -rf xn-moom-oss.war
  rm -rf xn-moom-oss
  mv /home/xn-moom-oss.war .
  
  等待tomcat解压出现xn-moom-oss文件夹
  mv -f application.properties ./xn-moom-oss/WEB-INF/classes/
  mv -f config.properties ./xn-moom-oss/WEB-INF/classes/
  mv -f config.json ./xn-moom-oss/ueditor/jsp/
  mv -f image/ ./xn-moom-oss/ueditor/jsp/upload/
  
  cd xn-moom-oss/WEB-INF/classes/
  vi application.properties 
  
4,起停tomcat
  cd /home/tomcat_SYJ_oss/webapps
  ../bin/shutdown.sh
  ../bin/startup.sh
  
5,验证
  http://120.26.222.73:7208/xn-moom-oss
  
  
  
  
  