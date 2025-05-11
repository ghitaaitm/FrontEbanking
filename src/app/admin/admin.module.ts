import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CurrencyListComponent } from './currency/currency-list/currency-list.component';
import { SettingsListComponent } from './settings/settings-list/settings-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CurrencyFormComponent } from './currency/currency-form/currency-form.component';
import { SettingsEditFormComponent } from './settings/settings-edit-form/settings-edit-form.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutComponent,
    CurrencyListComponent,
    SettingsListComponent,
    AdminDashboardComponent,
    CurrencyFormComponent,
    SettingsEditFormComponent
  ],
  declarations: [

  ]
})
export class AdminModule {}
