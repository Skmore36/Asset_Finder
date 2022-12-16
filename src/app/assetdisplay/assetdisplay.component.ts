import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Asset } from '../models/assetinfo.model';

@Component({
  selector: 'app-assetdisplay',
  templateUrl: './assetdisplay.component.html',
  styleUrls: ['./assetdisplay.component.css']
})
export class AssetdisplayComponent implements OnInit {
  @Input() asset: Asset;
  @Output() onRemoveAsset = new EventEmitter<number>();
  @Output() onEditAsset = new EventEmitter<number>();


  constructor(){
    this.asset ={
      assetname: '',
      serialnumber: '',
      ponumber:  '',
      assettype:'',
      statusofasset: '',
      projectname:  '',
      pmname:  '',
      devicemanager:  '',
      user:  '',
      location:  '',
      email: '',
    };
  }
  ngOnInit(): void {
    console.log(this.asset);
  }

  deleteAssetClicked() {
    this.onRemoveAsset.emit(this.asset.id);
  }
  editAssetClicked(){
    this.onEditAsset.emit(this.asset.id);
  }

}
