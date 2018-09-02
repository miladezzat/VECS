using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO.Ports;

namespace webServicesForweb
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        public SerialPort myport;

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        [WebMethod]
        public string OnOrOff(string device_num, string status)
        {
            myport = new SerialPort();
            myport.BaudRate = 9600;
            myport.DataBits = 8;
            myport.DiscardNull = false;
            myport.DtrEnable = false;
            myport.ParityReplace = 63;
            myport.ReadTimeout = -1;
            myport.ReceivedBytesThreshold = 1;
            myport.PortName = "COM6";
            myport.ReadBufferSize = 4096;
            myport.RtsEnable = false;
            myport.WriteTimeout = -1;
            myport.WriteBufferSize = 2048;

            myport.Open();


            if (myport.IsOpen)
            {
                myport.Write(",start," + device_num + "," + status + ",");
                myport.Close();
                return "Turn On " + device_num + " And " + status;
            }

            return "My Port not opened";
        }
    }
}
