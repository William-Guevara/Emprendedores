import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Emprendedor } from 'src/app/models/emprendedor';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  emprendedor!: Emprendedor;
  myForm!: FormGroup;
  date!:any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private service: ServiceService,
    private route: Router
    ) { 

  }

  ngOnInit(): void {
    this.initForm();
    
  }

  /**
   * Validaciones de formulario 
   */
  private initForm():void{
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      entrepreneurship: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      detail: ['', [Validators.required]]
    });
  }

  /**
   * Validador del html: se agrega clase para hacerlo de forma dinamica  
   */
  isValidField(field: string): string{
    const validedField = this.myForm.get(field);
    return (!validedField.valid && validedField.touched)
    ? 'is-invalid' : validedField.touched ? 'is-valid' : '';

  }
 
  /**
   * 
   * @returns true del formulario valido y envia datos a firebase por medio del servicio
   */
  guardarEmprendedor() {
    this.date = new Date().toLocaleString();
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched();
      return false;

    }
    
    const emprendedor: Emprendedor = {
      id: null,
      name: this.myForm.get('name').value,
      entrepreneurship: this.myForm.get('entrepreneurship').value,
      email: this.myForm.get('email').value,
      phone: this.myForm.get('phone').value,
      address: this.myForm.get('address').value,
      detail : this.myForm.get('detail').value,
      date : this.date,
    };

    this.service.agregarEmprendedor(emprendedor);
    alert('El emprendedor fue registrado con exito!');
    this.route.navigate(['/emprendedores']);
    this.myForm.reset();
    return true;
  }


}
