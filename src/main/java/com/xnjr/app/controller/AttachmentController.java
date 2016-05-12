package com.xnjr.app.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.xnjr.app.session.ISessionProvider;
import com.xnjr.app.session.SessionUser;
import com.xnjr.app.util.FileUploadUtil;

@Controller
public class AttachmentController {

    @RequestMapping(value = "/upload/file", method = RequestMethod.POST)
    public void uploadFile(@RequestParam("file") MultipartFile file,
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        FileUploadUtil uploadUtil = new FileUploadUtil();
        uploadUtil.handleFile(file, request, response);
    }
}
