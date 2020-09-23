import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicDisplayComponent } from './music-display.component';

describe('MusicDisplayComponent', () => {
  let component: MusicDisplayComponent;
  let fixture: ComponentFixture<MusicDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
