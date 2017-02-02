import { Component } from '@angular/core';

@Component({
  moduleId: '../views/core/exceptions/',
  templateUrl: 'default.exception.html',
  styleUrls: ['default.exception.css']
})
export class PageNotFoundComponent {
    status = '404 Not Found';
    detail = 'Requested page not found';
}

@Component({
  moduleId: '../views/core/exceptions/',
  templateUrl: 'default.exception.html',
  styleUrls: ['default.exception.css']
})
export class ForbiddenComponent {
    status = '403 Forbidden';
    detail = 'You do not have permission to perform this action';
}