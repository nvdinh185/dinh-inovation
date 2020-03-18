import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyIdeaPage } from './my-idea.page';

describe('MyIdeaPage', () => {
  let component: MyIdeaPage;
  let fixture: ComponentFixture<MyIdeaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyIdeaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyIdeaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
