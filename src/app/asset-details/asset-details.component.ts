import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxScannerQrcodeService, SelectedFiles } from 'ngx-scanner-qrcode';
import { Asset } from '../models/assetinfo.model';
import { AssetDetailsService } from './asset-details.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {
  @ViewChild('addAssetButton') addAssetButton: any;
  
  public selectedFiles: SelectedFiles[] = [];
  
  
  
  assetform: FormGroup;
   
  assets: Asset[];               //To store backend data
  assetstodisplay: Asset[];      //To display data in HTML
  
  asset_typeoptions = [
    'Customer Supplied Asset',
    'Procured by Project' 
  ];
  
  statusofasset = [
    'Active',
    'Idle'
  ];

  constructor( private fb: FormBuilder, private qrcode: NgxScannerQrcodeService, private assetdetailservice: AssetDetailsService){
    this.assetform =fb.group({});
    this.assets =[];
    this.assetstodisplay = this.assets;

  }
  ngOnInit(): void {
    this.assetform = this.fb.group({
    assetname: this.fb.control(''),
    serialnumber: this.fb.control(''),
    ponumber: this.fb.control(''),
    assettype: this.fb.control(''),
    statusofasset: this.fb.control(''),
    projectname: this.fb.control(''),
    pmname: this.fb.control(''),
    devicemanager: this.fb.control(''),
    user: this.fb.control(''),
    location: this.fb.control(''),
    email: this.fb.control(''),
  });
  this.assetdetailservice.getassetinfo().subscribe((res) =>{
    for(let emp of res){
    this.assets.unshift(emp);
    }
    this.assetstodisplay = this.assets;
  });

}
addAsset(){
  let assets : Asset = {
    assetname: this.AssetName.value,
    serialnumber: this.SerialNumber.value,
    ponumber: this.ponumber.value,
    statusofasset: this.StatusOfAsset.value,
    projectname: this.ProjectName.value,
    pmname: this.PMName.value,
    user: this.user.value,
    location: this.location.value,
    email: this.email.value,
    devicemanager: this.DeviceManager.value,
    assettype: '',
  }
  this.assetdetailservice.postAssetinfo(assets).subscribe((res) =>{
  this.assets.unshift(res);
  this.clearForm(); 
  
  });
}

//here it will check which event to remove through val and id
removeasset(event: any) {
  this.assets.forEach((val, index) => {
    if (val.id === parseInt(event)) {
      this.assetdetailservice.deleteAssetinfo(event).subscribe((res) => {
        this.assets.splice(index, 1); 
      });
    }
  });
}


//edit asset

editasset(event: any) {
  this.assets.forEach((val, ind) => {
    if (val.id === event) {
      this.setForm(val);
    }
  });
   this.removeasset(event);
  this.addAssetButton.nativeElement.click();
}
  setForm(asst: Asset) {
    this.AssetName.setValue(asst.assetname);
    this.SerialNumber.setValue(asst.serialnumber);
    this.ponumber.setValue(asst.ponumber); 
    this.StatusOfAsset.setValue(asst.statusofasset);
    this.ProjectName.setValue(asst.projectname);
    this.PMName.setValue(asst.pmname);
    this.DeviceManager.setValue(asst.devicemanager);
    this.user.setValue(asst.user);
    this.location.setValue(asst.location);
    this.email.setValue(asst.email);
  }

  searchAsset(event: any) {
    let filteredAssets: Asset[] = [];
    if (event === '') {
      this.assetstodisplay = this.assets;
    }
    else{
        filteredAssets = this.assets.filter((val, index) =>{
          let targetKey = val.assetname.toLowerCase() + val.serialnumber.toLowerCase() + val.projectname.toLowerCase;
          let searchKey = event.toLowerCase();
          return targetKey.includes(searchKey);
        });
        this.assetstodisplay = filteredAssets;
    }
  }

clearForm(){
  this.AssetName.setValue('');
    this.SerialNumber.setValue('');
    this.ponumber.setValue('');
    this.assettype.setValue('');
    this.StatusOfAsset.setValue('');
    this.ProjectName.setValue('');
    this.PMName.setValue('');
    this.user.setValue('');
    this.location.setValue('');
    this.email.setValue('');
}

public get AssetName(): FormControl {
  return this.assetform.get('assetname') as FormControl;
}
public get SerialNumber(): FormControl {
  return this.assetform.get('serialnumber') as FormControl;
}
public get ponumber(): FormControl {
  return this.assetform.get('ponumber') as FormControl;
}
public get assettype(): FormControl {
  return this.assetform.get('assettype') as FormControl;
}
public get StatusOfAsset(): FormControl {
  return this.assetform.get('statusofasset') as FormControl;
}
public get ProjectName(): FormControl {
  return this.assetform.get('projectname') as FormControl;
}
public get PMName(): FormControl {
  return this.assetform.get('pmname') as FormControl;
}
public get DeviceManager(): FormControl {
  return this.assetform.get('devicemanager') as FormControl;
}
public get user(): FormControl {
  return this.assetform.get('user') as FormControl;
}
public get location(): FormControl {
  return this.assetform.get('location') as FormControl;
}
public get email(): FormControl {
  return this.assetform.get('email') as FormControl;
}


public config: Object = {
  isAuto: true,
  text: { font: '25px serif' }, // Hiden { font: '0px', bottom: 40 },
  frame: { lineWidth: 8 },
  medias: {
    audio: false,
    video: {
      facingMode: 'environment', // Front and back camera { facingMode: front ? "user" : "environment" } 
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  }
};





public onEvent(e?: any): void {
  console.log(e);
  // var f = JSON.stringify({e});
  // console.log(f);
   var myObj = JSON.parse(e);
  //  console.log(myObj.serialnumber);
    
  let assets_1 : Asset = {
    assetname: myObj.assetname,
    serialnumber: myObj.serialnumber,
    ponumber: myObj.ponumber,
    assettype: myObj.assettype,
    statusofasset: myObj.statusofasset,
    projectname: myObj.projectname,
    pmname: myObj.pmname,
    devicemanager: myObj.devicemanager,
    user: myObj.user,
    location: myObj.location,
    email: myObj.email
  }
  this.assetdetailservice.postAssetinfo(assets_1).subscribe((res) =>{
    this.assets.unshift(res);
    this.clearForm(); 
    
    });

  new Audio("https://github.com/id1945/ngx-scanner-qrcode/raw/master/cambeep.mp3").play();
}

public onError(e: any): void {
  alert(e);
}

public handle(action: any, fn: string): void {
  action[fn]().subscribe(console.log, console.error);
}

public onSelects(files: any) {
  this.qrcode.loadFiles(files, this.config).subscribe(res => {
    this.selectedFiles = res.filter(f => f.urlQR);
    // v1.0.25 Fixed issue https://stackoverflow.com/questions/74245551/ngx-scanner-qrcode-reading-data-in-ts
    console.log(res);
  });
  // console.log(URL);
  
}



}
