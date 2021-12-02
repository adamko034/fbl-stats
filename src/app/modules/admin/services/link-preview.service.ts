import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LinkPreview } from '../models/link-preview.model';

@Injectable()
export class LinkPreviewService {
  private readonly LINK_API_URL = 'http://api.linkpreview.net/?key={0}&q={1}';

  constructor(private http: HttpClient) {}

  public getLinkPreview(url: string): Observable<LinkPreview> {
    const apiUrl = this.LINK_API_URL.replace('{0}', environment.linkPreviewApiKey).replace('{1}', url);
    return this.http.get<LinkPreview>(apiUrl);
  }
}
