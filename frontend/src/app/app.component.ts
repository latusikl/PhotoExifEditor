import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'photo-exif-editor';

    darkMode = false;

    ngOnInit(): void {
        const darkMode = localStorage.getItem('darkMode');
        this.darkMode = darkMode === 'true';
        this.darkModeChange(this.darkMode);
    }

    darkModeChange(darkMode: boolean): void {
        const list = document.body.classList;
        if (darkMode && list.contains('light-theme')) {
            list.remove('light-theme');
        } else if (!darkMode && !list.contains('light-theme')) {
            list.add('light-theme');
        }
        localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
    }
}
