using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;
using System.IO.Ports;

namespace VECS_FINAL
{


    public partial class control : Form
    {
        //public SerialPort myport1;
        public string data;
        public string type;
        SqlConnection cn = new SqlConnection(@"Server=study-pc\KEROLES; Initial catalog=VECS3; Integrated Security=false;  User ID=sa; password=123");
        SqlDataAdapter Da, Da2;
        SqlCommand cmd;
        CurrencyManager cm;
        DataTable dt = new DataTable();
        DataTable dt2 = new DataTable();



        public control()
        {
            InitializeComponent();
            
                Da = new SqlDataAdapter("Select name From devices", cn);
                Da.Fill(dt);
                dataGridView1.DataSource = dt;

                FillDateGridview();

                textBox1.DataBindings.Add("text", dt, "id");
                labNmae.DataBindings.Add("text", dt, "type");
                labPosition.DataBindings.Add("text", dt, "ip");
                labStatus.DataBindings.Add("text", dt, "status");
                lablocation.DataBindings.Add("text", dt, "location");
                labname.DataBindings.Add("text", dt, "name");
                labadmin_id.DataBindings.Add("text", dt, "admin_id");
                txtDevice_num.DataBindings.Add("text", dt, "device_num");
            ////
                Da2 = new SqlDataAdapter("Select name From devices", cn);
                Da2.Fill(dt2);
                dataGridView2.DataSource = dt2;

                FillDateGridview2();

             
                txtid2.DataBindings.Add("text",dt2,"id");
                labtype2.DataBindings.Add("text", dt2, "type");
                labip2.DataBindings.Add("text", dt2, "ip");
                labstatus2.DataBindings.Add("text", dt2, "status");
                lablocation2.DataBindings.Add("text", dt2, "location");
                labname2.DataBindings.Add("text", dt2, "name");
                labadmin_id2.DataBindings.Add("text", dt2, "admin_id");
            txtdevice_num2.DataBindings.Add("text", dt2, "device_num");
        }


        void FillDateGridview()
        {
            dt.Clear();
            cmd = new SqlCommand("selectdevvice", cn);
            cmd.CommandType = CommandType.StoredProcedure;
            Da = new SqlDataAdapter(cmd);
            Da.Fill(dt);
            this.dataGridView1.DataSource = dt;
            cm = (CurrencyManager)this.BindingContext[dt];
        }

        //datagridview2

        void FillDateGridview2()
        {
            dt2.Clear();
            cmd = new SqlCommand("selectsensor", cn);
            cmd.CommandType = CommandType.StoredProcedure;
            Da2 = new SqlDataAdapter(cmd);
            Da2.Fill(dt2);
            this.dataGridView2.DataSource = dt2;
            cm = (CurrencyManager)this.BindingContext[dt2];
        }


        private void button4_Click(object sender, EventArgs e)
        {
            this.Hide();

            new_device frm = new new_device();
            frm.ShowDialog();
        }

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void control_Load(object sender, EventArgs e)
        {
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            int deviceNum;
            string id = txtDevice_num.Text;
            deviceNum = Int32.Parse(id);
     
            switch (deviceNum)
            {
                case 2:
                    myport1.Write("2,on");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='on' where device_num='2'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;

                case 3:
                    myport1.Write("3,on");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='on' where device_num='3'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 4:
                    myport1.Write("4,on");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='on' where device_num='4'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 5:
                    myport1.Write("5,on");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='on' where device_num='5'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 6:
                    myport1.Write("6,on");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='on' where device_num='6'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 7:
                    myport1.Write("7,on");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='on' where device_num='7'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 9:
                    myport1.Write("9,on");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='on' where device_num='9'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;


            }


        }

        private void button2_Click(object sender, EventArgs e)
        {
            int deviceNum;
            string id = txtDevice_num.Text;
            deviceNum = Int32.Parse(id);
            switch (deviceNum)
            {
                case 2:
                    myport1.Write("2,off");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='off' where device_num='2'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 3:
                    myport1.Write("3,off");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='off' where device_num='3'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 4:
                    myport1.Write("4,off");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='off' where device_num='4'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 5:
                    myport1.Write("5,off");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='off' where device_num='5'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 6:
                    myport1.Write("6,off");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='off' where device_num='6'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 7:
                    myport1.Write("7,off");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='off' where device_num='7'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
                case 9:
                    myport1.Write("9,off");
                    //update status
                    cn.Open();
                    cmd = new SqlCommand("update devices SET status='off' where device_num='9'", cn);
                    cmd.Connection = cn;
                    cmd.ExecuteNonQuery();
                    cn.Close();
                    break;
            }
        }

