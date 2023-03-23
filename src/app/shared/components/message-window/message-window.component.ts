import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-message-window',
	templateUrl: './message-window.component.html',
	styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent implements OnInit, OnDestroy {
	@Input() showTimeMs = 2000;

	public messageText = '';
	public type = 'warning';
	public windowSubscription!: Subscription;

	constructor(private messageService: MessageService) {}

	public ngOnInit() {
		this.windowSubscription = this.messageService.messageWindow$.subscribe(messageWindow => {
			this.messageText = messageWindow.messageText;
			this.type = messageWindow.type;

			const timeout = setTimeout(() => {
				clearTimeout(timeout);
				this.messageText = '';
			}, this.showTimeMs);
		});
	}

	public ngOnDestroy() {
		if (this.windowSubscription) {
			this.windowSubscription.unsubscribe();
		}
	}
}
