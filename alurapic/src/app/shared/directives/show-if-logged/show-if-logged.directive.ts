import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';
import { UserService } from '../../../core/user/user.service';

@Directive({
    selector: '[appShowIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        // tslint:disable-next-line:no-unused-expression
        !this.userService.isLogged() &&
            this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    }
 }
