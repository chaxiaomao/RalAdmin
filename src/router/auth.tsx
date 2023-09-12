interface AuthProvider {
    user: null | object;

    signin(username: object): Promise<void>;

    signout(): Promise<void>;

    islogin(): boolean;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider: AuthProvider = {

    user: null,

    islogin() {

        if (this.user == null) {
            let user = localStorage.getItem('user');
            this.user = JSON.parse(user);
        }

        return !!this.user;

    },

    async signin(user: object) {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },

    async signout() {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        this.user = null;
        localStorage.removeItem('user');
    },



};
