import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  userRole=sessionStorage.getItem('role')  

  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.service.getuserrole().subscribe(res => {      
      this.rolelist = res;     
    });    
  }
  ngOnInit(): void { 
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }
  }
  rolelist: any;
  editdata: any;

  formadmin = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control('',Validators.email),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
    balance: this.builder.control(0)
  });
  formuser = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control('',Validators.email),
    gender: this.builder.control('male'),
    isactive: this.builder.control(false),
    balance: this.builder.control(0)
  });
  loaduserdata(code: any) {
    const loggedInUsername = sessionStorage.getItem('username');
    const role=sessionStorage.getItem('role');
    
    if(loggedInUsername && role=='admin'){
      this.service.GetUserbyCode(code).subscribe(res => {
        this.editdata = { ...res };  // Include the id in the user data
  // Include the id in the user data
        
        this.formadmin.setValue(this.editdata);
      });
    }
    if(loggedInUsername && role=='user'){
      this.service.GetUserbyCode(code).subscribe(res => {
        this.editdata = { ...res };  // Include the id in the user data
  // Include the id in the user data
        
        this.formuser.setValue(this.editdata);
        this.formuser.get('role')?.disable();  // Disable the 'role' field
      });
    }
  }
  
  UpdateUser() {
    const loggedInUsername = sessionStorage.getItem('username');
    const role=sessionStorage.getItem('role');
  
    if (loggedInUsername && role=='admin') {
      const { id, ...updatedUser } = this.formadmin.value;
      this.service.updateuser(id, updatedUser).subscribe(res => {
        this.toastr.success('Updated successfully.');
        this.dialogref.close();
      });
    }
    if (loggedInUsername && role=='user') {
      const { id, ...updatedUser } = this.formuser.value;
      this.service.updateuser(id, updatedUser).subscribe(res => {
        this.toastr.success('Updated successfully.');
        this.dialogref.close();
      });
    }
  }
}