import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetdisplayComponent } from './assetdisplay.component';

describe('AssetdisplayComponent', () => {
  let component: AssetdisplayComponent;
  let fixture: ComponentFixture<AssetdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetdisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
