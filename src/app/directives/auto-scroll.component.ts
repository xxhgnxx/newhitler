import {Component, ViewChild, AfterContentChecked, OnInit} from 'angular2/core';
import {AutoscrollDirective} from './auto-scroll.directive';

@Component({
    selector: 'auto-scroll-display',
    template: `
    <div #this class='chat-box' [inScrollHeight]='this.scrollHeight' [inClientHeight]='this.clientHeight' autoScroll>
        <ng-content></ng-content>
    </div>
    `,
    styles: [`
    .chat-box {
        height: 200px;
        width: 400px;
        overflow-y: scroll;
    }
    `],
    directives: [AutoscrollDirective]
})
export class AutoScrollComponent { }
