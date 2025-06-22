import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from "@angular/router";
import { CommonService } from "../services/common.service";import { inject } from "@angular/core";

export const canActivateRoute: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const commonService = inject(CommonService);
    const router = inject(Router);
    const isLoggedIn = commonService.isLoggedIn;
    if(isLoggedIn == 'true'){
        return true;
    } else {
        router.navigate(['landing']);
        return false;
    }
}