        private void start_Click(object sender, EventArgs e)
        {
            myport1.Open();
            myport1.Write("start");

            myport1.DataReceived += myport_DataReceived;
            try
            {               
                txtReading.Text = "";
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "ERROR");
            }
          
        }

        void myport_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            data = myport1.ReadLine();
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
                    if (txtdevice_num2.Text == "25")
                    {
                        txtReading.Text = valuetemp+"C"; // temp
                    }

                    if (temp >= 50)
                    {
                        myport1.Write(",6,on,");
                        DateTime now = DateTime.Now;
                        cn.Open();
                        cmd = new SqlCommand("insert into ubnormalReadings (value,type,sensorid,hour,mins,second,day,month,year,device_num)  values ('" + temp + "' , 'temp', '5','" + now.Hour + "','" + now.Minute + "','" + now.Second + "','" + now.Day + "','" + now.Month + "','" + now.Year + "','5' )", cn);
                        cmd.ExecuteNonQuery();
                        cn.Close();
                    }
                    else 
                    {
                        myport1.Write(",6,off,");
                    }

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
            //hum
            if (data[0] == 'h')
            {
                int len = data.Length - 5;
                string hum = data.Substring(5, len);
                float humf = float.Parse(hum);
                if (txtdevice_num2.Text == "26")
                {
                    txtReading.Text = hum + "H"; // temp
                }
                if (humf >= 50)
                {
                    myport1.Write(",5,on,2,off,");
                    DateTime now = DateTime.Now;
                    cn.Open();
                    cmd = new SqlCommand("insert into ubnormalReadings (value,type,sensorid,hour,mins,second,day,month,year,device_num)  values ('" + humf + "' , 'hum', '5','" + now.Hour + "','" + now.Minute + "','" + now.Second + "','" + now.Day + "','" + now.Month + "','" + now.Year + "','5' )", cn);
                    cmd.ExecuteNonQuery();
                    cn.Close();
                }
                else 
                {
                    myport1.Write(",5,off,2,on,");
                }

            }

            //data = myport1.ReadLine();
            if (data[0] == 'a')
            {
                int len = data.Length - 5;
                string valueQ = data.Substring(5, len);
                float valueFQ = float.Parse(valueQ);
                if (txtdevice_num2.Text == "27")
                {
                    txtReading.Text = valueQ+"A"; // temp
                }
                if (valueFQ >= 200)
                {
                    myport1.Write(",9,on,4,off,");
                    DateTime now = DateTime.Now;
                    cn.Open();
                    cmd = new SqlCommand("insert into ubnormalReadings (value,type,sensorid,hour,mins,second,day,month,year,device_num)  values ('" + valueFQ + "' , 'air', '5','" + now.Hour + "','" + now.Minute + "','" + now.Second + "','" + now.Day + "','" + now.Month + "','" + now.Year + "','5' )", cn);
                    cmd.ExecuteNonQuery();

                    cmd = new SqlCommand("UPDATE devices SET status='on' WHERE id='8'", cn);
                    cmd.ExecuteNonQuery();

                    cn.Close();
                }
                else 
                {
                    myport1.Write(",9,off,4,on,");
                    cn.Open();
                    cmd = new SqlCommand("UPDATE devices SET status='off' WHERE id='8'", cn);
                    cmd.ExecuteNonQuery();
                    cn.Close();
                }
            }
        }

        private void btnsensor_Click(object sender, EventArgs e)
        {
            this.Hide();

            sensor frm = new sensor();
            frm.ShowDialog();
        }

        private void toolStripButton1_Click(object sender, EventArgs e)
        {

        }

        private void statusStrip1_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {

        }

        private void sensiersToolStripMenuItem_Click(object sender, EventArgs e)
        {
         //   this.Hide();

            sensor frm = new sensor();
            frm.ShowDialog();
        }

        private void label14_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void label12_Click(object sender, EventArgs e)
        {

        }

        private void textBox3_TextChanged(object sender, EventArgs e)
        {

        }

        private void groupBox2_Enter(object sender, EventArgs e)
        {

        }

        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void label17_Click(object sender, EventArgs e)
        {

        }

        private void textBox4_TextChanged(object sender, EventArgs e)
        {

        }

        private void label21_Click(object sender, EventArgs e)
        {

        }

        private void label20_Click(object sender, EventArgs e)
        {

        }

        private void label19_Click(object sender, EventArgs e)
        {

        }

        private void labstatus2_Click(object sender, EventArgs e)
        {

        }

        private void button5_Click(object sender, EventArgs e)
        {
            sensor frm = new sensor();
            frm.ShowDialog();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
