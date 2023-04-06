import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
	public seconds!: number;
	public milliseconds = 0;
	@Output() public onTimerFinished: EventEmitter<void> = new EventEmitter();

	private timer!: any;

	public ngOnInit(): void {
		this.seconds = 5;
		this.startTimer();
	}

	public startTimer() {
		this.timer = setInterval(() => {
			this.milliseconds -= 10;
			if (this.milliseconds < 0) {
				this.seconds--;
				this.milliseconds = 990;
			}
			if (this.seconds < 0) {
				clearInterval(this.timer);
				this.seconds = 0;
				this.milliseconds = 0;
				this.onTimerFinished.emit();
			}
		}, 10);
	}
}
