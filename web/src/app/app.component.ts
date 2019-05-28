import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SwipeHelper } from './core/swipe.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // https://stackoverflow.com/a/37655899/3576578https://stackoverflow.com/a/37655899/3576578
    gtag('config', environment.analyticsId);
    // Using Rx's built in `distinctUntilChanged ` feature to handle url change c/o @dloomb's answer
    router.events.pipe(distinctUntilChanged((previous: any, current: any) => {
      // Subscribe to any `NavigationEnd` events where the url has changed
      if (current instanceof NavigationEnd) {
        return previous.url === current.url;
      }
      return true;
    })).subscribe((x: any) => {
      gtag('config', environment.analyticsId, { 'page_path': x.url });
    });

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public onSwipeLeft(event) {
    this.sidenav.close();
  }

  public onSwipeRight(event) {
    if (SwipeHelper.IsFromLeftBorder(event)) {
      this.sidenav.open();
    }
  }
}
