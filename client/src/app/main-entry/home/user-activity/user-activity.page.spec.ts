import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserActivityPage } from './user-activity.page';

describe('UserActivityPage', () => {
  let component: UserActivityPage;
  let fixture: ComponentFixture<UserActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
