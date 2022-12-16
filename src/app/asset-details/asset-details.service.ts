import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asset } from '../models/assetinfo.model';

@Injectable({
  providedIn: 'root'
})
export class AssetDetailsService {
private baseurl: string='http://localhost:3000/posts';
  constructor( private http: HttpClient) { }

  getassetinfo(){
    return this.http.get<Asset[]>(this.baseurl);
  }
  
  postAssetinfo(Asset : Asset){
    return this.http.post<Asset>(this.baseurl  , Asset);

  }

  deleteAssetinfo(id: string){
    return this.http.delete(this.baseurl + '/' + id);
  }
  
}
