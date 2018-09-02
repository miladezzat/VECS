namespace VECS_FINAL
{
    partial class sensor
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btndevices = new System.Windows.Forms.Button();
            this.txttemp = new System.Windows.Forms.TextBox();
            this.txtairQ = new System.Windows.Forms.TextBox();
            this.btnlunch = new System.Windows.Forms.Button();
            this.txtstatus = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // btndevices
            // 
            this.btndevices.Location = new System.Drawing.Point(12, 12);
            this.btndevices.Name = "btndevices";
            this.btndevices.Size = new System.Drawing.Size(75, 23);
            this.btndevices.TabIndex = 0;
            this.btndevices.Text = "devices";
            this.btndevices.UseVisualStyleBackColor = true;
            this.btndevices.Click += new System.EventHandler(this.btndevices_Click);
            // 
            // txttemp
            // 
            this.txttemp.Location = new System.Drawing.Point(482, 57);
            this.txttemp.Name = "txttemp";
            this.txttemp.Size = new System.Drawing.Size(155, 20);
            this.txttemp.TabIndex = 1;
            // 
            // txtairQ
            // 
            this.txtairQ.Location = new System.Drawing.Point(482, 133);
            this.txtairQ.Name = "txtairQ";
            this.txtairQ.Size = new System.Drawing.Size(155, 20);
            this.txtairQ.TabIndex = 2;
            // 
            // btnlunch
            // 
            this.btnlunch.Location = new System.Drawing.Point(12, 77);
            this.btnlunch.Name = "btnlunch";
            this.btnlunch.Size = new System.Drawing.Size(75, 23);
            this.btnlunch.TabIndex = 3;
            this.btnlunch.Text = "lanch";
            this.btnlunch.UseVisualStyleBackColor = true;
            this.btnlunch.Click += new System.EventHandler(this.btnlunch_Click);
            // 
            // txtstatus
            // 
            this.txtstatus.Location = new System.Drawing.Point(400, 212);
            this.txtstatus.Name = "txtstatus";
            this.txtstatus.Size = new System.Drawing.Size(181, 20);
            this.txtstatus.TabIndex = 4;
            // 
            // sensor
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(839, 370);
            this.Controls.Add(this.txtstatus);
            this.Controls.Add(this.btnlunch);
            this.Controls.Add(this.txtairQ);
            this.Controls.Add(this.txttemp);
            this.Controls.Add(this.btndevices);
            this.Name = "sensor";
            this.Text = "sensor";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btndevices;
        private System.Windows.Forms.TextBox txttemp;
        private System.Windows.Forms.TextBox txtairQ;
        private System.Windows.Forms.Button btnlunch;
        private System.Windows.Forms.TextBox txtstatus;
    }
}