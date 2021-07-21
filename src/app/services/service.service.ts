import { Injectable } from '@angular/core';
import { Emprendedor } from '../models/emprendedor';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


/**
 * Servicios implementados hacia Firebase 
 */
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  listEmprendedores: Observable<Emprendedor[]>;
  listEmprendedor: Emprendedor;

  private emprendedorCollection : AngularFirestoreCollection<Emprendedor>;

  constructor(
    private readonly afs: AngularFirestore
  ) { 
    this.emprendedorCollection = afs.collection<Emprendedor>('emprendedores');
    this.listarEmprendedores();
  }

/**
 * Metodo utilizado para agregar un registro en firebase de tipo emprendedores 
 * @param emprendedor entidad o modelo utilizado para agregar datos modelados a firebase
 * @returns 
 */
  agregarEmprendedor(emprendedor: Emprendedor) : Promise<void>{
    return new Promise( async (resolve, reject) => {
      try{
        const id = this.afs.createId();
        const data = { id, ...emprendedor};
        const result = await this.emprendedorCollection.doc(id).set(data);
        resolve(result)
      }catch(err){
        reject(err.message);
      }
    });
  }


  /**
   * Metodo que permite listar todos los registros de tipo emprendedores en firebase
   */
  private listarEmprendedores() : void{
    this.listEmprendedores = this.emprendedorCollection.snapshotChanges().pipe(
      map(actions => actions.map( a => a.payload.doc.data() as Emprendedor))
    )
  }

}
