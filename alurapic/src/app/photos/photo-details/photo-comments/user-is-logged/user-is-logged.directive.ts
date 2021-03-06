import { Directive, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { UserService } from '../../../../core/user/user.service';

@Directive({
    selector: '[appUserIsLogged]'
})
export class UserIsLoggedDirective implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.getUser().subscribe(user => {
            if (!user) {
                this.renderer
                    .setElementAttribute(this.element.nativeElement, 'disabled', '');
            }
        });
    }
 }
