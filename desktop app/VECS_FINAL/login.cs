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
    public partial class login : Form
    {
        public login()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            SqlConnection cn = new SqlConnection(@"Server=study-pc\KEROLES; Initial catalog=VECS3; Integrated Security=false;  User ID=sa; password=123");
            SqlCommand cm;
            SqlDataAdapter sda = new SqlDataAdapter("select count(*)from admin1 where username ='"+txtUserNme.Text + "' and password='" +txtPassword.Text + "'", cn);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows[0][0].ToString() == "1")
            {

           //     MessageBox.Show("Login Success");

                this.Hide();

                control frm = new control();
                frm.ShowDialog();
            }
            else
            {
                MessageBox.Show("Please Ckeck Your User Name and Password");
            }
        }

        private void login_Load(object sender, EventArgs e)
        {

        }
    }
}
