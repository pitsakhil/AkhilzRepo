import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadermenuComponent } from './headermenu.component';

describe('HeadermenuComponent', () => {
    let component: HeadermenuComponent;
    let fixture: ComponentFixture<HeadermenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeadermenuComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeadermenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
