import { MediaMatcher } from '@angular/cdk/layout';
import { ApplicationRef, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval, Subject } from 'rxjs';
import { distinctUntilChanged, first, takeUntil } from 'rxjs/operators';
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
  private onDestroy$ = new Subject();

  public updateAvailable = false;
  public serviceWorkerEnabled = true;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    router: Router,
    appRef: ApplicationRef,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar) {
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

    this.serviceWorkerEnabled = this.swUpdate.isEnabled;
    if (this.serviceWorkerEnabled) {
      // Allow the app to stabilize first, before starting polling for updates with `interval()`.
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.subscribe(() => this.checkForUpdate());

      this.swUpdate.available
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(event => {
          this.updateAvailable = true;
          const snackBarRef = this.snackBar.open('Er is een update beschikbaar!', 'Update', {
            duration: 30000,
          });

          snackBarRef.onAction().subscribe(() => {
            this.activateUpdate();
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onSwipeLeft(event) {
    this.sidenav.close();
  }

  public onSwipeRight(event) {
    if (SwipeHelper.IsFromLeftBorder(event)) {
      this.sidenav.open();
    }
  }

  public async checkForUpdate() {
    await this.swUpdate.checkForUpdate();
  }

  public async activateUpdate() {
    await this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
