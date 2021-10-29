<%@ WebHandler Language="C#" Class="UploadFile" %>
using System;
using System.Web;
using System.IO;
using System.Web.SessionState;
public class UploadFile : IHttpHandler, IRequiresSessionState
{
    public void ProcessRequest(HttpContext context)
    {
        string filedata = string.Empty;
        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFile file = files[i];
                if (Path.GetExtension(file.FileName).ToLower() != ".png" &&
                    Path.GetExtension(file.FileName).ToLower() != ".jpg" &&
                    Path.GetExtension(file.FileName).ToLower() != ".jpeg" &&
                    Path.GetExtension(file.FileName).ToLower() != ".pdf" &&
                    Path.GetExtension(file.FileName).ToLower() != ".doc" &&
                    Path.GetExtension(file.FileName).ToLower() != ".docx" &&
                    Path.GetExtension(file.FileName).ToLower() != ".gif"
                )
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write("Only png, jpg , jpeg , gif, pdf, doc , docx are allowed.!");
                    return;
                }
                //Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["ImageFolder_Path"]);
                decimal size = Math.Round(((decimal)file.ContentLength / (decimal)1024), 2);
                if (size > 6000)
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write("File size should not exceed 2 MB.!");
                    return;
                }
                if (size < 1)
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write("File size should not less than 1 Kb.!");
                    return;
                }
                string fname;
                if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                {
                    string[] testfiles = file.FileName.Split(new char[] {
                        '\\'
                    });
                    fname = testfiles[testfiles.Length - 1];
                }
                else
                {
                    fname = file.FileName;
                }

                string mainFolder = context.Request.QueryString["MainFolder"];

                string imgpath = context.Request.QueryString["imgpath"];
                string path = GetPath(mainFolder,imgpath);
                //var Fol = context.Server.MapPath(path);
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }


                //here UploadFile is define my folder name , where files will be store.  
                string uploaddir = System.Configuration.ConfigurationManager.AppSettings["UploadFile"];
                //filedata = Guid.NewGuid() + fname;
                // fname = Path.Combine(context.Server.MapPath("~/" + uploaddir + "/"), filedata); FilesUploded
                fname = Path.Combine((path) + fname);
                if (File.Exists(fname))
                {
                    context.Response.Write("1");
                    return;
                }

                file.SaveAs(fname);
            }
        }
        context.Response.ContentType = "text/plain";
        // context.Response.Write(filedata); 
        context.Response.Write("File Uploaded Successfully:" + filedata + "");
        //if you want to use file path in aspx.cs page , then assign it in to session  

        context.Session["PathImage"] = filedata;
    }
    //private string GetPath(string type, string mainFolder)
    //{

    //    string _stdpath = System.Configuration.ConfigurationManager.AppSettings["ImageFolder_Path"] + type + "/" + mainFolder + "/";

    //    return _stdpath;
    //}
    //new
    private string GetPath(string mainFolder,string imgpath)
    {

        string _stdpath = System.Configuration.ConfigurationManager.AppSettings["ImageFolder_Path"] + mainFolder + "/";

        return _stdpath;
    }


    public bool IsReusable
    {
        get
        {
            return false;
        }

    }






}
