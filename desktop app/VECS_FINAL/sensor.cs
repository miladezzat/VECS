using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO.Ports;
using System.Data.SqlClient;

namespace VECS_FINAL
{
    public partial class sensor : Form
    {
        public string status;
        SqlConnection cn = new SqlConnection(@"Server=study-pc\KEROLES; Initial catalog=VECS3; Integrated Security=false;  User ID=sa; password=123");
        SqlCommand cmd;
        SqlDataAdapter Da;
        public SerialPort myport;
        public SerialPort myport2;
        public string data = "";
        public sensor()
        {
            InitializeComponent();
        }

        private void btndevices_Click(object sender, EventArgs e)
        {
            this.Hide();

            this.Hide();

            control frm = new control();
            frm.ShowDialog();
            
        }

        private void btnlunch_Click(object sender, EventArgs e)
        {
            myport = new SerialPort();
            myport.BaudRate = 9600;
            myport.PortName = "com5";
            myport.ReadBufferSize = 4096;
            myport.RtsEnable = true;
            myport.DataBits = 8;
            myport.WriteTimeout = -1;
            myport.DiscardNull = true;
            myport.DtrEnable = true;
            myport.DataReceived += myport_DataReceived;       

            try
            {
                myport.Open();
                txttemp.Text = "";
                txtairQ.Text = "";
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "ERROR");
            }
           
        }
        void myport_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            data = myport.ReadLine();
            this.Invoke(new EventHandler(displaydata_event));
        }
        private void displaydata_event(object sender, EventArgs e)
        {
            if (data[0] == 't')
            {
                int len = data.Length - 6;
                string valuetemp = data.Substring(5, len);
                float temp = float.Parse(valuetemp);

                    try
                    {
                        txttemp.Text = "Milad";
                        DateTime now = DateTime.Now;
                        cn.Open();
                        cmd = new SqlCommand("insert into ubnormalReadings (value,type,sensorid,hour,mins,second,day,month,year,device_num)  values ('" + temp + "' , 'temp', '5','" + now.Hour + "','" + now.Minute + "','" + now.Second + "','" + now.Day + "','" + now.Month + "','" + now.Year + "','5' )", cn);
                        cmd.ExecuteNonQuery();
                    }
                    catch (SqlException ex)
                    {
                    }
                    finally
                    {
                        cn.Close();
                    }                

           
                // compare standared data from table and insrt valuetemp
            }

            data = myport.ReadLine();
            if (data[0] == 'a')
            {
                int len = data.Length - 5 ;
                string valueQ = data.Substring(5, len);
                txtairQ.Text = valueQ;
            }
        }
    }
}
