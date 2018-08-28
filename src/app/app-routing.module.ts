import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { BiddingComponent } from './bidding/bidding.component';
import { PageNotFoundComponent } from './notfound.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {
      path: 'user',
      component: UserComponent,
      data: { title: 'User Login' }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
      },
    {
      path: 'bidding',
      component: BiddingComponent,
      data: { title: 'Bidding Page' }
    },
    { path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent } //should be at the last position
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
      )
    ],
    exports : [
        RouterModule
    ]
    // bootstrap: [AppComponent]
  })

  export class AppRoutingModule {}