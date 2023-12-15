import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  aboutInfo: Map<string, string> = new Map<string, string>([
    [
      'Welcome',
      'Hello and welcome to my website! ' +
      'This online platform is the culmination ' +
      'of my efforts as I complete the final practical ' +
      'assignment for my fourth year in college.'
    ],
    [
      'Technology Stack',
      'I developed this web application using Angular ' +
      'for the frontend and Java Spring for the backend. ' +
      'Angular provides a dynamic and responsive user interface, ' +
      'while Java Spring ensures robustness and efficiency ' +
      'on the server side.'
    ],
    [
      'My Journey',
      'The journey of developing this website has been ' +
      'both educational and fulfilling. From conceptualization ' +
      'to implementation, I\'ve strived to incorporate the best ' +
      'practices and industry standards in web development. ' +
      'The challenges I faced and overcame have not only enhanced ' +
      'my technical capabilities but have also fostered my teamwork ' +
      'and problem-solving skills.'
    ],
    [
      'Acknowledgments',
      'I express my gratitude to my mentors and professors who have ' +
      'guided me throughout this academic year. Their support and ' +
      'expertise have been invaluable in shaping this project. ' +
      'Additionally, I extend my thanks to the open-source community ' +
      'for providing the tools and frameworks that have empowered ' +
      'me to create this web application.'
    ],
    [
      'Connect with Me',
      'I invite you to explore my website and experience the result of ' +
      'my hard work and dedication. Your feedback is important to me as I ' +
      'continue to refine and improve my skills. Feel free to connect with me ' +
      'through the provided contact information; I would love to hear from you!<br><br>' +
      'Thank you for visiting, and I hope you enjoy your time on my site.<br><br>' +
      'Sincerely,<br>' +
      'Daniel'
    ]
  ]);

  public getKeys(): string[] {
    return Array.from(this.aboutInfo.keys());
  }

}
