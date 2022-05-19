import { Component } from '@angular/core';
import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

Amplify.configure({
  region: 'us-west-2',
  userPoolId: 'us-west-2_WNDSvUTaq',
  userPoolWebClientId: 'u7i0h1a8mrquq76034738c8g1',
  authenticationFlowType: 'USER_PASSWORD_AUTH',
  responseType: 'token',
  identityPoolId: 'us-west-2:a294478b-245c-4073-9a94-e33ec59ad8c4',
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bacot-app';
  session = false;

  user = {
    username: 'irawan@ischemaview.com',
    password: ''
  }

  async ngOnInit() {
    try {
      const session = await Auth.currentSession();

      if (session.isValid()) {
        this.session = true;
      }
    } catch (error) {
      console.log('check session', error);
    }
  }

  async onSubmit() {
    console.log('signin in...', Date.now());
    const { username, password } = this.user;

    try {
      const response = await Auth.signIn({username, password});
      console.log('signInResponse', response);

      /* ENABLE to TRIGGER REFRESH TOKEN
      const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
      console.log('user', user)
       */

      this.session = true;
    } catch (error) {
      console.error('error', error);
    }

  }

  async signOut() {
    console.log('signing out...')

    await Auth.signOut()
    this.session = false;
  }
}
