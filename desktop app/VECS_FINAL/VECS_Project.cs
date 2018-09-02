using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace VECS_FINAL
{
    public partial class VECS_Project : Form
    {
        public VECS_Project()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
                 this.Hide();

                login frm = new login();
                frm.ShowDialog();

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }
    }
}
