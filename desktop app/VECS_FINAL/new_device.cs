using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace VECS_FINAL
{
    public partial class new_device : Form


    {
        SqlConnection cn = new SqlConnection(@"Server=study-pc\KEROLES; Initial catalog=VECS3; Integrated Security=false;  User ID=sa; password=123");
        SqlCommand cmd;
        SqlDataAdapter Da;
        public new_device()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
              OFD.Filter="All Images |*.PNG ,*.JPG ,*.BNP ";

                  if(OFD.ShowDialog()==DialogResult.OK)
                  {
                      foreach (string p in OFD.FileNames)
                      {
                          ListViewItem itm = new ListViewItem(p);
                          //itm.SubItems.Add
                      }

                  } 
            
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void btnCancel_Click(object sender, EventArgs e)
        {            
            this.Hide();

            control frm = new control();
            frm.ShowDialog();
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            try
            {

                cmd = new SqlCommand("Insert into devices (type,ip,status,location,name,admin_id,device_num) values ('" + txttype.Text + "','" + txtip.Text + "','" + txtStatus.Text + "','"+txtlocation.Text+"','"+txtname.Text+"','"+txtadmin_id.Text+"','"+txtDevice_num.Text+"')", cn);
                cn.Open();
                cmd.ExecuteNonQuery();
                MessageBox.Show("Add Successfuly ", "Add", MessageBoxButtons.OK, MessageBoxIcon.Information);
                cn.Close();

                this.Hide();

                control frm = new control();
                frm.ShowDialog();

            }
            catch (SqlException ex)
            {
                MessageBox.Show("some Errors was occured " + ex.Message);
            }
            finally
            {
                cn.Close();
            }

        }

        private void txtName_TextChanged(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }
    }
}
