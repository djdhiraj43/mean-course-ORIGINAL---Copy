import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';
import { AuthorModule } from './authors/author.module'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    AuthorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent] 
  //We have to add entry component here because ErrorComponent is not going to be loaded through selector or router. So we are informing Angular to be prepared for loading this component
})
export class AppModule { }
