import { Component, OnInit } from '@angular/core';

// Componentes de angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios proprios
import { EventoInterface } from '../../../shared/modelos/evento';
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { VerEventoComponent, Data } from '../ver-evento/ver-evento.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  private eventos: EventoInterface[];
  private maxDescLength: number;

  private msgInfo: String;
  private msgError: String;

  constructor(public dialog: MatDialog, private servicios: CatalogosService) {
    this.eventos = [{id_aut_evento:1,
      nombre:"9 Ecuentro de Egresados ",
      descripcion:" is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      cupos: 5,
      hora_inicio: '2:00 am',
      fecha_inicio:"12-12-2020",
      hora_fin: '2:00 am',
      fecha_fin:"12-12-2020",
      lugar: "Club de Leones",
      a_quien_va_dirigido:"Egresados",
      imagen:"data:image/jpeg;base64,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"},
    {id_aut_evento:1,
      nombre:"Cuenta tu Experiencia",
      descripcion:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
      cupos: 5,
      hora_inicio: '2:00 am',
      fecha_inicio:"12-12-2020",
      hora_fin: '2:00 am',
      fecha_fin:"12-12-2020",
      lugar: "Club de Leones",
      a_quien_va_dirigido:"Egresados",
      imagen:"data:image/jpeg;base64,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"},
    {id_aut_evento:1,
      nombre:"Ser Egresado",
      descripcion:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      cupos: 5,
      hora_inicio: '2:00 am',
      fecha_inicio:"12-12-2020",
      hora_fin: '2:00 am',
      fecha_fin:"12-12-2020",
      lugar: "Club de Leones",
      a_quien_va_dirigido:"Egresados",
      imagen:"data:image/jpeg;base64,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"},
    {id_aut_evento:1,
      nombre:"Forma Empreza",
      descripcion:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      cupos: 5,
      hora_inicio: '2:00 am',
      fecha_inicio:"12-12-2020",
      hora_fin: '2:00 am',
      fecha_fin:"12-12-2020",
      lugar: "Club de Leones",
      a_quien_va_dirigido:"Egresados",
      imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ70b_BN_rgsDKY6H38ooUzxnzHlGVbJ9nqIop5EOkoni9o9lWUrw&s"}];
    this.maxDescLength = 200;
   }

  ngOnInit() {
    //this.cargarEventos();
    this.msgError = '';
  }



  verEvento(json: EventoInterface,indice: number ) {
    var eventCloned: EventoInterface = this.eventos[indice];
    let data: Data = { event: eventCloned };
    this.dialog.open(VerEventoComponent, { data: data }).beforeClosed().subscribe(result => {
    });
  }

  obtenerUrlImagen(image) {
    return this.servicios.getUrlGetImage(image);
  }


  /* cargarEventos() {
    this.servicios.getEventos().subscribe(data => this.eventos = data;);
  } */

  obtenerDescripcionCorta(description) {
    var result = description;
    if (description.length > this.maxDescLength) {
      result = description.substr(0, this.maxDescLength) + " ...";
    }
    return result;
  }

}