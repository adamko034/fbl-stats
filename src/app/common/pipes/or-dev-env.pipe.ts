import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({ name: 'orDevEnv' })
export class OrDevEnvironmentPipe implements PipeTransform {
  public transform(val: any): boolean {
    return !environment.production;
  }
}
