import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from './modelos/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  

  loading:boolean = true;
  title = 'Prueba Practica 1';
  listUsuarios:any[] = new Array();

  urlLoadUsuario = 'https://dummyjson.com/users';
  urlAllUsuarios = environment.apiUrl+'/user/listar';
  urlRegistarUsuario = environment.apiUrl+'/user/registrarUsuario';
  urlAllUsuariosActivos =  environment.apiUrl+'/user/listarActivos'; 

  constructor(
    private _http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.listUsuarios = [];
    
    this.llamarAllUsuariosActivos().subscribe((data:any) => {
      //console.log(data);
      this.loading = false;
      if(data["estado"]==="ok"){
        this.rows = data["data"]
      }
      console.log("lisata ",this.rows)
    })
    
    this.llamarAllUsuarios().subscribe((data:any) => {
      console.log(data);
      this.loading = false;
      if(data["estado"]==="ok"){
        this.listUsuarios = data["data"]
      }
      console.log("lisata ",this.listUsuarios)
    });
  }

  rows:any[] = [
  ];

  columns = [
    { prop: 'firstname', name: 'firstname' },
    { prop: 'lastname', name: 'lastname' },
    { prop: 'age', name: 'age' },
    { prop: 'email', name: 'email' },
    { prop: 'image', name: 'image' },
    { prop: 'age', name: 'Edad' },
    { name: 'Agregar', cellTemplate: '<button (click)="agregarDatos(row)">Agregar</button>' },
    { name: 'Eliminar', cellTemplate: '<button (click)="eliminarFila(row)">Eliminar</button>' }
  ];
  
  eliminarFila(row: any) {
    // Aquí puedes implementar la lógica para eliminar la fila del array 'rows'
  }
  
  agregarDatos(row: any) {
    // Aquí puedes implementar la lógica para eliminar la fila del array 'rows'
  }

  public proceso(){
    console.log("lllll ",this.listUsuarios)
    if(this.listUsuarios.length === 0){
      console.log("true")
      this.cargarUsuarios().subscribe((data:any) => {
        this.listUsuarios = data["users"];
        console.log("del boton ",this.listUsuarios)
        this.listUsuarios.forEach((element:Usuario) => {
          this.registrarUsuario(element); 
        });
        this.rows = this.listUsuarios;
      })
    }else{
      console.log("erroor")
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:"Ya los usuarios fueron cargados con exito"
      })
    }
  }

  public llamarAllUsuarios() {
    return this._http.get(this.urlAllUsuarios); 
  }
  public llamarAllUsuariosActivos() {
    return this._http.get(this.urlAllUsuariosActivos); 
  }

  public cargarUsuarios() {
    return this._http.get(this.urlLoadUsuario); 
  }

  public registrarUsuario(user:Usuario){
    return this._http.post(this.urlRegistarUsuario,user)
  }
}