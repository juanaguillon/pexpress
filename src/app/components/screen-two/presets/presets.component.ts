import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit {

  currentTitle = "";
  inVals:any = {}; 

  statusVals = [
    "Guardar Preset",
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>",
    "Preset Guardado"
  ]
  status = 0;
  
  constructor(
    private data: DatabaseService
  ) { }

  ngOnInit() {}



}
