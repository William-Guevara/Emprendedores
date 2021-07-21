import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import * as $ from 'jquery';
import { Emprendedor } from 'src/app/models/emprendedor';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-entrepreneurs',
  templateUrl: './entrepreneurs.component.html',
  styleUrls: ['./entrepreneurs.component.css']
})
export class EntrepreneursComponent implements OnInit {

  emprendedores$ = this.service.listEmprendedores;
  emprendedor = Emprendedor;
  myFormModal : FormGroup;
  constructor( private service: ServiceService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Metodo para modelar e inicializar el formulario
   */
  private initForm():void{
    this.myFormModal = this.fb.group({
      name: [''],
      entrepreneurship: [''],
      email: [''],
      phone: [''],
      address: [''],
      detail: ['']
    });
  }

  /**
   * Metodo para abrir modal y agregar datos a los campos del formulario y visualizarlos 
   * @param item seleccionado por el usuario al dar click en "Ver más" 
   */
  onOpenModal(item){
    this.myFormModal.setValue({
      name: item.name,
      entrepreneurship: item.entrepreneurship,
      email: item.email,
      phone: item.phone,
      address: item.address,
      detail: item.detail,
    });
    
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
  }
}
